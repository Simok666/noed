<?php

namespace App\Http\Controllers\BackEnd;

use Laravel\Passport\Passport;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use Validator;
use App\Http\Controllers\Utils\AppWebControll;
use Carbon\Carbon;


class UnitLocationControll extends Controller
{
    protected $AppWeb;
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

        $query = $this->MainDB->table('location as lct')
            ->select(
                'lct.Id as id',
                'lct.Code',
                'lct.Name',
                'lct.LocationColor',
                'lct.Prefix',
                'usr.UserName as UserEntry',
                'lct.CreateAt',
                'lct.UpdateAt'
            )
            ->leftjoin('users as usr','usr.Id','=','lct.UserEntry')
            ->orderBy($field, $dir)
            ->where('lct.Actived','>',0);

        if ($searchValue) {
            $query->where(function($query) use ($searchValue) {
                foreach ($searchValue as $key=>$val) {
                    // if there is request input periode
                    if ($key == "lct__Month" || $key == "lct__Year")
                    {
                        if($val!='' && $val!=null)
                        {
                            if($key == "lct__Year")
                                {   
                                    $yearConvertDigits = Carbon::createFromFormat('y', $val);
                                    $searchData = $yearConvertDigits->format('Y');
                                    if($searchData!='' && $searchData!=null) $query->where('lct.UpdateAt', 'like', '%'.$searchData.'%');            
                                }
                                else
                                {
                                    if($val <= 12)
                                    {
                                        $month = Carbon::createFromFormat('m', $val);
                                        if($val!='' && $val!=null) $query->whereMonth('lct.UpdateAt', '=', $month->format('m'));            
                                    }
                                    else
                                    {
                                        if($val!='' && $val!=null) $query->whereMonth('lct.UpdateAt', '=', '');
                                    }            
                                }            
                        }
                    }
                    else 
                    {
                        if($key == "lct__UpdateAt" && !empty($val))
                        {
                            if($val!='' && $val!=null)
                            {
                                $date = str_replace('.', '-', $val);
                                $yearConvertDigits = Carbon::createFromFormat('d-m-y', $date);
                                $yearFormats = $yearConvertDigits->format('d-m-Y');
                        
                                $val = date('Y-m-d', strtotime($yearFormats));
                                if($val!='' && $val!=null) $query->where('lct.UpdateAt', 'like', '%'.$val.'%');
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
        $item = $this->MainDB->table('location as lct')
            ->select(
                'lct.*',
                'usr.UserName as UserEntry'
            )
            ->leftjoin('users as usr','usr.Id','=','lct.UserEntry')
            ->where('lct.Actived',1)
            ->where('lct.Id',$request->input('Id'))
            ->first();

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

        $isExist = $this->AppWeb->checkDataOneColMainDB('location','Code',$request->input('Code'));
        if($isExist>0) {
            return json_encode(array(
                'status'=>false,
                'message'=>'Data Code Sudah Ada!',
                'validation'=>$validation->errors(),
            ));
        }

        $isExist = $this->AppWeb->checkDataOneColMainDB('location','Name',$request->input('Name'));
        if($isExist>0) {
            return json_encode(array(
                'status'=>false,
                'message'=>'Data Location Sudah Ada!',
                'validation'=>$validation->errors(),
            ));
        }
        
        DB::begintransaction();
        try{
            $this->MainDB->table('location')
                ->insert([
                    'Code'=>$request->input('Code'),
                    'Name'=>$request->input('Name'),
                    'LocationColor' => $request->input('LocationColor'),
                    'Prefix'=>$request->input('Prefix'),
                    'UserEntry'=>session('adminvue')->Id,
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
        $item = $this->MainDB->table('location')
            ->select('*')
            ->where('Actived',1)
            ->where('Id',$request->input('Id'))
            ->first();
        if(!empty($item))
        {
            $item->Prefix = json_decode($item->Prefix, true);
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

        $item = $this->MainDB->table('location')
            ->select('Code','Name')
            ->where('Actived',1)
            ->where('Id',$request->input('Id'))
            ->first();

        if($item->Code!=$request->input('Code')) {
            $isExist = $this->AppWeb->checkDataOneColMainDB('location','Code',$request->input('Code'));
            if($isExist>0) {
                return json_encode(array(
                    'status'=>false,
                    'message'=>'Data Code Sudah Ada!',
                    'validation'=>$validation->errors(),
                ));
            }
        }

        if($item->Name!=$request->input('Name')) {
            $isExist = $this->AppWeb->checkDataOneColMainDB('location','Name',$request->input('Name'));
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
            $this->MainDB->table('location')
            ->where('Id', $request->input('Id'))
            ->update([
                'Code'=>$request->input('Code'),
                'Name'=>$request->input('Name'),
                'LocationColor' => $request->input('LocationColor'),
                'Prefix'=>$request->input('Prefix')
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
        $item = $this->MainDB->table('location')
            ->select('*')
            ->where('Id', $request->input('Id'))
            ->first();

        $isData = DB::table('noe_report')
            ->select('Id')
            ->where('IdLocation', $request->input('Id'))
            ->where('Actived',1)
            ->count();

        if($isData>0) {
            return json_encode(array(
                'status'=>false,
                'message'=>'Data Telah Digunakan, Hapus Data Gagal!',
            ));
        }

        DB::begintransaction();
        try{
            $this->MainDB->table('location')
                ->where('Id', $request->input('Id'))
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
            'Code'=>'required',
            'Name'=>'required',
            'LocationColor' => 'required',
            'Prefix'=>'required',
        ];
    }

}
