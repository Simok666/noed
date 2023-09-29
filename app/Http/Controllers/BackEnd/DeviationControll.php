<?php

namespace App\Http\Controllers\BackEnd;

use Laravel\Passport\Passport;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use Validator;
use Carbon\Carbon;
use App\Http\Controllers\Utils\AppWebControll;

class DeviationControll extends Controller
{
    protected $AppWeb;
    protected $History;

    public function __construct() {
        $this->AppWeb = new AppWebControll();
        $this->History = new HistoryControll();
    }

    public function index(Request $request) {
    	$sortRules = $request->input('sort');
        $limit = $request->input('per_page');
        $searchValue = json_decode($request->input('search'));
        list($field, $dir) = explode('|', $sortRules);

        $query = DB::table('deviation as dvt')
            ->select(
                'dvt.Id as id',
                'dvt.Code',
                'dvt.Deviation',
                'usr.UserName as UserEntry',
                'dvt.CreateAt',
                'dvt.UpdateAt'
            )
            ->leftjoin('users as usr','usr.Id','=','dvt.UserEntry')
            ->orderBy($field, $dir)
            ->where('dvt.Actived','>',0);

        if ($searchValue) {
            $query->where(function($query) use ($searchValue) {
                foreach ($searchValue as $key=>$val) {
                    // if there is request input periode
                    if ($key == "dvt__Month" || $key == "dvt__Year")
                    {
                        if($val!='' && $val!=null)
                        {
                            if($key == "dvt__Year")
                            {   
                                $yearConvertDigits = Carbon::createFromFormat('y', $val);
                                $searchData = $yearConvertDigits->format('Y');
                                if($searchData!='' && $searchData!=null) $query->where('dvt.UpdateAt', 'like', '%'.$searchData.'%');            
                            }
                            else
                            {
                                if($val <= 12)
                                {
                                    $month = Carbon::createFromFormat('m', $val);
                                    if($val!='' && $val!=null) $query->whereMonth('dvt.UpdateAt', '=', $month->format('m'));            
                                }
                                else
                                {
                                    if($val!='' && $val!=null) $query->whereMonth('dvt.UpdateAt', '=', '');
                                }            
                            }   
                        }            
                    }
                    else
                    {
                        if($key == "dvt__UpdateAt")
                        {
                            if($val!='' && $val!=null)
                            {
                                $date = str_replace('.', '-', $val);
                                $yearConvertDigits = Carbon::createFromFormat('d-m-y', $date);
                                $yearFormats = $yearConvertDigits->format('d-m-Y');
                        
                                $val = date('Y-m-d', strtotime($yearFormats));  
    
                                if($val!='' && $val!=null) $query->where('dvt.UpdateAt', 'like', '%'.$val.'%');
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
        $item = DB::table('deviation as dvt')
            ->select(
                'dvt.*',
                'usr.UserName as UserEntry'
            )
            ->leftjoin('users as usr','usr.Id','=','dvt.UserEntry')
            ->where('dvt.Actived',1)
            ->where('dvt.Id',$request->input('Id'))
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

        $isExist = $this->AppWeb->checkDataOneCol('deviation','Code',$request->input('Code'));
        if($isExist>0) {
            return json_encode(array(
                'status'=>false,
                'message'=>'Data Code Sudah Ada!',
                'validation'=>$validation->errors(),
            ));
        }

        $isExist = $this->AppWeb->checkDataOneCol('deviation','Deviation',$request->input('Deviation'));
        if($isExist>0) {
            return json_encode(array(
                'status'=>false,
                'message'=>'Data Deviation Sudah Ada!',
                'validation'=>$validation->errors(),
            ));
        }

        DB::begintransaction();
        try{
            DB::table('deviation')
                ->insert([
                    'Code'=>$request->input('Code'),
                    'Deviation'=>$request->input('Deviation'),
                    'UserEntry'=>session('adminvue')->Id,
                ]);

            $this->History->store(16,1,json_encode($requestData));
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
        $item = DB::table('deviation')
            ->select('*')
            ->where('Actived',1)
            ->where('Id',$request->input('Id'))
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

        $item = DB::table('deviation')
            ->select('Code','Deviation')
            ->where('Actived',1)
            ->where('Id',$request->input('Id'))
            ->first();

        if($item->Code!=$request->input('Code')) {
            $isExist = $this->AppWeb->checkDataOneCol('deviation','Code',$request->input('Code'));
            if($isExist>0) {
                return json_encode(array(
                    'status'=>false,
                    'message'=>'Data Code Sudah Ada!',
                    'validation'=>$validation->errors(),
                ));
            }
        }

        if($item->Deviation!=$request->input('Deviation')) {
            $isExist = $this->AppWeb->checkDataOneCol('deviation','Deviation',$request->input('Deviation'));
            if($isExist>0) {
                return json_encode(array(
                    'status'=>false,
                    'message'=>'Data Deviation Sudah Ada!',
                    'validation'=>$validation->errors(),
                ));
            }
        }

        DB::begintransaction();
        try{
            DB::table('deviation')
            ->where('Id', $request->input('Id'))
            ->update([
                'Code'=>$request->input('Code'),
                'Deviation'=>$request->input('Deviation')
            ]);

            $this->History->store(16,2,json_encode($requestData));
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
        $item = DB::table('deviation')
            ->select('*')
            ->where('Id', $request->input('Id'))
            ->first();

        $isData = DB::table('noe_verif_evaluation')
            ->select('Id')
            ->where('IdDeviation','LIKE','%"Id":'.$request->input('Id').'%')
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
            DB::table('deviation')
                ->where('Id', $request->input('Id'))
                ->update([
                    'Actived'=>0
                ]);

            $this->History->store(16,3,json_encode($item));
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
            'Deviation'=>'required',
        ];
    }

}
