<?php

namespace App\Http\Controllers\BackEnd;

use Laravel\Passport\Passport;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use Validator;
use App\Http\Controllers\Utils\AppWebControll;

class DistrictControll extends Controller
{
    protected $History;
    protected $AppWeb;
    protected $MainDB;

    public function __construct() {
        $this->History = new HistoryControll();
        $this->AppWeb = new AppWebControll();
        $this->MainDB = DB::connection('mysql');
    }

    public function index(Request $request) {
    	$sortRules = $request->input('sort');
        $limit = $request->input('per_page');
        $searchValue = json_decode($request->input('search'));
        // print_r($searchValue->name);exit();
        list($field, $dir) = explode('|', $sortRules);

        $query = $this->MainDB->table('districts as dst')
            ->select(
                'dst.Id as id',
                'dst.Name',
                'cty.Name as City',
                'usr.UserName as UserEntry',
                'dst.CreateAt',
                'dst.UpdateAt')
            ->join('city as cty','cty.Id','=','dst.IdCity')
            ->leftjoin('users as usr','usr.Id','=','dst.UserEntry')
            ->orderBy($field, $dir)
            ->where('dst.Actived','>',0);

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

    public function show(Request $request)
    {
        $item = $this->MainDB->table('districts as dst')
            ->select('dst.Id','dst.Name','dst.IdCity','cty.Name as City')
            ->join('city as cty','cty.Id','=','dst.IdCity')
            ->where('dst.Actived',1)
            ->where('dst.Id',$request->input('Id'))
            ->first();

        if(!empty($item)){
        }

        return json_encode(array(
            'status'=>true,
            'data'=>$item,
        ));

    }

    public function getCity(Request $request)
    {
        $item = $this->MainDB->table('city')
            ->select('Id','Name as City')
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

        $isExist = $this->AppWeb->checkDataOneColMainDB('districts','Name',$request->input('Name'));
        if($isExist>0) {
            return json_encode(array(
                'status'=>false,
                'message'=>'Data Kecamatan Sudah Ada!',
                'validation'=>$validation->errors(),
            ));
        }

        DB::begintransaction();
        try{
            $idDistricts = $this->MainDB->table('districts')
                ->insertGetId([
                    'IdCity'=>$request->input('IdCity'),
                    'Name'=>$request->input('Name'),
                    'UserEntry'=>session('adminvue')->Id,
                ]);

            $this->History->store(5,1,json_encode($requestData));
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
        $item = $this->MainDB->table('districts as dst')
            ->select('dst.Id','dst.Name','dst.IdCity','cty.Name as City')
            ->join('city as cty','cty.Id','=','dst.IdCity')
            ->where('dst.Actived',1)
            ->where('dst.Id',$request->input('Id'))
            ->first();

        if(!empty($item)){
            $item->IdCity = ['Id'=>$item->IdCity, 'City'=>$item->City];
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

        $item = $this->MainDB->table('districts as dst')
            ->select('dst.Name')
            ->where('dst.Actived',1)
            ->where('dst.Id',$request->input('Id'))
            ->first();

        if($item->Name!=$request->input('Name')) {
            $isExist = $this->AppWeb->checkDataOneColMainDB('districts','Name',$request->input('Name'));
            if($isExist>0) {
                return json_encode(array(
                    'status'=>false,
                    'message'=>'Data Kecamatan Sudah Ada!',
                    'validation'=>$validation->errors(),
                ));
            }
        }

        DB::begintransaction();
        try{
            $this->MainDB->table('districts')
            ->where('Id', $request->input('Id'))
            ->update([
                'IdCity'=>$request->input('IdCity'),
                'Name'=>$request->input('Name')
            ]);

            $this->History->store(5,2,json_encode($requestData));
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

        $item = $this->MainDB->table('districts')
            ->select('*')
            ->where('Id', $request->input('Id'))
            ->first();

        DB::begintransaction();
        try{
            $this->MainDB->table('districts')
                ->where('Id', $request->input('Id'))
                ->update([
                    'Actived'=>0
                ]);

            $this->History->store(5,3,json_encode($item));
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
            'Name'=>'required',
            'IdCity'=>'required',
        ];

    }


}
