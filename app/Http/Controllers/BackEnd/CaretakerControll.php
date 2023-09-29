<?php

namespace App\Http\Controllers\BackEnd;

use Laravel\Passport\Passport;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use App\Helper;
use Validator;
use App\Http\Controllers\Utils\AppWebControll;
use Illuminate\Console\Scheduling\Schedule;
use Carbon\Carbon;

class CaretakerControll extends Controller
{
    protected $AppWeb;
    protected $History;
    protected $MainDB;

    public function __construct() {
        $this->AppWeb = new AppWebControll();
        $this->History = new HistoryControll();
        $this->Helper = new Helper();
        $this->MainDB = DB::connection('mysql');
    }

    public function index(Request $request) {
    	$sortRules = $request->input('sort');
        $limit = $request->input('per_page');
        $searchValue = json_decode($request->input('search'));
        // print_r($searchValue->name);exit();
        list($field, $dir) = explode('|', $sortRules);
       
        $query = DB::table('caretaker as ctk')
            ->select(
                'ctk.Id as id',
                'dpt.Department',
                'emp.Name',
                'ctk.DateStart',
                'ctk.DateEnd',
                'ctk.Status',
                'ctk.UserEntry',
                'empE.Name as EmpEntry')
            ->leftjoin('department as dpt','dpt.Id','=','ctk.IdDepartment')
            ->leftjoin('employee as emp','emp.Id','=','ctk.IdEmployee')
            ->leftjoin('users as usr','usr.Id','=','ctk.UserEntry')
            ->leftjoin('employee as empE','empE.Id','=','usr.IdEmployee')
            ->orderBy($field, $dir)
            ->where(function($query) {
                if(session('adminvue')->TypeUser != 8 && session('adminvue')->TypeUser!=19)
                    $query->where('ctk.IdDepartment',session('adminvue')->IdDepartment);
            })
            ->where('dpt.Actived',1)
            ->where('ctk.Actived',1);

        if ($searchValue) {
            $query->where(function($query) use ($searchValue) {
                foreach ($searchValue as $key=>$val) {
                    if($key == "ctk__DateStart" && !empty($val))
                    {
                        $date = str_replace('.', '-', $val);
                        $yearConvertDigits = Carbon::createFromFormat('d-m-y', $date);
                        $yearFormats = $yearConvertDigits->format('d-m-Y');
                    
                        $val = date('Y-m-d', strtotime($yearFormats));  
                        if($val!='' && $val!=null) $query->where('ctk.DateStart', 'like', '%'.$val.'%');
                    }
                    elseif($key == "ctk__DateEnd" && !empty($val))
                    {
                        $date = str_replace('.', '-', $val);
                        $yearConvertDigits = Carbon::createFromFormat('d-m-y', $date);
                        $yearFormats = $yearConvertDigits->format('d-m-Y');
                    
                        $val = date('Y-m-d', strtotime($yearFormats));  
                        if($val!='' && $val!=null) $query->where('ctk.DateEnd', 'like', '%'.$val.'%');
                    }
                    elseif ($key == "ctk__Month" || $key == "ctk__Year")
                    {
                        if($val!='' && $val!=null)
                        {
                            if($key == "ctk__Year")
                            {   
                                $yearConvertDigits = Carbon::createFromFormat('y', $val);
                                $searchData = $yearConvertDigits->format('Y');
                                if($searchData!='' && $searchData!=null) $query->where('ctk.DateStart', 'like', '%'.$searchData.'%')->where('ctk.DateEnd', 'like', '%'.$searchData.'%');            
                            }
                            else
                            {
                                if($val <= 12)
                                {
                                    $month = Carbon::createFromFormat('m', $val);
                                    if($val!='' && $val!=null) $query->whereMonth('ctk.DateStart', '=', $month->format('m'))->whereMonth('ctk.DateEnd', '=', $month->format('m'));           
                                }
                                 else
                                {
                                    if($val!='' && $val!=null) $query->whereMonth('ctk.DateStart', '=', '')->whereMonth('ctk.DateEnd', '=', '');
                                }            
                            }
                        }
                             
                    }
                    else
                    {
                        if($key == "ctk__Status")
                        {
                           if($val!='') $query->where('ctk.Status', 'like', '%'.$val.'%');
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
        // dd($data);
        return $data;
    }

    public function getListTable(Request $request)
    {        
        $query = DB::table('caretaker as ctk')
            ->select(
                'ctk.Id as id',
                'dpt.Department',
                'emp.Name',
                'ctk.DateStart',
                'ctk.DateEnd',
                'ctk.Status',
                'ctk.UserEntry',
                'empE.Name as EmpEntry')
            ->leftjoin('department as dpt','dpt.Id','=','ctk.IdDepartment')
            ->leftjoin('employee as emp','emp.Id','=','ctk.IdEmployee')
            ->leftjoin('users as usr','usr.Id','=','ctk.UserEntry')
            ->leftjoin('employee as empE','empE.Id','=','usr.IdEmployee')
            ->orderBy('dpt.Department', 'asc')
            ->where(function($query) {
                if(session('adminvue')->TypeUser != 8 && session('adminvue')->TypeUser!=19)
                    $query->where('ctk.IdDepartment',session('adminvue')->IdDepartment);
            })
            ->where('dpt.Actived',1)
            ->where('ctk.Actived',1)
            ->get();
            
            return response()->json([
                'status' => true,
                'data' => $query
            ]);
    }

    public function updateByCron()
    {
        $query = DB::table('caretaker as ctk')
            ->select(
                'ctk.Id as id',
                'dpt.Department',
                'emp.Name',
                'ctk.DateStart',
                'ctk.DateEnd',
                'ctk.Status',
                'ctk.UserEntry',
                'empE.Name as EmpEntry')
            ->leftjoin('department as dpt','dpt.Id','=','ctk.IdDepartment')
            ->leftjoin('employee as emp','emp.Id','=','ctk.IdEmployee')
            ->leftjoin('users as usr','usr.Id','=','ctk.UserEntry')
            ->leftjoin('employee as empE','empE.Id','=','usr.IdEmployee')
            ->orderBy('dpt.Department', 'asc')
            ->where('dpt.Actived',1)
            ->where('ctk.Actived',1)
            ->get();
            
            return $query;
    }

    public function getEmp(Request $request)
    {
        $item = $this->MainDB->table('employee as emp')
            ->select('emp.Id','usr.Id as IdUser','emp.Name as Employee', 'emp.Email as Email','pst.Name as Position')
            ->leftjoin('position as pst','pst.Id','=','emp.IdPosition')
            ->leftjoin('users as usr','usr.IdEmployee','=','emp.Id')
            ->leftjoin('users_detail as usrd','usrd.IdUsers','=','usr.Id')
            ->where('emp.IdDepartment',session('adminvue')->IdDepartment)
            ->where('emp.Id','<>',session('adminvue')->IdEmployee)
            ->where('emp.Id','<>',1)
            ->where('usrd.TypeUser','!=',9)
            ->where('pst.Actived',1)
            ->where('emp.Actived',1)
            ->get();
        
        return json_encode(array(
            'status'=>true,
            'data'=>$item,
        ));
    }

    public function getDept(Request $request)
    {
        $item = $this->MainDB->table('department as dpt')
            ->select('Department')
            ->where('dpt.Id',session('adminvue')->IdDepartment)
            ->where('dpt.Actived',1)
            ->get();

        return response()->json([
            'status' => true,
            'data' => $item
        ]);
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
        
        $isExist = $this->AppWeb->checkDataManyCol('caretaker',[
            'IdEmployee'=>$request->input('IdEmployee'),
            'Status'=>1
        ]);
        if($isExist>0) {
            return json_encode(array(
                'status'=>false,
                'message'=>'Data Caretaker Sudah Ada atau Masih Aktif!',
                'validation'=>$validation->errors(),
            ));
        }

        DB::begintransaction();
        try{
            $today = date('Y-m-d');
            $status = 0;

            if ($request->input('DateStart') ==  $today)
            {
                $status = 1;
            }
            
            DB::table('caretaker')
                ->insert([
                    'IdDepartment'=>session('adminvue')->IdDepartment,
                    'IdEmployee'=>$request->input('IdEmployee'),
                    'IdUser'=>$request->input('IdUser'),
                    'DateStart'=>$request->input('DateStart'),
                    'DateEnd'=>$request->input('DateEnd'),
                    'TO'=>$request->input('TO'),
                    'CC'=>$request->input('Email'),
                    'Subject'=>$request->input('Subject'),
                    'Content'=>$request->input('Content'),
                    'Status'=>$status,
                    'UserEntry'=>session('adminvue')->Id,
                ]);

            try{
                $itemMail = $this->MainDB->table('employee as emp')
                    ->select('emp.Name as Employee','emp.Email')
                    ->where('emp.Id', $request->input('IdEmployee'))
                    ->where('emp.Actived', 1)
                    ->first();

                $getEmailCC = json_decode($request->input('Email'));
                $getSelectedEmailCC = [];
                
                foreach ($getEmailCC as $key => $value) 
                {
                    $getSelectedEmailCC[$key] = $value->Id;
                }
                
                $getitemMailCC = $this->MainDB->table('employee as emp')
                    ->select('emp.Name as Employee','emp.Email')
                    ->whereIn('emp.Id', $getSelectedEmailCC)
                    ->where('emp.Actived', 1)
                    ->get();
                
                if($itemMail!=null) {

                    $this->Helper->sendEmailCareTaker($request, $itemMail, $getitemMailCC, $event = 'insert');

                }

                $this->History->store(35,1,json_encode($requestData));
                DB::commit();
            }catch (Exception $e){
                return json_encode(array(
                    'status'=>false,
                    'message'=>'Simpan Data Gagal, Pengiriman Email Invalid!',
                    'validation'=>$validation->errors(),
                ));
            }

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
        $item = DB::table('caretaker as ctk')
            ->select('ctk.Id','ctk.IdEmployee','usr.Id as IdUser','emp.Name as Employee','pst.Name as Position','ctk.DateStart','ctk.DateEnd','ctk.TO','ctk.CC as Email','ctk.Subject','ctk.Content')
            ->leftjoin('employee as emp','emp.Id','=','ctk.IdEmployee')
            ->leftjoin('position as pst','pst.Id','=','emp.IdPosition')
            ->leftjoin('users as usr','usr.IdEmployee','=','emp.Id')
            ->where('pst.Actived',1)
            ->where('ctk.Actived',1)
            ->where('ctk.Id',$request->input('Id'))
            ->first();

        if(!empty($item)){
            
            $item->IdEmployee = [
                'Id'        =>$item->IdEmployee, 
                'IdUser'    =>$item->IdUser, 
                'Employee'  =>$item->Employee,
                'Position'  =>$item->Position,
                'TO'        =>$item->TO,
                'CC'        =>json_decode($item->Email, true),
                'Subject'   =>$item->Subject,
                'Content'   =>$item->Content
            ];
        }
        $item->Email = json_decode($item->Email);
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

        $item = DB::table('caretaker')
            ->select('IdEmployee')
            ->where('Actived',1)
            ->where('Id',$request->input('Id'))
            ->first();

        if($item->IdEmployee!=$request->input('IdEmployee')) {
            $isExist = $this->AppWeb->checkDataManyCol('caretaker',[
                'IdEmployee'=>$request->input('IdEmployee'),
                'Status'=>1
            ]);
            if($isExist>0) {
                return json_encode(array(
                    'status'=>false,
                    'message'=>'Data Caretaker Sudah Ada atau Masih Aktif!',
                    'validation'=>$validation->errors(),
                ));
            }
        }

        DB::begintransaction();
        try{
            $today = date('Y-m-d');
            $status = 0;

            if ($request->input('DateStart') ==  $today)
            {
                $status = 1;
            }

            DB::table('caretaker')
            ->where('Id',$request->input('Id'))
            ->update([
                'IdDepartment'=>session('adminvue')->IdDepartment,
                'IdEmployee'=>$request->input('IdEmployee'),
                'IdUser'=>$request->input('IdUser'),
                'DateStart'=>$request->input('DateStart'),
                'DateEnd'=>$request->input('DateEnd'),
                'TO'=>$request->input('TO'),
                'CC'=>$request->input('Email'),
                'Subject'=>$request->input('Subject'),
                'Content'=>$request->input('Content'),
                'Status'=>$status,
            ]);

            try{
                $itemMail = $this->MainDB->table('employee as emp')
                    ->select('emp.Name as Employee','emp.Email')
                    ->where('emp.Id', $request->input('IdEmployee'))
                    ->where('emp.Actived', 1)
                    ->first();

                $getEmailCC = json_decode($request->input('Email'));
                $getSelectedEmailCC = [];
                    
                foreach ($getEmailCC as $key => $value) 
                {
                        $getSelectedEmailCC[$key] = $value->Id;
                }
                    
                $getitemMailCC = $this->MainDB->table('employee as emp')
                    ->select('emp.Name as Employee','emp.Email')
                    ->whereIn('emp.Id', $getSelectedEmailCC)
                    ->where('emp.Actived', 1)
                    ->get();
     

                if($itemMail!=null) {
    
                    $this->Helper->sendEmailCareTaker($request, $itemMail, $getitemMailCC, $event = 'update');
                }

                $this->History->store(35,2,json_encode($requestData));
                DB::commit();
            }catch (Exception $e){
                return json_encode(array(
                    'status'=>false,
                    'message'=>'Simpan Data Gagal, Pengiriman Email Invalid!',
                    'validation'=>$validation->errors(),
                ));
            }
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

        $item = DB::table('caretaker')
            ->select('*')
            ->where('Id', $request->input('Id'))
            ->first();

        DB::begintransaction();
        try{
            DB::table('caretaker')
                ->where('Id', $request->input('Id'))
                ->update([
                    'Actived'=>0
                ]);

            $this->History->store(35,3,json_encode($item));
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

    public function setNotActive(Request $request) {

        $item = DB::table('caretaker')
            ->select('*')
            ->where('Id', $request->input('Id'))
            ->first();

        DB::begintransaction();
        try{
            DB::table('caretaker')
                ->where('Id', $request->input('Id'))
                ->update([
                    'Status'=>0
                ]);

            $this->History->store(35,9,json_encode($item));
            DB::commit();
        }catch (Exception $e){
            DB::rollback();
            return json_encode(array(
                'status'=>false,
                'message'=>'Invalid Server Side, Set Data Not Active Failed!',
            ));
        }

        return json_encode(array(
            'status'=>true,
            'message'=>'Set Data Not Active Success!',
        ));
    }

    function validation(){
        return [
            'IdEmployee'=>'required',
            'DateStart'=>'required',
            'DateEnd'=>'required',
            'TO'=>'required',
            'Email'=>'required',
            'Subject'=>'required',
            'Content'=>'required'
        ];

    }


}
