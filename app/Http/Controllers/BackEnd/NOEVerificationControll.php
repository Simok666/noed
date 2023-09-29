<?php

namespace App\Http\Controllers\BackEnd;

use Laravel\Passport\Passport;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use App\Helper;
use Validator;
use Carbon\Carbon;
use App\Http\Controllers\Utils\AppWebControll;
use App\Http\Controllers\Utils\UploadFileControll;

class NOEVerificationControll extends Controller
{
    protected $AppWeb;
    protected $History;
    protected $UploadFile;
    protected $MainDB;

    public function __construct() {
        $this->AppWeb = new AppWebControll();
        $this->History = new HistoryControll();
        $this->Helper = new Helper();
        $this->UploadFile = new UploadFileControll();
        $this->MainDB = DB::connection('mysql');
    }

    public function index(Request $request) {
    	$sortRules = $request->input('sort');
        $limit = $request->input('per_page');
        $searchValue = json_decode($request->input('search'));
        list($field, $dir) = explode('|', $sortRules);
         
        $query = DB::table('noe_report as noe')
            ->select(
                'noe.Id as id',
                'noe.NOENumber',
                'noe.NOENumberAcc',
                'noe.IdTypeIncident',
                'loc.Name as Location',
                'noe.Date',
                'pdc.Name as Product',
                'noe.BatchNo',
                'noe.Event',
                'noe.Status',
                'noe.IsPublish',
                'noe.IdPublish',
                'noe.IsCorrection',
                'usr.UserName as UserEntry',
                'noe.CreateAt',
                'noe.UpdateAt',
                'nve.IdPublish as verifIdPublish'
            )
            ->leftjoin('product as pdc','pdc.Id','=','noe.IdProduct')
            ->leftjoin('location as loc','loc.Id','=','noe.IdLocation')
            ->leftjoin('users as usr','usr.Id','=','noe.UserEntry')
            ->leftjoin('position as pst','pst.Id','=','noe.IdPublish')
            ->leftjoin('noe_verif_evaluation as nve', function($join){
                $join->on('nve.IdNOEReport', '=', 'noe.Id');
                $join->whereNotNull('nve.IdPublish');
            })
            
            ->where(function($query) {
                if(session('adminvue')->TypeUser!=8 && session('adminvue')->TypeUser!=19)
                    $query->where('noe.IdDepartment',session('adminvue')->IdDepartment);
            })
            ->orderBy(DB::raw('ISNULL(noe.NOENumberAcc), NOENumberAcc'), 'ASC')
            ->orderBy('noe.NOENumber')
            ->orderBy($field, $dir)
            ->where(function($query) {
                if(session('adminvue')->TypeUser!=8  && session('adminvue')->TypeUser!=19) {
                    $valPosition = session('adminvue')->CodePosition;
                    $exp = explode('.', $valPosition);
                    if(strpos(strtolower($exp[1]), 'dh') !== false) {
                        $query->where('noe.Status','>=',2); // status before is 5
                    } else if(strpos(strtolower($exp[1]), 'sch') !== false) {
                        $query->where('noe.Status','>=',2);  // status before is 3
                    } else {
                        $query->where('noe.Status','>=',2);
                    }
                }
            })
            ->where('noe.Actived','>',0)
            ->distinct('noe.Id');
       
        if ($searchValue) {
            $query->where(function($query) use ($searchValue) {
                foreach ($searchValue as $key=>$val) {
                    
                    if($key == "noe__Date" && !empty($val))
                        {
                            if($val!='' && $val!=null)
                            {
                                $date = str_replace('.', '-', $val);
                                $yearConvertDigits = Carbon::createFromFormat('d-m-y', $date);
                                $yearFormats = $yearConvertDigits->format('d-m-Y');
                                    
                                $val = date('Y-m-d', strtotime($yearFormats));
                            }
                            if($val!='' && $val!=null) $query->where('noe.Date', 'like', '%'.$val.'%');
                        }
                        else
                        {
                            $key = str_replace('__', '.', $key);
                            if($val!='' && $val!=null) $query->where($key, 'like', '%'.$val.'%');
                        }
                }
            });
        }
        
        $data = $query->paginate($limit);
        
        return $data;
    }

