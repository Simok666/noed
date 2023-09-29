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

class TroubleShootControll extends Controller
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
        
        $query = DB::table('trouble_shoot as ts')
            ->select(
                'ts.Id as id',
                'ts.IdMenu as Menu',
                'ts.Incident',
                'ts.IdUserAccess as UserAcsess',
                'ts.CorrectiveAction',
                'ts.CreateAt',
                'ts.UpdateAt'
            )
            ->where('ts.Actived','>',0)
            ->orderBy($field, $dir);

            if ($searchValue) {
                $query->where(function($query) use ($searchValue) {
                    foreach ($searchValue as $key=>$val) {
                        
                        if($key == "ts__UpdateAt")
                        {
                            if($val!='' && $val!=null)
                            {
                                $date = str_replace('.', '-', $val);
                                $yearConvertDigits = Carbon::createFromFormat('d-m-y', $date);
                                $yearFormats = $yearConvertDigits->format('d-m-Y');
                                    
                                $val = date('Y-m-d', strtotime($yearFormats));  
                                if($val!='' && $val!=null) $query->where('ts.UpdateAt', 'like', '%'.$val.'%');
                            }
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

    public function getUser(Request $request) {
        $item = DB::table('type_user')
            ->select('Id','Name as TypeUser')
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
        
        if ($validation->fails() || $request->input('IdMenu') == null) {
            return json_encode(array(
                'status'=>false,
                'message'=>'Silahkan lengkapi kolom *Wajib Diisi',
                'validation'=>$validation->errors(),
            ));
        }

        $dom=new \DOMDocument();
        libxml_use_internal_errors(true);
        $dom->loadHTML($request->Content,LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NOIMPLIED);
        libxml_clear_errors();
        $images=$dom->getElementsByTagName('img');
        
        foreach($images as $k => $img){
            $src=$img->getAttribute('src');
            if(preg_match('/data:image/',$src)){
                $dataImg = $img->getAttribute('src');
                list($type, $dataImg) = explode(';', $dataImg);
                list(, $dataImg)      = explode(',', $dataImg);
                $dataImg = base64_decode($dataImg);
                
                $image_name = "/uploads/img/trouble-shoot/". Str::random(9).time().$k.'.png';
                $dataImg = Storage::disk('public')->put($image_name, $dataImg);
                $image_name = url('storage/'.$image_name);
            
                $img->removeAttribute('src');
                $img->setAttribute('src', $image_name);
            }
        }
        
        $requestData['Content'] = $dom->saveHTML();
       

        $CorrectiveActionFile = [];
        if($request->has('CorrectiveActionFile') && $request->file('CorrectiveActionFile')!=null) {
            $arrFile = $request->file('CorrectiveActionFile');
            foreach($arrFile as $key=>$val) {
                if(pathinfo($val->getClientOriginalName(), PATHINFO_EXTENSION)) {
                    $CorrectiveActionFile[$key] = $this->UploadFile->uploadFile($val,5); //5 path noe-report
                }
            }
        }

        if(count($CorrectiveActionFile) > 0) {
            $CorrectiveActionFile = json_encode($CorrectiveActionFile);
        } else {
            $CorrectiveActionFile = json_encode($CorrectiveActionFile);
        }

        DB::begintransaction();
        try{
            DB::table('trouble_shoot')
                ->insert([
                    'IdMenu'=>str_replace('"','',$request->input('IdMenu')),
                    'Incident' => $request->input('Incident'),
                    // 'IdUserAccess'=>$request->input('IdUserAccess'),
                    // 'CorrectiveAction'=>$request->input('CorrectiveAction'),
                    'IdUserAccess'=>'',
                    'CorrectiveAction'=>'',
                    'CorrectiveActionFile'=>$requestData['Content'],
                    'Actived' => 1,
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

    public function edit(Request $request) {
        $item = DB::table('trouble_shoot as ts')
            ->select(
                'ts.*',
            )
            ->where('ts.Actived',1)
            ->where('ts.Id',$request->input('Id'))
            ->first();
        
        if(!empty($item)) {
            $item->IdMenu = ['text'=>$item->IdMenu];
            $item->IdUserAccess = json_decode($item->IdUserAccess, true);
            // $FileCorrectiveAction = json_decode($item->CorrectiveActionFile);
            // $item->FileCorrectiveAction = $FileCorrectiveAction;
    

            // $FileCorrectiveActionDownload = [];
            // if(!empty($FileCorrectiveAction)) { foreach ($FileCorrectiveAction as $key => $val) {
            //     $arr = [];
            //     if($val) {
            //         $result = explode("/",$val);
            //         array_push($arr, $result[4]);
            //     }
            //     array_push($arr, $val);
            //     array_push($FileCorrectiveActionDownload, $arr);
            // } }
            // $item->FileCorrectiveActionDownload = $FileCorrectiveActionDownload;
        }
        
        $isButton = false;
        return json_encode(array(
            'status'=>true,
            'data'=>$item,
            'isButton'=>$isButton
        ));
    }

    public function delete(Request $request)
    {
        $item = DB::table('trouble_shoot')
            ->select('*')
            ->where('Id', $request->input('Id'))
            ->first();
        
        DB::begintransaction();
        try{
            DB::table('trouble_shoot')
                ->where('Id', $request->input('Id'))
                ->update([
                    'Actived'=>0
                ]);

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

    public function update(Request $request) {
        $requestData = $request->all();
        $validation = Validator::make($request->all(),$this->validation(),
        $messages = ['required' => 'This field is required.']);
        
        if ($validation->fails() || $request->input('IdMenu') == null || $request->input('IdUserAccess') == null || $request->input('IdUserAccess') == 'undefined') {
            return json_encode(array(
                'status'=>false,
                'message'=>'Silahkan lengkapi kolom *Wajib Diisi',
                'validation'=>$validation->errors(),
            ));
        }
        
        $dom=new \DOMDocument();
        libxml_use_internal_errors(true);
        $dom->loadHTML($request->Content,LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NOIMPLIED);
        libxml_clear_errors();
        $images=$dom->getElementsByTagName('img');
        
        foreach($images as $k => $img){
            $src=$img->getAttribute('src');
            if(preg_match('/data:image/',$src)){
                $dataImg = $img->getAttribute('src');
                list($type, $dataImg) = explode(';', $dataImg);
                list(, $dataImg)      = explode(',', $dataImg);
                $dataImg = base64_decode($dataImg);
                
                $image_name = "/uploads/img/trouble-shoot/". Str::random(9).time().$k.'.png';
                $dataImg = Storage::disk('public')->put($image_name, $dataImg);
                $image_name = url('storage/'.$image_name);
            
                $img->removeAttribute('src');
                $img->setAttribute('src', $image_name);
            }
        }
        
        $requestData['Content'] = $dom->saveHTML();
        
        $CorrectiveActionFile = [];
        if($request->has('CorrectiveActionFile') && $request->file('CorrectiveActionFile')!=null) {
            $arrFile = $request->file('CorrectiveActionFile');
            foreach($arrFile as $key=>$val) {
                if(pathinfo($val->getClientOriginalName(), PATHINFO_EXTENSION)) {
                    $CorrectiveActionFile[$key] = $this->UploadFile->uploadFile($val,5); //5 path noe-report
                }
            }
        }

        $OldCorrectiveActionFile = json_decode($request->input('OldCorrectiveActionFile'));
        if($OldCorrectiveActionFile) { foreach($OldCorrectiveActionFile as $key=>$val){
            array_push($CorrectiveActionFile,$val);
        } }

        if(count($CorrectiveActionFile) > 0) {
            $CorrectiveActionFile = json_encode($CorrectiveActionFile);
        } else {
            $CorrectiveActionFile = [];
        }

        DB::begintransaction();
        try{
            DB::table('trouble_shoot')
            ->where('Id', $request->input('Id'))
            ->update([
               
                'IdMenu'=>str_replace('"','',$request->input('IdMenu')),
                'Incident' => $request->input('Incident'),
                'IdUserAccess'=>$request->input('IdUserAccess'),
                'CorrectiveAction'=>$request->input('CorrectiveAction'),
                'CorrectiveActionFile'=>$requestData['Content'],
            ]);

            $this->History->store(24,2,json_encode($requestData));
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

    function validation(){
        return [
            'IdMenu'=>'required',
            'Incident'=>'required',
            // 'IdUserAccess'=>'required',
            // 'CorrectiveAction'=>'required',
            'Content'=>'required',
        ];
    }
}