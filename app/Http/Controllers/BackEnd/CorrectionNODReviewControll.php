<?php

namespace App\Http\Controllers\BackEnd;

use Laravel\Passport\Passport;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use Validator;
use App\Http\Controllers\Utils\UploadFileControll;
use App\Http\Controllers\Utils\AppWebControll;

class CorrectionNODReviewControll extends Controller
{
    protected $UploadFile;
    protected $History;
    protected $MainDB;
    protected $AppWeb;

    public function __construct() {
        $this->UploadFile = new UploadFileControll();
        $this->History = new HistoryControll();
        $this->MainDB = DB::connection('mysql');
        $this->AppWeb = new AppWebControll();
    }

    public function index(Request $request) {
    	$sortRules = $request->input('sort');
        $limit = $request->input('per_page');
        $searchValue = $request->input('search');
        list($field, $dir) = explode('|', $sortRules);

        $query = DB::table('correction as crt')
            ->select(
                'crt.Id as id',
                'crt.Number',
                'crt.Description',
                'emp.Name as UserEntry',
                'crt.CreateAt'
            )
            ->leftjoin('users as usr','usr.Id','=','crt.UserEntry')
            ->leftjoin('employee as emp','emp.Id','=','usr.IdEmployee')
            ->orderBy($field, $dir)
            ->where(function ($query) {
                if(session('adminvue')->TypeUser!=8 && session('adminvue')->IdDepartment != 67 && session('adminvue')->TypeUser != 19) {
                    $query->where('emp.IdDepartment',session('adminvue')->IdDepartment);
                }
            })
            ->where('crt.TypeData',5)
            ->where('crt.Actived','>',0);

        if ($searchValue) {
            $query->where(function($query) use ($searchValue) {
                foreach ($searchValue as $key=>$val) {
                    $key = str_replace('__', '.', $key);
                    if($val!='' && $val!=null) {
                        if($key == 'crt.Year') $query->whereYear('crt.CreateAt', $val);
                        else $query->where($key, 'like', '%'.$val.'%');
                    }
                }
            });
        }

        $data = $query->paginate($limit);

        return $data;
    }

    public function detail($Id){
        $item = DB::table('correction')
            ->select('Attachment')
            ->where('Id',$Id)
            ->where('TypeData',5)
            ->where('Actived','>',0)
            ->first();

        $data = [];
        if(!empty($item)) {
            $Attachment = json_decode($item->Attachment);
            if($Attachment) {
                foreach ($Attachment as $key => $val) {
                    $arr = [];
                    $result = explode("/",$val);
                    array_push($arr, $result[4]);
                    array_push($arr, $val);
                    array_push($data, $arr);
                }
            }
        }

        return json_encode(array(
            'data'=>$data
        ));
    }

    public function create(Request $request) {
        $item = DB::table('nod_review as nod')
            ->select('nrt.NODNumber')
            ->leftjoin('nod_report as nrt','nrt.Id','=','nod.IdNODReport')
            ->where('nod.Id',$request->input('Id'))
            ->first();

        $result = '';
        if(!empty($item)) {
            $result = $item->NODNumber;
        }

        return json_encode(array(
            'status'=>true,
            'data'=>$result
        ));
    }

    public function store(Request $request) {
        $requestData = $request->all();
        $validation = Validator::make($request->all(),$this->validation(),
            $messages = ['required' => 'This field is required.']);

        if ($validation->fails()) {
            return json_encode(array(
                'status'=>false,
                'message'=>'Silahkan lengkapi kolom *Wajib Diisi',
                'validation'=>$validation->errors(),
            ));
        }

        $Attachment = [];
        if($request->has('Attachment') && $request->file('Attachment')!=null) {
            $arrFile = $request->file('Attachment');
            foreach($arrFile as $key=>$val) {
                if(pathinfo($val->getClientOriginalName(), PATHINFO_EXTENSION)) {
                    $Attachment[$key] = $this->UploadFile->uploadFile($val,12); //12 path correction-nod-review
                }
            }
        }

        if(count($Attachment) > 0) {
            $Attachment = json_encode($Attachment);
        } else {
            $Attachment = '';
        }

        $itemCaretaker = $this->AppWeb->checkCaretaker(session('adminvue')->IdDepartment,session('adminvue')->IdEmployee,session('adminvue')->Id);
        if($itemCaretaker) {
            $arr = [
                'TypeData'=>5,
                'Number'=>$request->input('Number'),
                'Description'=>$request->input('Description'),
                'Attachment'=>$Attachment,
                'IsMandatory'=>1,
                'DescriptionMandatory'=>$request->input('DescriptionCaretaker'),
                'UserEntry'=>session('adminvue')->Id,
            ];
        } else {
            $arr = [
                'TypeData'=>5,
                'Number'=>$request->input('Number'),
                'Description'=>$request->input('Description'),
                'Attachment'=>$Attachment,
                'UserEntry'=>session('adminvue')->Id,
            ];
        }

        $item = DB::table('nod_report as nod')
        ->select('nod.*')
        ->leftjoin('nod_review as nor','nor.IdNODReport','=','nod.Id')
        ->where('nor.Id', $request->input('Id'))
        ->where('nor.Actived', 1)
        ->first();

        DB::begintransaction();
        try{
            DB::table('correction')
                ->insert($arr);

            DB::table('nod_review')
                ->where('Id', $request->input('Id'))
                ->update([
                    'Status'=>1
                ]);

            try{
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

                    $data['Subject'] = 'NOD Review - Correction';
                    $data['Title'] = 'Data NOD telah dikoreksi, Oleh :';

                    $dataMail['Korektor'] = session('adminvue')->Name .' | '. session('adminvue')->Position .' - '. session('adminvue')->Department;
                    $dataMail['NOD Number'] = $item->NODNumber;
                    $dataMail['Proper Condition'] = $item->ProperCondition;
                    $dataMail['Man'] = $item->Man;
                    $dataMail['Machine'] = $item->Machine;
                    $dataMail['Method'] = $item->Method;
                    $dataMail['Material'] = $item->Material;
                    $dataMail['Milieu'] = $item->Milieu;
                    $dataMail['Correction'] = $request->input('Description');

                    if(count($itemMail)>0) { foreach ($itemMail as $key => $val) {
                        $data['Employee'] = $val->Employee;
                        $data['Email'] = $val->Email;

                        $this->History->sendMail($data, $dataMail);
                    } }
                }
                $this->History->store(34,15,json_encode($item));
                DB::commit();
            }catch (Exception $e){
                return json_encode(array(
                    'status'=>false,
                    'message'=>'Koreksi Data Gagal, Pengiriman Email Invalid!',
                    'validation'=>$validation->errors(),
                ));
            }
        }catch (Exception $e){
            DB::rollback();
            return json_encode(array(
                'status'=>false,
                'message'=>'Koreksi Data Gagal, Server Invalid!',
                'validation'=>$validation->errors(),
            ));
        }

        return json_encode(array(
            'status'=>true,
            'message'=>'Koreksi Data Sukses!',
        ));
    }

    function validation(){
        return [
            'Description'=>'required'
        ];
    }
}
