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

class DepartmentControll extends Controller
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

        $query = $this->DBMain->table('department as dpt')
            ->select(
                'dpt.Id as id',
                'dpt.Code',
                'dpt.Department',
                'dvs.Department as Division',
                'dpt.CreateAt',
                'dpt.UpdateAt'
            )
            ->leftjoin('department as dvs','dvs.Id','=','dpt.Parent')
            ->orderBy($field, $dir)
            ->where('dpt.Parent','<>',0)
            ->where('dvs.Actived',1)
            ->where('dpt.Actived',1);

        if ($searchValue) {
            $query->where(function($query) use ($searchValue) {
                foreach ($searchValue as $key=>$val) {
                    if ($key == "dpt__Month" || $key == "dpt__Year")
                    {
                        if($val!='' && $val!=null)
                        {
                            if($key == "dpt__Year")
                            {   
                                $yearConvertDigits = Carbon::createFromFormat('y', $val);
                                $searchData = $yearConvertDigits->format('Y');
                                if($searchData!='' && $searchData!=null) $query->where('dpt.UpdateAt', 'like', '%'.$searchData.'%');            
                            }
                            else
                            {
                                if($val <= 12)
                                {
                                    $month = Carbon::createFromFormat('m', $val);
                                    if($val!='' && $val!=null) $query->whereMonth('dpt.UpdateAt', '=', $month->format('m'));            
                                }
                                else
                                {
                                    if($val!='' && $val!=null) $query->whereMonth('dpt.UpdateAt', '=', '');
                                }            
                            }           
                        }         
                    }
                    else
                    {
                        if($key == "dpt__UpdateAt")
                        {
                            if($val!='' && $val!=null)
                            {
                                $date = str_replace('.', '-', $val);
                                $yearConvertDigits = Carbon::createFromFormat('d-m-y', $date);
                                $yearFormats = $yearConvertDigits->format('d-m-Y');
                                
                                $val = date('Y-m-d', strtotime($yearFormats));  
                                if($val!='' && $val!=null) $query->where('dpt.UpdateAt', 'like', '%'.$val.'%');
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

    public function show(Request $request) {
        $item = $this->DBMain->table('department as dpt')
            ->select(
                'dpt.Id',
                'dpt.Code',
                'dvs.Department as Division',
                'dpt.Department',
                'dpt.CreateAt',
                'dpt.UpdateAt'
            )
            ->leftjoin('department as dvs','dvs.Id','=','dpt.Parent')
            ->where('dpt.Actived', 1)
            ->where('dvs.Actived',1)
            ->where('dpt.Id',$request->input('Id'))
            ->first();

        return json_encode(array(
            'status'=>true,
            'data'=>$item,
        ));
    }

    public function getDivision(Request $request) {
        $item = $this->DBMain->table('department')
            ->select('Id','Department as Division')
            ->where('Parent',0)
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

        if ($validation->fails() || $request->input('Parent') == null) {
            return json_encode(array(
                'status'=>false,
                'message'=>'Silahkan lengkapi kolom *Wajib Diisi',
                'validation'=>$validation->errors(),
            ));
        }

        $isExist = $this->AppWeb->checkDataOneColMainDB('department','Code',$request->input('Code'));
        if($isExist>0) {
            return json_encode(array(
                'status'=>false,
                'message'=>'Data Code Sudah Ada!',
                'validation'=>$validation->errors(),
            ));
        }

        $isExist = $this->AppWeb->checkDataManyColMainDB('department', [
            'Department'=>$request->input('Department'),
            'Parent'=>$request->input('Parent')
        ]);
        if($isExist>0) {
            return json_encode(array(
                'status'=>false,
                'message'=>'Data Department Sudah Ada!',
                'validation'=>$validation->errors(),
            ));
        }

        DB::begintransaction();
        try{
            $this->DBMain->table('department')
                ->insert([
                    'Code'=>$request->input('Code'),
                    'Parent'=>$request->input('Parent'),
                    'Department'=>$request->input('Department'),
                    'UserEntry'=>session('adminvue')->Id,
                ]);

            $this->History->store(11,1,json_encode($requestData));
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

        $item = $this->DBMain->table('department as dpt')
            ->select(
                'dpt.Id',
                'dpt.Code',
                'dpt.Parent',
                'dvs.Department as Division',
                'dpt.Department',
                'dpt.CreateAt',
                'dpt.UpdateAt'
            )
            ->leftjoin('department as dvs','dvs.Id','=','dpt.Parent')
            ->where('dpt.Actived', 1)
            ->where('dvs.Actived',1)
            ->where('dpt.Id',$request->input('Id'))
            ->first();

        if(!empty($item)) {
            $item->Parent = ['Id'=>$item->Parent, 'Division'=>$item->Division];
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

        $item = $this->DBMain->table('department')
            ->select('Code','Department','Parent')
            ->where('Actived',1)
            ->where('Id',$request->input('Id'))
            ->first();

        if($item->Code!=$request->input('Code')) {
            $isExist = $this->AppWeb->checkDataOneColMainDB('department','Code',$request->input('Code'));
            if($isExist>0) {
                return json_encode(array(
                    'status'=>false,
                    'message'=>'Data Code Sudah Ada!',
                    'validation'=>$validation->errors(),
                ));
            }
        }

        if($item->Department!=$request->input('Department') || $item->Parent!=$request->input('Parent')) {
            $isExist = $this->AppWeb->checkDataManyColMainDB('department', [
                'Department'=>$request->input('Department'),
                'Parent'=>$request->input('Parent')
            ]);
            if($isExist>0) {
                return json_encode(array(
                    'status'=>false,
                    'message'=>'Data Department Sudah Ada!',
                    'validation'=>$validation->errors(),
                ));
            }
        }

        DB::begintransaction();
        try{
            $this->DBMain->table('department')
            ->where('Id', $request->input('Id'))
            ->update([
                'Code'=>$request->input('Code'),
                'Parent'=>$request->input('Parent'),
                'Department'=>$request->input('Department'),
            ]);

            $this->History->store(11,2,json_encode($requestData));
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
        $item = $this->DBMain->table('department')
            ->select('*')
            ->where('Id', $request->input('Id'))
            ->first();

        $isData = $this->AppWeb->checkDataManyCol('position', [
            'IdDepartment'=>$request->input('Id'),
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
            $this->DBMain->table('department')
                ->where('Id', $request->input('Id'))
                ->update([
                    'Actived'=>0
                ]);

            $this->History->store(11,3,json_encode($item));
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
            'Code'=>'required',
            'Parent'=>'required',
            'Department'=>'required',
        ];
    }
}