    public function detail($Id){
        $item = DB::table('noe_verif_evaluation')
            ->select('RelevantDept')
            ->where('IdNOEReport',$Id)
            ->where('TypeData',0)
            ->where('Actived', 1)
            ->first();

        $data = [];
        if($item!=null) { if($item->RelevantDept!=null) {
            $RelevantDept = json_decode($item->RelevantDept);
            if(count($RelevantDept)) { foreach ($RelevantDept as $val) {
                $arr = [];
                array_push($arr, $val->RelevantDept);
                array_push($data, $arr);
            }

            }
        } }

        return json_encode(array(
            'data'=>$data
        ));
    }

    public function getSession(Request $request) {
        $itemPosition = 0;
       
        $valPosition = session('adminvue')->CodePosition;
        $exp = explode('.', $valPosition);
        if(strpos(strtolower($exp[1]), 'uh') !== false) $itemPosition = 1;
        if(strpos(strtolower($exp[1]), 'sch') !== false) $itemPosition = 2;
        if(strpos(strtolower($exp[1]), 'dh') !== false) $itemPosition = 3;
        
        $itemCaretaker = $this->AppWeb->checkCaretaker(session('adminvue')->IdDepartment,session('adminvue')->IdEmployee,session('adminvue')->Id);

        return json_encode(array(
            'status'=>true,
            'position'=>$itemPosition,
            'isCaretaker'=>$itemCaretaker,
            // 'publishPerson'=>$isRightPerson,
            'idPublish'=>session('adminvue')->IdPosition
        ));
    }

    function isCaretaker(Request $request) {
        $item = DB::table('noe_report as noe')
        ->select(
            'noe.Status'
        )
        ->where('noe.Id', $request->input('Id'))
        ->where('noe.Actived', 1)
        ->first();

        $itemCaretaker = $this->AppWeb->checkCaretaker(session('adminvue')->IdDepartment,session('adminvue')->IdEmployee,session('adminvue')->Id);
        $isCaretaker = false;
        if($itemCaretaker && $item->Status=='Disetujui oleh Sect Head') $isCaretaker = true;

        return json_encode(array(
            'status'=>true,
            'isCaretaker'=>$isCaretaker
        ));
    }

    public function getRelevantDept(Request $request) {
        $item = $this->MainDB->table('department')
            ->select('Id','Department as RelevantDept')
            ->where('Id','<>',session('adminvue')->IdDepartment)
            // ->where('Id','<>', 67)
            ->where('Parent','<>',0)
            ->where('Actived',1)
            ->get();

        return json_encode(array(
            'status'=>true,
            'data'=>$item,
        ));
    }

    public function getDeviationRisk(Request $request) {
        $item = DB::table('deviation_risk_assesment')
            ->select('Id','Question','RiskAssesment','Value','AssesmentGroup')
            ->where('AssesmentGroup','SEVERITY')
            ->where('Actived',1)
            ->get();

        $item2 = DB::table('deviation_risk_assesment')
            ->select('Id','Question','RiskAssesment','Value','AssesmentGroup')
            ->where('AssesmentGroup','PROBABILITY')
            ->where('Actived',1)
            ->get();

        $item3 = DB::table('deviation_risk_assesment')
            ->select('Id','Question','RiskAssesment','Value','AssesmentGroup')
            ->where('AssesmentGroup','DETECTABILITY')
            ->where('Actived',1)
            ->get();

        return json_encode(array(
            'status'=>true,
            'data'=>$item,
            'data2'=>$item2,
            'data3'=>$item3
        ));
    }

    public function getDeviationLevel(Request $request) {
        $item = DB::table('deviation_level')
            ->select('Id','Level','MaxValue')
            ->orderBy('MaxValue', 'asc')
            ->where('Actived',1)
            ->get();

        $result = null;
        $IdDeviation = null;
        foreach ($item as $key => $val) {
            for ($i=1; $i <= $val->MaxValue; $i++) {
                if($request->input('value') == $i) {
                    $result = 'Score : '.$request->input('value').'; Level : '.$val->Level.';';
                    $IdDeviation = $val->Id;
                    break;
                }
            }
            if($result) break;
        }
        if($result == null) {
            $result = 'Score : '.$request->input('value').'; Level : Critical;';
            $IdDeviation = 3;
        }

        return json_encode(array(
            'status'=>true,
            'data'=>$result,
            'iddeviation'=>$IdDeviation
        ));
    }

