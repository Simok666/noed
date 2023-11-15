<?php

namespace App\Http\Controllers\BackEnd;

use Laravel\Passport\Passport;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use Validator;
use App\Http\Controllers\Utils\AppWebControll;
use Carbon\Carbon;

class DifferentDaysControll extends Controller
{
    protected $History;
    protected $MainDB;

    public function __construct() {
        $this->AppWeb = new AppWebControll();
        $this->History = new HistoryControll();
        $this->MainDB = DB::connection('mysql');
    }

    public function index(Request $request) {
        $sortRules = $request->input('sort');
        $limit = $request->input('per_page');
        $searchValue = json_decode($request->input('search'));
        list($field, $dir) = explode('|', $sortRules);

        $query = $this->MainDB->table('diffdays as dd')
        ->select(
            'dd.id',
            'dd.name as Name',
            'dd.different_days as DifferentNumber',
            'usr.UserName as UserEntry',
            'dd.created_at',
            'dd.updated_at as UpdateAt'
        )
        ->leftjoin('users as usr','usr.Id','=','dd.user_entry')
        ->where('dd.Actived', 1)
        ->orderBy($field, $dir);

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

        $isExist = $this->AppWeb->checkDataOneColMainDB('diffdays','name',$request->input('name'));
        if($isExist>0) {
            return json_encode(array(
                'status'=>false,
                'message'=>'Data Sudah Ada!',
                'validation'=>$validation->errors(),
            ));
        }
        
        DB::begintransaction();
        try{
            $this->MainDB->table('diffdays')
                ->insert([
                    'name'=>$request->input('name'),
                    'different_days'=>$request->input('different'),
                    'user_entry'=> session('adminvue')->Id,
                    'Actived' => 1,
                    'created_at'=> Carbon::now()->format('Y-m-d H:i:s'),
                    'updated_at'=> Carbon::now()->format('Y-m-d H:i:s')
                ]);

            $this->History->store(22,1,json_encode($requestData));
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
        $item = $this->MainDB->table('diffdays')
            ->select('*')
            ->where('Actived',1)
            ->where('id',$request->input('Id'))
            ->first();

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

        $item = $this->MainDB->table('diffdays as dd')
            ->select('dd.name')
            ->where('dd.Actived',1)
            ->where('dd.id',$request->input('id'))
            ->first();
       
        if($item->name != $request->input('name')) {
            $isExist = $this->AppWeb->checkDataOneColMainDB('diffdays','name',$request->input('name'));
            if($isExist>0) {
                return json_encode(array(
                    'status'=>false,
                    'message'=>'Data Location Sudah Ada!',
                    'validation'=>$validation->errors(),
                ));
            }
        }

        DB::begintransaction();
        try{
            $this->MainDB->table('diffdays')
            ->where('id', $request->input('id'))
            ->update([
                'name'=>$request->input('name'),
                'different_days'=>$request->input('different'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ]);

            $this->History->store(22,2,json_encode($requestData));
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
        $item = $this->MainDB->table('diffdays')
            ->select('*')
            ->where('id', $request->input('Id'))
            ->first();
        
        
        DB::begintransaction();
        try{
            $this->MainDB->table('diffdays')
                ->where('id', $request->input('Id'))
                ->update([
                    'Actived'=>0
                ]);

            $this->History->store(22,3,json_encode($item));
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
            'name'=>'required',
            'different'=>'required',
        ];
    }
}
