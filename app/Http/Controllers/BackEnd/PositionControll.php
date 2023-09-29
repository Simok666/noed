<?php

namespace App\Http\Controllers\BackEnd;

use Laravel\Passport\Passport;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use Validator;
use Carbon\Carbon;
use Ramsey\Uuid\Uuid;
use App\Http\Controllers\Utils\AppWebControll;

class PositionControll extends Controller
{
    protected $History;
    protected $AppWeb;
    protected $DBMain;

    public function __construct() {
        $this->History = new HistoryControll();
        $this->AppWeb = new AppWebControll();
        $this->DBMain = DB::connection('mysql');
    }

    public function index(Request $request) {
    	$sortRules = $request->input('sort');
        $limit = $request->input('per_page');
        $searchValue = json_decode($request->input('search'));
        list($field, $dir) = explode('|', $sortRules);

        $query = $this->DBMain->table('position as pst')
            ->select(
                'pst.Id as id',
                // 'psp.Name as ParentName',
                'pst.Parent as ParentName',
                'dpt.Department as Department',
                'dvs.Department as Division',
                'pst.Code',
                'pst.Name',
                'pst.Email',
                'pst.Status',
                'pst.CreateAt',
                'pst.UpdateAt'
            )
            ->leftjoin('department as dvs','dvs.Id','=','pst.IdDivision')
            ->leftjoin('department as dpt','dpt.Id','=','pst.IdDepartment')
            ->leftjoin('position as psp','psp.Id','=','pst.Parent')
            ->orderBy($field, $dir)
            ->whereOr('pst.Parent','like','%{"Id":pst.id%')
            ->where('dpt.Actived',1)
            ->where('pst.Actived',1);

        if ($searchValue) {
            $query->where(function($query) use ($searchValue) {
                foreach ($searchValue as $key=>$val) {
                    $key = str_replace('__', '.', $key);
                    if($val!='' && $val!=null) $query->where($key, 'like', '%'.$val.'%');
                }
            });
        }

        $data = $query->paginate($limit);
        
        return $data;
    }

    public function show(Request $request){

    }

    public function getDivision(){
        $item = $this->DBMain->table('department')
            ->select('Id','Department')
            ->where('Parent',0)
            ->where('Actived','>',0)
            ->get();

        return json_encode(array(
            'status'=>true,
            'data'=>$item
        ));
    }

    public function getDepartment(Request $request){
        $item = $this->DBMain->table('department')
            ->select('Id','Department')
            ->where('Parent',$request->input('IdDivision'))
            ->where('Actived','>',0)
            ->get();

        return json_encode(array(
            'status'=>true,
            'data'=>$item
        ));
    }

    public function getParent(Request $request){
        $Id = $request->input('IdDepartment');
        $IdPosition = $request->input('IdPosition');

        $parent = $this->DBMain->table('position')
            ->select('Id','Name')
            ->where('IdDepartment',$Id)
            ->where('Actived',1)
            ->where(function($q) use($IdPosition){
                if($IdPosition > 0){
                    $q->where('Id','<>',$IdPosition);
                }
            })
            ->get();

        return json_encode(array(
            'status'=>true,
            'parent'=>$parent
        ));
    }

