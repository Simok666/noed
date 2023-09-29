<?php

namespace App\Http\Controllers\BackEnd;

use Laravel\Passport\Passport;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use Validator;
use Carbon\Carbon;
use App\Http\Controllers\Utils\AppWebControll;
use App\Http\Controllers\Utils\UploadFileControll;
use PDF;

class NODReviewControll extends Controller
{
    protected $AppWeb;
    protected $History;
    protected $UploadFile;
    protected $MainDB;

    public function __construct() {
        $this->AppWeb = new AppWebControll();
        $this->History = new HistoryControll();
        $this->UploadFile = new UploadFileControll();
        $this->MainDB = DB::connection('mysql');
    }

    public function index(Request $request) {
    	$sortRules = $request->input('sort');
        $limit = $request->input('per_page');
        $searchValue = json_decode($request->input('search'));
        // print_r($searchValue->name);exit();
        list($field, $dir) = explode('|', $sortRules);

        $query = DB::table('nod_review as nod')
            ->select(
                'nod.Id as id',
                'nrt.NODNumber',
                'noe.NOENumberAcc',
                'noe.Event',
                'nrt.ProperCondition',
                'noe.BatchNo',
                'pdc.Name as Product',
                'nod.Status'
            )
            ->leftjoin('nod_report as nrt','nrt.Id','=','nod.IdNODReport')
            ->leftjoin('noe_report as noe','noe.Id','=','nrt.IdNOEReport')
            ->leftjoin('product as pdc','pdc.Id','=','noe.IdProduct')
            ->orderBy($field, $dir)
            ->where(function($query) {
                $valPosition = session('adminvue')->CodePosition;
                $exp = explode('.', $valPosition);
                if(strpos(strtolower($exp[1]), 'dh') !== false) {
                    $query->where('nod.Status','>=',3);
                }

                if(strpos(strtolower($exp[1]), 'apj') !== false) {
                    $query->where('nod.Status','>=',2);
                }
            })
            ->where('nod.Actived','>',0);

        if ($searchValue) {
            $query->where(function($query) use ($searchValue) {
                foreach ($searchValue as $key=>$val) {
                    $key = str_replace('__', '.', $key);
                    if($val!='' && $val!=null) $query->where($key, 'like', '%'.$val.'%');
                }
            });
        }

        $data = $query->paginate($limit);

        if(session('adminvue')->IdDepartment == 67) {
            return $data;
        } else {
            return '';
        }
    }

    public function indexNotReview(Request $request) {
        $sortRules = $request->input('sort');
        $limit = $request->input('per_page');
        $searchValue = json_decode($request->input('search'));
        // print_r($searchValue->name);exit();
        list($field, $dir) = explode('|', $sortRules);

        $query = DB::table('nod_report as nod')
            ->select(
                'nod.Id as id',
                'nrt.NODNumber',
                'noe.NOENumberAcc',
                'noe.Event',
                'nrt.ProperCondition',
                'noe.BatchNo',
                'pdc.Name as Product',
                'nod.Status'
            )
            ->leftjoin('nod_report as nrt','nrt.Id','=','nod.Id')
            ->leftjoin('nod_review as nor','nor.IdNODReport','=','nod.Id')
            ->leftjoin('noe_report as noe','noe.Id','=','nod.IdNOEReport')
            ->leftjoin('product as pdc','pdc.Id','=','noe.IdProduct')
            ->orderBy($field, $dir)
            ->where('nod.Status',8)
            ->whereNull('nor.Id')
            ->where('nod.Actived','>',0);

        if ($searchValue) {
            $query->where(function($query) use ($searchValue) {
                foreach ($searchValue as $key=>$val) {
                    $key = str_replace('__', '.', $key);
                    if($val!='' && $val!=null) $query->where($key, 'like', '%'.$val.'%');
                }
            });
        }

        $data = $query->paginate($limit);

        if(session('adminvue')->IdDepartment == 67) {
            return $data;
        } else {
            return '';
        }
    }

    public function getSession(Request $request) {
        $itemDepartment = session('adminvue')->IdDepartment;

        $itemPosition = 0;
        $valPosition = session('adminvue')->CodePosition;
        $exp = explode('.', $valPosition);
        if(strpos(strtolower($exp[1]), 'uh') !== false) $itemPosition = 1;
        if(strpos(strtolower($exp[1]), 'sch') !== false) $itemPosition = 2;
        if(strpos(strtolower($exp[1]), 'apj') !== false) $itemPosition = 3;
        if(strpos(strtolower($exp[1]), 'dh') !== false) $itemPosition = 4;

        $itemCaretaker = $this->AppWeb->checkCaretaker(5,session('adminvue')->IdEmployee,session('adminvue')->Id);

        return json_encode(array(
            'status'=>true,
            'department'=>$itemDepartment,
            'position'=>$itemPosition,
            'isCaretaker'=>$itemCaretaker
        ));
    }

