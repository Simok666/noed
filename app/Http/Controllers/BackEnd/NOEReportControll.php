<?php

namespace App\Http\Controllers\BackEnd;

use Laravel\Passport\Passport;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use App\Helper;
use Validator;
use Carbon\Carbon;
use App\Http\Controllers\Utils\AppWebControll;
use App\Http\Controllers\Utils\UploadFileControll;
use PDF;

class NOEReportControll extends Controller
{
    protected $AppWeb;
    protected $History;
    protected $UploadFile;
    protected $MainDB;

    public function __construct() {
        $this->AppWeb = new AppWebControll();
        $this->History = new HistoryControll();
        $this->Helper = new Helper();
        $this->UploadFile = new UploadFileControll();
        $this->MainDB = DB::connection('mysql');
    }

    public function index(Request $request) {
    	$sortRules = $request->input('sort');
        $limit = $request->input('per_page');
        $searchValue = json_decode($request->input('search'));
        list($field, $dir) = explode('|', $sortRules);
       
        $item = DB::table('noe_report as noe')
            ->select(
                'noe.Id as id',
                'nev.RelevantDept'
            )
            ->leftjoin('noe_verif_evaluation as nev','nev.IdNOEReport','=','noe.Id')
            ->where('noe.Actived','>',0)
            ->where('nev.TypeData', 0)
            ->get();
        
        $query = DB::table('noe_report as noe')
            ->select(
                'noe.Id as id',
                'noe.NOENumber',
                'noe.NOENumberAcc',
                'noe.IdTypeIncident',
                'loc.Name as Location',
                'noe.Date',
                'pdc.Name as Product',
                'noe.BatchNo',
                'noe.Event',
                'noe.Status',
                'noe.IsClosed',
                'noe.IsPublish',
                'usr.UserName as UserEntry',
                'noe.CreateAt',
                'noe.UpdateAt',
                'noe.IsCorrection',
                'emp.Name as Employee',
                'usr.Id as IdUser',
                'pst.Id'
            )
            ->leftjoin('product as pdc','pdc.Id','=','noe.IdProduct')
            ->leftjoin('location as loc','loc.Id','=','noe.IdLocation')
            ->leftjoin('users as usr','usr.Id','=','noe.UserEntry')
            ->leftjoin('employee as emp','emp.Id','=','usr.IdEmployee')
            ->leftjoin('position as pst','pst.Id','=','noe.IdPosition')
            // ->orderBy(DB::raw('ISNULL(noe.NOENumberAcc), NOENumberAcc'), 'ASC')
            // ->orderBy('noe.NOENumber','DESC')
            ->orderBy($field, $dir)
            ->where(function ($query) use ($item) {

                if(session('adminvue')->TypeUser==8 || session('adminvue')->IdDepartment == 67 || session('adminvue')->TypeUser == 19) {
                    $query->where('noe.Status','>=',1);
                    $query->where('noe.Actived','>',0);
                } else {
                    $valPosition = session('adminvue')->CodePosition;
                    $exp = explode('.', $valPosition);
                   
                    if(strpos(strtolower($exp[1]), 'dh') !== false) {
                        // $Dept = [];
                        if(count($item)>0) { foreach ($item as $val) {
                            $isDept = false;
                            $RelevantDept = json_decode($val->RelevantDept);
                            // $isRelevant = count($RelevantDept);
                            // dd($isRelevant);
                            if($RelevantDept) { foreach ($RelevantDept as $v) {
                                if($v->Id == session('adminvue')->IdDepartment) {
                                    $isDept = true;
                                }
                            } }

                            if($isDept) {
                                $query->orWhere('noe.Id', $val->id);
                                // $Dept[] = $val->id;
                            }
                        } } //dd($Dept);
                    }

                    $query->orWhere('noe.IdDepartment',session('adminvue')->IdDepartment);                       
                    $query->where('noe.Actived','>',0);
                   
                }
            });            

        if ($searchValue) {
            $query->where(function($query) use ($searchValue) {
                foreach ($searchValue as $key=>$val) {
                    // if there is request input periode
                    if ($key == "noe__Month" || $key == "noe__Year")
                    {
                        if($val!='' && $val!=null)
                        {
                            if($key == "noe__Year")
                            {   
                                $yearConvertDigits = Carbon::createFromFormat('y', $val);
                                $searchData = $yearConvertDigits->format('Y');
                                if($searchData!='' && $searchData!=null) $query->where('noe.Date', 'like', '%'.$searchData.'%');            
                            }
                            else
                            {
                                $month = Carbon::createFromFormat('m', $val);        
                                if($val!='' && $val!=null) $query->whereMonth('noe.Date', '=', $month->format('m'));            
                            }           
                        }            
                    }
                    else 
                    {
                        if($key == "noe__Date" && !empty($val))
                        {
                            if($val!='' && $val!=null)
                            {
                                $date = str_replace('.', '-', $val);
                                $yearConvertDigits = Carbon::createFromFormat('d-m-y', $date);
                                $yearFormats = $yearConvertDigits->format('d-m-Y');
                                    
                                $val = date('Y-m-d', strtotime($yearFormats));
                            }
                            if($val!='' && $val!=null) $query->where('noe.Date', 'like', '%'.$val.'%');
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

        session()->put('ExportDataNOE',$data);

        return $data;
    }

    public function getProduct(Request $request) {
        $item = $this->MainDB->table('product')
            ->select('Id','Name as Product')
            ->where('Actived',1)
            ->get();

        return json_encode(array(
            'status'=>true,
            'data'=>$item,
        ));
    }

    public function getLocation(Request $request) {
        $item = $this->MainDB->table('location')
            ->select('Id','Name as Location')
            ->where('Actived',1)
            ->get();

        return json_encode(array(
            'status'=>true,
            'data'=>$item,
        ));
    }

    public function getIncident(Request $request) {
        $item = DB::table('event_incident')
            ->select('Id','Name as TypeIncident')
            ->where('Actived',1)
            ->get();
        
        return json_encode(array(
            'status'=>true,
            'data'=>$item,
        ));
    }

    public function getPublish(Request $request)
    {
        $publish = json_decode(session('adminvue')->ParentPosition);
        $status = true;
        if(getType($publish) != 'array')
        {
            $publish = array(array("Id" => "0", "Name" => "Atasan Posisi belum diisi"));    
            $status = false;
        }
        
        return response()->json([
            'status'=>$status,
            'data'=>$publish,
        ]); 
    }

    public function genNumber($request) {
        $Date = $request->input('Date');
        $item = $this->MainDB->table('department')
            ->select('Code')
            ->where('Actived',1)
            ->where('Id',session('adminvue')->IdDepartment)
            ->first();

        $Code = $item?$item->Code:'00';

        $itemLast = DB::table('noe_report')
            ->select('NOENumber')
            ->orderBy('Id','DESC')
            ->where('IdDepartment',session('adminvue')->IdDepartment)
            ->where('Actived',1)
            ->first();

        $newNumber = 0;
        if($Date!=null && $Date!='null') $YYYY = Carbon::parse($Date)->format('Y');
        else $YYYY = date("Y");

        if($itemLast != null) {
            if($itemLast->NOENumber!=null) {
                $num = explode('-', $itemLast->NOENumber);
                $numAgain = explode('/', $num[1]);
                $lastNumber = (int)$numAgain[0];
                if($numAgain[3] == $YYYY) {
                    $newNumber = $lastNumber+1;
                } else {
                    $newNumber = 1;
                }
            }
        } else {
            $newNumber = 1;
        }
        
        $NNN = str_pad($newNumber, 3, "0", STR_PAD_LEFT);
        if($Date!=null && $Date!='null') $BL = $this->AppWeb->convertMonthRomawi(Carbon::parse($Date)->format('n'));
        else $BL = $this->AppWeb->convertMonthRomawi(date("n"));
        $result = $Code.'-'.$NNN.'/DRF/'.$BL.'/'.$YYYY;

        return $result;
    }

    public function generateNumber(Request $request) {
        $result = $this->genNumber($request);

        return json_encode(array(
            'status'=>true,
            'data'=>$result,
        ));
    }

    public function sendAnswer(Request $request)
    {
    	$requestData = $request->all();
        
        $validation = Validator::make($request->all(), $this->validationCorrection(),
            $messages = ['required' => 'This field is required.']);

        if ($validation->fails() || $request->input('Answer') == null || empty($request->input('Answer'))) {
            return json_encode(array(
                'status'=>false,
                'message'=>'Silahkan lengkapi kolom *Wajib Diisi',
                'validation'=>$validation->errors(),
            ));
        }
        
        DB::begintransaction();
        try {

            DB::table('correction')
                ->where('Number', $request->input('NoeNumber'))
                ->whereNull('Answer')
                ->update([
                    'Answer'=>$request->input('Answer')
                ]);

                DB::table('noe_report')
                ->where('NOENumber', $request->input('NoeNumber'))
                ->update([
                    'IsCorrection'=>0
                ]);

            DB::commit();
            $this->History->store(24,2,json_encode($requestData));
            
        } catch (\Throwable $th) {
            DB::rollback();
            return json_encode(array(
                'status'=>false,
                'message'=>'Simpan Data Gagal, Server Invalid!',
                'validation'=>$validation->errors(),
            ));
        }

        return response()->json([
            'status'=>true,
            'message'=>'Simpan Data Sukses!',
        ]);
    }

    public function store(Request $request) {
    	$requestData = $request->all();
        
        $validation = Validator::make($request->all(),$this->validation(),
            $messages = ['required' => 'This field is required.']);
        
        if ($validation->fails() || $request->input('IdProduct') == null || $request->input('IdLocation') == null || $request->input('IdTypeIncident') == null || $request->input('IdTypeIncident') == 'undefined' || $request->input('IdPublish') == null) {
            return json_encode(array(
                'status'=>false,
                'message'=>'Silahkan lengkapi kolom *Wajib Diisi',
                'validation'=>$validation->errors(),
            ));
        }

        $EventFile = [];
        if($request->has('EventFile') && $request->file('EventFile')!=null) {
            $arrFile = $request->file('EventFile');
            foreach($arrFile as $key=>$val) {
                if(pathinfo($val->getClientOriginalName(), PATHINFO_EXTENSION)) {
                    $EventFile[$key] = $this->UploadFile->uploadFile($val,5); //5 path noe-report
                }
            }
        }

        if(count($EventFile) > 0) {
            $EventFile = json_encode($EventFile);
        } else {
            $EventFile = json_encode($EventFile);
        }

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

        $Date = $request->input('Date').' '.$request->input('Time');
        $dueDate = $request->input('DueDate').' '.$request->input('DueTime');
        $NOENumber = $this->genNumber($request);
        
        DB::begintransaction();
        try{
            DB::table('noe_report')
                ->insert([
                    'NOENumber'=>$NOENumber,
                    'Date'=>Carbon::parse($Date)->format('Y-m-d H:i:s'),
                    'BatchNo'=>$request->input('BatchNo'),
                    'IdDepartment'=>session('adminvue')->IdDepartment,
                    'IdPosition'=>session('adminvue')->IdPosition,
                    'IdProduct'=>$request->input('IdProduct'),
                    'IdLocation'=>$request->input('IdLocation'),
                    'IdTypeIncident'=>$request->input('IdTypeIncident'),
                    'IdPublish'=>$request->input('IdPublish'),
                    'Event'=>$request->input('Event'),
                    'CorrectiveAction'=>$request->input('CorrectiveAction'),
                    'EventFile'=>$EventFile,
                    'CorrectiveActionFile'=>$CorrectiveActionFile,
                    'UserEntry'=>session('adminvue')->Id,
                    'UserUpdate'=>session('adminvue')->Id,
                    'due_date'=> Carbon::parse($dueDate)->format('Y-m-d H:i:s')
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
        $item = DB::table('noe_report as noe')
            ->select(
                'noe.*',
                'pdc.Name as Product',
                'loc.Name as Location',
                'pst.Name as PositionName' 
            )
            ->leftjoin('product as pdc','pdc.Id','=','noe.IdProduct')
            ->leftjoin('location as loc','loc.Id','=','noe.IdLocation')
            ->leftjoin('position as pst','pst.Id','=','noe.IdPublish')
            ->where('noe.Actived',1)
            ->where('noe.Id',$request->input('Id'))
            ->first();
        
        if(!empty($item)) {
            $item->IdProduct = ['Id'=>$item->IdProduct,'Product'=>$item->Product];
            $item->IdLocation = ['Id'=>$item->IdLocation,'Location'=>$item->Location];
            $item->IdTypeIncident = json_decode($item->IdTypeIncident, true);
            $item->IdPublish = ['Id'=>$item->IdPublish, 'Name'=>$item->PositionName];
            $FileEvent = json_decode($item->EventFile);
            $item->FileEvent = $FileEvent;
            $FileCorrectiveAction = json_decode($item->CorrectiveActionFile);
            $item->FileCorrectiveAction = $FileCorrectiveAction;
            $item->Time = Carbon::parse($item->Date)->format('H:i:s');
            $item->Date = Carbon::parse($item->Date)->format('Y-m-d');
            $item->dueDate = Carbon::parse($item->due_date)->format('Y-m-d');
            $item->dueTime = Carbon::parse($item->due_date)->format('H:i:s');
            
            $FileEventDownload = [];
            foreach ($FileEvent as $key => $val) {
                $arr = [];
                if($val) {
                    $result = explode("/",$val);
                    array_push($arr, $result[4]);
                }
                array_push($arr, $val);
                array_push($FileEventDownload, $arr);
            }
            $item->FileEventDownload = $FileEventDownload;

            $FileCorrectiveActionDownload = [];
            if(!empty($FileCorrectiveAction)) { foreach ($FileCorrectiveAction as $key => $val) {
                $arr = [];
                if($val) {
                    $result = explode("/",$val);
                    array_push($arr, $result[4]);
                }
                array_push($arr, $val);
                array_push($FileCorrectiveActionDownload, $arr);
            } }
            $item->FileCorrectiveActionDownload = $FileCorrectiveActionDownload;
        }

        $isButton = false;
        if($item->UserEntry === session('adminvue')->Id) $isButton = true;
        $isCorrection = false;
        if($item->IsCorrection == 1) $isCorrection = true;
        
        return json_encode(array(
            'status'=>true,
            'data'=>$item,
            'isButton'=>$isButton,
            'isCorrection'=>$isCorrection
        ));
    }

    public function update(Request $request) {
        $requestData = $request->all();
        $validation = Validator::make($request->all(),$this->validation(),
            $messages = ['required' => 'This field is required.']);
        
        if ($validation->fails() || $request->input('IdProduct') == null || $request->input('IdLocation') == null || $request->input('IdTypeIncident') == null || $request->input('IdTypeIncident') == '[]' || $request->input('IdPublish') == null) {
            return json_encode(array(
                'status'=>false,
                'message'=>'Silahkan lengkapi kolom *Wajib Diisi',
                'validation'=>$validation->errors(),
            ));
        }

        $EventFile = [];
        if($request->has('EventFile') && $request->file('EventFile')!=null) {
            $arrFile = $request->file('EventFile');
            foreach($arrFile as $key=>$val) {
                if(pathinfo($val->getClientOriginalName(), PATHINFO_EXTENSION)) {
                    $EventFile[$key] = $this->UploadFile->uploadFile($val,5); //5 path noe-report
                }
            }
        }

        $OldEventFile = json_decode($request->input('OldEventFile'));
        foreach($OldEventFile as $key=>$val){
            array_push($EventFile,$val);
        }

        if(count($EventFile) > 0) {
            $EventFile = json_encode($EventFile);
        } else {
            $EventFile = '';
        }

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

        $Date = $request->input('Date').' '.$request->input('Time');
        $dueDate = $request->input('DueDate').' '.$request->input('DueTime');
        
        DB::begintransaction();
        try{
            DB::table('noe_report')
            ->where('Id', $request->input('Id'))
            ->update([
                'Date'=>Carbon::parse($Date)->format('Y-m-d H:i:s'),
                'BatchNo'=>$request->input('BatchNo'),
                'IdProduct'=>$request->input('IdProduct'),
                'IdLocation'=>$request->input('IdLocation'),
                'IdTypeIncident'=>$request->input('IdTypeIncident'),
                'IdPublish'=>$request->input('IdPublish'),
                'Event'=>$request->input('Event'),
                'CorrectiveAction'=>$request->input('CorrectiveAction'),
                'EventFile'=>$EventFile,
                'CorrectiveActionFile'=>$CorrectiveActionFile,
                'UserUpdate'=>session('adminvue')->Id,
                'due_date'=> Carbon::parse($dueDate)->format('Y-m-d H:i:s')
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

    public function delete(Request $request) {
        $item = DB::table('noe_report')
            ->select('*')
            ->where('Id', $request->input('Id'))
            ->first();

        DB::begintransaction();
        try{
            DB::table('noe_report')
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

    public function getCorrection(Request $request)
    {
        $getNumber = DB::table('noe_report')
        ->select('NOENumber', 'IsCorrection')
        ->where('Id', $request->input('Id'))
        ->first();

        $getCorrector = [];

        $query = DB::table('correction as crt')
        ->select('crt.*','pst.Name as CorrectorName')
        ->leftjoin('users as usr','usr.Id','=','crt.UserEntry')
        ->leftJoin('employee as emp','emp.Id','=','usr.IdEmployee')
        ->leftJoin('position as pst','pst.Id','=','emp.IdPosition')
        ->where('crt.Number', $getNumber->NOENumber)
        ->where('crt.Actived', '>', 0)
        ->whereNull('crt.Answer')
        ->orderBy('crt.Id','DESC')
        ->first();
        array_push($getCorrector, $query);     

        $getHistoricalData = DB::table('correction')
        ->select('*','pst.Name')
        ->leftJoin('users as usr','usr.Id','=','correction.UserEntry')
        ->leftJoin('employee as emp','emp.Id','=','usr.IdEmployee')
        ->leftJoin('position as pst','pst.Id','=','emp.IdPosition')
        ->where('correction.Number', $getNumber->NOENumber)
        ->where('correction.Actived', '>', 0)
        ->whereNotNull('correction.Answer')
        ->orderBy('correction.Id','DESC')
        ->get(); 
       
        $countData = count((array)$query);
        $arrData = [];
        if($query !== null)
        {
            $getEmployee = DB::table('users as usr')
            ->select('*')
            ->leftJoin('employee as emp','emp.Id','=','usr.IdEmployee')
            ->leftJoin('position as pst','pst.Id','=','emp.IdPosition')
            ->where('usr.Id', $query->UserEntry)
            ->first();
            
            $arrData = [
                'TypeData' => $query->TypeData,
                'Number' => $query->Number,
                'Description' => $query->Description,
                'Name' => $getEmployee->Name,
                'Answer' => $query->Answer,
                'IsCorrection' => $getNumber->IsCorrection,
                'TypeUser' => $query->TypeUser,
                'ChildToAnswer' => $query->ChildToAnswer,
                'SessionTypeUser' => session('adminvue')->TypeUser,
                'SessionIdPosition' => session('adminvue')->IdPosition
            ];
        }
        
        return response()->json([
            'data' => $arrData,
            'history' => $getHistoricalData,
            'count' => $countData,
            'correction' => $getCorrector
        ]);
    }

    public function getRealCorrection ($id) {
        $getNumber = DB::table('noe_report')
        ->select('NOENumber')
        ->where('Id', $id)
        ->first();
       
        $query = DB::table('correction')
        ->select('*')
        ->where('Number', $getNumber->NOENumber)
        ->where('Actived', '>', 0)
        ->whereNull('Answer')
        ->orderBy('Id','DESC')
        ->first();

        $arrData = [];
        if($query !== null)
        {
            $getEmployee = DB::table('users as usr')
            ->select('*')
            ->leftJoin('employee as emp','emp.Id','=','usr.IdEmployee')
            ->leftJoin('position as pst','pst.Id','=','emp.IdPosition')
            ->where('usr.Id', $query->UserEntry)
            ->first();
            
            $arrData = [
                'TypeData' => $query->TypeData,
                'Number' => $query->Number,
                'Description' => $query->Description,
                'Name' => $getEmployee->Name,
                'Answer' => $query->Answer,
                'TypeUser' => $query->TypeUser,
                'ChildToAnswer' => $query->ChildToAnswer,
                'SessionTypeUser' => session('adminvue')->TypeUser,
                'SessionIdPosition' => session('adminvue')->IdPosition
            ];
        }

        return response()->json([
            'data' => $arrData
        ]);
    }

    public function getLocationByNobets(Request $request)
    {
        $value = $request->input('Value');
        
        $filterVal = '';
        if(strlen($value) == 6)
        {
            $getPrefixVal = substr($value, 0, 1);
            $filterVal = $getPrefixVal;  
        }
        elseif (strlen($value) == 7 ) 
        {
            $filterVal = $value;
        }
        else
        {
            $filterVal = $value;
        }
        
        $query = [];
        if(!empty($filterVal)){
            $query = DB::table('location')
            ->select('Id','Name as Location')
            ->where(function ($query) use($filterVal){
                if (strlen($filterVal) == 1 && $filterVal != '-')
                {
                    $query->where('Prefix','like','%{"value":"'.$filterVal.'"%');  
                }
                elseif (strlen($filterVal) == 7)
                {
                    $query->where('Prefix', '=', ''); 
                }
            })
            ->where('Actived',1)
            ->orderBy('Name', 'ASC')
            ->get();
        }
       
        return response()->json([
            'data' => $query,
        ]);
    }

    function validation(){
        return [
            'NOENumber'=>'required',
            'Date'=>'required',
            'Time'=>'required',
            'BatchNo'=>'required',
            'IdProduct'=>'required',
            'IdLocation'=>'required',
            'IdTypeIncident'=>'required',
            'Event'=>'required',
            'CorrectiveAction'=>'required',
            'IdPublish'=>'required',
            'DueDate'=>'required',
            'DueTime'=>'required'
        ];
    }

    function validationCorrection()
    {
        return [
            'Answer' => 'required'
        ];
    }

    public function publish(Request $request) {
        $item = DB::table('noe_report as noe')
            ->select('noe.*','pdc.Name as Product','loc.Name as Location','crt.Number')
            ->leftjoin('product as pdc','pdc.Id','=','noe.IdProduct')
            ->leftjoin('location as loc','loc.Id','=','noe.IdLocation')
            ->leftjoin('correction as crt','crt.Number','=','noe.NOENumber')
            ->where('noe.Id', $request->input('Id'))
            ->first();
        
        $getAnswer = DB::table('correction as crt')  
                ->select('crt.Answer','crt.UserEntry')
                ->whereNotNull('crt.Answer')->latest('crt.CreateAt')
                ->where('crt.Number', $item->NOENumber)
                ->first();
        
        $itemPosition = DB::table('position')
            ->select('Id','Status','Name')
            ->where('Id', $item->IdPublish)
            ->where('IdDepartment', session('adminvue')->IdDepartment)
            ->where('Actived', 1)
            ->first();
    
        if($itemPosition==null) $isActive = 0;
        else $isActive = $itemPosition->Status;
    
        $Status = 2; //2: Dilaporkan ke Unit Head
        if(!$isActive) $Status = 3; //3: Dilaporkan ke Sect Head

        if($item->DatePublish==null) {
            $arrUpdate = [
                'Status'=>$Status,
                'DatePublish'=>Carbon::now()->format('Y-m-d')
            ];
        } else {
            $arrUpdate = ['Status'=>$Status];
        }
        
        DB::begintransaction();
        try{
            DB::table('noe_report')
            ->where('Id', $request->input('Id'))
            ->update($arrUpdate);

            try{

                if($isActive && $itemPosition !=null) {
                    $IdPosition = $itemPosition->Id;
                } else {
                    $itemPosition = DB::table('position')
                        ->select('Id')
                        ->where('Code', 'like', '%'.'.sch')
                        ->where('IdDepartment', session('adminvue')->IdDepartment)
                        ->where('Actived', 1)
                        ->first();

                    if($itemPosition!=null) $IdPosition = $itemPosition->Id;
                    else $IdPosition = 0;
                }
                
                if($IdPosition!=0) {
                    $itemMail = $this->MainDB->table('employee as emp')
                        ->select('emp.Name as Employee','emp.Email')
                        ->where('emp.IdPosition', $IdPosition)
                        ->where('emp.Actived', 1)
                        ->get();
                    
                    if($getAnswer != null)
                    {
                        $noeAnswer = $getAnswer->Answer;
                        $this->Helper->sendEmail($item, $noeAnswer, $request, $itemMail, $Status);
                    }
                    else
                    {
                        $this->Helper->sendEmail($item, $noeAnswer=null, $request, $itemMail, $Status);
                    }

                    
                }

                $this->History->store(24,4,json_encode($item));
                DB::commit();
            }catch (Exception $e){
                return json_encode(array(
                    'status'=>false,
                    'message'=>'Publish Data Gagal, Pengiriman Email Invalid!',
                    'validation'=>$validation->errors(),
                ));
            }
        }catch (Exception $e){
            DB::rollback();
            return json_encode(array(
                'status'=>false,
                'message'=>'Publish Data Gagal, Invalid Server Side!',
            ));
        }

        return json_encode(array(
            'status'=>true,
            'message'=>'Publish Data Sukses!',
        ));
    }

    public function export($id){
        $itemReport = DB::table('noe_report as noe')
            ->select(
                'noe.*',
                'pdc.Name as Product',
                'loc.Name as Location',
                'emp.Name as UserEntry',
                'nvf.Verified',
                'nvf.OtherCorrectAction',
                'nvf.RelevantDept',
                'nvf.IdDevRiskAssesment',
                'nvf.IdDevRiskAssesment2',
                'nvf.IdDevRiskAssesment3',
                'dvl.Level as DeviationLevel',
                'dvl.MaxValue as DeviationLevelScore',
                'nvf.OtherProductAffect',
                'nvf.DescriptionOPA',
                'nvf.Status as StatusVerif',
                'emp1.Name as UserEntryVerif',
                'nvf.Date as DateVerif',
                'nvf.DescriptionRejected as DescriptionRejectedVerif',
                'nvf.StatusDept as StatusDeptVerif',
                'emp2.Name as UserDeptVerif',
                'nvf.DateDept as DateDeptVerif',
                'nvf.DescriptionRejectedDept as DescriptionRejectedDeptVerif',
                'nev.IdDeviation',
                'nev.DeviationLevelQA',
                'nev.DescriptionEvaluation',
                'nev.NOEClassification',
                'nev.Status as StatusEvaluation',
                'emp3.Name as UserEntryEvaluation',
                'nev.Date as DateEvaluation',
                'nev.DescriptionRejected as DescriptionRejectedEvaluation',
                'nev.StatusDept as StatusDeptEvaluation',
                'emp4.Name as UserDeptEvaluation',
                'nev.DateDept as DateDeptEvaluation',
                'nev.DescriptionRejectedDept as DescriptionRejectedDeptEvaluation'
            )
            ->join('noe_verif_evaluation as nvf','nvf.IdNOEReport','=','noe.Id')
            ->join('noe_verif_evaluation as nev','nev.IdNOEReport','=','noe.Id')
            ->leftjoin('product as pdc','pdc.Id','=','noe.IdProduct')
            ->leftjoin('location as loc','loc.Id','=','noe.IdLocation')
            ->leftjoin('users as usr','usr.Id','=','noe.UserEntry')
            ->leftjoin('employee as emp','emp.Id','=','usr.IdEmployee')
            ->leftjoin('deviation_level as dvl','dvl.Id','=','nvf.DeviationLevel')
            ->leftjoin('users as usr1','usr1.Id','=','nvf.UserEntry')
            ->leftjoin('employee as emp1','emp1.Id','=','usr1.IdEmployee')
            ->leftjoin('users as usr2','usr2.Id','=','nvf.UserDept')
            ->leftjoin('employee as emp2','emp2.Id','=','usr2.IdEmployee')
            ->leftjoin('users as usr3','usr3.Id','=','nev.UserEntry')
            ->leftjoin('employee as emp3','emp3.Id','=','usr3.IdEmployee')
            ->leftjoin('users as usr4','usr4.Id','=','nev.UserDept')
            ->leftjoin('employee as emp4','emp4.Id','=','usr4.IdEmployee')
            ->where('noe.Actived',1)
            ->where('noe.Id',$id)
            ->where('nvf.Actived',1)
            ->where('nvf.TypeData',0)
            ->where('nev.Actived',1)
            ->where('nev.TypeData',1)
            ->first();
       
        if(!empty($itemReport)) {
            $TypeIncident = json_decode($itemReport->IdTypeIncident, true);
            $result = '';
            foreach ($TypeIncident as $key => $val) {
                if($val['TypeIncident']) {
                    $result .= $val['TypeIncident'].'; ';
                }
            }
            $itemReport->IdTypeIncident = $result;
            if($itemReport->Date) $itemReport->Date = \DateTime::createFromFormat('Y-m-d H:i:s', $itemReport->Date)->format('d.m.y H:i');
            if($itemReport->CreateAt) $itemReport->CreateAt = \DateTime::createFromFormat('Y-m-d H:i:s', $itemReport->CreateAt)->format('d.m.y');

            $RelevantDept = json_decode($itemReport->RelevantDept, true);
            $resultDept = '';
            if($RelevantDept) {
                foreach ($RelevantDept as $key => $val) {
                    if($val['RelevantDept']) {
                        $resultDept .= $val['RelevantDept'].'; ';
                    }
                }
            }
            $itemReport->RelevantDept = $resultDept;
            $itemReport->IdDevRiskAssesment = json_decode($itemReport->IdDevRiskAssesment, true);
            $itemReport->IdDevRiskAssesment2 = json_decode($itemReport->IdDevRiskAssesment2, true);
            $itemReport->IdDevRiskAssesment3 = json_decode($itemReport->IdDevRiskAssesment3, true);
            if($itemReport->DateVerif) $itemReport->DateVerif = \DateTime::createFromFormat('Y-m-d H:i:s', $itemReport->DateVerif)->format('d.m.y');
            if($itemReport->DateDeptVerif) $itemReport->DateDeptVerif = \DateTime::createFromFormat('Y-m-d H:i:s', $itemReport->DateDeptVerif)->format('d.m.y');

            if($itemReport->DateEvaluation) $itemReport->DateEvaluation = \DateTime::createFromFormat('Y-m-d H:i:s', $itemReport->DateEvaluation)->format('d.m.y');
            if($itemReport->DateDeptEvaluation) $itemReport->DateDeptEvaluation = \DateTime::createFromFormat('Y-m-d H:i:s', $itemReport->DateDeptEvaluation)->format('d.m.y');
        }

        $dtHeader = DB::table('setting_header')
            ->select('*')
            ->where('Type',0)
            ->where('Actived',1)
            ->first();

        $Title = "Data NOE";
        $Header = "Laporan Kejadian (NOE)";
        $SubHeader = "Notice Of Event";

        $view = view('export-pdf.header-noe-nod',compact('Title','Header','SubHeader','dtHeader'))->render();
        $view .= view('export-pdf.data-noe',compact('itemReport'))->render();
        $view .= view('export-pdf.footer-noe-nod')->render();
        $pdf = PDF::loadHTML($view);
        $dom_pdf = $pdf->getDomPDF();
        $dom_pdf->setPaper('A4');

        $header = DB::table('setting_header')
            ->select('Title')
            ->where('Type', 2)
            ->where('Actived', 1)
            ->first();

        $canvas = $dom_pdf ->get_canvas();
        $canvas->page_text(257, 10, "Halaman {PAGE_NUM} dari {PAGE_COUNT}", null, 10, array(0, 0, 0));
        // $canvas->page_text(35, 815, $header->Title .' '. $_SERVER['HTTP_HOST'], null, 10, array(0, 0, 0));
        $canvas->page_text(35, 815, $header->Title, null, 10, array(0, 0, 0));
        return $pdf->stream();
    }

    function descriptionReject(Request $request) {
        $item = DB::table('noe_verif_evaluation')
            ->select('DescriptionRejectedDept as Description')
            ->where('DescriptionRejectedDept','<>',null)
            ->where('IdNOEReport',$request->Id)
            ->where('Actived',1)
            ->first();
        $Description = 'Deskripsi tidak tertulis';
        if($item!=null) $Description = $item->Description;
        
        return json_encode(array(
            'status'=>true,
            'data'=>$Description,
        ));
    }

}
