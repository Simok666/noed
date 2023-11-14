<?php

namespace App\Http\Controllers\BackEnd;

use Laravel\Passport\Passport;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use Validator;
use App\Helper;
use Carbon\Carbon;
use App\Http\Controllers\Utils\AppWebControll;
use App\Http\Controllers\Utils\UploadFileControll;

class NOEEvaluationControll extends Controller
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
        // print_r($searchValue->name);exit();
        list($field, $dir) = explode('|', $sortRules);

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
                'noe.IsPublish',
                'noe.IsCorrection',
                'usr.UserName as UserEntry'
            )
            ->leftjoin('product as pdc','pdc.Id','=','noe.IdProduct')
            ->leftjoin('location as loc','loc.Id','=','noe.IdLocation')
            ->leftjoin('users as usr','usr.Id','=','noe.UserEntry')
            ->orderBy(DB::raw('ISNULL(noe.NOENumberAcc), NOENumberAcc'), 'ASC')
            ->orderBy('noe.NOENumber')
            ->orderBy($field, $dir)
            ->where(function($query) {
                if(session('adminvue')->TypeUser!=8 && session('adminvue')->TypeUser!=19) {
                    $valPosition = session('adminvue')->CodePosition;
                    $exp = explode('.', $valPosition);
                    if(strpos(strtolower($exp[1]), 'dh') !== false) {
                        $query->where('noe.Status','>=',7);
                    } else if(strpos(strtolower($exp[1]), 'apj') !== false) {
                        $query->where('noe.Status','>=',7);
                    } else {
                        $query->where('noe.Status','>=',6);
                    }
                }
            })
            ->where('noe.Actived','>',0);

        if ($searchValue) {
            $query->where(function($query) use ($searchValue) {
                foreach ($searchValue as $key=>$val) {
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
            });
        }

        $data = $query->paginate($limit);

        return $data;
    }

    public function getSession(Request $request) {
        $itemPosition = 0;
        $valPosition = session('adminvue')->CodePosition;
        $exp = explode('.', $valPosition);
        if(strpos(strtolower($exp[1]), 'uh') !== false) $itemPosition = 1;
        if(strpos(strtolower($exp[1]), 'sch') !== false) $itemPosition = 2;
        if(strpos(strtolower($exp[1]), 'apj') !== false) $itemPosition = 3;
        if(strpos(strtolower($exp[1]), 'dh') !== false) $itemPosition = 4;

        $itemCaretaker = $this->AppWeb->checkCaretaker(session('adminvue')->IdDepartment,session('adminvue')->IdEmployee,session('adminvue')->Id);

        return json_encode(array(
            'status'=>true,
            'position'=>$itemPosition,
            'isCaretaker'=>$itemCaretaker
        ));
    }

    function isCaretaker(Request $request) {
        $item = DB::table('noe_report as noe')
        ->select(
            'noe.Status'
        )
        ->where('noe.Id', $request->input('Id'))
        ->where('noe.Actived', 1)
        ->first();

        $itemCaretaker = $this->AppWeb->checkCaretaker(session('adminvue')->IdDepartment,session('adminvue')->IdEmployee,session('adminvue')->Id);
        $isCaretaker = false;
        // if($itemCaretaker && $item->Status=='Disetujui oleh QA APJ') $isCaretaker = true;
        if($itemCaretaker && $item->Status=='Disetujui oleh QA Sect.Head') $isCaretaker = true;

        return json_encode(array(
            'status'=>true,
            'isCaretaker'=>$isCaretaker
        ));
    }

    public function getDeviation(Request $request) {
        $item = DB::table('deviation')
            ->select('Id','Deviation')
            ->where('Actived',1)
            ->get();

        return json_encode(array(
            'status'=>true,
            'data'=>$item,
        ));
    }

    public function edit(Request $request) {
        $isExist = DB::table('noe_verif_evaluation')
            ->where('TypeData',1)
            ->where('Actived',1)
            ->where('IdNOEReport',$request->input('Id'))
            ->count();

        $item = DB::table('noe_report as noe')
            ->select(
                'noe.*',
                'loc.Name as IdLocation',
                'noe.Date as DateReport',
                'pdc.Name as IdProduct',
                'nvf.Verified',
                'nvf.OtherCorrectAction',
                'nvf.RelevantDept',
                'nvf.IdDevRiskAssesment',
                'nvf.IdDevRiskAssesment2',
                'nvf.IdDevRiskAssesment3',
                'nvf.DeviationLevel',
                'dvl.Level',
                'dvl.MaxValue',
                'nvf.OtherProductAffect',
                'nvf.DescriptionOPA',
                'nev.IdDeviation',
                'nev.DescriptionEvaluation',
                'nev.Remarks',
                'nev.NOEClassification',
                'nev.DeviationLevelQA'
            )
            ->join('noe_verif_evaluation as nvf','nvf.IdNOEReport','=','noe.Id')
            ->join('noe_verif_evaluation as nev','nev.IdNOEReport','=','noe.Id')
            ->leftjoin('product as pdc','pdc.Id','=','noe.IdProduct')
            ->leftjoin('location as loc','loc.Id','=','noe.IdLocation')
            ->leftjoin('users as usr','usr.Id','=','noe.UserEntry')
            ->leftjoin('deviation_level as dvl','dvl.Id','=','nvf.DeviationLevel')
            ->where('noe.Actived',1)
            ->where('noe.Id',$request->input('Id'))
            ->where('nvf.Actived',1)
            ->where('nvf.TypeData',0)
            ->where(function($query) use ($isExist) {
                if($isExist > 0) {
                    $query->where('nev.TypeData',1);
                    $query->where('nev.Actived',1);
                }
            })
            ->first();

        if(!empty($item)) {
            $item->Date = Carbon::createFromFormat('Y-m-d H:i:s', $item->Date)->format('d/m/Y');
            $TypeIncident = json_decode($item->IdTypeIncident, true);
            $resultIncident = '';
            if($TypeIncident) {
                foreach ($TypeIncident as $key => $val) {
                    if($val['TypeIncident']) {
                        $resultIncident .= $val['TypeIncident'].'; ';
                    }
                }
            }
            $item->IdTypeIncident = $resultIncident;
            $FileEvent = json_decode($item->EventFile);
            $item->FileEvent = $FileEvent;
            $FileCorrectiveAction = json_decode($item->CorrectiveActionFile);
            $item->FileCorrectiveAction = $FileCorrectiveAction;

            $RelevantDept = json_decode($item->RelevantDept, true);
            $resultDept = '';
            if($RelevantDept) {
                foreach ($RelevantDept as $key => $val) {
                    if($val['RelevantDept']) {
                        $resultDept .= $val['RelevantDept'].'; ';
                    }
                }
            }
            $item->RelevantDept = $resultDept;

            $item->IdDevRiskAssesment = json_decode($item->IdDevRiskAssesment, true);
            $item->IdDevRiskAssesment2 = json_decode($item->IdDevRiskAssesment2, true);
            $item->IdDevRiskAssesment3 = json_decode($item->IdDevRiskAssesment3, true);

            $resultValue = 0;
            foreach ($item->IdDevRiskAssesment as $key => $val) {
                if($resultValue == 0) $resultValue += $val['Value'];
                else $resultValue *= $val['Value'];
            }

            foreach ($item->IdDevRiskAssesment2 as $key => $val) {
                if($resultValue == 0) $resultValue += $val['Value'];
                else $resultValue *= $val['Value'];
            }

            foreach ($item->IdDevRiskAssesment3 as $key => $val) {
                if($resultValue == 0) $resultValue += $val['Value'];
                else $resultValue *= $val['Value'];
            }
            $item->DeviationLevel = 'Score : '.$resultValue.'; Level : '.$item->Level.';';

            $item->IdDeviation = ['Id'=>$item->IdDeviation,'Deviation'=>$item->IdDeviation];
            $item->NOEClassification = ['value'=>$item->NOEClassification,'text'=>$item->NOEClassification];
            $item->DeviationLevelQA = ['value'=>$item->DeviationLevelQA,'text'=>$item->DeviationLevelQA];

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
            foreach ($FileCorrectiveAction as $key => $val) {
                $arr = [];
                if($val) {
                    $result = explode("/",$val);
                    array_push($arr, $result[4]);
                }
                array_push($arr, $val);
                array_push($FileCorrectiveActionDownload, $arr);
            }
            $item->FileCorrectiveActionDownload = $FileCorrectiveActionDownload;
        }

        $itemCaretaker = $this->AppWeb->checkCaretaker(session('adminvue')->IdDepartment,session('adminvue')->IdEmployee,session('adminvue')->Id);
        $isCaretaker = false;
        // if($itemCaretaker && $item->Status=='Disetujui oleh QA APJ') $isCaretaker = true;
        if($itemCaretaker && $item->Status=='Disetujui oleh QA Sect.Head') $isCaretaker = true;

        $itemPosition = 0;
        $valPosition = session('adminvue')->CodePosition;
        $exp = explode('.', $valPosition);
        if(strpos(strtolower($exp[1]), 'uh') !== false) $itemPosition = 1;
        if(strpos(strtolower($exp[1]), 'sch') !== false) $itemPosition = 2;
        if(strpos(strtolower($exp[1]), 'apj') !== false) $itemPosition = 3;
        if(strpos(strtolower($exp[1]), 'dh') !== false) $itemPosition = 4;
    
        $isCorrection = false;
        if($item->IsCorrection == 1) $isCorrection = true;

        return json_encode(array(
            'status'=>true,
            'data'=>$item,
            'position'=>$itemPosition,
            'isCaretaker'=>$isCaretaker,
            'isCorrection'=>$isCorrection
        ));
    }

    public function update(Request $request) {
        $requestData = $request->all();
        $validation = Validator::make($request->all(),$this->validation(),
            $messages = ['required' => 'This field is required.']);
    
        // if ($validation->fails() || $request->input('IdDeviation') == "null" || $request->input('NOEClassification') == "null") {
        if ($validation->fails() || $request->input('IdDeviation') == "null") {
            return json_encode(array(
                'status'=>false,
                'message'=>'Silahkan lengkapi kolom *Wajib Diisi',
                'validation'=>$validation->errors(),
            ));
        }

        $isExist = DB::table('noe_verif_evaluation')
            ->where('TypeData',1)
            ->where('Actived',1)
            ->where('IdNOEReport',$request->input('Id'))
            ->count();

        DB::begintransaction();
        try{
            if($isExist>0) {
                DB::table('noe_verif_evaluation')
                ->where('IdNOEReport', $request->input('Id'))
                ->where('TypeData',1)
                ->where('Actived',1)
                ->update([
                    'IdDeviation'=>$request->input('IdDeviation'),
                    'DescriptionEvaluation'=>$request->input('DescriptionEvaluation'),
                    'NOEClassification'=>$request->input('NOEClassification'),
                    'DeviationLevelQA'=>$request->input('DeviationLevelQA'),
                    'Remarks'=>$request->input('Remarks'),

                ]);

                DB::table('noe_report')
                ->where('Id', $request->input('Id'))
                ->update([
                    'IsPublish'=>2
                ]);

                $this->History->store(26,2,json_encode($requestData));
            } else {
                DB::table('noe_verif_evaluation')
                ->insert([
                    'IdNOEReport'=>$request->input('Id'),
                    'IdDeviation'=>$request->input('IdDeviation'),
                    'DescriptionEvaluation'=>$request->input('DescriptionEvaluation'),
                    'NOEClassification'=>$request->input('NOEClassification'),
                    'DeviationLevelQA'=>$request->input('DeviationLevelQA'),
                    'Remarks'=>$request->input('Remarks'),
                    'TypeData'=>1,
                    'UserEntry'=>session('adminvue')->Id
                ]);

                DB::table('noe_report')
                ->where('Id', $request->input('Id'))
                ->update([
                    'IsPublish'=>2
                ]);

                $this->History->store(26,1,json_encode($request->input('Id')));
            }
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
        $item = DB::table('noe_verif_evaluation')
            ->select('*')
            ->where('IdNOEReport', $request->input('Id'))
            ->where('TypeData', 1)
            ->where('Actived',1)
            ->first();

        DB::begintransaction();
        try{
            DB::table('noe_verif_evaluation')
                ->where('IdNOEReport', $request->input('Id'))
                ->where('TypeData', 1)
                ->where('Actived',1)
                ->update([
                    'Actived'=>0
                ]);

            DB::table('noe_report')
                ->where('Id', $request->input('Id'))
                ->update([
                    'IsPublish'=>1
                ]);

            $this->History->store(26,3,json_encode($item));
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
            'IdDeviation'=>'required',
            'DescriptionEvaluation'=>'required',
            'Remarks'=>'required',
            // 'NOEClassification'=>'required',
            'DeviationLevelQA'=>'required'
        ];
    }

    public function publishEvaluation(Request $request) {
        $item = DB::table('noe_report as noe')
        ->select(
            'noe.*',
            'nve.Verified',
            'nve.OtherCorrectAction',
            'nve.OtherProductAffect',
            'nve.DescriptionOPA',
            'pdc.Name as Product',
            'loc.Name as Location'
        )
        ->leftjoin('noe_verif_evaluation as nve','nve.IdNOEReport','=','noe.Id')
        ->leftjoin('product as pdc','pdc.Id','=','noe.IdProduct')
        ->leftjoin('location as loc','loc.Id','=','noe.IdLocation')
        ->where('noe.Id', $request->input('Id'))
        ->where('nve.TypeData', 0)
        ->where('nve.Actived', 1)
        ->first();

        $itemLast = DB::table('noe_report')
            ->select('NOENumberAcc')
            ->orderBy('NOENumberAcc','DESC')
            ->whereYear('Date', Carbon::parse($item->Date)->format('Y'))
            ->where('Actived',1)
            ->first();

        $numDraft = explode('-', $item->NOENumber);
        $numDraftEx = explode('/', $numDraft[1]);

        $newNumber = 0;
        $YYYY = $numDraftEx[3];
       
        if($itemLast != null) {
            if($itemLast->NOENumberAcc!=null) {
                $num = explode('-', $itemLast->NOENumberAcc);
                $numAgain = explode('/', $num[1]);
                $lastNumber = (int)$numAgain[0];
                if($numAgain[3] == $YYYY) {
                    $newNumber = $lastNumber+1;
                } else {
                    $newNumber = 1;
                }
            } else {
                $newNumber = 1;    
            }
        } else {
            $newNumber = 1;
        }
        
        $CodeQA = session('adminvue')->DepartmentCode;
        $NNN = str_pad($newNumber, 3, "0", STR_PAD_LEFT);
    
        $NOENumberAcc = $CodeQA.'-'.$NNN.'/NOE/'.$numDraftEx[2].'/'.$YYYY;
        $NODNumber = $CodeQA.'-'.$NNN.'/NOD/'.$numDraftEx[2].'/'.$YYYY;
        
        DB::begintransaction();
        try{
            DB::table('noe_verif_evaluation')
            ->where('IdNOEReport', $request->input('Id'))
            ->where('TypeData', 1)
            ->where('Actived',1)
            ->update([
                'Date'=>date('Y-m-d H:i:s'),
                'Status'=>'Approved',
                'UserEntry'=>session('adminvue')->Id
            ]);

            DB::table('noe_report')
            ->where('Id', $request->input('Id'))
            ->update([
                'NOENumberAcc'=>$NOENumberAcc,
                'Status'=>7,
                'IsPublish'=>2
            ]);

            DB::table('nod_report')
            ->where('IdNOEReport', $request->input('Id'))
            ->update([
                'NODNumber'=>$NODNumber
            ]);

            try{
                $IdPosition = json_decode(session('adminvue')->ParentPosition);
                $getPositionId = [];
                foreach ($IdPosition as $key => $val) {
                    $getPositionId[$key] = $val->Id;
                }
                
                if($IdPosition!=0 || $IdPosition!=null) {
                    $itemMail = $this->MainDB->table('employee as emp')
                        ->select('emp.Name as Employee','emp.Email')
                        ->whereIn('emp.IdPosition', $getPositionId)
                        ->where('emp.Actived', 1)
                        ->get();
                    
                    $this->Helper->sendEmail($item, $noeAnswer=null, $request, $itemMail, $Status = 7);
                }
                
                $this->History->store(26,4,json_encode($item));
                DB::commit();
            }catch (Exception $e){
                return json_encode(array(
                    'status'=>false,
                    'message'=>'Publish Verifikasi Data Gagal, Pengiriman Email Invalid!',
                    'validation'=>$validation->errors(),
                ));
            }
        }catch (Exception $e){
            DB::rollback();
            return json_encode(array(
                'status'=>false,
                'message'=>'Publish Evaluasi Data Gagal, Invalid Server Side!',
            ));
        }

        return json_encode(array(
            'status'=>true,
            'message'=>'Publish Evaluasi Data Sukses!',
        ));
    }

    public function approve(Request $request) {
        $item = DB::table('noe_report as noe')
        ->select(
            'noe.*',
            'nve.Verified',
            'nve.OtherCorrectAction',
            'nve.OtherProductAffect',
            'nve.DescriptionOPA',
            'nve.RelevantDept',
            'nve_eva.Date as QashPublishDate',
            'pst.Id as deptHeadPelopor',
            'nve.SectionPublish',
            'pdc.Name as Product',
            'loc.Name as Location'
        )
        ->leftjoin('noe_verif_evaluation as nve','nve.IdNOEReport','=','noe.Id')
        ->leftjoin('noe_verif_evaluation as nve_eva','nve_eva.IdNOEReport','=','noe.Id')
        ->leftjoin('users as usr','usr.Id','=','nve.UserDept')
        ->leftjoin('employee as emp','emp.Id','=','usr.IdEmployee')
        ->leftjoin('position as pst','pst.Id','=','emp.IdPosition')
        ->leftjoin('product as pdc','pdc.Id','=','noe.IdProduct')
        ->leftjoin('location as loc','loc.Id','=','noe.IdLocation')
        ->where('noe.Id', $request->input('Id'))
        ->where('nve.TypeData', 0)
        ->Where('nve_eva.TypeData', 1)
        ->where('nve.Actived', 1)
        ->first();

        $valPosition = session('adminvue')->CodePosition;
        $exp = explode('.', $valPosition);
        $itemCaretaker = $this->AppWeb->checkCaretaker(session('adminvue')->IdDepartment,session('adminvue')->IdEmployee,session('adminvue')->Id);
        $isCaretaker = false;
        
        if($itemCaretaker && $item->Status=='Disetujui oleh QA Sect.Head') $isCaretaker = true;

        $Status = 9;
        $IsClosed = 1;
       
        $diffDay = $this->AppWeb->diffDateApprove($item->QashPublishDate); // before DatePublish
        
        $StatusTimeQA = 1;
        if($diffDay>2) $StatusTimeQA = 2;
        
        if($isCaretaker) {
            $arr = [
                'IsMandatory'=>1,
                'DescriptionMandatory'=>$request->input('DescriptionCaretaker'),
                'DateDept'=>date('Y-m-d H:i:s'),
                'StatusDept'=>'Approved',
                'UserDept'=>session('adminvue')->Id
            ];
        } else {
            if(strpos(strtolower($exp[1]), 'apj') !== false) {
                $arr = [
                    'DateAPJ'=>date('Y-m-d H:i:s'),
                    'StatusAPJ'=>'Approved',
                    'UserAPJ'=>session('adminvue')->Id
                ];

                $Status = 8;
                $IsClosed = 0;
                $StatusTimeQA = null;
            } else if(strpos(strtolower($exp[1]), 'dh') !== false) {
                $arr = [
                    'DateDept'=>date('Y-m-d H:i:s'),
                    'StatusDept'=>'Approved',
                    'UserDept'=>session('adminvue')->Id
                ];
            } else {
                return json_encode(array(
                    'status'=>false,
                    'message'=>'Anda Bukan Sebagai Caretaker!',
                ));
            }
        }

        DB::begintransaction();
        try{
            DB::table('noe_verif_evaluation')
            ->where('IdNOEReport', $request->input('Id'))
            ->where('TypeData', 1)
            ->where('Actived',1)
            ->update($arr);

            DB::table('noe_report')
            ->where('Id', $request->input('Id'))
            ->update([
                'Status'=>$Status,
                'IsClosed'=>$IsClosed,
                'StatusTimeQA'=>$StatusTimeQA
            ]);

            try{
                
                if($Status == 9) {
                    $IdPosition = session('adminvue')->IdPosition;
                    $IdDepartment = $item->IdDepartment;
                    $RelevantDept = json_decode($item->RelevantDept, true);
                    $resultDept = [];
                    if($RelevantDept) {
                        foreach ($RelevantDept as $key => $val) {
                            if($val['Id'] && $val['RelevantDept']) {
                                array_push($resultDept, $val['Id']);
                            }
                        }
                    }
                    
                    if($IdDepartment!=0 || $IdDepartment!=null) {
                        
                        $getPeloporPosition = [];
                        array_push($getPeloporPosition, $item->IdPosition);
                        array_push($getPeloporPosition, $item->IdPublish);
                        array_push($getPeloporPosition, $item->SectionPublish);
                        array_push($getPeloporPosition, $item->deptHeadPelopor);
                        
                        $itemMail = $this->MainDB->table('employee as emp')
                            ->select('emp.Name as Employee','emp.Email')
                            ->leftjoin('position as pst','pst.Id','=','emp.IdPosition')
                            ->whereIn('pst.Id', $getPeloporPosition)
                            ->where('emp.IdDepartment', $IdDepartment)
                            ->where('emp.Actived', 1)
                            ->get();
                        
                        $this->Helper->sendEmail($item, $noeAnswer=null, $request, $itemMail, $Status);

                        if(count($RelevantDept) > 0) {
                            $getPosition = [];

                            $getPositionRelevant = DB::table('position')
                            ->select('Id')
                            ->where('Code', 'like', '%'.'.dh')
                            ->whereIn('IdDepartment', $resultDept)
                            ->where('Actived', 1)
                            ->get();
                            
                            foreach ($getPositionRelevant as $key => $val) {
                                $getPosition[$key] = $val->Id;
                            }
                           
                            $relevantItemMail = $this->MainDB->table('employee as emp')
                            ->select('emp.Name as Employee','emp.Email')
                            ->whereIn('emp.IdPosition', $getPosition)
                            ->where('emp.Actived', 1)
                            ->get();
                            
                            $this->Helper->sendEmail($item, $noeAnswer=null, $request, $relevantItemMail, $Status);
                        }

                        if($IdPosition!=0 && $IdPosition!=null) {
                            $itemMail2 = $this->MainDB->table('employee as emp')
                            ->select('emp.Name as Employee','emp.Email')
                            ->leftjoin('position as pst','pst.Id','=','emp.IdPosition')
                            ->where('emp.IdDepartment', 67)
                            ->where('pst.Code','Like','%'.'.sch') 
                            ->where('emp.IdPosition', '<>', $IdPosition)
                            ->where('emp.Actived', 1)
                            ->get();
                            
                            $this->Helper->sendEmail($item, $noeAnswer=null, $request, $itemMail2, $Status);
                        }
                    }
                } else {
                    $IdPosition = session('adminvue')->ParentPosition;
                    if($IdPosition!=0 && $IdPosition!=null) {
                        $itemMail = $this->MainDB->table('employee as emp')
                        ->select('emp.Name as Employee','emp.Email')
                        ->where('emp.IdPosition', $IdPosition)
                        ->where('emp.Actived', 1)
                        ->get();
                        
                        $this->Helper->sendEmail($item, $noeAnswer=null, $request, $itemMail, $Status);
                    }
                }
                
                $this->History->store(26,13,json_encode($item));
                DB::commit();
            }catch (Exception $e){
                return json_encode(array(
                    'status'=>false,
                    'message'=>'Setujui Data Gagal, Pengiriman Email Invalid!',
                    'validation'=>$validation->errors(),
                ));
            }
        }catch (Exception $e){
            DB::rollback();
            return json_encode(array(
                'status'=>false,
                'message'=>'Setujui Data Gagal, Invalid Server Side!',
            ));
        }

        return json_encode(array(
            'status'=>true,
            'message'=>'Setujui Data Sukses!',
        ));
    }

    public function reject(Request $request) {
        $item = DB::table('noe_report as noe')
        ->select(
            'noe.*',
            'nve.Verified',
            'nve.OtherCorrectAction',
            'nve.OtherProductAffect',
            'nve.DescriptionOPA',
            'nve.RelevantDept',
            'nve_eva.Date as QashPublishDate',
            'pst.Id as deptHeadPelopor',
            'nve.SectionPublish',
            'pdc.Name as Product',
            'loc.Name as Location'
        )
        ->leftjoin('noe_verif_evaluation as nve','nve.IdNOEReport','=','noe.Id')
        ->leftjoin('noe_verif_evaluation as nve_eva','nve_eva.IdNOEReport','=','noe.Id')
        ->leftjoin('users as usr','usr.Id','=','nve.UserDept')
        ->leftjoin('employee as emp','emp.Id','=','usr.IdEmployee')
        ->leftjoin('position as pst','pst.Id','=','emp.IdPosition')
        ->leftjoin('product as pdc','pdc.Id','=','noe.IdProduct')
        ->leftjoin('location as loc','loc.Id','=','noe.IdLocation')
        ->where('noe.Id', $request->input('Id'))
        ->where('nve.TypeData', 0)
        ->where('nve_eva.TypeData', 1)
        ->where('nve.Actived', 1)
        ->first();

        $valPosition = session('adminvue')->CodePosition;
        $exp = explode('.', $valPosition);
        $itemCaretaker = $this->AppWeb->checkCaretaker(session('adminvue')->IdDepartment,session('adminvue')->IdEmployee,session('adminvue')->Id);
        $isCaretaker = false;
        // if($itemCaretaker && $item->Status=='Disetujui oleh QA APJ') $isCaretaker = true;
        if($itemCaretaker && $item->Status=='Disetujui oleh QA Sect.Head') $isCaretaker = true;
        
        if($isCaretaker) {
            $arr = [
                'IsMandatory'=>1,
                'DescriptionMandatory'=>$request->input('DescriptionCaretaker'),
                'DateDept'=>date('Y-m-d H:i:s'),
                'StatusDept'=>'Rejected',
                'DescriptionRejectedDept'=>$request->input('Description'),
                'UserDept'=>session('adminvue')->Id
            ];
        } else {
            if(strpos(strtolower($exp[1]), 'dh') !== false || strpos(strtolower($exp[1]), 'sch') !== false) {
                $arr = [
                    'DateDept'=>date('Y-m-d H:i:s'),
                    'StatusDept'=>'Rejected',
                    'DescriptionRejectedDept'=>$request->input('Description'),
                    'UserDept'=>session('adminvue')->Id
                ];
            } else {
                return json_encode(array(
                    'status'=>false,
                    'message'=>'Anda Bukan Sebagai Caretaker!',
                ));
            }
        }   
        
        $diffDay = $this->AppWeb->diffDateApprove($item->QashPublishDate); //before DatePublish
        $StatusTimeQA = 1;
        if($diffDay>2) $StatusTimeQA = 2;
        
        $NODTimeDept = 1;
        if($diffDay>12) $NODTimeDept = 2;

        $NODTimeQA = 1;
        if($diffDay>15) $NODTimeQA = 2;

        DB::begintransaction();
        try{
            DB::table('noe_verif_evaluation')
                ->where('IdNOEReport', $request->input('Id'))
                ->where('TypeData', 1)
                ->where('Actived',1)
                ->update($arr);

            DB::table('noe_report')
            ->where('Id', $request->input('Id'))
            ->update([
                'NOENumberAcc'=>null,
                'Status'=>10,
                'IsClosed'=>1,
                'StatusTimeQA'=>$StatusTimeQA
            ]);

            DB::table('nod_report')
            ->where('IdNOEReport', $request->input('Id'))
            ->update([
                'Status'=>9,
                'IsClosed'=>1,
                'StatusTimeDept'=>$NODTimeDept,
                'StatusTimeQA'=>$NODTimeQA
            ]);

            try{
                $IdPosition = session('adminvue')->IdPosition;
                $IdDepartment = $item->IdDepartment;
                $RelevantDept = json_decode($item->RelevantDept, true);
                $resultDept = [];
                if($RelevantDept) {
                    foreach ($RelevantDept as $key => $val) {
                        if($val['Id'] && $val['RelevantDept']) {
                            array_push($resultDept, $val['Id']);
                        }
                    }
                }
                if($IdDepartment!=0 || $IdDepartment!=null) {

                    $getPeloporPosition = [];
                    array_push($getPeloporPosition, $item->IdPosition);
                    array_push($getPeloporPosition, $item->IdPublish);
                    array_push($getPeloporPosition, $item->SectionPublish);
                    array_push($getPeloporPosition, $item->deptHeadPelopor);
                        
                    $itemMail = $this->MainDB->table('employee as emp')
                        ->select('emp.Name as Employee','emp.Email')
                        ->leftjoin('position as pst','pst.Id','=','emp.IdPosition')
                        ->whereIn('pst.Id', $getPeloporPosition)
                        ->where('emp.IdDepartment', $IdDepartment)
                        ->where('emp.Actived', 1)
                        ->get();
                    
                    $this->Helper->sendEmail($item, $noeAnswer=null, $request, $itemMail, $Status = 10);

                    if(count($RelevantDept) > 0) {
                        $getPosition = [];

                        $getPositionRelevant = DB::table('position')
                        ->select('Id')
                        ->where('Code', 'like', '%'.'.dh')
                        ->whereIn('IdDepartment', $resultDept)
                        ->where('Actived', 1)
                        ->get();
                        
                        foreach ($getPositionRelevant as $key => $val) {
                            $getPosition[$key] = $val->Id;
                        }
                       
                        $relevantItemMail = $this->MainDB->table('employee as emp')
                        ->select('emp.Name as Employee','emp.Email')
                        ->whereIn('emp.IdPosition', $getPosition)
                        ->where('emp.Actived', 1)
                        ->get();
                        
                        $this->Helper->sendEmail($item, $noeAnswer=null, $request, $relevantItemMail, $Status = 10);
                    }

                    if($IdPosition!=0 && $IdPosition!=null) 
                    {
                        $itemMail2 = $this->MainDB->table('employee as emp')
                        ->select('emp.Name as Employee','emp.Email')
                        ->leftjoin('position as pst','pst.Id','=','emp.IdPosition')
                        ->where('emp.IdDepartment', 67)
                        ->where('pst.Code','Like','%'.'.sch') 
                        ->where('emp.IdPosition', '<>', $IdPosition)
                        ->where('emp.Actived', 1)
                        ->get();
                        
                        $this->Helper->sendEmail($item, $noeAnswer=null, $request, $itemMail2, $Status = 10);

                    }

                }
                
                $this->History->store(26,14,json_encode($item));
                DB::commit();
            }catch (Exception $e){
                return json_encode(array(
                    'status'=>false,
                    'message'=>'Tolak Data Gagal, Pengiriman Email Invalid!',
                    'validation'=>$validation->errors(),
                ));
            }
        }catch (Exception $e){
            DB::rollback();
            return json_encode(array(
                'status'=>false,
                'message'=>'Tolak Data Gagal, Invalid Server Side!',
            ));
        }

        return json_encode(array(
            'status'=>true,
            'message'=>'Tolak Data Sukses!',
        ));
    }

}
