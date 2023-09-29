<?php

namespace App\Http\Controllers\BackEnd;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use Validator;
use Carbon\Carbon;
use App\Http\Controllers\Utils\UploadFileControll;
use App\Http\Controllers\Utils\AppWebControll;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Ramsey\Uuid\Uuid;
use Crypt;


class ChatStatusControll extends Controller
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

    public function index(Request $request) 
    {
        $sortRules = $request->input('sort');
        $limit = $request->input('per_page');
        $searchValue = json_decode($request->input('search'));
        
        list($field, $dir) = explode('|', $sortRules);

        $query = DB::table('chat_status as cs')
            ->select(
                'cs.id as id',
                'cs.status',
                'cs.descriptions'
            )
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

    public function store(Request $request)
    {
        $requestData = $request->all();
        $validation = Validator::make($request->all(), $this->validation(),
        $messages = ['required' => 'This field is required.']);

        if ($validation->fails()) {
            return json_encode(array(
                'status'=>false,
                'message'=>'Silahkan lengkapi kolom *Wajib Diisi',
                'validation'=>$validation->errors(),
            ));
        }
        
        DB::begintransaction();
        try{
            DB::table('chat_status')
                ->insert([
                    'status'=>$request->input('Status'),
                    'descriptions' => $request->input('Descriptions'),
                ]);

            $this->History->store(24,1,json_encode($requestData));
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

    public function delete(Request $request) 
    {
        $item = DB::table('chat_status')
            ->select('*')
            ->where('id', $request->input('Id'))
            ->first();

        DB::begintransaction();
            try{
                DB::table('chat_status')
                    ->where('id', $request->input('Id'))
                    ->delete();
    
                $this->History->store(24,3,json_encode($item));
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

    public function show(Request $request)
    {
        $item = $this->MainDB->table('chat_status as cs')
            ->select(
                'cs.id as id',
                'cs.status',
                'cs.descriptions',
            )
            ->where('cs.Id',$request->input('Id'))
            ->first();
        
        return json_encode(array(
            'status'=>true,
            'data'=>$item,
        ));
    }

    public function edit(Request $request)
    {
        $item = $this->MainDB->table('chat_status')
            ->select('*')
            ->where('id',$request->input('Id'))
            ->first();
        
        return json_encode(array(
            'status'=>true,
            'data'=>$item,
        ));
    }

    public function update(Request $request)
    {
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
     
        DB::begintransaction();
        try{
            $this->MainDB->table('chat_status')
            ->where('id', $request->input('Id'))
            ->update([
                'status'=>$request->input('Status'),
                'descriptions'=>$request->input('Descriptions')
            ]);

            $this->History->store(21,2,json_encode($requestData));
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

    function validation()
    {
        return [
            'Status' => 'required',
            'Descriptions' => 'required'
        ];
    }
}