    public function edit(Request $request) {

        $isExist = DB::table('noe_verif_evaluation')
            ->where('TypeData',0)
            ->where('Actived',1)
            ->where('IdNOEReport',$request->input('Id'))
            ->count();

        $item = DB::table('noe_report as noe')
            ->select(
                'nve.IdNOEReport',
                'noe.*',
                'loc.Name as Location',
                'pdc.Name as Product',
                'nve.Verified',
                'nve.OtherCorrectAction',
                'nve.RelevantDept',
                'nve.IdDevRiskAssesment',
                'nve.IdDevRiskAssesment2',
                'nve.IdDevRiskAssesment3',
                'nve.DeviationLevel',
                'dvl.Level',
                'dvl.MaxValue',
                'nve.OtherProductAffect',
                'nve.DescriptionOPA',
                'nve.IdPublish',
                'pst.Name as PositionName'
            )
            ->leftjoin('noe_verif_evaluation as nve','nve.IdNOEReport','=','noe.Id')
            ->leftjoin('location as loc','loc.Id','=','noe.IdLocation')
            ->leftjoin('product as pdc','pdc.Id','=','noe.IdProduct')
            ->leftjoin('deviation_level as dvl','dvl.Id','=','nve.DeviationLevel')
            ->leftjoin('position as pst','pst.Id','=','nve.IdPublish')
            ->where('noe.Actived',1)
            ->where('noe.Id',$request->input('Id'))
            ->where(function($query) use ($isExist) {
                if($isExist > 0) {
                    $query->where('nve.TypeData',0);
                    $query->where('nve.Actived',1);
                }
            })
            ->first();

        if(!empty($item)) {
            $item->Time = Carbon::parse($item->Date)->format('H:i:s');
            $item->Date = Carbon::parse($item->Date)->format('Y-m-d');
            $item->IdProduct = $item->Product;
            $item->IdLocation = $item->Location;
            $TypeIncident = json_decode($item->IdTypeIncident, true);
            $result = '';
            foreach ($TypeIncident as $key => $val) 
            {
                if($val['TypeIncident']) {
                    $result .= $val['TypeIncident'].'; ';
                }
            }
            $item->IdTypeIncident = $result;
            $FileEvent = json_decode($item->EventFile);
            $item->FileEvent = $FileEvent;
            $FileCorrectiveAction = json_decode($item->CorrectiveActionFile);
            $item->FileCorrectiveAction = $FileCorrectiveAction;
           
            if($isExist>0) {
                $item->Verified = ['value'=>$item->Verified,'text'=>$item->Verified];
                $item->RelevantDept = json_decode($item->RelevantDept, true);
                $item->IdDevRiskAssesment = json_decode($item->IdDevRiskAssesment, true);
                $item->IdDevRiskAssesment2 = json_decode($item->IdDevRiskAssesment2, true);
                $item->IdDevRiskAssesment3 = json_decode($item->IdDevRiskAssesment3, true);
                $item->OtherProductAffect = ['value'=>$item->OtherProductAffect,'text'=>$item->OtherProductAffect];
                $item->IdDeviationLevel = $item->DeviationLevel;
                $item->IdPublish = ['Id'=>$item->IdPublish, 'Name'=>$item->PositionName];
                if($item->MaxValue == null && $item->Level == null) $item->DeviationLevel = '';
            } else {
                $item->Verified = ['value'=>null,'text'=>null];
                $item->RelevantDept = null;
                $item->IdDevRiskAssesment = null;
                $item->IdDevRiskAssesment2 = null;
                $item->IdDevRiskAssesment3 = null;
                $item->OtherProductAffect = ['value'=>null,'text'=>null];
                $item->IdDeviationLevel = null;
            }


            $FileEventDownload = [];
            foreach ($FileEvent as $key => $val) {
                $arr = [];
                if($val) {
                    $result = explode("/",$val);
                    array_push($arr, $result[4]);
                }
                array_push($arr, $val);
                array_push($FileEventDownload, $arr);
            }
            $item->FileEventDownload = $FileEventDownload;

            $FileCorrectiveActionDownload = [];
            foreach ($FileCorrectiveAction as $key => $val) {
                $arr = [];
                if($val) {
                    $result = explode("/",$val);
                    array_push($arr, $result[4]);
                }
                array_push($arr, $val);
                array_push($FileCorrectiveActionDownload, $arr);
            }
            $item->FileCorrectiveActionDownload = $FileCorrectiveActionDownload;
        }

        $itemCaretaker = $this->AppWeb->checkCaretaker(session('adminvue')->IdDepartment,session('adminvue')->IdEmployee,session('adminvue')->Id);
        $isCaretaker = false;
        if($itemCaretaker && $item->Status=='Disetujui oleh Sect Head') $isCaretaker = true;

        $itemPosition = 0;
        $valPosition = session('adminvue')->CodePosition;
        $exp = explode('.', $valPosition);
        if(strpos(strtolower($exp[1]), 'uh') !== false) $itemPosition = 1;
        if(strpos(strtolower($exp[1]), 'sch') !== false) $itemPosition = 2;
        if(strpos(strtolower($exp[1]), 'dh') !== false) $itemPosition = 3;
        
        $isCorrection = false;
        if($item->IsCorrection == 1) $isCorrection = true;

        return json_encode(array(
            'status'=>true,
            'data'=>$item,
            'position'=>$itemPosition,
            'isCaretaker'=>$isCaretaker,
            'isCorrection'=>$isCorrection
        ));
    }

