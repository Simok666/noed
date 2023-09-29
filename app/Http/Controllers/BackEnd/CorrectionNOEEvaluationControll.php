<?php

namespace App\Http\Controllers\BackEnd;

use Laravel\Passport\Passport;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use Validator;
use App\Helper;
use App\Http\Controllers\Utils\UploadFileControll;
use App\Http\Controllers\Utils\AppWebControll;

class CorrectionNOEEvaluationControll extends Controller
{
    protected $UploadFile;
    protected $History;
    protected $MainDB;
    protected $AppWeb;

    public function __construct() {
        $this->UploadFile = new UploadFileControll();
        $this->History = new HistoryControll();
        $this->Helper = new Helper();
        $this->MainDB = DB::connection('mysql');
        $this->AppWeb = new AppWebControll();
    }

    public function index(Request $request) {
    	$sortRules = $request->input('sort');
        $limit = $request->input('per_page');
        $searchValue = $request->input('search');
        list($field, $dir) = explode('|', $sortRules);
        
        $getChildName = DB::table('position')
            ->select('Id','Code','Status')
            ->where('Parent', session('adminvue')->IdPosition)
            ->where('Actived', 1)
            ->first();

        $getAdmin = null;
        if(session('adminvue')->TypeUser == 14 || session('adminvue')->TypeUser == 15)
        {
            $getChildAll = DB::table('position')
            ->select('Id','Code','Status')
            ->where('Parent', session('adminvue')->IdPosition)
            ->where('Actived', 1)
            ->get();
            
            $getChilIds = [];
            foreach ($getChildAll as $key => $value) {
                $getChilIds[$key] = $value->Id; 
            }

            if(session('adminvue')->TypeUser == 15)
            {
                $getUnitHead = DB::table('position')
                ->select('Id','Code','Status')
                ->whereIn('Parent', $getChilIds)
                ->where('Actived', 1)
                ->get();

                $getUnitHeadChilds = [];

                foreach ($getUnitHead as $key => $value) {
                    $getUnitHeadChilds[$key] = $value->Id; 
                }

                $getAdmin = DB::table('position')
                ->select('Id','Code','Status')
                ->whereIn('Parent', $getUnitHeadChilds)
                ->where('Actived', 1)
                ->get();
            }
            else
            {
                $getAdmin = DB::table('position')
                ->select('Id','Code','Status')
                ->whereIn('Parent', $getChilIds)
                ->where('Actived', 1)
                ->get();
            }
        }
        
        $query = DB::table('correction as crt')
            ->select(
                'crt.Id as id',
                'crt.Number',
                'crt.Description',
                'emp.Name as UserEntry',
                'crt.CreateAt'
            )
            ->leftjoin('users as usr','usr.Id','=','crt.UserEntry')
            ->leftjoin('employee as emp','emp.Id','=','usr.IdEmployee')
            ->leftjoin('noe_report as noe','noe.NOENumber','=','crt.Number')
            ->orderBy($field, $dir)
            ->where(function ($query) use ($getChildName, $getAdmin){
                if(session('adminvue')->TypeUser!=8 && session('adminvue')->IdDepartment != 67 && session('adminvue')->TypeUser != 19) {
                    $query->where('emp.IdDepartment',session('adminvue')->IdDepartment);
                }
                if($getChildName !== null)
                {   
                    if(session('adminvue')->TypeUser == 14 || session('adminvue')->TypeUser == 15)
                    {
                        $getAdminAllId = $getAdmin->pluck('Id')->toArray();
                        $query->WhereIn('noe.IdPosition', $getAdminAllId);
                    }else
                    {
                        if(session('adminvue')->IdDepartment !== 67)
                        {
                            $query->Where('noe.IdPosition', $getChildName->Id);
                        }
                    }
                }
                else 
                {
                    if(session('adminvue')->IdDepartment !== 67)
                    {
                        $query->Where('noe.IdPosition',session('adminvue')->IdPosition);
                    }
                }
            })
            ->Where('noe.Actived','>',0)
            ->where('crt.TypeData',3)
            ->where('crt.Actived','>',0);

        if ($searchValue) {
            $query->where(function($query) use ($searchValue) {
                foreach ($searchValue as $key=>$val) {
                    $key = str_replace('__', '.', $key);
                    if($val!='' && $val!=null) {
                        if($key == 'crt.Year') $query->whereYear('crt.CreateAt', $val);
                        else $query->where($key, 'like', '%'.$val.'%');
                    }
                }
            });
        }

        $data = $query->paginate($limit);

        return $data;
    }

