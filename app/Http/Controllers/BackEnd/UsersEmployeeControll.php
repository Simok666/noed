<?php

namespace App\Http\Controllers\BackEnd;

use Laravel\Passport\Passport;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use Validator;
use Carbon\Carbon;
use App\Http\Controllers\Utils\UploadFileControll;
use App\Http\Controllers\Utils\AppWebControll;
use Ramsey\Uuid\Uuid;
use Crypt;

class UsersEmployeeControll extends Controller
{
    protected $UploadFile;
    protected $AppWeb;
    protected $History;
//    protected $MainDB;

    public function __construct() {
    	$this->UploadFile = new UploadFileControll();
        $this->AppWeb = new AppWebControll();
        $this->History = new HistoryControll();
//        $this->MainDB = DB::connection('mysql');
    }

    public function index(Request $request) {
    	$sortRules = $request->input('sort');
        $limit = $request->input('per_page');
        $searchValue = json_decode($request->input('search'));
        $checklistValue = json_decode($request->input('checklist'));
        // print_r($searchValue->name);exit();
        list($field, $dir) = explode('|', $sortRules);

        $query = DB::table('employee as emp')
            ->select(
                'emp.Id as id',
                'dpt.Department as Departement',
                'emp.Name',
                'emp.CellPhone',
                'usr.UserName as Username',
                'tyu.Name as TypeUser',
                'emp.UpdateAt'
            )
            ->leftjoin('users as usr','usr.IdEmployee','=','emp.Id')
            ->leftjoin('users_detail as usrd','usrd.IdUsers','=','usr.Id')
            ->leftJoin('type_user as tyu','tyu.Id','=','usrd.TypeUser')
            ->leftjoin('department as dpt','dpt.Id','=','emp.IdDepartment')
            ->orderBy($field, $dir)
            ->where(function ($q){
                if(session('adminvue')->TypeUser!=1){ // TypeUser Id = 1: IT Developer
                  $q->where('tyu.Id','<>',1);
                }
            })
            ->where('usrd.Apps','NOE-NOD')
            ->where('dpt.Actived',1)
            ->where('emp.Actived','>',0);
        
        //fungsi update user not actived
        if(getType($checklistValue->value) == "integer" && $checklistValue->value == 1) 
        {   
            $updateCheklistSetNotActive = DB::table('employee as emp')
                    ->leftjoin('users as usr','usr.IdEmployee','=','emp.Id')
                    ->leftJoin('department as dpt','dpt.Id','=','emp.IdDepartment')
                    ->where('dpt.Id','<>',67)
                    ->update([
                        'usr.Actived'=> 0
                    ]);
        }
        elseif (getType($checklistValue->value) == "integer" && $checklistValue->value == 0)
        {
            $updateCheklistSetActive = DB::table('employee as emp')
                    ->leftjoin('users as usr','usr.IdEmployee','=','emp.Id')
                    ->leftJoin('department as dpt','dpt.Id','=','emp.IdDepartment')
                    ->where('dpt.Id','<>',67)
                    ->update([
                        'usr.Actived'=> 1
                    ]);
        }
        
        if ($searchValue) {
            $query->where(function($query) use ($searchValue) {
                foreach ($searchValue as $key=>$val) {
                    if ($key == "emp__Month" || $key == "emp__Year")
                    {
                        if($val!='' && $val!=null)
                        {
                            if($key == "emp__Year")
                            {   
                                $yearConvertDigits = Carbon::createFromFormat('y', $val);
                                $searchData = $yearConvertDigits->format('Y');
                                if($searchData!='' && $searchData!=null) $query->where('emp.UpdateAt', 'like', '%'.$searchData.'%');            
                            }
                            else
                            {
                                if($val <= 12)
                                {
                                    $month = Carbon::createFromFormat('m', $val);
                                    if($val!='' && $val!=null) $query->whereMonth('emp.UpdateAt', '=', $month->format('m'));            
                                }
                                else
                                {
                                    if($val!='' && $val!=null) $query->whereMonth('emp.UpdateAt', '=', '');
                                }            
                            }   
                        }
                                   
                    }
                    else
                    {
                        if($key == "emp__UpdateAt")
                        {
                            if($val!='' && $val!=null)
                            {
                                $date = str_replace('.', '-', $val);
                                $yearConvertDigits = Carbon::createFromFormat('d-m-y', $date);
                                $yearFormats = $yearConvertDigits->format('d-m-Y');
                    
                                $val = date('Y-m-d', strtotime($yearFormats));  

                                if($val!='' && $val!=null) $query->where('emp.UpdateAt', 'like', '%'.$val.'%');
                            }
                        }
                        else
                        {
                            $key = str_replace('__', '.', $key);
                            if($val!='' && $val!=null) $query->where($key, 'like', '%'.$val.'%');
                        }
                    }
                }
            });
        }

        $data = $query->paginate($limit);

        return $data;
    }