    public function getNODNumber(Request $request) {
        $item = DB::table('nod_report')
            ->select('Id','NODNumber')
            ->where('IsReview',0)
            ->where('Status',8)
            ->where('Actived',1)
            ->get();

        return json_encode(array(
            'status'=>true,
            'data'=>$item,
        ));
    }

    public function getDataNOD(Request $request) {
        $item = DB::table('nod_report as nod')
            ->select(
                'noe.NOENumber',
                'noe.BatchNo',
                'pdc.Name as IdProduct',
                'noe.Event',
                'nod.ProperCondition',
                'nod.Man',
                'nod.Machine',
                'nod.Method',
                'nod.Material',
                'nod.Milieu'
                // 'emp.Name as IdCAPIC',
                // 'nod.CADate',
                // 'nod.CADescription',
                // 'nod.CAFile',
                // 'empy.Name as IdPAPIC',
                // 'nod.PADate',
                // 'nod.PADescription',
                // 'nod.PAFile'
            )
            ->leftjoin('noe_report as noe','noe.Id','=','nod.IdNOEReport')
            ->leftjoin('product as pdc','pdc.Id','=','noe.IdProduct')
            // ->leftjoin('employee as emp','emp.Id','=','nod.IdCAPIC')
            // ->leftjoin('employee as empy','empy.Id','=','nod.IdPAPIC')
            ->where('nod.Id',$request->Id)
            ->where('nod.Actived',1)
            ->first();

        $NODCA = DB::table('nod_report_action as nra')
            ->select(
                'nra.IdPIC as IdCAPIC',
                'nra.Date as CADate',
                'nra.Description as CADescription',
                'nra.File as CAFile',
                'nra.File as CAFileName',
                'emp.Name as CAPIC'
            )
            ->leftjoin('employee as emp','emp.Id','=','nra.IdPIC')
            ->where('nra.IdNODReport', $request->Id)
            ->where('nra.Type', 0)
            ->where('nra.Actived', 1)
            ->get();

        $NODPA = DB::table('nod_report_action as nra')
            ->select(
                'nra.IdPIC as IdPAPIC',
                'nra.Date as PADate',
                'nra.Description as PADescription',
                'nra.File as PAFile',
                'nra.File as PAFileName',
                'emp.Name as PAPIC'
            )
            ->leftjoin('employee as emp','emp.Id','=','nra.IdPIC')
            ->where('nra.IdNODReport', $request->Id)
            ->where('nra.Type', 1)
            ->where('nra.Actived', 1)
            ->get();

        if(!empty($item)) {
            // $item->CADate = Carbon::parse($item->CADate)->format('d/m/Y');
            // $item->PADate = Carbon::parse($item->PADate)->format('d/m/Y');
            // $FileCA = json_decode($item->CAFile);
            // $item->FileCA = $FileCA;
            // $FilePA = json_decode($item->PAFile);
            // $item->FilePA = $FilePA;

            // $CAFileName = [];
            // if(!empty($CAFileName)) { foreach ($FileCA as $key => $val) {
            //     $arr = [];
            //     if($val) {
            //         $result = explode("/",$val);
            //         array_push($arr, $result[4]);
            //     }
            //     array_push($arr, $val);
            //     array_push($CAFileName, $arr);
            // } }
            // $item->CAFileName = $CAFileName;

            // $PAFileName = [];
            // if(!empty($PAFileName)) { foreach ($FilePA as $key => $val) {
            //     $arr = [];
            //     if($val) {
            //         $result = explode("/",$val);
            //         array_push($arr, $result[4]);
            //     }
            //     array_push($arr, $val);
            //     array_push($PAFileName, $arr);
            // } }
            // $item->PAFileName = $PAFileName;
        }

        return json_encode(array(
            'status'=>true,
            'data'=>$item,
            'NODCA'=>$NODCA,
            'NODPA'=>$NODPA,
        ));
    }

    public function getDevRiskAssesment(Request $request) {
        $item = DB::table('other_system_affected')
            ->select('Id','Assesment as RiskAssesment')
            ->where('Actived',1)
            ->get();

        return json_encode(array(
            'status'=>true,
            'data'=>$item,
        ));
    }