    public function detail($Id){
        $item = DB::table('correction')
            ->select('Attachment')
            ->where('Id',$Id)
            ->where('TypeData',3)
            ->where('Actived','>',0)
            ->first();

        $data = [];
        if(!empty($item)) {
            $Attachment = json_decode($item->Attachment);
            if($Attachment) {
                foreach ($Attachment as $key => $val) {
                    $arr = [];
                    $result = explode("/",$val);
                    array_push($arr, $result[4]);
                    array_push($arr, $val);
                    array_push($data, $arr);
                }
            }
        }

        return json_encode(array(
            'data'=>$data
        ));
    }

    public function create(Request $request) {
        $item = DB::table('noe_report as noe')
            ->select('noe.NOENumber','noe.IdPublish', 'nve.SectionPublish')
            ->leftjoin('noe_verif_evaluation as nve','nve.IdNOEReport','=','noe.Id')
            ->where('noe.Id',$request->input('Id'))
            ->first();

        $result = [];
        if(!empty($item)) {
            $result = array(
                'NoeNumber'=>$item->NOENumber, 
                'IdPublish'=>$item->IdPublish,
                'SectionPublish'=>$item->SectionPublish
            );
        }

        return json_encode(array(
            'status'=>true,
            'data'=>$result
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

        $item = DB::table('noe_report as noe')
        ->select(
            'noe.*',
            'pdc.Name as Product',
            'loc.Name as Location',
            'nve.IdPublish as SectionPublish'
        )
        ->leftjoin('product as pdc','pdc.Id','=','noe.IdProduct')
        ->leftjoin('location as loc','loc.Id','=','noe.IdLocation')
        ->leftjoin('noe_verif_evaluation as nve','nve.IdNOEReport','=','noe.Id')
        ->where('noe.Id',$request->input('Id'))
        ->whereNotNull('nve.IdPublish')
        ->first();
    
        $TypeData = 2; // type data tabel correction
        $Status = 2; // status tabel noe_report
        $IsPublish = 1; // IsPublish tabel noe_report
        $Modul = 28; // id module
        $IsPath = 9; //9 path correction-noe-verification
        if($item) {
            if($item->Status === 'Disetujui oleh QA Sect.Head' || $item->Status === 'Disetujui oleh QA APJ') {
                $TypeData = 3;
                $Status = 6;
                $IsPublish = 2;
                $Modul = 29;
                $IsPath = 10; //10 path correction-noe-evaluation
            }
        }
            
        $Attachment = [];
        if($request->has('Attachment') && $request->file('Attachment')!=null) {
            $arrFile = $request->file('Attachment');
            foreach($arrFile as $key=>$val) {
                if(pathinfo($val->getClientOriginalName(), PATHINFO_EXTENSION)) {
                    $Attachment[$key] = $this->UploadFile->uploadFile($val,$IsPath);
                }
            }
        }

        if(count($Attachment) > 0) {
            $Attachment = json_encode($Attachment);
        } else {
            $Attachment = '';
        }

        $itemCaretaker = $this->AppWeb->checkCaretaker(session('adminvue')->IdDepartment,session('adminvue')->IdEmployee,session('adminvue')->Id);
        $isCaretaker = false;
        if($itemCaretaker && $item->Status=='Disetujui oleh QA APJ') $isCaretaker = true;

        $getChildToAnswer =DB::table('position')
            ->select('Id','Code')
            ->where(function ($getChildToAnswer) use ($request) {
                if (session('adminvue')->TypeUser == 16) {  // if QA dept head 
                    
                    $getChildToAnswer->where('Parent', 'LIKE','%{"Id":'.session('adminvue')->IdPosition.'%')
                    ->where('Code', 'LIKE',  '%'.'.sch'); 

                }elseif (session('adminvue')->TypeUser == 19) { // if QA section Head

                    $getChildToAnswer->where('Id', $request->input('IdPublish'));
                
                }
                
            })
            ->where('Actived', 1)
            ->first();
       
        if($isCaretaker) {
            $arr = [
                'TypeData'=>$TypeData,
                'Number'=>$request->input('Number'),
                'Description'=>$request->input('Description'),
                'TypeUser'=>session('adminvue')->TypeUser,
                'ChildToAnswer'=>$getChildToAnswer->Id,
                'Attachment'=>$Attachment,
                'IsMandatory'=>1,
                'DescriptionMandatory'=>$request->input('DescriptionCaretaker'),
                'UserEntry'=>session('adminvue')->Id,
            ];
        } else {
            $arr = [
                'TypeData'=>$TypeData,
                'Number'=>$request->input('Number'),
                'Description'=>$request->input('Description'),
                'TypeUser'=>session('adminvue')->TypeUser,
                'ChildToAnswer'=>$getChildToAnswer->Id,
                'Attachment'=>$Attachment,
                'UserEntry'=>session('adminvue')->Id,
            ];
        }

        DB::begintransaction();
        try{
            DB::table('correction')
                ->insert($arr);

            DB::table('noe_report')
                ->where('Id', $request->input('Id'))
                ->update([
                    'NOENumberAcc'=>null,
                    'Status'=>$Status,
                    'IsPublish'=>$IsPublish,
                    'IsCorrection'=>1
                ]);
           
            try{
               
                if($Status == 6) {
                    $itemMail = [];
                    $dataMail['NOE Number'] = $item->NOENumberAcc;
                    if($item->Status === 'Disetujui oleh QA APJ') {
                        $IdPosition = session('adminvue')->IdPosition;
                        if($IdPosition!=0 && $IdPosition!=null) {
                            $itemMail = $this->MainDB->table('employee as emp')
                            ->select('emp.Name as Employee','emp.Email')
                            ->where('emp.IdDepartment', 67)
                            ->where('emp.IdPosition', '<>', $IdPosition)
                            ->where('emp.Actived', 1)
                            ->get();
                        }
                    } else {
                        
                        if(session('adminvue')->TypeUser == 16)
                        {
                            $idDepartment = session('adminvue')->IdDepartment;
                            $itemMail = $this->MainDB->table('employee as emp')
                                ->select('emp.Name as Employee','emp.Email')
                                ->leftjoin('position as pst','pst.Id','=','emp.IdPosition')
                                ->where('emp.IdDepartment', $idDepartment)
                                ->where('pst.Code', 'like', '%'.'.sch')
                                ->where('emp.Actived', 1)
                                ->get();
                        }
                        else
                        {
                            $IdPosition = session('adminvue')->ParentPosition;
                            if($IdPosition!=0 && $IdPosition!=null) {
                                $itemMail = $this->MainDB->table('employee as emp')
                                ->select('emp.Name as Employee','emp.Email')
                                ->where('emp.IdPosition', $IdPosition)
                                ->where('emp.Actived', 1)
                                ->get();
                            }
                        }
                    }
                } else {
                    $IdDepartment = $item->IdDepartment;
                    $itemMail = [];
                    $dataMail['NOE Number'] = $item->NOENumber;
                    if($IdDepartment!=0 || $IdDepartment!=null) {
                        $dtPosition = DB::table('position') // get Admin pelopor
                            ->select('Id','Code','Parent')
                            ->where('IdDepartment', $IdDepartment)
                            ->where('Id', $item->IdPosition)
                            ->where('Actived', 1)
                            ->first();
                        
                        if($dtPosition!=null) $IdPosition[] = $dtPosition->Id;

                        $dtPosition = DB::table('position') // get unit Head pelopor
                            ->select('Id','Code','Parent')
                            ->where('IdDepartment', $IdDepartment)
                            ->where('Id', $item->IdPublish)
                            ->where('Actived', 1)
                            ->first();
                     
                        if($dtPosition!=null) $IdPosition[] = $dtPosition->Id;
                        
                        $dtPosition = DB::table('position') //get Section Head pelopor
                            ->select('Id','Code','Parent')
                            ->where('IdDepartment', $IdDepartment)
                            ->where('Id', $item->SectionPublish)
                            ->where('Actived', 1)
                            ->first();

                        if($dtPosition!=null) $IdPosition[] = $dtPosition->Id;
                       
                        $getDeptHead = json_decode($dtPosition->Parent);
                        
                        $dtPosition = DB::table('position') // get dept head pelopor
                            ->select('Id','Code','Parent')
                            ->where('IdDepartment', $IdDepartment)
                            ->where('Id', $getDeptHead[0]->Id)
                            ->where('Actived', 1)
                            ->first();

                        if($dtPosition!=null) $IdPosition[] = $dtPosition->Id;
                        else $IdPosition[] = 0;
                        
                        $itemMail = $this->MainDB->table('employee as emp')
                        ->select('emp.Name as Employee','emp.Email')
                        ->where(function ($query) use ($IdPosition) {
                            foreach($IdPosition as $val) {
                                $query->orWhere('emp.IdPosition', $val);
                            }
                        })
                        ->where('emp.Actived', 1)
                        ->get();
                    }
                }
                
                $this->Helper->sendEmail($item, $noeAnswer=null, $request, $itemMail, $Status);

                $this->History->store($Modul,15,json_encode($item));
                DB::commit();
            }catch (Exception $e){
                return json_encode(array(
                    'status'=>false,
                    'message'=>'Koreksi Data Gagal, Pengiriman Email Invalid!',
                    'validation'=>$validation->errors(),
                ));
            }
        }catch (Exception $e){
            DB::rollback();
            return json_encode(array(
                'status'=>false,
                'message'=>'Koreksi Data Gagal, Server Invalid!',
                'validation'=>$validation->errors(),
            ));
        }

        return json_encode(array(
            'status'=>true,
            'message'=>'Koreksi Data Sukses!',
        ));
    }

    function validation(){
        return [
            'Description'=>'required'
        ];
    }
}
