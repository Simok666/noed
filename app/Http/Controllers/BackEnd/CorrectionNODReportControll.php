<?php

namespace App\Http\Controllers\BackEnd;

use Laravel\Passport\Passport;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use Validator;
use App\Http\Controllers\Utils\UploadFileControll;
use App\Http\Controllers\Utils\AppWebControll;

class CorrectionNODReportControll extends Controller
{
    protected $UploadFile;
    protected $History;
    protected $MainDB;
    protected $AppWeb;

    public function __construct() {
        $this->UploadFile = new UploadFileControll();
        $this->History = new HistoryControll();
        $this->MainDB = DB::connection('mysql');
        $this->AppWeb = new AppWebControll();
    }

    public function index(Request $request) {
    	$sortRules = $request->input('sort');
        $limit = $request->input('per_page');
        $searchValue = $request->input('search');
        list($field, $dir) = explode('|', $sortRules);

        
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
            ->orderBy($field, $dir)
            ->where(function ($query){
                if(session('adminvue')->TypeUser!=8 && session('adminvue')->IdDepartment != 67 && session('adminvue')->TypeUser != 19) {
                    $query->where('emp.IdDepartment',session('adminvue')->IdDepartment);
                }
                
            })
            ->where('crt.TypeData',4)
            ->where('crt.Actived','>',0);
        
        if ($searchValue) {
            $query->where(function($query) use ($searchValue) {
                foreach ($searchValue as $key=>$val) {
                    $key = str_replace('__', '.', $key);
                    if($val!='' && $val!=null) {
                        
                        if($key == 'crt.Year') $query->whereYear('crt.CreateAt','=',$val);
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
            ->where('TypeData',4)
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
        $item = DB::table('nod_report as nod')
            ->select('nod.NODNumber','nod.IdPublish','nod.IdSectionPublish','nod.UserDept as UserDept')
            ->leftjoin('users as usr2','usr2.Id','=','nod.UserDept')
            ->leftjoin('employee as emp2','emp2.Id','=','usr2.IdEmployee')
            ->where('nod.Id',$request->input('Id'))
            ->first();

        $result = [];
        if(!empty($item)) {
            $result['NODNumber'] = $item->NODNumber;
            $result['IdPublish'] = $item->IdPublish;
            $result['IdSectionPublish'] = $item->IdSectionPublish;
            $result['UserDept'] = $item->UserDept;
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

        $Attachment = [];
        if($request->has('Attachment') && $request->file('Attachment')!=null) {
            $arrFile = $request->file('Attachment');
            foreach($arrFile as $key=>$val) {
                if(pathinfo($val->getClientOriginalName(), PATHINFO_EXTENSION)) {
                    $Attachment[$key] = $this->UploadFile->uploadFile($val,11); //11 path correction-nod-report
                }
            }
        }

        if(count($Attachment) > 0) {
            $Attachment = json_encode($Attachment);
        } else {
            $Attachment = '';
        }

        $item = DB::table('nod_report as nod')
        ->select('nod.*','nve.RelevantDept')
        ->leftjoin('noe_verif_evaluation as nve','nve.IdNOEReport','=','nod.IdNOEReport')
        ->where('nod.Id', $request->input('Id'))
        ->first();
        
        $RelevantDept = json_decode($item->RelevantDept, true);
        $resultDept = [];
        if($RelevantDept) {
            foreach ($RelevantDept as $key => $val) {
                if($val['Id'] && $val['RelevantDept'] !== 'QA') {
                    array_push($resultDept, $val['Id']);
                }
            }
        }
        
        $Status = 1;
        $isCorrectionFromRelevant = false;
        $isCheckDept = false;
        $isCorrectionFromQa = false;
        $isStatusUnpublish = false;
        $idRelevantDept = [];
        $relevantDeptToDelete = [];
        $getSectionHead=[];
        if($item!=null) {
            if($item->Status === 'Disetujui oleh Unit Head' || $item->Status === 'Disetujui oleh Section Head') {

                $getChildCode = DB::table('position as pst')
                ->select('pst.Id','pst.Code','pst.Status')
                ->where(function ($getChildCode) use ($request) {
                    if(session('adminvue')->TypeUser == 15) // if dept head 
                    {
                        $getChildCode->where('pst.Parent', 'Like','%{"Id":'.session('adminvue')->IdPosition.'%')
                            ->where('pst.Id', $request->input('SectionPublish'));
                    }
                    elseif(session('adminvue')->TypeUser == 14) //if Section Head
                    {
                        $getChildCode->where('pst.Parent', 'Like','%{"Id":'.session('adminvue')->IdPosition.'%')
                            ->where('pst.Id', $request->input('IdPublish'));
                    }
                    elseif(session('adminvue')->TypeUser == 13)
                    {
                        $getChildCode->where('pst.Parent', 'Like','%{"Id":'.session('adminvue')->IdPosition.'%');   
                    }
                })
                ->where('pst.Actived', 1)
                ->first();
                
                $dtPst = DB::table('position')
                    ->select('Id','Status')
                    ->where('Code', $getChildCode->Code)
                    ->where('IdDepartment', session('adminvue')->IdDepartment)
                    ->where('Actived', 1)
                    ->first();
                
                if($dtPst==null) $isActive = 0;
                else $isActive = $dtPst->Status;
                
                $Status = 2; //2: Dilaporkan ke Unit Head
                if(!$isActive) $Status = 3; //3: Dilaporkan ke Sect Head
    
            }
            elseif ($item->Status === 'Disetujui oleh Dept Head')
            {
                if(in_array(session('adminvue')->IdDepartment, $resultDept))
                {
                    $cekDept = DB::table('nod_relevant')
                    ->select('IdDepartment')
                    ->where('IdNODReport',$item->Id)
                    ->whereIn('IdDepartment',$resultDept)
                    ->where('Actived','>',0)
                    ->get();
                    
                    if(count($cekDept) > 0)
                    {
                        $Status = 4;
                        $isCheckDept = true;
                        $idRelevantDept = json_decode($item->IdRelevantDept);
                        foreach($cekDept as $key => $val)
                        {
                            if(in_array($val->IdDepartment, $idRelevantDept))
                            {
                                $relevantDeptToDelete[$key] = $val->IdDepartment;
                            }
                        }
                    }
                    else 
                    {
                        $Status = 4; 
                        $isCorrectionFromRelevant = true;
                    }

                }
            }
            elseif ($item->Status === 'Disetujui oleh Dept Head Terkait') 
            {
                $Status = 6;
                $isCorrectionFromQa = true;
                $valPosition = session('adminvue')->CodePosition;
                $exp = explode('.', $valPosition);
                if(strpos(strtolower($exp[1]), 'sch') !== false) $itemPosition = 2;
                if(strpos(strtolower($exp[1]), 'dh') !== false) $itemPosition = 3;
                
                if($item->IsCorrection !== 0 && $itemPosition == 3) {
                    $Status = 1;
                    $isStatusUnpublish = true;
                    $isCorrectionFromQa = false;
                } elseif($itemPosition == 2) {
                    $Status = 1;
                    $isStatusUnpublish = true;
                    $isCorrectionFromQa = false;
                }
            }
            elseif ($item->Status === 'Disetujui Oleh QA Section Head') 
            {
                $Status = 6;
                $isCorrectionFromQa = true;
            }
        }
        
        $itemCaretaker = $this->AppWeb->checkCaretaker(session('adminvue')->IdDepartment,session('adminvue')->IdEmployee,session('adminvue')->Id);
        if($itemCaretaker) {
            $arr = [
                'TypeData'=>4,
                'Number'=>$request->input('Number'),
                'Description'=>$request->input('Description'),
                'Attachment'=>$Attachment,
                'TypeUser'=>0,
                'ChildToAnswer'=>0,
                'IsMandatoryDept'=>1,
                'DescriptionMandatoryQA'=>$request->input('DescriptionCaretaker'),
                'UserEntry'=>session('adminvue')->Id,
            ];
        } else {
            $arr = [
                'TypeData'=>4,
                'Number'=>$request->input('Number'),
                'Description'=>$request->input('Description'),
                'TypeUser'=>0,
                'ChildToAnswer'=>0,
                'Attachment'=>$Attachment,
                'UserEntry'=>session('adminvue')->Id,
            ];
        }

        
        DB::begintransaction();
        try{
            DB::table('correction')
                ->insert($arr);

            if($isCorrectionFromRelevant)
            {
                DB::table('nod_report')
                ->where('Id', $request->input('Id'))
                ->update([
                    'Status'=>$Status,
                    'IdRelevantDept'=>0,
                    // 'IsCorrection'=>1,
                ]);    

                DB::table('nod_relevant')
                ->where('IdNODReport', $request->input('Id'))
                ->update([
                    'Actived'=>0
                ]);
            }
            elseif($isCheckDept)
            {
                DB::table('nod_relevant')
                    ->where('IdNODReport', $item->Id)
                    ->whereIn('IdDepartment', $relevantDeptToDelete)
                    ->where('Actived','>',0)
                    ->delete();

                DB::table('nod_report')
                    ->where('Id', $request->input('Id'))
                    ->update([
                        'Status'=>$Status,
                        'IdRelevantDept'=>0,
                        // 'IsCorrection'=>1,
                    ]);
            }
            elseif($isCorrectionFromQa)
            {
                $getSectionHead = DB::table('position')
                            ->select('Id','Code')
                            ->where('Code', 'like', '%'.'.sch')
                            ->where('IdDepartment', session('adminvue')->IdDepartment)
                            ->where('Actived', 1)
                            ->first();
                
                DB::table('nod_report')
                    ->where('Id', $request->input('Id'))
                    ->update([
                        'Status'=>$Status,
                        'IsCorrection'=>$getSectionHead->Id,
                    ]);
            }
            elseif($isStatusUnpublish)
            {
                DB::table('nod_report')
                    ->where('Id', $request->input('Id'))
                    ->update([
                        'Status' => $Status,
                        'IdRelevantDept' => 0,
                        'IsCorrection' => 0,
                        'StatusTimeDept' => null,
                        'UserUnit' => null,
                        'DateUnit' => null,
                        'UserSection' => null,
                        'DateSection' => null,
                        'UserDept' => null,
                        'DateDept' => null
                    ]);
                    
                DB::table('nod_relevant')
                    ->where('IdNODReport', $request->input('Id'))
                    ->update([
                        'Actived'=>0
                    ]);
            }
            else
            {
                DB::table('nod_report')
                    ->where('Id', $request->input('Id'))
                    ->update([
                        'Status'=>$Status,
                        // 'IsCorrection'=>1
                    ]);

                DB::table('nod_relevant')
                    ->where('IdNODReport', $request->input('Id'))
                    ->update([
                        'Actived'=>0
                    ]);
            }
            
            try{
                    if($Status == 1)
                    {
                        if($item->Status == 'Disetujui oleh Dept Head Terkait')
                        {
                            $getRelevantDept = $this->MainDB->table('employee as emp')
                                ->select('emp.Name as Employee', 'emp.Email')
                                ->leftjoin('users as usr', 'usr.IdEmployee', '=', 'emp.Id')
                                ->leftjoin('position as pst', 'pst.Id', '=', 'emp.IdPosition')
                                ->whereIn('emp.IdDepartment', $resultDept)
                                ->where('pst.Code', 'like', '%.dh')
                                ->where('emp.Actived', 1);

                            $getReportDept = $this->MainDB->table('employee as emp2')
                                ->select('emp2.Name as Employee', 'emp2.Email')
                                ->leftjoin('users as usr', 'usr.IdEmployee', '=', 'emp2.Id')
                                ->leftjoin('position as pst', 'pst.Id', '=', 'emp2.IdPosition')
                                ->where('usr.Id', $item->UserEntry)
                                ->orWhere('pst.Id', $item->IdPublish)
                                ->orWhere('pst.Id', $item->IdSectionPublish)
                                ->orWhere('usr.Id', $item->UserDept)
                                ->where('emp2.Actived', 1);

                            $itemMail = $getRelevantDept
                                ->union($getReportDept)
                                ->get();
                            
                            
                        }
                        else
                        {
                            $itemMail = $this->MainDB->table('employee as emp')
                                ->select('emp.Name as Employee','emp.Email')
                                ->leftjoin('users as usr','usr.IdEmployee','=','emp.Id')
                                ->where('usr.Id', $item->UserEntry)
                                ->where('emp.Actived', 1)
                                ->get();
                        }
                        
                    }
                    else
                    {
                        $itemPosition = 0;
                        $valPosition = session('adminvue')->CodePosition;
                        $exp = explode('.', $valPosition);
                        if(strpos(strtolower($exp[1]), 'sch') !== false) $itemPosition = 2;
                        if(strpos(strtolower($exp[1]), 'dh') !== false) $itemPosition = 3;
                        
                        if($itemPosition == 2)
                        {
                            $dtPosition = DB::table('position')
                            ->select('Id')
                            // ->where('Code', 'like', '%'.'.uh')
                            ->where('Code', $getChildCode->Code)
                            ->where('IdDepartment', session('adminvue')->IdDepartment)
                            ->where('Actived', 1)
                            ->first();
                        
                            if($dtPosition!=null) $IdPosition[] = $dtPosition->Id;
                            else $IdPosition[] = 0;
                        }
                        elseif($itemPosition == 3)
                        {
                            if($Status==2) 
                            {
                                $dtPosition = DB::table('position')
                                    ->select('Id')
                                    // ->where('Code', 'like', '%'.'.uh')
                                    ->where('Id', $request->input('IdPublish'))
                                    ->where('IdDepartment', session('adminvue')->IdDepartment)
                                    ->where('Actived', 1)
                                    ->first();
                            
                                if($dtPosition!=null) $IdPosition[] = $dtPosition->Id;

                                $dtPosition = DB::table('position')
                                ->select('Id')
                                ->where('Code', $getChildCode->Code)
                                ->where('IdDepartment', session('adminvue')->IdDepartment)
                                ->where('Actived', 1)
                                ->first();
                            
                                if($dtPosition!=null) $IdPosition[] = $dtPosition->Id;
                                else $IdPosition[] = 0;
                            }
                            elseif ($Status == 4)
                            {
                                //jika ada koreksi dari relevant dept
                                $dtPosition = DB::table('position as pst')
                                    ->select('pst.Id')
                                    ->leftjoin('employee as emp','emp.IdPosition','=','pst.Id')
                                    ->leftjoin('users as usrs','usrs.IdEmployee','=','emp.Id')
                                    ->where('usrs.Id', $request->input('HeadPublish'))
                                    ->where('pst.Actived', 1)   
                                    ->first();
                                
                                $itemPst = [];
                                if(count($relevantDeptToDelete) > 0)
                                {
                                    $itemPst = DB::table('position')
                                        ->select('Id')
                                        ->where('Code', 'like', '%'.'.dh')
                                        ->whereIn('IdDepartment', $relevantDeptToDelete)
                                        ->where('Actived', 1)
                                        ->first();
                                }
                                    
                                if($dtPosition!=null) 
                                {
                                    $IdPosition[] = $dtPosition->Id;
                                    $IdPosition[] = $item->IdPosition;
                                    $IdPosition[] = $item->IdPublish;
                                    $IdPosition[] = $item->IdSectionPublish;
                                    if($itemPst != null) $IdPosition[] = $itemPst->Id;
                                } 
                                
                            }
                            elseif($Status == 6)
                            {
                                if($getSectionHead != null) $IdPosition[] = $getSectionHead->Id;   
                            }
                            
                        }
                        else
                        {
                            $IdPosition[] = 0;
                        }
                        
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
                    
                    $data['Subject'] = 'NOD Report - Correction';
                    $data['Title'] = 'Data NOD telah dikoreksi, Oleh :';

                    $dataMail['Korektor'] = session('adminvue')->Name .' | '. session('adminvue')->Position .' - '. session('adminvue')->Department;
                    $dataMail['NOD Number'] = $item->NODNumber;
                    $dataMail['Proper Condition'] = $item->ProperCondition;
                    $dataMail['Man'] = $item->Man;
                    $dataMail['Machine'] = $item->Machine;
                    $dataMail['Method'] = $item->Method;
                    $dataMail['Material'] = $item->Material;
                    $dataMail['Milieu'] = $item->Milieu;
                    $dataMail['Correction'] = $request->input('Description');
                    
                    $getEffectEmail = [];
                    if($itemPosition = 2 || $itemPosition = 3) {
                        $anotherEffectEmail = json_decode($item->DescAnotherEffect);
                        if($anotherEffectEmail !== null) {
                            if($anotherEffectEmail[0] === false) {
                                array_push($getEffectEmail, $anotherEffectEmail[0]);
                            } else {
                                foreach($anotherEffectEmail as $key => $effectEmail) {
                                    if($effectEmail != null) {
                                        $getQuestion = $this->MainDB->table('another_effect as ane')
                                                ->select('ane.title_effect')
                                                ->where('ane.id_effect', $effectEmail->id_effect)
                                                ->first();
        
                                        $getEffectEmail[$key] = 
                                        [
                                            'title' => $getQuestion->title_effect,
                                            'text'  => $effectEmail->text,
                                            'selected' => $effectEmail->selected
                                        ];
                                    }
                                }
                            }
                        }
                    }
                            
                    $dataMail['AnotherEffect'] = $getEffectEmail;
                    
                    if(count($itemMail)>0) { foreach ($itemMail as $key => $val) {
                        $data['Employee'] = $val->Employee;
                        $data['Email'] = $val->Email;

                        $this->History->sendMail($data, $dataMail, $dataObjectEmail=[]);
                    } }
                
                $this->History->store(33,15,json_encode($requestData));
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