    public function store(Request $request) {
    	$requestData = $request->all();
        $validation = Validator::make($request->all(),$this->validation(),
            $messages = ['required' => 'This field is required.']);

        if ($validation->fails() || $request->input('NODNumber') == null || $request->input('IsOSA') == null) {
            return json_encode(array(
                'status'=>false,
                'message'=>'Silahkan lengkapi kolom *Wajib Diisi',
                'validation'=>$validation->errors(),
            ));
        }

        $fileAttachment = [];
        if($request->has('AssesmentFile')){
            $arrFile = $request->file('AssesmentFile');
            foreach ($arrFile as $key => $val) {
                if(pathinfo($val->getClientOriginalName(), PATHINFO_EXTENSION)){
                    $fileAttachment[$key] = $this->UploadFile->uploadFile($val,7); //7 path nod-review
                }
            }
        }

        DB::begintransaction();
        try{
            DB::table('nod_report')
            ->where('Id', $request->input('NODNumber'))
            ->update([
                'IsReview'=>1,
            ]);

            $IdNODReview = DB::table('nod_review')
                ->insertGetId([
                    'IdNODReport'=>$request->input('NODNumber'),
                    'IsOSA'=>$request->input('IsOSA'),
                    'UserEntry'=>session('adminvue')->Id
                ]);

            if($request->input('IsOSA') == "Ada") {
                for($i=0;$i<count($request->input('Assesment'));$i++) {
                    $valAttachment = '';
                    if (array_key_exists($i, $fileAttachment)) {
                        $valAttachment = $fileAttachment[$i];
                    }
                    DB::table('nod_review_detail')
                    ->insert([
                        'IdNODReview'=>$IdNODReview,
                        'Assesment'=>$request->input('Assesment')[$i],
                        'Description'=>$request->input('Description')[$i],
                        'Attachment'=>$valAttachment,
                        'UserEntry'=>session('adminvue')->Id
                    ]);
                }
            }

            $this->History->store(32,1,json_encode($requestData));
            DB::commit();
        }catch (Exception $e){
            DB::rollback();
            return json_encode(array(
                'status'=>false,
                'message'=>'Simpan Data Gagal, Server Invalid!',
                'validation'=>$validation->errors(),
            ));
        }

        return json_encode(array(
            'status'=>true,
            'message'=>'Simpan Data Sukses!',
        ));
    }