    public function store(Request $request){
        $requestData = $request->all();
    	$validation = Validator::make($request->all(),$this->validation(),
            $messages = ['required' => 'This field is required.']);
        
        if ($validation->fails() || $request->input('IdDepartment') == null) {
            return json_encode(array(
                'status'=>false,
                'message'=>'Silahkan lengkapi kolom *Wajib Diisi',
                'validation'=>$validation->errors(),
            ));
        }

        $isExist = $this->AppWeb->checkDataOneColMainDB('position','Code',$request->input('Code'));
        if($isExist>0) {
            return json_encode(array(
                'status'=>false,
                'message'=>'Data Code Sudah Ada!',
                'validation'=>$validation->errors(),
            ));
        }

        $isExist = $this->AppWeb->checkDataManyColMainDB('position', [
            'IdDepartment'=>$request->input('IdDepartment'),
            'Name'=>$request->input('Name')
        ]);
        if($isExist>0) {
            return json_encode(array(
                'status'=>false,
                'message'=>'Data Position Sudah Ada!',
                'validation'=>$validation->errors(),
            ));
        }

        DB::begintransaction();
        try{
            $this->DBMain->table('position')
                ->insert([
                    'Parent'=>$request->input('Parent'),
                    'IdDepartment'=>$request->input('IdDepartment'),
                    'IdDivision'=>$request->input('IdDivision'),
                    'Code'=>$request->input('Code'),
                    'Name'=>$request->input('Name'),
                    'Status'=>$request->input('Status'),
                    // 'Email'=>$request->input('Email'),
                    'UserEntry'=>session('adminvue')->Id
                ]);

            $this->History->store(12,1,json_encode($requestData));
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

    public function edit(Request $request){
        $item = $this->DBMain->table('position as pst')
            ->select('pst.Id','pst.IdDepartment','dpt.Department','pst.Email','psp.Name as ParentName','pst.Parent','pst.Code','pst.Name','pst.Status','dvs.Department as Division','pst.IdDivision')
            ->leftjoin('department as dvs','dvs.Id','=','pst.IdDivision')
            ->leftjoin('department as dpt','dpt.Id','=','pst.IdDepartment')
            ->leftjoin('position as psp','psp.Id','=','pst.Parent')
            ->where('pst.Actived',1)
            ->where('pst.Id',$request->input('Id'))
            ->first();

        if(!empty($item)){
            foreach ($item as $key => $value) { if($value==null) $item->$key = ''; }

            $item->Status = $item->Status ? ['value'=>1, 'text'=>'Active'] : ['value'=>0, 'text'=>'Not Active'];
            if($item->IdDepartment != 0){
                $item->Department = ['Id'=>$item->IdDepartment,'Department'=>$item->Department];
            }else{
                $item->Department = [];
            }

            if($item->IdDivision != 0){
                $item->Division = ['Id'=>$item->IdDivision,'Department'=>$item->Division];
            }else{
                $item->Division = [];
            }

            if($item->Parent == null) {
                $item->Parent = ['Id'=>$item->Parent, 'Name'=>''];
            } else {
                $item->Parent = json_decode($item->Parent, true);
            }
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

        $item = $this->DBMain->table('position')
            ->select('Code','IdDepartment','Name')
            ->where('Actived',1)
            ->where('Id',$request->input('Id'))
            ->first();

        if($item->Code!=$request->input('Code')) {
            $isExist = $this->AppWeb->checkDataOneColMainDB('position','Code',$request->input('Code'));
            if($isExist>0) {
                return json_encode(array(
                    'status'=>false,
                    'message'=>'Data Code Sudah Ada!',
                    'validation'=>$validation->errors(),
                ));
            }
        }

        if($item->IdDepartment!=$request->input('IdDepartment') || $item->Name!=$request->input('Name')) {
            $isExist = $this->AppWeb->checkDataManyColMainDB('position', [
                'IdDepartment'=>$request->input('IdDepartment'),
                'Name'=>$request->input('Name')
            ]);
            if($isExist>0) {
                return json_encode(array(
                    'status'=>false,
                    'message'=>'Data Position Sudah Ada!',
                    'validation'=>$validation->errors(),
                ));
            }
        }

        DB::begintransaction();
        try{
            $this->DBMain->table('position')
            ->where('Id', $request->input('Id'))
            ->update([
                'Parent'=>$request->input('Parent'),
                'IdDepartment'=>$request->input('IdDepartment'),
                'IdDivision'=>$request->input('IdDivision'),
                'Code'=>$request->input('Code'),
                'Status'=>$request->input('Status'),
                // 'Email'=>$request->input('Email'),
                'Name'=>$request->input('Name')
            ]);

            $this->History->store(12,2,json_encode($requestData));
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
        $item = $this->DBMain->table('position')
            ->select('*')
            ->where('Id', $request->input('Id'))
            ->first();

        $isData = $this->AppWeb->checkDataManyCol('employee', [
            'IdPosition'=>$request->input('Id'),
            'Actived'=>1
        ]);

        if($isData>0) {
            return json_encode(array(
                'status'=>false,
                'message'=>'Data Telah Digunakan, Hapus Data Gagal!',
            ));
        }

        DB::begintransaction();
        try{
            $this->DBMain->table('position')
                ->where('Id', $request->input('Id'))
                ->update([
                    'Actived'=>0
                ]);

            $this->History->store(12,3,json_encode($item));
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

    public function validation(){
        return[
            'IdDivision'=>'required',
            'IdDepartment'=>'required',
            'Code'=>'required',
            'Status'=>'required',
            'Name'=>'required'
        ];
    }
}
