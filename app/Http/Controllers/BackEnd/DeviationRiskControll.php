<?php

namespace App\Http\Controllers\BackEnd;

use Laravel\Passport\Passport;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use Validator;
use App\Http\Controllers\Utils\AppWebControll;
use Carbon\Carbon;


class DeviationRiskControll extends Controller
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

        $query = DB::table('deviation_risk_assesment as dra')
            ->select(
                'dra.Id as id',
                'dra.Value',
                'dra.Question',
                'dra.RiskAssesment',
                'dra.AssesmentGroup',
                'usr.UserName as UserEntry',
                'dra.CreateAt',
                'dra.UpdateAt'
            )
            ->leftjoin('users as usr','usr.Id','=','dra.UserEntry')
            ->orderBy($field, $dir)
            ->where('dra.Actived','>',0);

        if ($searchValue) {
            $query->where(function($query) use ($searchValue) {
                foreach ($searchValue as $key=>$val) {
                    if ($key == "dra__Month" || $key == "dra__Year")
                    {
                        if($val!='' && $val!=null)
                        {
                            if($key == "dra__Year")
                            {   
                                $yearConvertDigits = Carbon::createFromFormat('y', $val);
                                $searchData = $yearConvertDigits->format('Y');
                                if($searchData!='' && $searchData!=null) $query->where('dra.UpdateAt', 'like', '%'.$searchData.'%');            
                            }
                            else
                            {
                                if($val <= 12)
                                {
                                    $month = Carbon::createFromFormat('m', $val);
                                    if($val!='' && $val!=null) $query->whereMonth('dra.UpdateAt', '=', $month->format('m'));            
                                }
                                else
                                {
                                    if($val!='' && $val!=null) $query->whereMonth('dra.UpdateAt', '=', '');
                                }            
                            }           
                        }                
                    }
                    else
                    {
                        if($key == "dra__UpdateAt")
                        {
                            if($val!='' && $val!=null)
                            {
                                $date = str_replace('.', '-', $val);
                                $yearConvertDigits = Carbon::createFromFormat('d-m-y', $date);
                                $yearFormats = $yearConvertDigits->format('d-m-Y');
                                
                                $val = date('Y-m-d', strtotime($yearFormats));  
                                if($val!='' && $val!=null) $query->where('dra.UpdateAt', 'like', '%'.$val.'%');
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
        $item = DB::table('deviation_risk_assesment as dra')
            ->select(
                'dra.*',
                'usr.UserName as UserEntry'
            )
            ->leftjoin('users as usr','usr.Id','=','dra.UserEntry')
            ->where('dra.Actived',1)
            ->where('dra.Id',$request->input('Id'))
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

        $isExist = $this->AppWeb->checkDataOneCol('deviation_risk_assesment','RiskAssesment',$request->input('RiskAssesment'));
        if($isExist>0) {
            return json_encode(array(
                'status'=>false,
                'message'=>'Data Risk Assesment Sudah Ada!',
                'validation'=>$validation->errors(),
            ));
        }

        DB::begintransaction();
        try{
            DB::table('deviation_risk_assesment')
                ->insert([
                    'Value'=>$request->input('Value'),
                    'Question'=>$request->input('Question'),
                    'RiskAssesment'=>$request->input('RiskAssesment'),
                    'AssesmentGroup'=>strtoupper($request->input('AssesmentGroup')),
                    'UserEntry'=>session('adminvue')->Id,
                ]);

            $this->History->store(18,1,json_encode($requestData));
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
        $item = DB::table('deviation_risk_assesment')
            ->select('*')
            ->where('Actived',1)
            ->where('Id',$request->input('Id'))
            ->first();

        if($item!=null) $item->AssesmentGroup = ['value'=>$item->AssesmentGroup,'text'=>$item->AssesmentGroup];
        // else $item->AssesmentGroup = ['value'=>null,'text'=>null];

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

        $item = DB::table('deviation_risk_assesment')
            ->select('RiskAssesment')
            ->where('Actived',1)
            ->where('Id',$request->input('Id'))
            ->first();

        if($item->RiskAssesment!=$request->input('RiskAssesment')) {
            $isExist = $this->AppWeb->checkDataOneCol('deviation_risk_assesment','RiskAssesment',$request->input('RiskAssesment'));
            if($isExist>0) {
                return json_encode(array(
                    'status'=>false,
                    'message'=>'Data Risk Assesment Sudah Ada!',
                    'validation'=>$validation->errors(),
                ));
            }
        }

        DB::begintransaction();
        try{
            DB::table('deviation_risk_assesment')
            ->where('Id', $request->input('Id'))
            ->update([
                'Value'=>$request->input('Value'),
                'Question'=>$request->input('Question'),
                'RiskAssesment'=>$request->input('RiskAssesment'),
                'AssesmentGroup'=>strtoupper($request->input('AssesmentGroup'))
            ]);

            $this->History->store(18,2,json_encode($requestData));
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
        $item = DB::table('deviation_risk_assesment')
            ->select('*')
            ->where('Id', $request->input('Id'))
            ->first();

        $isData = DB::table('noe_verif_evaluation')
            ->select('Id')
            ->where('IdDevRiskAssesment', 'LIKE','%"Id":'.$request->input('Id').'%')
            ->orWhere('IdDevRiskAssesment2', 'LIKE','%"Id":'.$request->input('Id').'%')
            ->orWhere('IdDevRiskAssesment3', 'LIKE','%"Id":'.$request->input('Id').'%')
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
            DB::table('deviation_risk_assesment')
                ->where('Id', $request->input('Id'))
                ->update([
                    'Actived'=>0
                ]);

            $this->History->store(18,3,json_encode($item));
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
            'Value'=>'required',
            'Question'=>'required',
            'RiskAssesment'=>'required',
            'AssesmentGroup'=>'required'
        ];
    }

}