    public function edit(Request $request) {
        $item = DB::table('nod_review as nod')
            ->select(
                'nod.Id',
                'nrt.Id as IdNOD',
                'nrt.NODNumber',
                'nod.IsOSA',
                'nod.VerifCAPA',
                'nod.DescriptionCAPA',
                'noe.NOENumber',
                'noe.BatchNo',
                'pdc.Name as IdProduct',
                'noe.Event',
                'nrt.ProperCondition',
                'nrt.Man',
                'nrt.Machine',
                'nrt.Method',
                'nrt.Material',
                'nrt.Milieu',
                // 'emp.Name as IdCAPIC',
                // 'nrt.CADate',
                // 'nrt.CADescription',
                // 'nrt.CAFile',
                // 'empy.Name as IdPAPIC',
                // 'nrt.PADate',
                // 'nrt.PADescription',
                // 'nrt.PAFile',
                'nod.Status'
            )
            ->leftjoin('nod_report as nrt','nrt.Id','=','nod.IdNODReport')
            ->leftjoin('noe_report as noe','noe.Id','=','nrt.IdNOEReport')
            ->leftjoin('product as pdc','pdc.Id','=','noe.IdProduct')
            // ->leftjoin('employee as emp','emp.Id','=','nrt.IdCAPIC')
            // ->leftjoin('employee as empy','empy.Id','=','nrt.IdPAPIC')
            ->where('nod.Actived',1)
            ->where('nod.Id',$request->input('Id'))
            ->first();

        $NODCA = DB::table('nod_report_action as nra')
            ->select(
                'nra.IdPIC as IdCAPIC',
                'nra.Date as CADate',
                'nra.Description as CADescription',
                'nra.File as CAFile',
                'nra.File as CAFileName',
                'emp.Name as CAPIC'
            )
            ->leftjoin('employee as emp','emp.Id','=','nra.IdPIC')
            ->where('nra.IdNODReport', $item->IdNOD)
            ->where('nra.Type', 0)
            ->where('nra.Actived', 1)
            ->get();

        $NODPA = DB::table('nod_report_action as nra')
            ->select(
                'nra.IdPIC as IdPAPIC',
                'nra.Date as PADate',
                'nra.Description as PADescription',
                'nra.File as PAFile',
                'nra.File as PAFileName',
                'emp.Name as PAPIC'
            )
            ->leftjoin('employee as emp','emp.Id','=','nra.IdPIC')
            ->where('nra.IdNODReport', $item->IdNOD)
            ->where('nra.Type', 1)
            ->where('nra.Actived', 1)
            ->get();

        if(!empty($item)) {
            $item->NODNumber = ['Id'=>$item->IdNOD,'NODNumber'=>$item->NODNumber];
            $item->IsOSA = ['value'=>$item->IsOSA,'text'=>$item->IsOSA];

            /*$item->CADate = Carbon::parse($item->CADate)->format('d/m/Y');
            $item->PADate = Carbon::parse($item->PADate)->format('d/m/Y');
            $FileCA = json_decode($item->CAFile);
            $item->FileCA = $FileCA;
            $FilePA = json_decode($item->PAFile);
            $item->FilePA = $FilePA;

            $CAFileName = [];
            if(!empty($CAFileName)) { foreach ($FileCA as $key => $val) {
                $arr = [];
                if($val) {
                    $result = explode("/",$val);
                    array_push($arr, $result[4]);
                }
                array_push($arr, $val);
                array_push($CAFileName, $arr);
            } }
            $item->CAFileName = $CAFileName;

            $PAFileName = [];
            if(!empty($PAFileName)) { foreach ($FilePA as $key => $val) {
                $arr = [];
                if($val) {
                    $result = explode("/",$val);
                    array_push($arr, $result[4]);
                }
                array_push($arr, $val);
                array_push($PAFileName, $arr);
            } }
            $item->PAFileName = $PAFileName;*/

            $itemDetail = DB::table('nod_review_detail')
            ->select('Assesment','Description','Attachment as file','Attachment as fileName')
            ->where('IdNODReview',$item->Id)
            ->where('Actived',1)
            ->get();

            $item->OtherSA = $itemDetail;
        }

        $itemCaretaker = $this->AppWeb->checkCaretaker(5,session('adminvue')->IdEmployee,session('adminvue')->Id);

        $itemPosition = 0;
        $valPosition = session('adminvue')->CodePosition;
        $exp = explode('.', $valPosition);
        if(strpos(strtolower($exp[1]), 'uh') !== false) $itemPosition = 1;
        if(strpos(strtolower($exp[1]), 'sch') !== false) $itemPosition = 2;
        if(strpos(strtolower($exp[1]), 'apj') !== false) $itemPosition = 3;
        if(strpos(strtolower($exp[1]), 'dh') !== false) $itemPosition = 4;

        return json_encode(array(
            'status'=>true,
            'data'=>$item,
            'NODCA'=>$NODCA,
            'NODPA'=>$NODPA,
            'position'=>$itemPosition,
            'isCaretaker'=>$itemCaretaker
        ));
    }

