<?php

namespace App\Http\Controllers\BackEnd;

use Laravel\Passport\Passport;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use Validator;
use Carbon\Carbon;
use App\Http\Controllers\Utils\AppWebControll;

class EventIncidentControll extends Controller
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

        $query = DB::table('event_incident as eit')
            ->select(
                'eit.Id as id',
                'eit.Code',
                'eit.Name',
                'eit.Classification',
                'usr.UserName as UserEntry',
                'eit.CreateAt',
                'eit.UpdateAt'
            )
            ->leftjoin('users as usr','usr.Id','=','eit.UserEntry')
            ->orderBy($field, $dir)
            ->where('eit.Actived','>',0);

        if ($searchValue) {
            $query->where(function($query) use ($searchValue) {
                foreach ($searchValue as $key=>$val) {
                    if ($key == "eit__Month" || $key == "eit__Year")
                    {
                        if($val!='' && $val!=null)
                        {
                            if($key == "eit__Year")
                            {   
                                $yearConvertDigits = Carbon::createFromFormat('y', $val);
                                $searchData = $yearConvertDigits->format('Y');
                                if($searchData!='' && $searchData!=null) $query->where('eit.UpdateAt', 'like', '%'.$searchData.'%');            
                            }
                            else
                            {
                                if($val <= 12)
                                {
                                    $month = Carbon::createFromFormat('m', $val);
                                    if($val!='' && $val!=null) $query->whereMonth('eit.UpdateAt', '=', $month->format('m'));            
                                }
                                else
                                {
                                    if($val!='' && $val!=null) $query->whereMonth('eit.UpdateAt', '=', '');
                                }            
                            }   
                        }            
                    }
                    else
                    {
                        if($key == "eit__UpdateAt")
                        {
                            if($val!='' && $val!=null)
                            {
                                $date = str_replace('.', '-', $val);
                                $yearConvertDigits = Carbon::createFromFormat('d-m-y', $date);
                                $yearFormats = $yearConvertDigits->format('d-m-Y');
                            
                                $val = date('Y-m-d', strtotime($yearFormats)); 
                                if($val!='' && $val!=null) $query->where('eit.UpdateAt', 'like', '%'.$val.'%');
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
        $item = DB::table('event_incident as eit')
            ->select(
                'eit.*',
                'usr.UserName as UserEntry'
            )
            ->leftjoin('users as usr','usr.Id','=','eit.UserEntry')
            ->where('eit.Actived',1)
            ->where('eit.Id',$request->input('Id'))
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

        $isExist = $this->AppWeb->checkDataOneCol('event_incident','Code',$request->input('Code'));
        if($isExist>0) {
            return json_encode(array(
                'status'=>false,
                'message'=>'Data Code Sudah Ada!',
                'validation'=>$validation->errors(),
            ));
        }

        $isExist = $this->AppWeb->checkDataOneCol('event_incident','Name',$request->input('Name'));
        if($isExist>0) {
            return json_encode(array(
                'status'=>false,
                'message'=>'Data Event/Incident Sudah Ada!',
                'validation'=>$validation->errors(),
            ));
        }

        DB::begintransaction();
        try{
            DB::table('event_incident')
                ->insert([
                    'Code'=>$request->input('Code'),
                    'Name'=>$request->input('Name'),
                    'Classification'=>$request->input('Classification'),
                    'UserEntry'=>session('adminvue')->Id,
                ]);

            $this->History->store(17,1,json_encode($requestData));
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
        $item = DB::table('event_incident')
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

        $item = DB::table('event_incident')
            ->select('Code','Name','Classification')
            ->where('Actived',1)
            ->where('Id',$request->input('Id'))
            ->first();

        if($item->Code!=$request->input('Code')) {
            $isExist = $this->AppWeb->checkDataOneCol('event_incident','Code',$request->input('Code'));
            if($isExist>0) {
                return json_encode(array(
                    'status'=>false,
                    'message'=>'Data Code Sudah Ada!',
                    'validation'=>$validation->errors(),
                ));
            }
        }

        if($item->Name!=$request->input('Name')) {
            $isExist = $this->AppWeb->checkDataOneCol('event_incident','Name',$request->input('Name'));
            if($isExist>0) {
                return json_encode(array(
                    'status'=>false,
                    'message'=>'Data Event/Incident Sudah Ada!',
                    'validation'=>$validation->errors(),
                ));
            }
        }

        DB::begintransaction();
        try{
            DB::table('event_incident')
            ->where('Id', $request->input('Id'))
            ->update([
                'Code'=>$request->input('Code'),
                'Name'=>$request->input('Name'),
                'Classification'=>$request->input('Classification')
            ]);

            $this->History->store(17,2,json_encode($requestData));
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
        $item = DB::table('event_incident')
            ->select('*')
            ->where('Id', $request->input('Id'))
            ->first();

        $isData = DB::table('noe_report')
            ->select('Id')
            ->where('IdTypeIncident', 'LIKE','%"Id":'.$request->input('Id').'%')
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
            DB::table('event_incident')
                ->where('Id', $request->input('Id'))
                ->update([
                    'Actived'=>0
                ]);

            $this->History->store(17,3,json_encode($item));
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
            'Classification'=>'required'
        ];
    }

}