    public function update(Request $request) {
        $requestData = $request->all();
        $validation = Validator::make($request->all(),$this->validation(),
            $messages = ['required' => 'This field is required.']);
       
        if ($validation->fails() || $request->input('Verified') == 'null' || $request->input('OtherProductAffect') == 'null') {
            return json_encode(array(
                'status'=>false,
                'message'=>'Silahkan lengkapi kolom *Wajib Diisi',
                'validation'=>$validation->errors(),
            ));
        }

        // sebelumnya keluar jika 'Verified' == 'Perlu tindakan koreksi lain'
        /*$RelevantDept = null;
        if($request->input('Verified') == 'Perlu tindakan koreksi lain') {
            $RelevantDept = $request->input('RelevantDept');
        }*/
        $RelevantDept = $request->input('RelevantDept');

        $isExist = DB::table('noe_verif_evaluation')
            ->where('TypeData',0)
            ->where('Actived',1)
            ->where('IdNOEReport',$request->input('Id'))
            ->count();
        
        DB::begintransaction();
        try{
            if($isExist>0) {
                DB::table('noe_verif_evaluation')
                ->where('IdNOEReport', $request->input('Id'))
                ->where('TypeData',0)
                ->where('Actived',1)
                ->update([
                    'Verified'=>$request->input('Verified'),
                    'OtherCorrectAction'=>$request->input('OtherCorrectAction'),
                    'RelevantDept'=>$RelevantDept,
                    'IdDevRiskAssesment'=>$request->input('IdDevRiskAssesment'),
                    'IdDevRiskAssesment2'=>$request->input('IdDevRiskAssesment2'),
                    'IdDevRiskAssesment3'=>$request->input('IdDevRiskAssesment3'),
                    'DeviationLevel'=>$request->input('IdDeviationLevel'),
                    'OtherProductAffect'=>$request->input('OtherProductAffect'),
                    'DescriptionOPA'=>$request->input('DescriptionOPA'),
                    'IdPublish'=> $request->input('IdPublish')
                ]);

                DB::table('noe_report')
                ->where('Id', $request->input('Id'))
                ->update([
                    'IsPublish'=>1
                ]);

                $this->History->store(25,2,json_encode($requestData));
            } else {
                DB::table('noe_verif_evaluation')
                ->insert([
                    'IdNOEReport'=>$request->input('Id'),
                    'Verified'=>$request->input('Verified'),
                    'OtherCorrectAction'=>$request->input('OtherCorrectAction'),
                    'RelevantDept'=>$RelevantDept,
                    'IdDevRiskAssesment'=>$request->input('IdDevRiskAssesment'),
                    'IdDevRiskAssesment2'=>$request->input('IdDevRiskAssesment2'),
                    'IdDevRiskAssesment3'=>$request->input('IdDevRiskAssesment3'),
                    'DeviationLevel'=>$request->input('IdDeviationLevel'),
                    'OtherProductAffect'=>$request->input('OtherProductAffect'),
                    'DescriptionOPA'=>$request->input('DescriptionOPA'),
                    'IdPublish'=>$request->input('IdPublish'),
                    'TypeData'=>0,
                    'UserEntry'=>session('adminvue')->Id
                ]);

                DB::table('noe_report')
                ->where('Id', $request->input('Id'))
                ->update([
                    'IsPublish'=>1
                ]);

                $this->History->store(25,1,json_encode($requestData));
            }
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
        $item = DB::table('noe_verif_evaluation')
            ->select('*')
            ->where('IdNOEReport', $request->input('Id'))
            ->where('TypeData', 0)
            ->where('Actived',1)
            ->first();

        DB::begintransaction();
        try{
            DB::table('noe_verif_evaluation')
                ->where('IdNOEReport', $request->input('Id'))
                ->where('TypeData', 0)
                ->where('Actived',1)
                ->update([
                    'Actived'=>0
                ]);

            DB::table('noe_report')
                ->where('Id', $request->input('Id'))
                ->update([
                    'IsPublish'=>0
                ]);

            $this->History->store(25,3,json_encode($item));
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
            'Verified'=>'required',
            'IdDevRiskAssesment'=>'required',
            'DeviationLevel'=>'required',
            'OtherProductAffect'=>'required',
            'IdPublish'=>'required'
        ];
    }

    public function publishVerify(Request $request) {
        $item = DB::table('noe_report as noe')
        ->select(
            'noe.*',
            'nve.Verified',
            'nve.OtherCorrectAction',
            'nve.OtherProductAffect',
            'nve.DescriptionOPA',
            'pdc.Name as Product',
            'loc.Name as Location',
            'nve.IdPublish'
        )
        ->leftjoin('noe_verif_evaluation as nve','nve.IdNOEReport','=','noe.Id')
        ->leftjoin('position as pst','pst.Id','=','nve.IdPublish')
        ->leftjoin('product as pdc','pdc.Id','=','noe.IdProduct')
        ->leftjoin('location as loc','loc.Id','=','noe.IdLocation')
        ->where('noe.Id', $request->input('Id'))
        ->where('nve.TypeData', 0)
        ->where('nve.Actived', 1)
        ->first();

        $getAnswer = DB::table('correction as crt')  
                ->select('crt.Answer','crt.UserEntry')
                ->whereNotNull('crt.Answer')->latest('crt.CreateAt')
                ->where('crt.Number', $item->NOENumber)
                ->first();
        
        $valPosition = session('adminvue')->CodePosition;
        $exp = explode('.', $valPosition);

        if(strpos(strtolower($exp[1]), 'sch') !== false) {
            $Status = 5;
        } else {
            $Status = 4;
        }
        
        DB::begintransaction();
        try{
            // sebelumnya unit head & sect head jadi satu, sekarang terpisah
            /*DB::table('noe_verif_evaluation')
                ->where('IdNOEReport', $request->input('Id'))
                ->where('TypeData', 0)
                ->where('Actived',1)
                ->update([
                    'Date'=>date('Y-m-d H:i:s'),
                    'Status'=>'Approved',
                    'UserEntry'=>session('adminvue')->Id
                ]);*/

            DB::table('noe_report')
            ->where('Id', $request->input('Id'))
            ->update([
                'Status'=>$Status,
                'IsPublish'=>1
            ]);

            try{
                $itemPosition = DB::table('position')
                        ->select('Id','Status','Name')
                        ->where('Id', $item->IdPublish)
                        ->where('IdDepartment', session('adminvue')->IdDepartment)
                        ->where('Actived', 1)
                        ->first();
                
                if($itemPosition != null || !empty($itemPosition))
                {
                    $itemMail = $this->MainDB->table('employee as emp')
                        ->select('emp.Name as Employee','emp.Email')
                        ->where('emp.IdPosition', $itemPosition->Id)
                        ->where('emp.Actived', 1)
                        ->get();
                    
                    if($getAnswer != null)
                    {
                        $noeAnswer = $getAnswer->Answer;
                        $this->Helper->sendEmail($item, $noeAnswer, $request, $itemMail, $Status);
                    }
                    else
                    {
                        $this->Helper->sendEmail($item, $noeAnswer=null, $request, $itemMail, $Status);
                    }
                    
                }
                
                $this->History->store(25,4,json_encode($item));
                DB::commit();
            }catch (Exception $e){
                return json_encode(array(
                    'status'=>false,
                    'message'=>'Publish Verifikasi Data Gagal, Pengiriman Email Invalid!',
                    'validation'=>$validation->errors(),
                ));
            }
        }catch (Exception $e){
            DB::rollback();
            return json_encode(array(
                'status'=>false,
                'message'=>'Publish Verifikasi Data Gagal, Invalid Server Side!',
            ));
        }

        return json_encode(array(
            'status'=>true,
            'message'=>'Publish Verifikasi Data Sukses!',
        ));
    }

    public function approve(Request $request) {
        $item = DB::table('noe_report as noe')
        ->select(
            'noe.*',
            'nve.Verified',
            'nve.OtherCorrectAction',
            'nve.OtherProductAffect',
            'nve.DescriptionOPA',
            'pdc.Name as Product',
            'loc.Name as Location'
        )
        ->leftjoin('noe_verif_evaluation as nve','nve.IdNOEReport','=','noe.Id')
        ->leftjoin('product as pdc','pdc.Id','=','noe.IdProduct')
        ->leftjoin('location as loc','loc.Id','=','noe.IdLocation')
        ->where('noe.Id', $request->input('Id'))
        ->where('nve.TypeData', 0)
        ->where('nve.Actived', 1)
        ->first();
        
        $valPosition = session('adminvue')->CodePosition;
        $exp = explode('.', $valPosition);
        $itemCaretaker = $this->AppWeb->checkCaretaker(session('adminvue')->IdDepartment,session('adminvue')->IdEmployee,session('adminvue')->Id);
        $isCaretaker = false;
        if($itemCaretaker && $item->Status=='Disetujui oleh Sect Head') $isCaretaker = true;
        
        if(strpos(strtolower($exp[1]), 'sch') !== false) {
            if($isCaretaker)
            {
                $statusNOE = 12;
                $arrNOE = [
                    'Status'=>$statusNOE,
                    'StatusTimeDept'=>1
                ];

                $arr = [
                    'IsMandatory'=>1,
                    'DescriptionMandatory'=>$request->input('DescriptionCaretaker'),
                    'DateDept'=>date('Y-m-d H:i:s'),
                    'StatusDept'=>'Approved',
                    'UserDept'=>session('adminvue')->Id
                ];
            }
            else
            {
                $arr = [
                    'Date'=>date('Y-m-d H:i:s'),
                    'Status'=>'Approved',
                    'SectionPublish'=> session('adminvue')->IdPosition,
                    'UserSect'=>session('adminvue')->Id
                ];

                $statusNOE = 5;
                $arrNOE = [
                    'Status'=>$statusNOE
                ];
            }
        } else {
            $diffDay = $this->AppWeb->diffDateApprove($item->DatePublish);
            ($isCaretaker) ? $statusNOE = 11 : $statusNOE = 6;
            $arrNOE = [
                'Status'=>$statusNOE,
                'StatusTimeDept'=>1
            ];
            
            if($diffDay>5) {
                if($isCaretaker)
                {
                    $arrNOE = [
                        'Status'=>$statusNOE,
                        'StatusTimeDept'=>2
                    ];    
                }
                else
                {
                    $arrNOE = [
                        'Status'=>$statusNOE,
                        'StatusTimeDept'=>2
                    ];
                }
            }

            if($isCaretaker) {
                $arr = [
                    'IsMandatory'=>1,
                    'DescriptionMandatory'=>$request->input('DescriptionCaretaker'),
                    'DateDept'=>date('Y-m-d H:i:s'),
                    'StatusDept'=>'Approved',
                    'UserDept'=>session('adminvue')->Id
                ];
            } else {
                if(strpos(strtolower($exp[1]), 'dh') !== false) {
                    $arr = [
                        'DateDept'=>date('Y-m-d H:i:s'),
                        'StatusDept'=>'Approved',
                        'UserDept'=>session('adminvue')->Id
                    ];
                } else {
                    return json_encode(array(
                        'status'=>false,
                        'message'=>'Anda Bukan Sebagai Caretaker!',
                    ));
                }
            }
        }
       
        DB::begintransaction();
        try{
            DB::table('noe_verif_evaluation')
                ->where('IdNOEReport', $request->input('Id'))
                ->where('TypeData', 0)
                ->where('Actived',1)
                ->update($arr);

            DB::table('noe_report')
                ->where('Id', $request->input('Id'))
                ->update($arrNOE);
                
            try{
               
                if($statusNOE==5) {
                    //parent not filtered because dept just one 
                    $parent = json_decode(session('adminvue')->ParentPosition);
                    $IdPosition = $parent[0]->Id;
                } else {
                    $itemPosition = DB::table('position')
                        ->select('Id')
                        ->where('Code', 'like', '%'.'.sch')
                        ->where('IdDepartment', 67) // 67 : Dept. QA
                        ->where('Actived', 1)
                        ->first();
                    
                    if($itemPosition!=null) $IdPosition = $itemPosition->Id;
                    else $IdPosition = 0;
                }
               
                if($IdPosition!=0) {
                    $itemMail = $this->MainDB->table('employee as emp')
                        ->select('emp.Name as Employee','emp.Email')
                        ->where('emp.IdPosition', $IdPosition)
                        ->where('emp.Actived', 1)
                        ->get();
                    
                    $this->Helper->sendEmail($item, $noeAnswer=null, $request, $itemMail, $statusNOE);
                    
                }
                
                $this->History->store(25,13,json_encode($item));
                DB::commit();
            }catch (Exception $e){
                return json_encode(array(
                    'status'=>false,
                    'message'=>'Setujui Data Gagal, Pengiriman Email Invalid!',
                    'validation'=>$validation->errors(),
                ));
            }
        }catch (Exception $e){
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
        $item = DB::table('noe_report as noe')
        ->select(
            'noe.*',
            'nve.Verified',
            'nve.OtherCorrectAction',
            'nve.OtherProductAffect',
            'nve.DescriptionOPA',
            'nve.RelevantDept',
            'pst.Id as deptHeadPelopor',
            'nve.SectionPublish',
            'pdc.Name as Product',
            'loc.Name as Location'
        )
        ->leftjoin('noe_verif_evaluation as nve','nve.IdNOEReport','=','noe.Id')
        ->leftjoin('users as usr','usr.Id','=','nve.UserDept')
        ->leftjoin('employee as emp','emp.Id','=','usr.IdEmployee')
        ->leftjoin('position as pst','pst.Id','=','emp.IdPosition')
        ->leftjoin('product as pdc','pdc.Id','=','noe.IdProduct')
        ->leftjoin('location as loc','loc.Id','=','noe.IdLocation')
        ->where('noe.Id', $request->input('Id'))
        ->where('nve.TypeData', 0)
        ->where('nve.Actived', 1)
        ->first();

        $item = DB::table('noe_report as noe')
        ->select(
            'noe.*',
            'nve.Verified',
            'nve.OtherCorrectAction',
            'nve.OtherProductAffect',
            'nve.DescriptionOPA',
            'nve.RelevantDept',
            'pst.Id as deptHeadPelopor',
            'nve.SectionPublish',
            'pdc.Name as Product',
            'loc.Name as Location'
        )
        ->leftjoin('noe_verif_evaluation as nve','nve.IdNOEReport','=','noe.Id')
        ->leftjoin('users as usr','usr.Id','=','nve.UserDept')
        ->leftjoin('employee as emp','emp.Id','=','usr.IdEmployee')
        ->leftjoin('position as pst','pst.Id','=','emp.IdPosition')
        ->leftjoin('product as pdc','pdc.Id','=','noe.IdProduct')
        ->leftjoin('location as loc','loc.Id','=','noe.IdLocation')
        ->where('noe.Id', $request->input('Id'))
        ->where('nve.TypeData', 0)
        ->where('nve.Actived', 1)
        ->first();

        $valPosition = session('adminvue')->CodePosition;
        $exp = explode('.', $valPosition);
        $itemCaretaker = $this->AppWeb->checkCaretaker(session('adminvue')->IdDepartment,session('adminvue')->IdEmployee,session('adminvue')->Id);
        $isCaretaker = false;
        if($itemCaretaker && $item->Status=='Disetujui oleh Sect Head') $isCaretaker = true;
        
        if($isCaretaker) {
            $arr = [
                'IsMandatory'=>1,
                'DescriptionMandatory'=>$request->input('DescriptionCaretaker'),
                'DateDept'=>date('Y-m-d H:i:s'),
                'StatusDept'=>'Rejected',
                'DescriptionRejectedDept'=>$request->input('Description'),
                'UserDept'=>session('adminvue')->Id
            ];
        } else {
            if(strpos(strtolower($exp[1]), 'dh') !== false) {
                $arr = [
                    'DateDept'=>date('Y-m-d H:i:s'),
                    'StatusDept'=>'Rejected',
                    'DescriptionRejectedDept'=>$request->input('Description'),
                    'UserDept'=>session('adminvue')->Id
                ];
            } else {
                return json_encode(array(
                    'status'=>false,
                    'message'=>'Anda Bukan Sebagai Caretaker!',
                ));
            }
        }

        $diffDay = $this->AppWeb->diffDateApprove($item->DatePublish);
        $StatusTimeDept = 1;
        if($diffDay>5) $StatusTimeDept = 2;

        $StatusTimeQA = 1;
        if($diffDay>7) $StatusTimeQA = 2;

        $NODTimeDept = 1;
        if($diffDay>12) $NODTimeDept = 2;

        $NODTimeQA = 1;
        if($diffDay>15) $NODTimeQA = 2;

        DB::begintransaction();
        try{
            DB::table('noe_verif_evaluation')
                ->where('IdNOEReport', $request->input('Id'))
                ->where('TypeData', 0)
                ->where('Actived',1)
                ->update($arr);

            DB::table('noe_report')
            ->where('Id', $request->input('Id'))
            ->update([
                'NOENumberAcc'=>null,
                'Status'=>10,
                'IsClosed'=>1,
                'StatusTimeDept'=>$StatusTimeDept,
                'StatusTimeQA'=>$StatusTimeQA
            ]);

            DB::table('nod_report')
            ->where('IdNOEReport', $request->input('Id'))
            ->update([
                'Status'=>9,
                'IsClosed'=>1,
                'StatusTimeDept'=>$NODTimeDept,
                'StatusTimeQA'=>$NODTimeQA
            ]);

            try{
                $IdDepartment = session('adminvue')->IdDepartment;
                if($IdDepartment!=0) {

                    $getPeloporPosition = [];
                    array_push($getPeloporPosition, $item->IdPosition);
                    array_push($getPeloporPosition, $item->IdPublish);
                    array_push($getPeloporPosition, $item->SectionPublish);
                    array_push($getPeloporPosition, $item->deptHeadPelopor);

                    $itemMail = $this->MainDB->table('employee as emp')
                            ->select('emp.Name as Employee','emp.Email')
                            ->leftjoin('position as pst','pst.Id','=','emp.IdPosition')
                            ->whereIn('pst.Id', $getPeloporPosition)
                            ->where('emp.IdDepartment', $IdDepartment)
                            ->where('emp.Actived', 1)
                            ->get();
                    
                    $this->Helper->sendEmail($item, $noeAnswer=null, $request, $itemMail, $Status = 10);
                }

                $this->History->store(25,14,json_encode($item));
                DB::commit();
            }catch (Exception $e){
                return json_encode(array(
                    'status'=>false,
                    'message'=>'Tolak Data Gagal, Pengiriman Email Invalid!',
                    'validation'=>$validation->errors(),
                ));
            }
        }catch (Exception $e){
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