    public function update(Request $request) {
        $requestData = $request->all();
        $validation = Validator::make($request->all(),$this->validation(),
            $messages = ['required' => 'This field is required.']);

        if ($validation->fails() || $request->input('NODNumber') == null || $request->input('IsOSA') == null) {
            return json_encode(array(
                'status'=>false,
                'message'=>'Silahkan lengkapi kolom *Wajib Diisi',
                'validation'=>$validation->errors(),
            ));
        }

        if($request->input('IsOSA') == "Ada") {
            $fileAttachment = [];
            $OldAssesmentFile = json_decode($request->input('OldAssesmentFile'),true);
            
            if($request->has('AssesmentFile') && $request->file('AssesmentFile') != null) {
                $arrAssesment = $request->input('Assesment');
                $arrFile = $request->file('AssesmentFile');
                foreach ($arrAssesment as $key => $val) {
                    $fileAttachment[$key] = '';
                    if (array_key_exists($key, $request->file('AssesmentFile'))) {
                        $fileAttachment[$key] = $OldAssesmentFile[$key];
                        if(pathinfo($arrFile[$key]->getClientOriginalName(), PATHINFO_EXTENSION)) {
                            $fileAttachment[$key] = $this->UploadFile->uploadFile($arrFile[$key],7); //7 path nod-review
                        }
                    }
                }
            }
        }

        $item = DB::table('nod_review')
            ->select('IdNODReport')
            ->where('Id', $request->input('Id'))
            ->first();

        DB::begintransaction();
        try{
            if($item->IdNODReport != $request->input('NODNumber')) {
                DB::table('nod_report')
                ->where('Id', $item->IdNODReport)
                ->update([
                    'IsReview'=>0,
                ]);

                DB::table('nod_report')
                ->where('Id', $request->input('NODNumber'))
                ->update([
                    'IsReview'=>1
                ]);
            }

            DB::table('nod_review')
                ->where('Id', $request->input('Id'))
                ->update([
                    'IdNODReport'=>$request->input('NODNumber'),
                    'IsOSA'=>$request->input('IsOSA')
                ]);

            if($request->input('IsOSA') == "Ada") {
                DB::table('nod_review_detail')
                    ->where('IdNODReview', $request->input('Id'))
                    ->update([
                        'Actived'=>0
                    ]);

                for($i=0;$i<count($request->input('Assesment'));$i++) {
                    $valAttachment = '';
                    if (array_key_exists($i, $fileAttachment)) {
                        $valAttachment = $fileAttachment[$i];
                    }
                    DB::table('nod_review_detail')
                    ->insert([
                        'IdNODReview'=>$request->input('Id'),
                        'Assesment'=>$request->input('Assesment')[$i],
                        'Description'=>$request->input('Description')[$i],
                        'Attachment'=>$valAttachment,
                        'UserEntry'=>session('adminvue')->Id
                    ]);
                }
            }

            $this->History->store(32,2,json_encode($requestData));
            DB::commit();
        }catch (Exception $e){
            DB::rollback();
            return json_encode(array(
                'status'=>false,
                'message'=>'Simpan Data Gagal, Server Invalid!',
                'validation'=>$validation->errors(),
            ));
        }

        return json_encode(array(
            'status'=>true,
            'message'=>'Simpan Data Sukses!',
        ));
    }

    public function delete(Request $request) {
        $item = DB::table('nod_review')
            ->select('*')
            ->where('Id', $request->input('Id'))
            ->first();

        DB::begintransaction();
        try{
            DB::table('nod_review')
                ->where('Id', $request->input('Id'))
                ->update([
                    'Actived'=>0
                ]);

            DB::table('nod_report')
            ->where('Id', $item->IdNODReport)
            ->update([
                'IsReview'=>0
            ]);

            $this->History->store(32,3,json_encode($item));
            DB::commit();
        }catch (Exception $e){
            DB::rollback();
            return json_encode(array(
                'status'=>false,
                'message'=>'Invalid Server Side, Hapus Data Gagal!',
            ));
        }

        return json_encode(array(
            'status'=>true,
            'message'=>'Hapus Data Sukses!',
        ));
    }

    function validation(){
        return [
            'IsOSA'=>'required'
        ];
    }

    public function publish(Request $request) {
        $item = DB::table('nod_review as nor')
            ->select(
                'nor.*',
                'nod.NODNumber',
                'nod.ProperCondition',
                'nod.Man',
                'nod.Machine',
                'nod.Method',
                'nod.Material',
                'nod.Milieu'
            )
            ->leftjoin('nod_report as nod','nod.Id','=','nor.IdNODReport')
            ->where('nor.Id', $request->input('Id'))
            ->first();

        DB::begintransaction();
        try{
            DB::table('nod_review')
            ->where('Id', $request->input('Id'))
            ->update([
                'Status'=>3
            ]);

            try{
                $IdPosition = session('adminvue')->ParentPosition;
                if($IdPosition!=0 || $IdPosition!=null) {
                    $itemMail = $this->MainDB->table('employee as emp')
                        ->select('emp.Name as Employee','emp.Email')
                        ->where('emp.IdPosition', $IdPosition)
                        ->where('emp.Actived', 1)
                        ->get();

                    $data['Subject'] = 'NOD Review - Published';
                    $data['Title'] = 'Data NOD telah diperiksa, Oleh :';

                    $dataMail['Pemeriksa'] = session('adminvue')->Name .' | '. session('adminvue')->Position .' - '. session('adminvue')->Department;
                    $dataMail['NOD Number'] = $item->NODNumber;
                    $dataMail['Proper Condition'] = $item->ProperCondition;
                    $dataMail['Man'] = $item->Man;
                    $dataMail['Machine'] = $item->Machine;
                    $dataMail['Method'] = $item->Method;
                    $dataMail['Material'] = $item->Material;
                    $dataMail['Milieu'] = $item->Milieu;

                    if(count($itemMail)>0) { foreach ($itemMail as $key => $val) {
                        $data['Employee'] = $val->Employee;
                        $data['Email'] = $val->Email;

                        $this->History->sendMail($data, $dataMail);
                    } }
                }

                $this->History->store(32,4,json_encode($item));
                DB::commit();
            }catch (Exception $e){
                return json_encode(array(
                    'status'=>false,
                    'message'=>'Publish Data Gagal, Pengiriman Email Invalid!',
                    'validation'=>$validation->errors(),
                ));
            }
        }catch (Exception $e){
            DB::rollback();
            return json_encode(array(
                'status'=>false,
                'message'=>'Invalid Server Side, Publish Data Gagal!',
            ));
        }

        return json_encode(array(
            'status'=>true,
            'message'=>'Publish Data Sukses!',
        ));
    }