    public function getChecklistCount(){
        //get Count Uncheck user actived
        $query = DB::table('employee as emp')
            ->select(
                'emp.Id as id',
                'dpt.Department as Departement',
                'emp.Name',
                'emp.CellPhone',
                'usr.UserName as Username',
                'tyu.Name as TypeUser',
                'emp.UpdateAt'
            )
            ->leftjoin('users as usr','usr.IdEmployee','=','emp.Id')
            ->leftjoin('users_detail as usrd','usrd.IdUsers','=','usr.Id')
            ->leftJoin('type_user as tyu','tyu.Id','=','usrd.TypeUser')
            ->leftjoin('department as dpt','dpt.Id','=','emp.IdDepartment')
            ->where(function ($q){
                if(session('adminvue')->TypeUser!=1){ // TypeUser Id = 1: IT Developer
                  $q->where('dpt.Id','<>',67);
                }
            })
            ->where('usrd.Apps','NOE-NOD')
            ->where('dpt.Actived',1)
            // ->where('emp.Actived','>',0)
            ->where('usr.Actived',0)
            ->count();
            
            return json_encode(array(
                'status'=>true,
                'data'=>$query,
            ));
    }   

    public function show(Request $request) {
        $item = DB::table('employee as emp')
            ->select(
                'emp.*',
                'dpt.Department as Departement',
                'pst.Name as Position',
                'tyu.Name as TypeUser',
                'usr.UserName',
                'usr.Password'
            )
            ->leftjoin('users as usr','usr.IdEmployee','=','emp.Id')
            ->leftjoin('users_detail as usrd','usrd.IdUsers','=','usr.Id')
            ->leftJoin('type_user as tyu','tyu.Id','=','usrd.TypeUser')
            ->leftjoin('department as dpt','dpt.Id','=','emp.IdDepartment')
            ->leftjoin('position as pst','pst.Id','=','emp.IdPosition')
            ->where('emp.Actived',1)
            ->where('pst.Actived',1)
            ->where('dpt.Actived',1)
            ->where('emp.Id',$request->input('Id'))
            ->first();

        if(!empty($item)){
            $item->Password = Crypt::decrypt($item->Password);
        }

        return json_encode(array(
            'status'=>true,
            'data'=>$item,
        ));
    }

    public function getDepartment(Request $request) {
        $item = DB::table('department')
            ->select('Id','Department')
            ->where('Actived',1)
            ->get();

        return json_encode(array(
            'status'=>true,
            'data'=>$item,
        ));
    }

    public function getPosition(Request $request) {
        $item = DB::table('position')
            ->select('Id','Name as Position')
            ->where('Actived',1)
            ->where('IdDepartment',$request->IdDepartment)
            ->get();

        return json_encode(array(
            'status'=>true,
            'data'=>$item,
        ));
    }

