<?php

namespace App\Http\Controllers\BackEnd;

use Laravel\Passport\Passport;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use Validator;
use App\Http\Controllers\Utils\AppWebControll;
use Carbon\Carbon;


class DeviationLevelControll extends Controller
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

        $query = DB::table('deviation_level as dvl')
            ->select(
                'dvl.Id as id',
                'dvl.Level',
                'dvl.MaxValue',
                'usr.UserName as UserEntry',
                'dvl.CreateAt',
                'dvl.UpdateAt'
            )
            ->leftjoin('users as usr','usr.Id','=','dvl.UserEntry')
            ->orderBy($field, $dir)
            ->where('dvl.Actived','>',0);

        if ($searchValue) {
            $query->where(function($query) use ($searchValue) {
                foreach ($searchValue as $key=>$val) {
                    if ($key == "dvl__Month" || $key == "dvl__Year")
                    {
                        if($val!='' && $val!=null)
                        {
                            if($key == "dvl__Year")
                            {   
                                $yearConvertDigits = Carbon::createFromFormat('y', $val);
                                $searchData = $yearConvertDigits->format('Y');
                                if($searchData!='' && $searchData!=null) $query->where('dvl.UpdateAt', 'like', '%'.$searchData.'%');            
                            }
                            else
                            {
                                if($val <= 12)
                                {
                                    $month = Carbon::createFromFormat('m', $val);
                                    if($val!='' && $val!=null) $query->whereMonth('dvl.UpdateAt', '=', $month->format('m'));            
                                }
                                else
                                {
                                    if($val!='' && $val!=null) $query->whereMonth('dvl.UpdateAt', '=', '');
                                }            
                            }           
                        }           
                    }
                    else
                    {
                        if($key == "dvl__UpdateAt")
                        {
                            if($val!='' && $val!=null)
                            {
                                $date = str_replace('.', '-', $val);
                                $yearConvertDigits = Carbon::createFromFormat('d-m-y', $date);
                                $yearFormats = $yearConvertDigits->format('d-m-Y');
                    
                                $val = date('Y-m-d', strtotime($yearFormats));
                                if($val!='' && $val!=null) $query->where('dvl.UpdateAt', 'like', '%'.$val.'%');
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
        $item = DB::table('deviation_level as dvl')
            ->select(
                'dvl.*',
                'usr.UserName as UserEntry'
            )
            ->leftjoin('users as usr','usr.Id','=','dvl.UserEntry')
            ->where('dvl.Actived',1)
            ->where('dvl.Id',$request->input('Id'))
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

        $isExist = $this->AppWeb->checkDataOneCol('deviation_level','Level',$request->input('Level'));
        if($isExist>0) {
            return json_encode(array(
                'status'=>false,
                'message'=>'Data Level Sudah Ada!',
                'validation'=>$validation->errors(),
            ));
        }

        $isExist = $this->AppWeb->checkDataOneCol('deviation_level','MaxValue',$request->input('MaxValue'));
        if($isExist>0) {
            return json_encode(array(
                'status'=>false,
                'message'=>'Data Max Score Sudah Ada!',
                'validation'=>$validation->errors(),
            ));
        }

        DB::begintransaction();
        try{
            DB::table('deviation_level')
                ->insert([
                    'Level'=>$request->input('Level'),
                    'MaxValue'=>$request->input('MaxValue'),
                    'UserEntry'=>session('adminvue')->Id,
                ]);

            $this->History->store(20,1,json_encode($requestData));
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
        $item = DB::table('deviation_level')
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

        $item = DB::table('deviation_level')
            ->select('Level','MaxValue')
            ->where('Actived',1)
            ->where('Id',$request->input('Id'))
            ->first();

        if($item->Level!=$request->input('Level')) {
            $isExist = $this->AppWeb->checkDataOneCol('deviation_level','Level',$request->input('Level'));
            if($isExist>0) {
                return json_encode(array(
                    'status'=>false,
                    'message'=>'Data Level Sudah Ada!',
                    'validation'=>$validation->errors(),
                ));
            }
        }

        if($item->MaxValue!=$request->input('MaxValue')) {
            $isExist = $this->AppWeb->checkDataOneCol('deviation_level','MaxValue',$request->input('MaxValue'));
            if($isExist>0) {
                return json_encode(array(
                    'status'=>false,
                    'message'=>'Data Max Score Sudah Ada!',
                    'validation'=>$validation->errors(),
                ));
            }
        }

        DB::begintransaction();
        try{
            DB::table('deviation_level')
            ->where('Id', $request->input('Id'))
            ->update([
                'Level'=>$request->input('Level'),
                'MaxValue'=>$request->input('MaxValue')
            ]);

            $this->History->store(20,2,json_encode($requestData));
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
        $item = DB::table('deviation_level')
            ->select('*')
            ->where('Id', $request->input('Id'))
            ->first();

        $isData = DB::table('noe_verif_evaluation')
            ->select('Id')
            ->where('DeviationLevel', $request->input('Id'))
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
            DB::table('deviation_level')
                ->where('Id', $request->input('Id'))
                ->update([
                    'Actived'=>0
                ]);

            $this->History->store(20,3,json_encode($item));
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
            'Level'=>'required',
            'MaxValue'=>'required',
        ];
    }

}