    public function approve(Request $request) {
        $item = DB::table('nod_review as nor')
            ->select(
                'nor.*',
                'noe.DatePublish',
                'nod.NODNumber',
                'nod.IdDepartment',
                'nod.ProperCondition',
                'nod.Man',
                'nod.Machine',
                'nod.Method',
                'nod.Material',
                'nod.Milieu',
                'nod.UserEntry as NODUserEntry'
            )
            ->leftjoin('nod_report as nod','nod.Id','=','nor.IdNODReport')
            ->leftjoin('noe_report as noe','noe.Id','=','nod.IdNOEReport')
            ->where('nor.Id', $request->input('Id'))
            ->first();

        $diffDay = $this->AppWeb->diffDateApprove($item->DatePublish);
        $StatusTimeQA = 1;
        if($diffDay>15) $StatusTimeQA  = 2;

        $isClosed = 0;

        $valPosition = session('adminvue')->CodePosition;
        $exp = explode('.', $valPosition);
        $itemCaretaker = $this->AppWeb->checkCaretaker(5,session('adminvue')->IdEmployee,session('adminvue')->Id);
        if($itemCaretaker) {
            $arr = [
                'IsMandatory'=>1,
                'DescriptionMandatory'=>$request->input('DescriptionCaretaker'),
                'VerifCAPA'=>$request->input('VerifCAPA')['value'],
                'DescriptionCAPA'=>$request->input('DescriptionCAPA'),
                'Status'=>4,
                'DateQA'=>date('Y-m-d H:i:s'),
                'UserQA'=>session('adminvue')->Id
            ];
            $isClosed = 1;
        } else {
            if(strpos(strtolower($exp[1]), 'apj') !== false) {
                $arr = [
                    'VerifCAPA'=>$request->input('VerifCAPA')['value'],
                    'DescriptionCAPA'=>$request->input('DescriptionCAPA'),
                    'Status'=>3,
                    'DateQAAPJ'=>date('Y-m-d H:i:s'),
                    'UserQAAPJ'=>session('adminvue')->Id
                ];
                $StatusTimeQA = null;
            } else if(strpos(strtolower($exp[1]), 'dh') !== false) {
                $arr = [
                    'VerifCAPA'=>$request->input('VerifCAPA')['value'],
                    'DescriptionCAPA'=>$request->input('DescriptionCAPA'),
                    'Status'=>4,
                    'DateQA'=>date('Y-m-d H:i:s'),
                    'UserQA'=>session('adminvue')->Id
                ];
                $isClosed = 1;
            } else {
                return json_encode(array(
                    'status'=>false,
                    'message'=>'Anda Bukan Sebagai Caretaker!',
                ));
            }
        }

        DB::begintransaction();
        try{ if(session('adminvue')->IdDepartment == 67 && (strpos(strtolower($exp[1]), 'dh') !== false || $itemCaretaker)) {
            DB::table('nod_review')
            ->where('Id', $request->input('Id'))
            ->update($arr);

            DB::table('nod_report')
            ->where('Id', $item->IdNODReport)
            ->update([
                'IsClosed'=>$isClosed,
                'StatusTimeQA'=>$StatusTimeQA
            ]);
            
            try{
                $data['Subject'] = 'NOD Review - Approved';
                $data['Title'] = 'Data NOD telah disetujui, Oleh :';

                $dataMail['Disetujui'] = session('adminvue')->Name .' | '. session('adminvue')->Position .' - '. session('adminvue')->Department;
                $dataMail['NOD Number'] = $item->NODNumber;
                $dataMail['Proper Condition'] = $item->ProperCondition;
                $dataMail['Man'] = $item->Man;
                $dataMail['Machine'] = $item->Machine;
                $dataMail['Method'] = $item->Method;
                $dataMail['Material'] = $item->Material;
                $dataMail['Milieu'] = $item->Milieu;

                if(strpos(strtolower($exp[1]), 'apj') !== false) {
                    $IdPosition = session('adminvue')->ParentPosition;
                    if($IdPosition!=0 || $IdPosition!=null) {
                        $itemMail = $this->MainDB->table('employee as emp')
                            ->select('emp.Name as Employee','emp.Email')
                            ->where('emp.Actived', 1)
                            ->orWhere('emp.IdPosition', $IdPosition)
                            ->where('emp.Actived', 1)
                            ->get();

                        if(count($itemMail)>0) { foreach ($itemMail as $key => $val) {
                            $data['Employee'] = $val->Employee;
                            $data['Email'] = $val->Email;

                            $this->History->sendMail($data, $dataMail);
                        } }
                    }
                } else {

                    $itemPst = DB::table('position')
                        ->select('Id')
                        ->where('Code', 'like', '%'.'.dh')
                        ->where('IdDepartment', $item->IdDepartment)
                        ->where('Actived', 1)
                        ->first();
                    if($itemPst!=null) $IdPosition = $itemPst->Id;
                    else $IdPosition = 0;

                    if($IdPosition!=0 || $IdPosition!=null) {
                        $itemMail = $this->MainDB->table('employee as emp')
                            ->select('emp.Name as Employee','emp.Email')
                            ->leftjoin('users as usr','usr.IdEmployee','=','emp.Id')
                            ->where('usr.Id', $item->NODUserEntry)
                            ->where('emp.Actived', 1)
                            ->orWhere('emp.IdPosition', $IdPosition)
                            ->where('emp.Actived', 1)
                            ->get();

                        if(count($itemMail)>0) { foreach ($itemMail as $key => $val) {
                            $data['Employee'] = $val->Employee;
                            $data['Email'] = $val->Email;

                            $this->History->sendMail($data, $dataMail);
                        } }

                        $itemPst = DB::table('position')
                            ->select('Id')
                            ->where('Code', 'like', '%'.'.sch')
                            ->where('Parent', session('adminvue')->IdPosition)
                            ->where('Actived', 1)
                            ->first();
                        if($itemPst!=null) $IdPosition = $itemPst->Id;
                        else $IdPosition = 0;

                        if($IdPosition!=0 || $IdPosition!=null) {
                            $itemMail = $this->MainDB->table('employee as emp')
                                ->select('emp.Name as Employee','emp.Email')
                                ->where('emp.IdPosition', $IdPosition)
                                ->where('emp.Actived', 1)
                                ->get();

                            if(count($itemMail)>0) { foreach ($itemMail as $key => $val) {
                                $data['Employee'] = $val->Employee;
                                $data['Email'] = $val->Email;

                                $this->History->sendMail($data, $dataMail);
                            } }
                        }
                    }
                }

                $this->History->store(32,13,json_encode($item));
                DB::commit();
            }catch (Exception $e){
                return json_encode(array(
                    'status'=>false,
                    'message'=>'Setujui Data Gagal, Pengiriman Email Invalid!',
                    'validation'=>$validation->errors(),
                ));
            }
        } } catch (Exception $e){
            DB::rollback();
            return json_encode(array(
                'status'=>false,
                'message'=>'Setujui Data Gagal, Invalid Server Side!',
            ));
        }

        return json_encode(array(
            'status'=>true,
            'message'=>'Setujui Data Sukses!',
        ));
    }