    public function getTypeUser(Request $request) {
        $item = DB::table('type_user')
            ->select('Id','Name as TypeUser')
            ->where('Id','<>',1)
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

        if ($validation->fails()) {
            return json_encode(array(
                'status'=>false,
                'message'=>'Silahkan lengkapi kolom *Wajib Diisi',
                'validation'=>$validation->errors(),
            ));
        }

        $isExist = $this->AppWeb->checkDataOneColMainDB('employee','Name',$request->input('Name'));
        if($isExist>0) {
            return json_encode(array(
                'status'=>false,
                'message'=>'Data Nama Karyawan Sudah Ada!',
                'validation'=>$validation->errors(),
            ));
        }

        $isExist = $this->AppWeb->checkDataOneColMainDB('employee','NIP',$request->input('NIP'));
        if($isExist>0) {
            return json_encode(array(
                'status'=>false,
                'message'=>'Data NIP Sudah Ada!',
                'validation'=>$validation->errors(),
            ));
        }

        $isExist = $this->AppWeb->checkDataOneColMainDB('users','UserName',$request->input('UserName'));
        if($isExist>0) {
            return json_encode(array(
                'status'=>false,
                'message'=>'Data User Name Sudah Ada!',
                'validation'=>$validation->errors(),
            ));
        }

        DB::begintransaction();
        try{
            $IdEmp = DB::table('employee')
                ->insertGetId([
                    'IdDepartment'=>$request->input('IdDepartment'),
                    'IdPosition'=>$request->input('IdPosition'),
                    'Name'=>$request->input('Name'),
                    'NIP'=>$request->input('NIP'),
                    'CellPhone'=>$request->input('CellPhone'),
                    'Email'=>$request->input('Email'),
                    'UserEntry'=>session('adminvue')->Id
                ]);

            $IdUser = DB::table('users')
                ->insertGetId([
                    'Code'=>Uuid::uuid1()->toString(),
                    'IdEmployee'=>$IdEmp,
                    'UserName'=>$request->input('UserName'),
                    'Password'=>Crypt::encrypt($request->input('Password')),
                    'api_token'=>Crypt::encrypt($request->input('Password')),
                    'UserEntry'=>session('adminvue')->Id
                ]);

            DB::table('users_detail')
                ->insert([
                    'IdUsers'=>$IdUser,
                    'Apps'=>'NOE-NOD',
                    'TypeUser'=>$request->input('TypeUser'),
                    'UserEntry'=>session('adminvue')->Id
                ]);

            $this->History->store(13,1,json_encode($requestData));
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

    public function edit(Request $request)
    {
        $item =DB::table('employee as emp')
            ->select(
                'emp.*','usrd.TypeUser as Type',
                'usr.UserName','dpt.Department as Department',
                'tyu.Name as TypeUser','pst.Name as Position'
            )
            ->join('users as usr', 'usr.IdEmployee', '=', 'emp.Id')
            ->join('department as dpt','dpt.Id','=','emp.IdDepartment')
            ->join('position as pst','pst.Id','=','emp.IdPosition')
            ->leftjoin('users_detail as usrd','usrd.IdUsers','=','usr.Id')
            ->leftJoin('type_user as tyu','tyu.Id','=','usrd.TypeUser')
            ->where('emp.Actived',1)
            ->where('pst.Actived',1)
            ->where('dpt.Actived',1)
            ->where('emp.Id',$request->input('Id'))
            ->first();

        if(!empty($item)){
            foreach ($item as $key => $value) { if($value==null) $item->$key = ''; }
            $item->IdDepartment = ['Id'=>$item->IdDepartment, 'Department'=>$item->Department];
            $item->IdPosition = ['Id'=>$item->IdPosition, 'Position'=>$item->Position];
            $item->TypeUser = ['Id'=>$item->Type, 'TypeUser'=>$item->TypeUser];
        }

        return json_encode(array(
            'status'=>true,
            'data'=>$item,
        ));

    }

    public function update(Request $request) {
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

        $itemUser = DB::table('users')
            ->select('Id')
            ->where('Actived',1)
            ->where('IdEmployee', $request->input('Id'))
            ->first();

        $item = DB::table('employee as emp')
            ->select(
                'emp.Name',
                'emp.NIP',
                'usr.UserName'
            )
            ->join('users as usr', 'usr.IdEmployee', '=', 'emp.Id')
            ->where('emp.Actived',1)
            ->where('emp.Id',$request->input('Id'))
            ->first();

        if($item->Name!=$request->input('Name')) {
            $isExist = $this->AppWeb->checkDataOneColMainDB('employee','Name',$request->input('Name'));
            if($isExist>0) {
                return json_encode(array(
                    'status'=>false,
                    'message'=>'Data Nama Karyawan Sudah Ada!',
                    'validation'=>$validation->errors(),
                ));
            }
        }

        if($item->NIP!=$request->input('NIP')) {
            $isExist = $this->AppWeb->checkDataOneColMainDB('employee','NIP',$request->input('NIP'));
            if($isExist>0) {
                return json_encode(array(
                    'status'=>false,
                    'message'=>'Data NIP Sudah Ada!',
                    'validation'=>$validation->errors(),
                ));
            }
        }

        if($item->UserName!=$request->input('UserName')) {
            $isExist = $this->AppWeb->checkDataOneColMainDB('users','UserName',$request->input('UserName'));
            if($isExist>0) {
                return json_encode(array(
                    'status'=>false,
                    'message'=>'Data User Name Sudah Ada!',
                    'validation'=>$validation->errors(),
                ));
            }
        }

        DB::begintransaction();
        try{
            DB::table('employee')
                ->where('Id', $request->input('Id'))
                ->update([
                    'IdDepartment'=>$request->input('IdDepartment'),
                    'IdPosition'=>$request->input('IdPosition'),
                    'Name'=>$request->input('Name'),
                    'NIP'=>$request->input('NIP'),
                    'Email'=>$request->input('Email'),
                    'CellPhone'=>$request->input('CellPhone')
                ]);

            if($request->input('Password') == null) {
                DB::table('users')
                ->where('IdEmployee', $request->input('Id'))
                ->update([
                    'Code'=>Uuid::uuid1()->toString(),
                    'UserName'=>$request->input('UserName')
                ]);
            } else {
                DB::table('users')
                ->where('IdEmployee', $request->input('Id'))
                ->update([
                    'Code'=>Uuid::uuid1()->toString(),
                    'UserName'=>$request->input('UserName'),
                    'Password'=>Crypt::encrypt($request->input('Password')),
                    'api_token'=>Crypt::encrypt($request->input('Password')),
                ]);
            }

            DB::table('users_detail')
                ->where('IdUsers', $itemUser->Id)
                ->where('Apps', 'NOE-NOD')
                ->update([
                    'TypeUser'=>$request->input('TypeUser')
                ]);

            $this->History->store(13,2,json_encode($requestData));
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
        $item =DB::table('employee')
            ->select('*')
            ->where('Id', $request->input('Id'))
            ->first();

        DB::begintransaction();
        try{
            DB::table('employee')
                ->where('Id', $request->input('Id'))
                ->update([
                    'Actived'=>0
                ]);

            DB::table('users')
                ->where('IdEmployee', $request->input('Id'))
                ->update([
                    'Actived'=>0
                ]);

            $this->History->store(13,3,json_encode($item));
            DB::commit();
        }catch (\Throwable $e){
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

    function validation() {
        return [
            'IdDepartment'=>'required',
            'IdPosition'=>'required',
            'Name'=>'required',
            'Email'=>'required',
            'UserName'=>'required',
            'TypeUser'=>'required',
        ];
    }
}