    public function reject(Request $request) {
        $item = DB::table('nod_review as nor')
            ->select(
                'nor.*',
                'noe.DatePublish',
                'nod.NODNumber',
                'nod.IdDepartment',
                'nod.ProperCondition',
                'nod.Man',
                'nod.Machine',
                'nod.Method',
                'nod.Material',
                'nod.Milieu',
                'nod.UserEntry as NODUserEntry'
            )
            ->leftjoin('nod_report as nod','nod.Id','=','nor.IdNODReport')
            ->leftjoin('noe_report as noe','noe.Id','=','nod.IdNOEReport')
            ->where('nor.Id', $request->input('Id'))
            ->first();

        $valPosition = session('adminvue')->CodePosition;
        $exp = explode('.', $valPosition);
        $itemCaretaker = $this->AppWeb->checkCaretaker(5,session('adminvue')->IdEmployee,session('adminvue')->Id);
        if($itemCaretaker) {
            $arr = [
                'IsMandatory'=>1,
                'DescriptionMandatory'=>$request->input('DescriptionCaretaker'),
                'Status'=>5,
                'DateQA'=>date('Y-m-d H:i:s'),
                'UserQA'=>session('adminvue')->Id
            ];
        } else {
            if(strpos(strtolower($exp[1]), 'dh') !== false) {
                $arr = [
                    'Status'=>5,
                    'DateQA'=>date('Y-m-d H:i:s'),
                    'UserQA'=>session('adminvue')->Id
                ];
            } else {
                return json_encode(array(
                    'status'=>false,
                    'message'=>'Anda Bukan Sebagai Caretaker!',
                ));
            }
        }

        $diffDay = $this->AppWeb->diffDateApprove($item->DatePublish);
        $StatusTimeQA = 1;
        if($diffDay>15) $StatusTimeQA  = 2;

        DB::begintransaction();
        try{ if(session('adminvue')->IdDepartment == 67 && (strpos(strtolower($exp[1]), 'dh') !== false || $itemCaretaker)) {
            DB::table('nod_review')
            ->where('Id', $request->input('Id'))
            ->update($arr);

            DB::table('nod_report')
            ->where('Id', $item->IdNODReport)
            ->update([
                // 'IsReview'=>0, // Data NOD di reject saat Review, jadi tetap sudah di review
                'IsClosed'=>1,
                'StatusTimeQA'=>$StatusTimeQA
            ]);

            try{
                $itemPst = DB::table('position')
                    ->select('Id')
                    ->where('Code', 'like', '%'.'.dh')
                    ->where('IdDepartment', $item->IdDepartment)
                    ->where('Actived', 1)
                    ->first();
                if($itemPst!=null) $IdPosition = $itemPst->Id;
                else $IdPosition = 0;

                if($IdPosition!=0 || $IdPosition!=null) {
                    $itemMail = $this->MainDB->table('employee as emp')
                        ->select('emp.Name as Employee','emp.Email')
                        ->leftjoin('users as usr','usr.IdEmployee','=','emp.Id')
                        ->where('usr.Id', $item->NODUserEntry)
                        ->where('emp.Actived', 1)
                        ->orWhere('emp.IdPosition', $IdPosition)
                        ->where('emp.Actived', 1)
                        ->get();

                    $data['Subject'] = 'NOD Review - Rejected';
                    $data['Title'] = 'Data NOD telah ditolak, Oleh :';

                    $dataMail['Penolak'] = session('adminvue')->Name .' | '. session('adminvue')->Position .' - '. session('adminvue')->Department;
                    $dataMail['NOD Number'] = $item->NODNumber;
                    $dataMail['Proper Condition'] = $item->ProperCondition;
                    $dataMail['Man'] = $item->Man;
                    $dataMail['Machine'] = $item->Machine;
                    $dataMail['Method'] = $item->Method;
                    $dataMail['Material'] = $item->Material;
                    $dataMail['Milieu'] = $item->Milieu;

                    if(count($itemMail)>0) { foreach ($itemMail as $key => $val) {
                        $data['Employee'] = $val->Employee;
                        $data['Email'] = $val->Email;

                        $this->History->sendMail($data, $dataMail);
                    } }

                    $itemPst = DB::table('position')
                        ->select('Id')
                        ->where('Code', 'like', '%'.'.sch')
                        ->where('Parent', session('adminvue')->IdPosition)
                        ->where('Actived', 1)
                        ->first();
                    if($itemPst!=null) $IdPosition = $itemPst->Id;
                    else $IdPosition = 0;

                    if($IdPosition!=0 || $IdPosition!=null) {
                        $itemMail = $this->MainDB->table('employee as emp')
                            ->select('emp.Name as Employee','emp.Email')
                            ->where('emp.IdPosition', $IdPosition)
                            ->where('emp.Actived', 1)
                            ->get();

                        if(count($itemMail)>0) { foreach ($itemMail as $key => $val) {
                            $data['Employee'] = $val->Employee;
                            $data['Email'] = $val->Email;

                            $this->History->sendMail($data, $dataMail);
                        } }
                    }
                }
                $this->History->store(32,14,json_encode($item));
                DB::commit();
            }catch (Exception $e){
                return json_encode(array(
                    'status'=>false,
                    'message'=>'Tolak Data Gagal, Pengiriman Email Invalid!',
                    'validation'=>$validation->errors(),
                ));
            }
        } }catch (Exception $e){
            DB::rollback();
            return json_encode(array(
                'status'=>false,
                'message'=>'Tolak Data Gagal, Invalid Server Side!',
            ));
        }

        return json_encode(array(
            'status'=>true,
            'message'=>'Tolak Data Sukses!',
        ));
    }
}
