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
use PDF;
use Illuminate\Support\Facades\Log;

class NODReportControll extends Controller
{
    protected $AppWeb;
    protected $History;
    protected $UploadFile;
    protected $MainDB;

    public function __construct() {
        $this->AppWeb = new AppWebControll();
        $this->History = new HistoryControll();
        $this->UploadFile = new UploadFileControll();
        $this->Helper = new Helper();
        $this->MainDB = DB::connection('mysql');
        $this->logger = \Log::channel('customlog');
    }

    public function index(Request $request) {
    	$sortRules = $request->input('sort');
        $limit = $request->input('per_page');
        $searchValue = $request->input('search');
        
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
        
        $query = DB::table('nod_report as nod')
            ->select(
                'nod.Id as id',
                'nod.NODNumber',
                'nod.IdDepartment',
                'nod.Date',
                'noe.NOENumberAcc',
                'noe.Event',
                'nod.ProperCondition',
                'noe.BatchNo',
                'pdc.Name as Product',
                'nod.Status',
                'nod.IsUpadatedRevision',
                'nod.IsCorrection',
                'nod.IdReportDept as ReportDept',
                'usr.UserName as UserEntry',
                'nod.UserEntry as IdUserEntry',
                'emp.Name as Employee',
                'nod.CreateAt',
                'nod.UpdateAt'
            )
            ->leftjoin('noe_report as noe','noe.Id','=','nod.IdNOEReport')
            ->leftjoin('product as pdc','pdc.Id','=','noe.IdProduct')
            ->leftjoin('users as usr','usr.Id','=','nod.UserEntry')
            ->leftjoin('employee as emp','emp.Id','=','usr.IdEmployee')
            ->orderBy($field, $dir)
            ->where(function($query) use ($item) {
                
                if(session('adminvue')->TypeUser==8 || session('adminvue')->TypeUser==19) {
                    $query->where('nod.Status','>',1);
                    $query->where('nod.Actived','>',0);
                } else {
                    $valPosition = session('adminvue')->CodePosition;
                    $exp = explode('.', $valPosition);
                    
                    if(strpos(strtolower($exp[1]), 'dh') !== false && session('adminvue')->IdDepartment == 67) {
                        $query->where('nod.Status','>',3);
                        $query->where('nod.Actived','>',0);
                        
                        if(count($item)>0) { foreach ($item as $val) {
                            $isDept = false;
                            $RelevantDept = json_decode($val->RelevantDept);
                            if($RelevantDept) { foreach ($RelevantDept as $v) {
                                if($v->Id == session('adminvue')->IdDepartment) {
                                    $isDept = true;
                                }
                            } }

                            if($isDept) {
                                $query->orWhere('nod.IdNOEReport', $val->id);
                            }
                        } }
                    } else if(strpos(strtolower($exp[1]), 'dh') !== false) {
                            if(count($item)>0) { foreach ($item as $val) {
                                $isDept = false;
                                $RelevantDept = json_decode($val->RelevantDept);
                                
                                if($RelevantDept) { foreach ($RelevantDept as $v) {
                                    if($v->Id == session('adminvue')->IdDepartment) {
                                        $isDept = true;
                                    }
                                } }

                                if($isDept) {
                                    $query->orWhere('nod.IdNOEReport', $val->id);
                                }
                            } } 
                        $query->orWhere('nod.IdDepartment',session('adminvue')->IdDepartment);
                        $query->where('nod.Status','>',0);
                        $query->where('nod.Actived','>',0);
                    } else {
                        $query->orWhere('nod.IdDepartment',session('adminvue')->IdDepartment);
                        $query->where('nod.Actived','>',0);
                    }
                }
            });

        if ($searchValue) {
            $query->where(function($query) use ($searchValue) {
                foreach ($searchValue as $key=>$val) {

                    if ($key == "nod__Month" || $key == "nod__Year")
                    {
                        if($val!='' && $val!=null)
                        {
                            if($key == "nod__Year")
                            {   
                                $yearConvertDigits = Carbon::createFromFormat('y', $val);
                                $searchData = $yearConvertDigits->format('Y');
                                if($searchData!='' && $searchData!=null) $query->where('nod.Date', 'like', '%'.$searchData.'%');            
                            }
                            else
                            {
                                $month = Carbon::createFromFormat('m', $val);        
                                if($val!='' && $val!=null) $query->whereMonth('nod.Date', '=', $month->format('m'));            
                            }           
                        }            
                    }
                    else
                    {
                        if($key == "nod__Date" && !empty($val))
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
        if(strpos(strtolower($exp[1]), 'adm') !== false) $itemPosition = 5;
        
        $idUser = session('adminvue')->Id;
        $itemCaretaker = $this->AppWeb->checkCaretaker(session('adminvue')->IdDepartment,session('adminvue')->IdEmployee,session('adminvue')->Id);

        return json_encode(array(
            'status'=>true,
            'position'=>$itemPosition,
            'idUser'=>$idUser,
            'isCaretaker'=>$itemCaretaker,
            'typeUser'=> session('adminvue')->TypeUser,
            'userDepartment'=>session('adminvue')->IdDepartment
        ));
    }

    public function generateNumber(Request $request) {
        $item = $this->MainDB->table('department')
            ->select('Code')
            ->where('Actived',1)
            ->where('Id', 67) // 67: Dept. QA
            ->first();
        $Code = $item?$item->Code:'';
        
        // sekarang : jika NOE selesai maka sama dengan NOENumberAcc, hanya replace code Dept dan text NOE
        if($request->NOENumberAcc!=0 || $request->NOENumberAcc!=null) {
            $NOENumber = $request->NOENumberAcc;
            $NOENumber = explode('-',$NOENumber);
            $NODNumber = str_replace('NOE','NOD',$NOENumber[1]);
            $result = $Code.'-'.$NODNumber;
        } else {
            $itemLast = DB::table('nod_report')
                ->select('NODNumber')
                ->orderBy('NODNumber','DESC')
                ->where('Actived',1)
                ->first();

            $Date = $request->Date;
            $newNumber = 0;
            if($Date!=null && $Date!='null') $YYYY = Carbon::parse($Date)->format('Y');
            else $YYYY = date("Y");

            if($itemLast != null) {
                if($itemLast->NODNumber!=null) {
                    $num = explode('-', $itemLast->NODNumber);
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
            $result = $Code.'-'.$NNN.'/NOD/'.$BL.'/'.$YYYY;
        }

        return json_encode(array(
            'status'=>true,
            'data'=>$result,
        ));
    }

    public function getNOENumber(Request $request) {
        $item = DB::table('noe_report as noe')
            ->select('noe.Id','noe.NOENumber','noe.NOENumberAcc','noe.Date','noe.IdPublish','nve.IdPublish as publishSection')
            // ->where('Status',8) // sebelumnya NOE harus selesai dulu, sekarang tidak
            ->leftjoin('noe_verif_evaluation as nve','nve.IdNOEReport','=','noe.Id')
            ->whereNotNull('nve.IdPublish')
            ->where('noe.Status','<>',10) // NOE Reject tidak muncul
            ->where('noe.IsNOD',0)
            ->where('noe.IdDepartment', session('adminvue')->IdDepartment)
            ->whereNotNull('NOENumberAcc')
            ->where('noe.IdPublish','!=',0)
            ->where('noe.Actived',1)
            ->get();
        
        foreach ($item as $k => $val) {
            if($val->NOENumberAcc!=null) $item[$k]->NOENumber = $val->NOENumberAcc;
        }
        
        return json_encode(array(
            'status'=>true,
            'data'=>$item,
        ));
    }

    public function getDataNOE(Request $request) {
        $item = DB::table('noe_report as noe')
            ->select(
                'noe.BatchNo',
                'noe.Date',
                'noe.IdPublish',
                'nve.IdPublish as publishSection',
                'pdc.Name as Product',
                'noe.Event'
            )
            ->leftjoin('product as pdc','pdc.Id','=','noe.IdProduct')
            ->leftjoin('noe_verif_evaluation as nve','nve.IdNOEReport','=','noe.Id')
            ->whereNotNull('nve.IdPublish')
            ->where('noe.Id',$request->Id)
            ->where('noe.Actived',1)
            ->first();
       
        return json_encode(array(
            'status'=>true,
            'data'=>$item,
        ));
    }

    public function getDataPIC(Request $request) {

        $RelevantDept = $this->MainDB->table('noe_verif_evaluation')
            ->select('RelevantDept')
            ->where('IdNOEReport', $request->input('IdNOEReport'))
            ->where('Actived',1)
            ->value('RelevantDept');

        $item = $this->MainDB->table('employee')
            ->select('Id','Name as PIC')
            ->where(function($query) use ($RelevantDept) {
                if(!empty($RelevantDept) && $RelevantDept!=null && $RelevantDept!='' ) {
                    $RelevantDept = json_decode($RelevantDept);
                    // $query->where('IdDepartment',);
                    $query->where('Id','<>',1);
                    $query->where('Actived',1);
                    $Dept[] = session('adminvue')->IdDepartment;
                    foreach ($RelevantDept as $val) {
                        array_push($Dept, $val->Id);
                    }
                    $query->whereIn('IdDepartment',$Dept);
                } else {
                    $query->where('IdDepartment',session('adminvue')->IdDepartment);
                    $query->where('Id','<>',1);
                    $query->where('Actived',1);
                }
            })
            ->orderBy('IdDepartment')
            ->orderBy('Name')
            ->get();

        return json_encode(array(
            'status'=>true,
            'data'=>$item,
        ));
    }

    public function detail($Id){
        $isData = false;
        $item = DB::table('nod_report as nod')
            ->select(
                'nod.Id',
                'nod.IdNOEReport',
                'nod.IdDepartment',
                'nod.IdPublish',
                'nod.IdSectionPublish',
                'nod.IdRelevantDept',
                'nod.IsRevision',
                'nod.Status',
                'nod.IsCorrection',
                'emp1.Name as UserEntry',
                'nod.CreateAt',
                'emp2.Name as UserDept',
                'nod.DateDept',
                'emp3.Name as UserQA',
                'nod.DateQA',
                'emp4.Name as UserQAAPJ',
                'nod.DateQAAPJ',
                'emp5.Name as UserUnit',
                'nod.DateUnit',
                'emp6.Name as UserSection',
                'nod.DateSection',
                'nve.RelevantDept'
            )
            ->leftjoin('users as usr1','usr1.Id','=','nod.UserEntry')
            ->leftjoin('employee as emp1','emp1.Id','=','usr1.IdEmployee')
            ->leftjoin('users as usr2','usr2.Id','=','nod.UserDept')
            ->leftjoin('employee as emp2','emp2.Id','=','usr2.IdEmployee')
            ->leftjoin('users as usr3','usr3.Id','=','nod.UserQA')
            ->leftjoin('employee as emp3','emp3.Id','=','usr3.IdEmployee')
            ->leftjoin('users as usr4','usr4.Id','=','nod.UserQAAPJ')
            ->leftjoin('employee as emp4','emp4.Id','=','usr4.IdEmployee')
            ->leftjoin('users as usr5','usr5.Id','=','nod.UserUnit')
            ->leftjoin('employee as emp5','emp5.Id','=','usr5.IdEmployee')
            ->leftjoin('users as usr6','usr6.Id','=','nod.UserSection')
            ->leftjoin('employee as emp6','emp6.Id','=','usr6.IdEmployee')
            ->leftjoin('noe_report as noe','noe.Id','=','nod.IdNOEReport')
            ->leftjoin('noe_verif_evaluation as nve','nve.IdNOEReport','=','nod.IdNOEReport')
            ->where('nve.TypeData',0)
            ->where('nve.Actived','>',0)
            ->where('nod.Id',$Id)
            ->where('nod.Actived','>',0)
            ->first();

        $getHistAppr = null;
        if($item !== null)
        {
            $getHistAppr = DB::table('nod_report as nod')
            ->select(
                'nod.Id',
                'nod.IdNOEReport',
                'nod.IdDepartment',
                'nod.IsRevision',
                'nod.Status',
                'emp1.Name as UserEntry',
                'nod.CreateAt',
                'emp2.Name as UserDept',
                'nod.DateDept',
                'emp3.Name as UserQA',
                'nod.DateQA',
                'emp4.Name as UserQAAPJ',
                'nod.DateQAAPJ',
                'emp5.Name as UserUnit',
                'nod.DateUnit',
                'emp6.Name as UserSection',
                'nod.DateSection',
                'nve.RelevantDept'
            )
            ->leftjoin('users as usr1','usr1.Id','=','nod.UserEntry')
            ->leftjoin('employee as emp1','emp1.Id','=','usr1.IdEmployee')
            ->leftjoin('users as usr2','usr2.Id','=','nod.UserDept')
            ->leftjoin('employee as emp2','emp2.Id','=','usr2.IdEmployee')
            ->leftjoin('users as usr3','usr3.Id','=','nod.UserQA')
            ->leftjoin('employee as emp3','emp3.Id','=','usr3.IdEmployee')
            ->leftjoin('users as usr4','usr4.Id','=','nod.UserQAAPJ')
            ->leftjoin('employee as emp4','emp4.Id','=','usr4.IdEmployee')
            ->leftjoin('users as usr5','usr5.Id','=','nod.UserUnit')
            ->leftjoin('employee as emp5','emp5.Id','=','usr5.IdEmployee')
            ->leftjoin('users as usr6','usr6.Id','=','nod.UserSection')
            ->leftjoin('employee as emp6','emp6.Id','=','usr6.IdEmployee')
            ->leftjoin('noe_report as noe','noe.Id','=','nod.IdNOEReport')
            ->leftjoin('noe_verif_evaluation as nve','nve.IdNOEReport','=','nod.IdNOEReport')
            ->where('nve.TypeData',0)
            // ->where('nod.IsRevision','=',1)
            ->where('nve.Actived','>',0)
            ->where('nod.IdNOEReport', $item->IdNOEReport)
            ->where('nod.Actived','>',0)
            ->get();
        }
        
        $itemCaretaker = $this->AppWeb->checkCaretaker(session('adminvue')->IdDepartment,session('adminvue')->IdEmployee,session('adminvue')->Id);
        $valPosition = session('adminvue')->CodePosition;
        $exp = explode('.', $valPosition);
        
        if(!empty($item)) {
            
            $item->IdDepartmentSession = session('adminvue')->IdDepartment;
            $item->TypeUser = session('adminvue')->TypeUser;
            $item->IdPosition = session('adminvue')->IdPosition;
              
            if($item->Status == 'Dilaporkan ke Unit Head') {                    
                $item->UserUnit = null;
                $item->DateUnit = null;
                $item->UserSection = null;
                $item->DateSection = null;
                $item->UserDept = null;
                $item->DateDept = null;
                $item->UserQAAPJ = null;
                $item->DateQAAPJ = null;
                $item->UserQA = null;
                $item->DateQA = null;
            } else if($item->Status == 'Disetujui oleh Unit Head') {
                $item->UserSection = null;
                $item->DateSection = null;
                $item->UserDept = null;
                $item->DateDept = null;
                $item->UserQAAPJ = null;
                $item->DateQAAPJ = null;
                $item->UserQA = null;
                $item->DateQA = null;
            } else if($item->Status == 'Disetujui oleh Section Head') {
                $item->UserDept = null;
                $item->DateDept = null;
                $item->UserQAAPJ = null;
                $item->DateQAAPJ = null;
                $item->UserQA = null;
                $item->DateQA = null;
            } else if($item->Status == 'Disetujui oleh Dept Head' || $item->Status == 'Disetujui oleh Dept Head Terkait') {
                $item->UserQAAPJ = null;
                $item->DateQAAPJ = null;
                $item->UserQA = null;
                $item->DateQA = null;
            } else if($item->Status == 'Ditolak') {
                if($item->DateQAAPJ == null) {
                    $item->UserQAAPJ = null;
                    $item->DateQAAPJ = null;
                }
                if($item->DateQA == null) {
                    $item->UserQA = null;
                    $item->DateQA = null;
                }
            }

            $nodId = [];
            foreach($getHistAppr as $key => $val)
            {
                $nodId[$key] = $val->Id;
            }
            
            $itemDeptTerkait = DB::table('nod_relevant as nrl')
            ->select(
                'nrl.Id',
                'emp.Name as IdUsers',
                'nrl.CreateAt'
            )
            ->leftjoin('users as usr','usr.Id','=','nrl.IdUsers')
            ->leftjoin('employee as emp','emp.Id','=','usr.IdEmployee')
            // ->where('nrl.IdNODReport',$item->Id)
            ->whereIn('nrl.IdNODReport', $nodId)
            ->where('nrl.Status','>',0)
            ->where('nrl.Actived','>',0)
            ->get();

            $resultDeptTerkait = '';
            foreach ($itemDeptTerkait as $key => $val) {
                if($val->IdUsers) {
                    $resultDeptTerkait .= $val->IdUsers.' - '.\DateTime::createFromFormat('Y-m-d H:i:s', $val->CreateAt)->format('d.m.y').'<br/>';
                }
            }
            $item->UserTerkait = $resultDeptTerkait;
            
            foreach($getHistAppr as $key => $val)
            {
                if($getHistAppr[$key]->IsRevision == 0)
                {
                    $getHistAppr[$key]->UserTerkait = $resultDeptTerkait;
                }
                else
                {
                    $getHistAppr[$key]->UserTerkait = '-';
                }
            }
        
            $RelevantDept = json_decode($item->RelevantDept, true);
            $resultDept = [];
            $filterRelevantDept = [];
            if($RelevantDept) {
                foreach ($RelevantDept as $key => $val) {
                    if($val['Id'] && $val['RelevantDept'] !== 'QA') {
                        array_push($resultDept, $val['Id']);
                    }
                    if($val['RelevantDept'] !== 'QA') {
                        $filterRelevantDept[] = $val;
                    }
                }
            }
            
            $item->RelevantDept = $filterRelevantDept;
            
            $isData = false;
            $valresult = array_search(session('adminvue')->IdDepartment, $resultDept); // note jika depart qa maka dilewati 
            
            // jika department head pelapor
            if($item->IdDepartment == session('adminvue')->IdDepartment) {
                $isData = false;
                if(strpos(strtolower($exp[1]), 'uh') !== false && $item->Status == 'Dilaporkan ke Unit Head') {
                    $isData = true;
                } else if(strpos(strtolower($exp[1]), 'sch') !== false && $item->Status == 'Disetujui oleh Unit Head') {
                    $isData = true;
                } else if((strpos(strtolower($exp[1]), 'dh') !== false || $itemCaretaker) && $item->Status == 'Disetujui oleh Section Head') {
                    $isData = true;
                }
            }
            // jika department head terkait
            else if($valresult >= 0 && $valresult !== false) {
        
                if((strpos(strtolower($exp[1]), 'dh') !== false || $itemCaretaker) && $item->Status == 'Disetujui oleh Dept Head') {
                    $isData = true;

                    $cekDept = DB::table('nod_relevant')
                    ->select('Status','IdDepartment')
                    ->where('IdNODReport',$item->Id)
                    ->where('IdDepartment',session('adminvue')->IdDepartment)
                    ->where('Actived','>',0)
                    ->get();

                    $idRelevantDept = json_decode($item->IdRelevantDept);
                    
                    if(in_array(session('adminvue')->IdDepartment, $idRelevantDept))
                    {
                        $isData = true;
                    }
                    else
                    {
                        $isData = false;
                    }
                    
                    if(count($cekDept) > 0) {
                        foreach ($cekDept as $key => $val) {
                            if($val->Status == 1) $isData = false;
                            // if($val->Status == 1) $isData = true;
                        }
                    }
                    
                }
                

                if($item->Status == 'Disetujui oleh Dept Head Terkait') $isData = false;
                
            }
            // jika QA department head
            else if(session('adminvue')->IdDepartment == 67) {
                $isData = false;
                
                if(strpos(strtolower($exp[1]), 'apj') !== false && ($item->Status == 'Disetujui oleh Dept Head Terkait' || $item->RelevantDept == null)) {
                    $isData = true;
                }
                if((strpos(strtolower($exp[1]), 'dh') !== false || $itemCaretaker) && ($item->Status == 'Disetujui Oleh QA Section Head') && empty($item->IsCorrection)){
                    $isData = true;
                }
                if((strpos(strtolower($exp[1]), 'sch') !== false || $itemCaretaker) && ($item->Status == 'Disetujui oleh Dept Head Terkait') || $item->IsCorrection == session('adminvue')->IdPosition){
                    $isData = true;
                }
                
            }
            else if($item->Status == 'Ditolak' || $item->Status == 'Disetujui oleh QA Dept.Head') $isData = false;
        }
        
        return json_encode(array(
            'data'=>$item,
            'isData'=>$isData,
            'countData'=>($getHistAppr !== null) ? count($getHistAppr) : 0,
            'historyRevision'=>$getHistAppr,
            'isCaretaker'=>$itemCaretaker
        ));
    }

    public function getDataPublisher(Request $request)
    {
        $status = false;
        $admName = DB::table('nod_report as nod')
        ->select(
            'admpst.Id as Id',
            'admpst.Name as namepublisher'
        )
        ->leftjoin('position as admpst','admpst.Id','=','nod.IdPosition')
        ->where('nod.Id',$request->input('Id'))
        ->where('nod.IsRevision','=',0)
        ->where('nod.Actived',1)
        ->first();

        $untName = DB::table('nod_report as nod')
        ->select(
            'untpst.Id as Id',
            'untpst.Name as namepublisher'
        )
        ->leftjoin('position as untpst','untpst.Id','=','nod.IdPublish')
        ->where('nod.Id',$request->input('Id'))
        ->where('nod.IsRevision','=',0)
        ->where('nod.Actived',1)
        ->first();
        
        $secName = DB::table('nod_report as nod')
        ->select(
            'secpst.Id as Id',
            'secpst.Name as namepublisher'
        )
        ->leftjoin('position as secpst','secpst.Id','=','nod.IdSectionPublish')
        ->where('nod.Id',$request->input('Id'))
        ->where('nod.IsRevision','=',0)
        ->where('nod.Actived',1)
        ->first();

        $deptName = DB::table('nod_report as nod')
        ->select(
            'deptpst.Id as Id',
            'deptpst.Name as namepublisher'
        )
        ->leftjoin('users as usr','usr.Id','=','nod.UserDept')
        ->leftjoin('employee as emp','emp.Id','=','usr.IdEmployee')
        ->leftjoin('position as deptpst','deptpst.Id','=','emp.IdPosition')
        ->where('nod.Id',$request->input('Id'))
        ->where('nod.IsRevision','=',0)
        ->where('nod.Actived',1)
        ->first();

        $teamOption = [$admName, $untName, $secName, $deptName];
        
        if($request->input('Id') != null)
        {
            $status = true;
        }
        
        return json_encode(array(
            'status'=>$status,
            'data'=>$teamOption,
        ));
    }

    public function sendQuestion(Request $request)
    {
        $requestData = $request->all();
        $validation = Validator::make($requestData, $this->sendQuestionValidation(), $messages = ['required' => 'This field is required.']);
        
        if($validation->fails())
        {
            return json_encode(array(
                'status'=>false,
                'message'=>'Silahkan lengkapi kolom *Wajib Diisi',
                'validation'=>$validation->errors(),
            ));
        }

        $isExist = $this->AppWeb->checkDataManyCol('request_chat',[
            'nod_number'=>$request->input('nod_number'),
            'id_status'=>1
        ]);

        if($isExist>0) 
        {
            return json_encode(array(
                'status'=>false,
                'message'=>'Request Chat Sudah Ada atau Masih Aktif!',
                'validation'=>$validation->errors(),
            ));
        }

        $startTime = $request->input('Date').' '.$request->input('StartTime');
        $endTime = $request->input('Date').' '.$request->input('EndTime');
        
        DB::begintransaction();
        try
        {
            $insert = DB::table('request_chat')
            ->insert([
                'nod_number'=>$request->input('Number'),
                'deviation'=>$request->input('Deviation'),
                'id_status'=>1,
                'id_position'=>session('adminvue')->IdPosition,
                'id_team'=>$request->input('IdTeam'),
                'question'=>$request->input('Question'),
                'date_request'=>$request->input('Date'),
                'start_time'=>Carbon::parse($startTime)->format('Y-m-d H:i:s'),
                'end_time'=>Carbon::parse($endTime)->format('Y-m-d H:i:s'),
                'Actived'=>1
            ]);

            $dataChatRoom = [];
            $userChatRoom = json_decode($request->input('IdTeam'));
            foreach ($userChatRoom as $key => $value) 
            {
                $dataChatRoom['nod_number'] = $request->input('Number');
                $dataChatRoom['user_id'] = $value->Id;
                DB::table('chat_rooms')
                ->insert($dataChatRoom);
            }

            $getTeamPosition = json_decode($request->input('IdTeam'));
    
            if($getTeamPosition != 0 && count($getTeamPosition) > 0)
            {
                $getSelectedEmail = [];
                
                foreach ($getTeamPosition as $key => $value) 
                {
                    $getSelectedEmail[$key] = $value->Id;
                }

                $itemMail = $this->MainDB->table('employee as emp')
                            ->select('emp.Name as Employee','emp.Email')
                            ->whereIn('emp.IdPosition',$getSelectedEmail)
                            ->where('emp.Actived', 1)
                            ->get();

                $data['Subject'] = 'NOD Report - Question';
                $data['Title'] = $request->input('Question'). ' , Oleh :';
                    
                $dataMail['Pelapor'] = session('adminvue')->Name .' | '. session('adminvue')->Position .' - '. session('adminvue')->Department;
                $dataMail['NOD Number'] = $request->input('Number');
                $dataMail['Deviation'] = $request->input('Deviation');
                $dataMail['Tanggal Pengajuan'] = Carbon::parse($request->input('Date'))->format('d.m.y');
                $dataMail['Dimulai'] = Carbon::parse($startTime)->format('d.m.y h:i A'); //format before Y-m-d H:i:s
                $dataMail['Diakhiri'] = Carbon::parse($endTime)->format('d.m.y h:i A'); //format before Y-m-d H:i:s

                                        
                if(count($itemMail)>0) { foreach ($itemMail as $key => $val) {
                    $data['Employee'] = $val->Employee;
                    $data['Email'] = $val->Email;
                    
                    $this->History->sendMail($data, $dataMail, $dataObjectEmail=[]);
                } }
            }

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

    public function getHistoryChatData(Request $request)
    {
        $perPageData = $request->input('perPage', 10);
        $pagination = $request->input('page', 1);
        $searchValue = $request->input('search');
       
        $query = DB::table('request_chat as rc')
            ->select(
                'cr.id as ChatroomId',
                'rc.nod_number as NodNumber',
                'rc.question as Question',
                'cs.status as ChatStatus',
                'emp.Name as RequestName',
                'dpt.Department as DepartName'
            )
            ->leftjoin('chat_status as cs','cs.id','=','rc.id_status')
            ->leftjoin('employee as emp','emp.IdPosition','=','rc.id_position')
            ->leftjoin('chat_rooms as cr','cr.nod_number','=','rc.nod_number')
            ->leftjoin('department as dpt','dpt.Id','=','emp.IdDepartment')
            ->where('rc.Actived','>',0);
        
        if($searchValue != null)
        {
            $query->where(function($query) use ($searchValue) {
                foreach ($searchValue as $key=>$val) {
                    $key = str_replace('__', '.', $key);
                    if($val!='' && $val!=null) $query->where($key, 'like', '%'.$val.'%');
                }
            });
        }

        $data = $query->paginate($perPageData, ['*'], 'page', $pagination);
        
        return response()->json([
            'status' => true,
            'data' => $data,
            'total' => count($data)
        ]);
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

        $CAFile = [];
        if($request->has('CAFile') && $request->file('CAFile')!=null) {
            $arrFile = $request->file('CAFile');
            foreach($arrFile as $key=>$val) {
                foreach($val as $i=>$v) {
                    if(pathinfo($v->getClientOriginalName(), PATHINFO_EXTENSION)) {
                        $CAFile[$key][$i] = $this->UploadFile->uploadFile($v,6); //6 path nod-report
                    } else $CAFile[$key][$i] = '';
                }
            }
        }

        $PAFile = [];
        if($request->has('PAFile') && $request->file('PAFile')!=null) {
            $arrFile = $request->file('PAFile');
            foreach($arrFile as $key=>$val) {
                foreach($val as $i=>$v) {
                    if(pathinfo($v->getClientOriginalName(), PATHINFO_EXTENSION)) {
                        $PAFile[$key][$i] = $this->UploadFile->uploadFile($v,6); //6 path nod-report
                    } else $PAFile[$key][$i] = '';
                }
            }
        }

        $statusNOD = 0; 
        $idPublish = $request->input('IdPublish');
        if(session('adminvue')->TypeUser === 13 || session('adminvue')->TypeUser === 14 || session('adminvue')->TypeUser === 15 || session('adminvue')->TypeUser === 16 || session('adminvue')->TypeUser === 19) { // unit head || dept head || section head
            $statusNOD = 2;
        } elseif (session('adminvue')->TypeUser === 9) { // admin
            $statusNOD = 1;
        }

        DB::begintransaction();
        try{
            $IdNOEReport = DB::table('nod_report')
            ->insertGetId([
                'IdNOEReport'=>$request->input('NOENumber'),
                'IdDepartment'=>session('adminvue')->IdDepartment,
                'IdPosition'=>session('adminvue')->IdPosition,
                'IdPublish'=>$request->input('IdPublish'),
                'IdSectionPublish'=>$request->input('publishSection'),
                'IdRelevantDept' => 0,
                'IdReportDept'=> 0,
                'IsRevision'=>0,
                'NODNumber'=>$request->input('NODNumber'),
                'Date'=>Carbon::createFromFormat('d/m/Y H:i:s', $request->input('Date'))->format('Y-m-d H:i:s'),
                'ProperCondition'=>$request->input('ProperCondition'),
                'Man'=>$request->input('Man'),
                'Machine'=>$request->input('Machine'),
                'Method'=>$request->input('Method'),
                'Material'=>$request->input('Material'),
                'Milieu'=>$request->input('Milieu'),
                'Status'=>$statusNOD,
                'UserEntry'=>session('adminvue')->Id,

                // sebelumnya hanya 1 data group, sekarang lebih dari 1 data group
                /*'IdCAPIC'=>$request->input('IdCAPIC'),
                'CADate'=>$request->input('CADate'),
                'CADescription'=>$request->input('CADescription'),
                'CAFile'=>$CAFile,
                'IdPAPIC'=>$request->input('IdPAPIC'),
                'PADate'=>$request->input('PADate'),
                'PADescription'=>$request->input('PADescription'),
                'PAFile'=>$PAFile,*/

            ]);

            $IdCAPIC = $request->input('IdCAPIC');
            $IdPAPIC = $request->input('IdPAPIC');

            if(count($IdCAPIC)>0) { foreach ($IdCAPIC as $key => $val) {
                $File = [];
                if(!empty($CAFile)) $File = $CAFile[$key];
                DB::table('nod_report_action')
                ->insert([
                    'IdNODReport'=>$IdNOEReport,
                    'IdPIC'=>$val,
                    'Date'=>$request->input('CADate')[$key],
                    'Description'=>$request->input('CADescription')[$key],
                    'File'=>json_encode($File),
                    'UserEntry'=>session('adminvue')->Id
                ]);
            } }

            if(count($IdPAPIC)>0) { foreach ($IdPAPIC as $key => $val) {
                $File = [];
                if(!empty($PAFile)) $File = $PAFile[$key];
                DB::table('nod_report_action')
                ->insert([
                    'IdNODReport'=>$IdNOEReport,
                    'IdPIC'=>$val,
                    'Date'=>$request->input('PADate')[$key],
                    'Description'=>$request->input('PADescription')[$key],
                    'File'=>json_encode($File),
                    'Type'=>1, // 1: Preventive Action;
                    'UserEntry'=>session('adminvue')->Id
                ]);
            } }

            if(session('adminvue')->TypeUser === 14 || session('adminvue')->TypeUser === 15) {
                $itemPosition = DB::table('position')
                        ->select('Id')
                        ->where('IdDepartment', session('adminvue')->IdDepartment)
                        ->where('Id', $idPublish)
                        ->where('Actived', 1)
                        ->first();
                
                $itemMail = $this->MainDB->table('employee as emp')
                        ->select('emp.Name as Employee','emp.Email')
                        ->where('emp.IdPosition', $itemPosition->Id)
                        ->where('emp.Actived', 1)
                        ->get();

                
                $this->Helper->sendEmailSectionDeptNOD($request, $itemMail);
            }

            DB::table('noe_report')
            ->where('Id', $request->input('NOENumber'))
            ->update([
                'IsNOD'=>1
            ]);

            $this->History->store(31,1,json_encode($requestData));
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
        $item = DB::table('nod_report as nod')
            ->select(
                'nod.*',
                'noe.Id as IdNOEReport',
                'noe.NOENumber',
                'noe.NOENumberAcc',
                'noe.Event',
                'noe.BatchNo',
                'pdc.Name as IdProduct',
                'nve.RelevantDept'
            )
            ->leftjoin('noe_report as noe','noe.Id','=','nod.IdNOEReport')
            ->leftjoin('product as pdc','pdc.Id','=','noe.IdProduct')
            ->leftjoin('noe_verif_evaluation as nve','nve.IdNOEReport','=','nod.IdNOEReport')
            ->where('nve.TypeData',0)
            ->where('nve.Actived','>',0)
            ->where('nod.Actived',1)
            ->where('nod.Id',$request->input('Id'))
            ->first();

        $dtRelDept = DB::table('noe_verif_evaluation as nve')
            ->select(
                'nve.RelevantDept'
            )
            ->where('nve.TypeData',0)
            ->where('nve.Actived',1)
            ->where('nve.IdNOEReport', $item->IdNOEReport)
            ->first();

        $NODCA = DB::table('nod_report_action as nra')
            ->select(
                'nra.IdPIC as IdCAPIC',
                'nra.Date as CADate',
                'nra.Description as CADescription',
                'nra.File as CAFile',
                'nra.File as CAFileName',
                'emp.Name as CAPIC'
            )
            ->leftjoin('employee as emp','emp.Id','=','nra.IdPIC')
            ->where('nra.IdNODReport', $request->input('Id'))
            ->where('nra.Type', 0)
            ->where('nra.Actived', 1)
            ->get(); 

        $NODPA = DB::table('nod_report_action as nra')
            ->select(
                'nra.IdPIC as IdPAPIC',
                'nra.Date as PADate',
                'nra.Description as PADescription',
                'nra.File as PAFile',
                'nra.File as PAFileName',
                'emp.Name as PAPIC'
            )
            ->leftjoin('employee as emp','emp.Id','=','nra.IdPIC')
            ->where('nra.IdNODReport', $request->input('Id'))
            ->where('nra.Type', 1)
            ->where('nra.Actived', 1)
            ->get();
        
        $itemCaretaker = $this->AppWeb->checkCaretaker(session('adminvue')->IdDepartment,session('adminvue')->IdEmployee,session('adminvue')->Id);
        $itemPosition = 0;
        $valPosition = session('adminvue')->CodePosition;
        $exp = explode('.', $valPosition);
        if(strpos(strtolower($exp[1]), 'uh') !== false) $itemPosition = 1;
        if(strpos(strtolower($exp[1]), 'sch') !== false) $itemPosition = 2;
        if(strpos(strtolower($exp[1]), 'apj') !== false) $itemPosition = 3;
        if(strpos(strtolower($exp[1]), 'dh') !== false) $itemPosition = 4;

        $deptTerkait = false;
        $statusDeptTerkait = false;
        $getAnotherEffect = [];
        $dataAnotherEffect = [];

        if(!empty($item)) {
            $item->NOENumber = ['Id'=>$item->IdNOEReport,'NOENumber'=>$item->NOENumber];
            $item->TypeUser = session('adminvue')->TypeUser;
            $item->IdDepartmentSession = session('adminvue')->IdDepartment;
            
            if($item->DescAnotherEffect !== null) {
                $anotherEffect = json_decode($item->DescAnotherEffect);
               
                if($anotherEffect[0] === false) {
                    array_push($dataAnotherEffect, $anotherEffect[0]);
                } else {
                    foreach($anotherEffect as $key => $effect) {
                        $anotherEffectFileDownload = [];

                        if($effect !== null) {
                            $effectFileName = $effect->namefile;

                            $effect->namefile = $effect->namefile;
                            
                            foreach($effectFileName as $keyFile => $valFile) {
                                if($valFile) {
                                    $resultFile = explode("/", $valFile);  
                                }
                                $anotherEffectFileDownload[] = [$resultFile[count($resultFile) - 1], $valFile];
                            }

                            $effect->filedownload = $anotherEffectFileDownload;

                            $dataAnotherEffect[] = $effect;
                        }
                    }   
                }
            }
            
            $resultDept = [];
            $filterRelevantDept = [];
            if($dtRelDept!=null) {
                $RelevantDept = json_decode($dtRelDept->RelevantDept, true);
                if($RelevantDept) {
                    foreach ($RelevantDept as $key => $val) {
                        if($val['Id'] && $val['RelevantDept'] !== 'QA') {
                            array_push($resultDept, $val['Id']);
                        }
                        if($val['RelevantDept'] !== 'QA') {
                            $filterRelevantDept[] = $val;
                        }
                    }
                }
                
                $item->RelevantDept = $filterRelevantDept;
            }
            
            $valresult = array_search(session('adminvue')->IdDepartment, $resultDept);
            if($valresult >= 0 && $valresult !== false) {
                if((strpos(strtolower($exp[1]), 'dh') !== false || $itemCaretaker) && $item->Status == 'Disetujui oleh Dept Head') {
                    $cekDept = DB::table('nod_relevant')
                    ->select('Status')
                    ->where('IdNODReport',$item->Id)
                    ->where('IdDepartment',session('adminvue')->IdDepartment)
                    ->where('Actived','>',0)
                    ->get();

                    if(count($cekDept) > 0) {
                        foreach ($cekDept as $key => $val) {
                            if($val->Status == 1) $statusDeptTerkait = true;
                        }
                    } else {
                        $deptTerkait = true;
                    }
                }
                if($item->Status == 'Disetujui oleh Dept Head Terkait') $statusDeptTerkait = true;
            }

            if($item->Status == 'Disetujui Oleh QA Section Head' || $item->Status == 'Disetujui oleh Dept Head Terkait' || $item->Status == 'Disetujui oleh QA Dept.Head') {

                $getAnotherEffect = DB::table('another_effect as ane')
                                    ->select('ane.id_effect','ane.title_effect')
                                    ->get();

            }
        }

        return json_encode(array(
            'status'=>true,
            'data'=>$item,
            'NODCA'=>$NODCA,
            'NODPA'=>$NODPA,
            'position'=>$itemPosition,
            'department'=>session('adminvue')->IdDepartment,
            'deptTerkait'=>$deptTerkait,
            'getAnotherEffect'=>$getAnotherEffect,
            'selectedAnotherEffect'=> $dataAnotherEffect,
            'statusDeptTerkait'=>$statusDeptTerkait,
            'isCaretaker'=>$itemCaretaker
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

        $anotherEffectFile = [];
        if($request->has('anotherEffectFile') && $request->file('anotherEffectFile')!=null) {
            $arrFile = $request->file('anotherEffectFile');
            foreach($arrFile as $keyFile => $valFile) {
                foreach($valFile as $subKey => $valSubKey) {
                    if(pathinfo($valSubKey->getClientOriginalName(), PATHINFO_EXTENSION)) {
                        $anotherEffectFile[$keyFile][$subKey] = $this->UploadFile->uploadFile($valSubKey, 5);
                    }
                }
            }
        }
        
        
        $oldAnotherEffectFile = $request->input('oldEffectFile');
        if($oldAnotherEffectFile !== null) {
            foreach($oldAnotherEffectFile as $key => $val){
                if (array_key_exists($key, $anotherEffectFile)) {
                    $anotherEffectFile[$key] = array_merge($anotherEffectFile[$key], $val);
                } else {
                    $anotherEffectFile[$key] = $val;
                }
            }
        }
         
        if(count($anotherEffectFile) > 0) {
            $anotherEffectFile = json_encode($anotherEffectFile);
        } else {
            $anotherEffectFile = json_encode($anotherEffectFile);
        }
        
        $dataDescAnotherEffect = [];
        if($request->has('DescAnotherEffect')) {
            $anotherEffectValidation = json_decode($request->input('DescAnotherEffect'));
            
            foreach($anotherEffectValidation as $key => $val) {
                if($val !== null) {
                   foreach(json_decode($anotherEffectFile) as $keyFile => $valFile) {
                    foreach($valFile as $subKey => $subVal) {
                        if($key == $keyFile) {
                            $val->namefile[$subKey] = $subVal;
                        }
                    }
                   }
                   array_push($dataDescAnotherEffect, $val);
                }

                if($val === false) {
                    $val = 'false';
                }

                if(empty($val) && $val !== null) {
                    return response()->json([
                        'status'=>false,
                        'message'=>'Silahkan lengkapi kolom Sistem Lain Yang Terdampak',
                        'validation' => 'required' 
                    ]);
                }
            }

        }
        
        $CAFile = [];
        $OldCAFile = json_decode($request->input('OldCAFile'));
        
        if($request->has('CAFile') && $request->file('CAFile')!=null) {
            $arrFile = $request->file('CAFile');
            foreach($arrFile as $key=>$val) {
                foreach($val as $i=>$v) {
                    if(pathinfo($v->getClientOriginalName(), PATHINFO_EXTENSION)) {
                        $CAFile[$key][$i] = $this->UploadFile->uploadFile($v,6); //6 path nod-report
                    }
                }
                
                if(isset($OldCAFile[$key]))
                {
                    foreach($OldCAFile[$key] as $valOld) {
                        $url = explode('/', $valOld);
                        $Old = str_replace($url[0].'//'.$url[2].'/', '', $valOld);
                        $CAFile[$key][] = $Old;
                    }
                }
            }
        }
        
        $PAFile = [];
        $OldPAFile = json_decode($request->input('OldPAFile'));
        if($request->has('PAFile') && $request->file('PAFile')!=null) {
            $arrFile = $request->file('PAFile');
            foreach($arrFile as $key=>$val) {
                foreach($val as $i=>$v) {
                    if(pathinfo($v->getClientOriginalName(), PATHINFO_EXTENSION)) {
                        $PAFile[$key][$i] = $this->UploadFile->uploadFile($v,6); //6 path nod-report
                    }
                }

                if(isset($OldCAFile[$key]))
                {
                    foreach($OldPAFile[$key] as $valOld) {
                        $url = explode('/', $valOld);
                        $Old = str_replace($url[0].'//'.$url[2].'/', '', $valOld);
                        $OldPAFile[$key][] = $Old;
                    }
                }
            }
        }

        $item = DB::table('nod_report')
            ->select('IdNOEReport', 'IsRevision')
            ->orderBy('Date', 'desc')
            ->where('Id', $request->input('Id'))
            ->first();
       
        DB::begintransaction();
        try{
            if($item->IdNOEReport != $request->input('NOENumber')) {
                DB::table('noe_report')
                ->where('Id', $item->IdNOEReport)
                ->update([
                    'IsNOD'=>0
                ]);

                DB::table('noe_report')
                ->where('Id', $request->input('NOENumber'))
                ->update([
                    'IsNOD'=>1
                ]);
            }
            if($item->IsRevision == true)
            {
                DB::table('nod_report')
                ->where('Id', $request->input('Id'))
                ->update([
                    'IsUpadatedRevision' => 1    
                ]);

                $IdNOEReport = DB::table('nod_report')
                ->insertGetId([
                    'IdNOEReport'=>$request->input('NOENumber'),
                    'IdDepartment'=>session('adminvue')->IdDepartment,
                    'IdPosition'=>session('adminvue')->IdPosition,
                    'IdPublish'=>$request->input('IdPublish'),
                    'IdSectionPublish'=>$request->input('publishSection'),
                    'IdRelevantDept' => 0,
                    'IdReportDept'=> 0,
                    'IsRevision'=>0,
                    'NODNumber'=>$request->input('NODNumber'),
                    'Date'=>Carbon::createFromFormat('d/m/Y H:i:s', $request->input('Date'))->format('Y-m-d H:i:s'),
                    'ProperCondition'=>$request->input('ProperCondition'),
                    'Man'=>$request->input('Man'),
                    'Machine'=>$request->input('Machine'),
                    'Method'=>$request->input('Method'),
                    'Material'=>$request->input('Material'),
                    'Milieu'=>$request->input('Milieu'),
                    'UserEntry'=>session('adminvue')->Id
    
                ]);
    
                $IdCAPIC = $request->input('IdCAPIC');
                $IdPAPIC = $request->input('IdPAPIC');
    
                if(count($IdCAPIC)>0) { foreach ($IdCAPIC as $key => $val) {
                    $File = [];
                    if(!empty($CAFile)) $File = $CAFile[$key];
                    DB::table('nod_report_action')
                    ->insert([
                        'IdNODReport'=>$IdNOEReport,
                        'IdPIC'=>$val,
                        'Date'=>$request->input('CADate')[$key],
                        'Description'=>$request->input('CADescription')[$key],
                        'File'=>json_encode($File),
                        'UserEntry'=>session('adminvue')->Id
                    ]);
                } }
    
                if(count($IdPAPIC)>0) { foreach ($IdPAPIC as $key => $val) {
                    $File = [];
                    if(!empty($PAFile)) $File = $PAFile[$key];
                    DB::table('nod_report_action')
                    ->insert([
                        'IdNODReport'=>$IdNOEReport,
                        'IdPIC'=>$val,
                        'Date'=>$request->input('PADate')[$key],
                        'Description'=>$request->input('PADescription')[$key],
                        'File'=>json_encode($File),
                        'Type'=>1, // 1: Preventive Action;
                        'UserEntry'=>session('adminvue')->Id
                    ]);
                } }
    
                DB::table('noe_report')
                ->where('Id', $request->input('NOENumber'))
                ->update([
                    'IsNOD'=>1
                ]);
    
                $this->History->store(31,1,json_encode($requestData));
            }
            else
            {
                DB::table('nod_report')
                ->where('Id', $request->input('Id'))
                ->update([
                    'IdNOEReport'=>$request->input('NOENumber'),
                    'Date'=>Carbon::createFromFormat('d/m/Y H:i:s', $request->input('Date'))->format('Y-m-d H:i:s'),
                    'ProperCondition'=>$request->input('ProperCondition'),
                    'Man'=>$request->input('Man'),
                    'Machine'=>$request->input('Machine'),
                    'Method'=>$request->input('Method'),
                    'Material'=>$request->input('Material'),
                    'Milieu'=>$request->input('Milieu'),
                    'DescAnotherEffect'=>json_encode($dataDescAnotherEffect)
                ]);
    
                $IdCAPIC = $request->input('IdCAPIC');
                $IdPAPIC = $request->input('IdPAPIC');
    
                DB::table('nod_report_action')
                ->where('IdNODReport', $request->input('Id'))
                ->delete();
    
                if(count($IdCAPIC)>0) { foreach ($IdCAPIC as $key => $val) {
                    $File = [];
                    if(!empty($CAFile)) $File = $CAFile[$key];
                    DB::table('nod_report_action')
                    ->insert([
                        'IdNODReport'=>$request->input('Id'),
                        'IdPIC'=>$val,
                        'Date'=>$request->input('CADate')[$key],
                        'Description'=>$request->input('CADescription')[$key],
                        'File'=>json_encode($File),
                        'UserEntry'=>session('adminvue')->Id
                    ]);
                } }
    
                if(count($IdPAPIC)>0) { foreach ($IdPAPIC as $key => $val) {
                    $File = [];
                    if(!empty($PAFile)) $File = $PAFile[$key];
                    DB::table('nod_report_action')
                    ->insert([
                        'IdNODReport'=>$request->input('Id'),
                        'IdPIC'=>$val,
                        'Date'=>$request->input('PADate')[$key],
                        'Description'=>$request->input('PADescription')[$key],
                        'File'=>json_encode($File),
                        'Type'=>1, // 1: Preventive Action;
                        'UserEntry'=>session('adminvue')->Id
                    ]);
                } }
    
                $this->History->store(31,2,json_encode($requestData));
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
        $item = DB::table('nod_report')
            ->select('*')
            ->where('Id', $request->input('Id'))
            ->first();

        DB::begintransaction();
        try{
            DB::table('nod_report')
            ->where('Id', $request->input('Id'))
            ->update([
                'Actived'=>0
            ]);

            DB::table('noe_report')
            ->where('Id', $item->IdNOEReport)
            ->update([
                'IsNOD'=>0
            ]);

            DB::table('nod_report_action')
            ->where('IdNODReport', $request->input('Id'))
            ->update([
                'Actived'=>0
            ]);

            $this->History->store(31,3,json_encode($item));
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
            'NODNumber'=>'required',
            'ProperCondition'=>'required',
            'Man'=>'required',
            'Machine'=>'required',
            'Method'=>'required',
            'Material'=>'required',
            'Milieu'=>'required',
        ];
    }

    function anotherEffectValidation () {
        return [
            'Sistem Lain Yang Terdampak (Bila Ada)' => 'required'
        ];
    }

    function sendQuestionValidation()
    {
        return [
            'Number'=>'required',
            'Deviation'=>'required',
            'IdTeam'=>'required',
            'Question'=>'required',
            'StartTime'=>'required',
            'EndTime'=>'required',
        ];
    }

    public function publish(Request $request) {
        $item = DB::table('nod_report')
            ->select('*')
            ->where('Id', $request->input('Id'))
            ->first();
        
        $dtPosition = DB::table('position')
            ->select('Id','Status')
            ->where('Id', $item->IdPublish)
            ->where('IdDepartment', session('adminvue')->IdDepartment)
            ->where('Actived', 1)
            ->first();
        if($dtPosition==null) $isActive = 0;
        else $isActive = $dtPosition->Status;
       
        $valStatus = 2; //2: Dilaporkan ke Unit Head
        if(!$isActive) $Status = 3; //3: Disetujui oleh Section Head

        $valPosition = session('adminvue')->CodePosition;
        $exp = explode('.', $valPosition);
        if(strpos(strtolower($exp[1]), 'uh') !== false) $valStatus = 3;
        if(strpos(strtolower($exp[1]), 'sch') !== false) $valStatus = 4;
        if(strpos(strtolower($exp[1]), 'dh') !== false) $valStatus = 5;
        
        DB::begintransaction();
        try{
            DB::table('nod_report')
            ->where('Id', $request->input('Id'))
            ->update([
                'Status'=>$valStatus,
                'IsCorrection'=> 0
            ]);

            try{
                // $IdPosition = json_decode(session('adminvue')->ParentPosition);
                $IdPosition = $dtPosition->Id;
                
                // $selectIdPosition = array_filter($IdPosition, function($value){
                //     dd($value);
                // });
                /*$itemPosition = DB::table('position')
                    ->select('Id')
                    ->where('Code', 'like', '%'.'.dh')
                    ->where('IdDepartment', session('adminvue')->IdDepartment)
                    ->where('Actived', 1)
                    ->first();
                if($itemPosition!=null) $IdPosition = $itemPosition->Id;
                else $IdPosition = 0;*/
                
                if($IdPosition!=0 || $IdPosition!=null) {
                    $itemMail = $this->MainDB->table('employee as emp')
                        ->select('emp.Name as Employee','emp.Email')
                        ->where('emp.IdPosition', $IdPosition)
                        ->where('emp.Actived', 1)
                        ->get();
                    
                    $this->Helper->sendEmailNod($item, $itemMail);
                }

                $this->History->store(31,4,json_encode($item));
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

    public function approve(Request $request) {
        $item = DB::table('nod_report as nod')
            ->select('nod.*','noe.DatePublish','pst.Id as deptHeadPelopor')
            ->leftjoin('users as usr','usr.Id','=','nod.UserDept')
            ->leftjoin('employee as emp','emp.Id','=','usr.IdEmployee')
            ->leftjoin('position as pst','pst.Id','=','emp.IdPosition')
            ->leftjoin('noe_report as noe','noe.Id','=','nod.IdNOEReport')
            ->where('nod.Id', $request->input('Id'))
            ->first();
       
        $itemNOEVerif = DB::table('noe_verif_evaluation')
            ->select('RelevantDept')
            ->where('IdNOEReport', $item->IdNOEReport)
            ->where('TypeData',0)
            ->where('Actived',1)
            ->first();
        
        $RelevantDept = json_decode($itemNOEVerif->RelevantDept, true);
        $resultDept = [];
        if($RelevantDept) {
            foreach ($RelevantDept as $key => $val) {
                if($val['Id'] && $val['RelevantDept'] !== 'QA') {
                    array_push($resultDept, $val['Id']);
                }
            }
        }
        
        $itemNODRelevant = DB::table('nod_relevant')
            ->where('IdNODReport', $request->input('Id'))
            ->where('Status',1)
            ->where('Actived',1)
            ->count();
        
        $itemCaretaker = $this->AppWeb->checkCaretaker(session('adminvue')->IdDepartment,session('adminvue')->IdEmployee,session('adminvue')->Id);
        $valPosition = session('adminvue')->CodePosition;
        $exp = explode('.', $valPosition);
        
        DB::begintransaction();
        try{
            // jika department pelapor sama dengan department head pelapor
            if($item->IdDepartment == session('adminvue')->IdDepartment) {
                if($item->Status === 'Dilaporkan ke Unit Head' && strpos(strtolower($exp[1]), 'uh') !== false) {
                    DB::table('nod_report')
                    ->where('Id', $request->input('Id'))
                    ->update([
                        'Status'=>3,
                        'DateUnit'=>date('Y-m-d H:i:s'),
                        'UserUnit'=>session('adminvue')->Id
                    ]);

                    try{
                        $IdPosition = json_decode(session('adminvue')->ParentPosition);
                        $getParentPosition = array_filter($IdPosition, function($value) use($item) {
                            return $item->IdSectionPublish == $value->Id;
                        });
                        
                        if($IdPosition!=0 || $IdPosition!=null) {
                            $itemMail = $this->MainDB->table('employee as emp')
                                ->select('emp.Name as Employee','emp.Email')
                                ->where('emp.IdPosition', array_values($getParentPosition)[0]->Id)
                                ->where('emp.Actived', 1)
                                ->get();
                            
                            $data['Subject'] = 'NOD Report - Approved';
                            $data['Title'] = 'Data NOD telah diperiksa, Oleh :';

                            $dataMail['Diperiksa'] = session('adminvue')->Name .' | '. session('adminvue')->Position .' - '. session('adminvue')->Department;
                            $dataMail['NOD Number'] = $item->NODNumber;
                            $dataMail['Proper Condition'] = $item->ProperCondition;
                            $dataMail['Man'] = $item->Man;
                            $dataMail['Machine'] = $item->Machine;
                            $dataMail['Method'] = $item->Method;
                            $dataMail['Material'] = $item->Material;
                            $dataMail['Milieu'] = $item->Milieu;

                            if(count($itemMail)>0) { foreach ($itemMail as $key => $val) {
                                $data['Employee'] = $val->Employee;
                                $data['Email'] = $val->Email;
                                
                                $this->History->sendMail($data, $dataMail, $dataMailObject=[]);
                            } }
                        }
                    }catch (Exception $e){
                        return json_encode(array(
                            'status'=>false,
                            'message'=>'Setujui Data Gagal, Pengiriman Email Invalid!',
                            'validation'=>$validation->errors(),
                        ));
                    }

                } elseif($item->Status === 'Disetujui oleh Unit Head' && strpos(strtolower($exp[1]), 'sch') !== false) {
                    DB::table('nod_report')
                    ->where('Id', $request->input('Id'))
                    ->update([
                        'Status'=>4,
                        'DateSection'=>date('Y-m-d H:i:s'),
                        'UserSection'=>session('adminvue')->Id
                    ]);

                    try{
                        $IdPosition = json_decode(session('adminvue')->ParentPosition);

                        if($IdPosition!=0 || $IdPosition!=null) {
                            $itemMail = $this->MainDB->table('employee as emp')
                                ->select('emp.Name as Employee','emp.Email')
                                ->where('emp.IdPosition', $IdPosition[0]->Id)
                                ->where('emp.Actived', 1)
                                ->get();
                            
                            $data['Subject'] = 'NOD Report - Approved';
                            $data['Title'] = 'Data NOD telah diperiksa, Oleh :';

                            $dataMail['Diperiksa'] = session('adminvue')->Name .' | '. session('adminvue')->Position .' - '. session('adminvue')->Department;
                            $dataMail['NOD Number'] = $item->NODNumber;
                            $dataMail['Proper Condition'] = $item->ProperCondition;
                            $dataMail['Man'] = $item->Man;
                            $dataMail['Machine'] = $item->Machine;
                            $dataMail['Method'] = $item->Method;
                            $dataMail['Material'] = $item->Material;
                            $dataMail['Milieu'] = $item->Milieu;

                            if(count($itemMail)>0) { foreach ($itemMail as $key => $val) {
                                $data['Employee'] = $val->Employee;
                                $data['Email'] = $val->Email;

                                $this->History->sendMail($data, $dataMail, $dataObjectEmail=[]);
                            } }
                        }
                    }catch (Exception $e){
                        return json_encode(array(
                            'status'=>false,
                            'message'=>'Setujui Data Gagal, Pengiriman Email Invalid!',
                            'validation'=>$validation->errors(),
                        ));
                    }

                } elseif($item->Status === 'Disetujui oleh Section Head' && (strpos(strtolower($exp[1]), 'dh') !== false || $itemCaretaker) ) {
                    if($itemCaretaker) {
                        DB::table('nod_report')
                        ->where('Id', $request->input('Id'))
                        ->update([
                            'IsMandatoryDept'=>1,
                            'DescriptionMandatoryDept'=>$request->input('DescriptionCaretaker'),
                            'Status'=>5,
                            'DateDept'=>date('Y-m-d H:i:s'),
                            'UserDept'=>session('adminvue')->Id
                        ]);
                    } else {
                        $statusDeptHead = 5;
                        if($request->input('SubmitVal') == 0) {
                            $statusDeptHead = 6;
                        }
                        DB::table('nod_report')
                        ->where('Id', $request->input('Id'))
                        ->update([
                            'Status'=> $statusDeptHead,
                            'DateDept'=>date('Y-m-d H:i:s'),
                            'UserDept'=>session('adminvue')->Id
                        ]);
                    }

                    try{
                       
                        $IdDept = array(
                            $request->input('SubmitVal')
                        );
                        if($request->input('SubmitVal') == 0) {
                            $itemPst = DB::table('position')
                                ->select('Id')
                                ->where('Code', 'like', '%'.'.dh')
                                ->where('IdDepartment', 67)
                                ->where('Actived', 1)
                                ->first();

                                if($itemPst!=null) $IdPosition = $itemPst->Id;
                                else $IdPosition = 0;
                        } else {
                            $itemPst = DB::table('position')
                                    ->select('Id')
                                    ->where('Code', 'like', '%'.'.sch')
                                    ->where('IdDepartment', $IdDept)
                                    ->where('Actived', 1)
                                    ->first();
                                if($itemPst!=null) $IdPosition = $itemPst->Id;
                                else $IdPosition = 0;
                        }
                        
                        if($IdPosition !== null && !empty($IdPosition)) {
                            
                            if(empty($item->IdRelevantDept))
                            {
                                DB::table('nod_report')
                                ->where('Id', $request->input('Id'))
                                ->update([
                                    'IdRelevantDept'=> json_encode($IdDept)
                                ]);
                            }


                            $itemMail = $this->MainDB->table('employee as emp')
                                ->select('emp.Name as Employee','emp.Email')
                                ->where('emp.IdPosition', $IdPosition)
                                ->where('emp.Actived', 1)
                                ->get();
                            
                            $data['Subject'] = 'NOD Report - Approved';
                            $data['Title'] = 'Data NOD telah disetujui, Oleh :';

                            $dataMail['Disetujui'] = session('adminvue')->Name .' | '. session('adminvue')->Position .' - '. session('adminvue')->Department;
                            $dataMail['NOD Number'] = $item->NODNumber;
                            $dataMail['Proper Condition'] = $item->ProperCondition;
                            $dataMail['Man'] = $item->Man;
                            $dataMail['Machine'] = $item->Machine;
                            $dataMail['Method'] = $item->Method;
                            $dataMail['Material'] = $item->Material;
                            $dataMail['Milieu'] = $item->Milieu;

                            if(count($itemMail)>0) { foreach ($itemMail as $key => $val) {
                                $data['Employee'] = $val->Employee;
                                $data['Email'] = $val->Email;
                               
                                $this->History->sendMail($data, $dataMail, $dataObjectEmail=[]);
                            } }
                        }
                    }catch (Exception $e){
                        return json_encode(array(
                            'status'=>false,
                            'message'=>'Setujui Data Gagal, Pengiriman Email Invalid!',
                            'validation'=>$validation->errors(),
                        ));
                    }

                } elseif(($item->Status=='Disetujui oleh Dept Head Terkait' || $item->Status=='Disetujui Oleh QA Section Head') && ((strpos(strtolower($exp[1]), 'sch') !== false) || (strpos(strtolower($exp[1]), 'dh') !== false))) {
                    if(strpos(strtolower($exp[1]), 'sch') !== false) {
                        DB::table('nod_report')
                        ->where('Id', $request->input('Id'))
                        ->update([
                            'Status'=>11,
                            'IsCorrection'=>0
                        ]);
                    } else {
        
                        DB::table('nod_report')
                        ->where('Id', $request->input('Id'))
                        ->update([
                            'Status'=>8,
                            // 'IsClosed'=>1, // Data NOD closed setelah NOD Review selesai
                            'DateQA'=>date('Y-m-d H:i:s'),
                            'UserQA'=>session('adminvue')->Id
                        ]);
                    }
                    
                    
                    try {
                        $data['Subject'] = 'NOD Report - Approved';
                        $data['Title'] = 'Data NOD telah disetujui, Oleh :';

                        $dataMail['Disetujui'] = session('adminvue')->Name .' | '. session('adminvue')->Position .' - '. session('adminvue')->Department;
                        $dataMail['NOD Number'] = $item->NODNumber;
                        $dataMail['Proper Condition'] = $item->ProperCondition;
                        $dataMail['Man'] = $item->Man;
                        $dataMail['Machine'] = $item->Machine;
                        $dataMail['Method'] = $item->Method;
                        $dataMail['Material'] = $item->Material;
                        $dataMail['Milieu'] = $item->Milieu;

                        if(strpos(strtolower($exp[1]), 'sch') !== false || strpos(strtolower($exp[1]), 'dh') !== false) {
                            $getEffectEmail = [];
                            $anotherEffectEmail = json_decode($item->DescAnotherEffect);
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
                            
                            $dataMail['AnotherEffect'] = $getEffectEmail;
                        }

                        if (strpos(strtolower($exp[1]), 'sch') !== false) {
                            $IdPosition = json_decode(session('adminvue')->ParentPosition);
                            
                            if($IdPosition!=0 || $IdPosition!=null) {
                                $itemMail = $this->MainDB->table('employee as emp')
                                    ->select('emp.Name as Employee','emp.Email')
                                    ->where('emp.IdPosition', $IdPosition[0]->Id)
                                    ->where('emp.Actived', 1)
                                    ->get();
                                
                                if(count($itemMail)>0) { foreach ($itemMail as $key => $val) {
                                    $data['Employee'] = $val->Employee;
                                    $data['Email'] = $val->Email;

                                    $this->History->sendMail($data, $dataMail, $dataObjectEmail = []);
                                } }
                            }
                        } else {
                            $IdPosition = session('adminvue')->IdPosition;
                            
                            if($IdPosition!=0 || $IdPosition!=null) {
                                $itemMail = $this->MainDB->table('employee as emp')
                                    ->select('emp.Name as Employee','emp.Email')
                                    ->where('emp.IdDepartment', 67)
                                    ->where('emp.IdPosition', '<>', $IdPosition)
                                    ->where('emp.Actived', 1)
                                    ->get();
                                
                                if(count($itemMail)>0) { foreach ($itemMail as $key => $val) {
                                    $data['Employee'] = $val->Employee;
                                    $data['Email'] = $val->Email;

                                    $this->History->sendMail($data, $dataMail, $dataObjectEmail = []);
                                } }

                                $getPeloporPosition = [];
                                array_push($getPeloporPosition, $item->IdPosition);
                                array_push($getPeloporPosition, $item->IdPublish);
                                array_push($getPeloporPosition, $item->IdSectionPublish);
                                array_push($getPeloporPosition, $item->deptHeadPelopor);
                                
                                $itemMailPelopor = $this->MainDB->table('employee as emp')
                                    ->select('emp.Name as Employee','emp.Email')
                                    ->leftjoin('position as pst','pst.Id','=','emp.IdPosition')
                                    ->whereIn('pst.Id', $getPeloporPosition)
                                    ->where('emp.IdDepartment', $item->IdDepartment)
                                    ->where('emp.Actived', 1)
                                    ->get();
                                
                                if(count($itemMailPelopor)>0) { foreach ($itemMailPelopor as $key => $val) {
                                    $data['Employee'] = $val->Employee;
                                    $data['Email'] = $val->Email;

                                    $this->History->sendMail($data, $dataMail, $dataObjectEmail = []);
                                } }
                                
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
                                    
                                    if(count($relevantItemMail)>0) { foreach ($relevantItemMail as $key => $val) {
                                        $data['Employee'] = $val->Employee;
                                        $data['Email'] = $val->Email;
    
                                        $this->History->sendMail($data, $dataMail, $dataObjectEmail = []);
                                    } }
                                }
                            }
                        }

                    } catch (\exception $th) {
                        return json_encode(array(
                            'status'=>false,
                            'message'=>'Setujui Data Gagal, Pengiriman Email Invalid!',
                            'validation'=>$validation->errors(),
                        ));
                    }

                } else {
                    return json_encode(array(
                        'status'=>false,
                        'message'=>'Anda Tidak Punya Otoritas Approve Data!',
                    ));
                }
            } elseif($RelevantDept && $item->Status == 'Disetujui oleh Dept Head') {
                // jika department head terkait
                $countDept = 0;
                $idDept = $request->input('SubmitVal');
                foreach ($RelevantDept as $key => $val) {
                    if(session('adminvue')->IdDepartment == $val['Id']) {
                        if($itemCaretaker) {
                            DB::table('nod_relevant')
                            ->insert([
                                'IsMandatory'=>1,
                                'DescriptionMandatory'=>$request->input('DescriptionCaretaker'),
                                'IdNODReport'=>$request->input('Id'),
                                'IdDepartment'=>$val['Id'],
                                'IdUsers'=>session('adminvue')->Id,
                                'Status'=>1,
                                'UserEntry'=>session('adminvue')->Id
                            ]);
                        } else {
                            if(strpos(strtolower($exp[1]), 'dh') === false) {
                                return json_encode(array(
                                    'status'=>false,
                                    'message'=>'Anda Bukan Sebagai Caretaker!',
                                ));
                            } else {
                                DB::table('nod_relevant')
                                ->insert([
                                    'IdNODReport'=>$request->input('Id'),
                                    'IdDepartment'=>$val['Id'],
                                    'IdUsers'=>session('adminvue')->Id,
                                    'Status'=>1,
                                    'UserEntry'=>session('adminvue')->Id
                                ]);

                                $currentValue = json_decode($item->IdRelevantDept);
                                $currentValue[] = $idDept;
                                
                                DB::table('nod_report')
                                ->where('Id', $request->input('Id'))
                                ->update([
                                    'IdRelevantDept'=> json_encode($currentValue)
                                ]);

                                if($idDept !== null)
                                {
                                    $itemPst = DB::table('position')
                                        ->select('Id')
                                        ->where('Code', 'like', '%'.'.dh')
                                        ->where('IdDepartment', $idDept)
                                        ->where('Actived', 1)
                                        ->first();
                                    if($itemPst!=null) $IdPosition = $itemPst->Id;
                                    else $IdPosition = 0;
                                   
                                    $itemMail = $this->MainDB->table('employee as emp')
                                    ->select('emp.Name as Employee','emp.Email')
                                    ->where('emp.IdPosition', $IdPosition)
                                    ->where('emp.Actived', 1)
                                    ->get();
                                   
                                    $data['Subject'] = 'NOD Report - Approved';
                                    $data['Title'] = 'Data NOD telah disetujui, Oleh :';
    
                                    $dataMail['Disetujui'] = session('adminvue')->Name .' | '. session('adminvue')->Position .' - '. session('adminvue')->Department;
                                    $dataMail['NOD Number'] = $item->NODNumber;
                                    $dataMail['Proper Condition'] = $item->ProperCondition;
                                    $dataMail['Man'] = $item->Man;
                                    $dataMail['Machine'] = $item->Machine;
                                    $dataMail['Method'] = $item->Method;
                                    $dataMail['Material'] = $item->Material;
                                    $dataMail['Milieu'] = $item->Milieu;
                                    
                                    if(count($itemMail)>0) { foreach ($itemMail as $key => $val) {
                                        $data['Employee'] = $val->Employee;
                                        $data['Email'] = $val->Email;
                                    
                                        $this->History->sendMail($data, $dataMail, $dataObjectEmail=[]);
                                    } }
                                }

                            }
                        }
                        $countDept += 1;
                    }
                }
               
                // jika semua department head terkait sudah approve
                if(count($resultDept) == $itemNODRelevant+1) {
                    if($countDept != 0) {
                        $diffDay = $this->AppWeb->diffDateApprove($item->DatePublish);
                        $StatusTimeDept = 1;
                        if($diffDay>12) $StatusTimeDept = 2;

                        DB::table('nod_report')
                        ->where('Id', $request->input('Id'))
                        ->update([
                            'Status'=>6,
                            'StatusTimeDept'=>$StatusTimeDept
                        ]);

                        try{
                            $itemPst = DB::table('position')
                                ->select('Id')
                                ->where('Code', 'like', '%'.'.sch') // Send ke QA deviation team
                                ->where('IdDepartment', 67) // 67: Dept. QA
                                ->where('Actived', 1)
                                ->first();
                            if($itemPst!=null) $IdPosition = $itemPst->Id;
                            else $IdPosition = 0;
                            
                            if($IdPosition!=0 || $IdPosition!=null) {
                                $itemMail = $this->MainDB->table('employee as emp')
                                    ->select('emp.Name as Employee','emp.Email')
                                    ->where('emp.IdPosition', $IdPosition)
                                    ->where('emp.Actived', 1)
                                    ->get();
                              
                                $data['Subject'] = 'NOD Report - Approved';
                                $data['Title'] = 'Data NOD telah disetujui, Oleh :';

                                $dataMail['Disetujui'] = session('adminvue')->Name .' | '. session('adminvue')->Position .' - '. session('adminvue')->Department;
                                $dataMail['NOD Number'] = $item->NODNumber;
                                $dataMail['Proper Condition'] = $item->ProperCondition;
                                $dataMail['Man'] = $item->Man;
                                $dataMail['Machine'] = $item->Machine;
                                $dataMail['Method'] = $item->Method;
                                $dataMail['Material'] = $item->Material;
                                $dataMail['Milieu'] = $item->Milieu;

                                if(count($itemMail)>0) { foreach ($itemMail as $key => $val) {
                                    $data['Employee'] = $val->Employee;
                                    $data['Email'] = $val->Email;

                                    $this->History->sendMail($data, $dataMail, $dataObjectEmail = []);
                                } }
                            }
                        }catch (Exception $e){
                            return json_encode(array(
                                'status'=>false,
                                'message'=>'Setujui Data Gagal, Pengiriman Email Invalid!',
                                'validation'=>$validation->errors(),
                            ));
                        }
                    }
                }
            } elseif(session('adminvue')->IdDepartment == 67 && ($item->Status=='Disetujui oleh Dept Head Terkait' || $item->Status=='Disetujui oleh QA APJ' || $item->Status=='Disetujui Oleh QA Section Head')) {
                // jika department QA
                if(strpos(strtolower($exp[1]), 'apj') !== false || strpos(strtolower($exp[1]), 'dh') !== false || strpos(strtolower($exp[1]), 'sch') !== false || $itemCaretaker) {
                    if(strpos(strtolower($exp[1]), 'apj') !== false) {
                        DB::table('nod_report')
                        ->where('Id', $request->input('Id'))
                        ->update([
                            'Status'=>7,
                            'DateQAAPJ'=>date('Y-m-d H:i:s'),
                            'UserQAAPJ'=>session('adminvue')->Id
                        ]);
                    } else if(strpos(strtolower($exp[1]), 'sch') !== false) {
                        DB::table('nod_report')
                        ->where('Id', $request->input('Id'))
                        ->update([
                            'Status'=>11,
                            'IsCorrection'=>0
                        ]);
                    } else if($itemCaretaker) {
                        DB::table('nod_report')
                        ->where('Id', $request->input('Id'))
                        ->update([
                            'IsMandatoryQA'=>1,
                            'DescriptionMandatoryQA'=>$request->input('DescriptionCaretaker'),
                            'Status'=>8,
                            // 'IsClosed'=>1, // Data NOD closed setelah NOD Review selesai
                            'DateQA'=>date('Y-m-d H:i:s'),
                            'UserQA'=>session('adminvue')->Id
                        ]);
                    } else {
                        DB::table('nod_report')
                        ->where('Id', $request->input('Id'))
                        ->update([
                            'Status'=>8,
                            // 'IsClosed'=>1, // Data NOD closed setelah NOD Review selesai
                            'DateQA'=>date('Y-m-d H:i:s'),
                            'UserQA'=>session('adminvue')->Id
                        ]);
                    }
                   
                    try{
                        /*$itemPst = DB::table('position')
                            ->select('Id')
                            ->where('Code', 'like', '%'.'.sch')
                            ->where('IdDepartment', 67) // 67: Dept. QA
                            ->where('Actived', 1)
                            ->first();
                        if($itemPst!=null) $IdPosition = $itemPst->Id;
                        else $IdPosition = 0;*/

                        $data['Subject'] = 'NOD Report - Approved';
                        $data['Title'] = 'Data NOD telah disetujui, Oleh :';

                        $dataMail['Disetujui'] = session('adminvue')->Name .' | '. session('adminvue')->Position .' - '. session('adminvue')->Department;
                        $dataMail['NOD Number'] = $item->NODNumber;
                        $dataMail['Proper Condition'] = $item->ProperCondition;
                        $dataMail['Man'] = $item->Man;
                        $dataMail['Machine'] = $item->Machine;
                        $dataMail['Method'] = $item->Method;
                        $dataMail['Material'] = $item->Material;
                        $dataMail['Milieu'] = $item->Milieu;

                        if(strpos(strtolower($exp[1]), 'sch') !== false || strpos(strtolower($exp[1]), 'dh') !== false) {
                            $getEffectEmail = [];
                            $anotherEffectEmail = json_decode($item->DescAnotherEffect);
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
                            
                            $dataMail['AnotherEffect'] = $getEffectEmail;
                        }

                        if(strpos(strtolower($exp[1]), 'apj') !== false) {
                            $IdPosition = session('adminvue')->ParentPosition;
                            if($IdPosition!=0 || $IdPosition!=null) {
                                $itemMail = $this->MainDB->table('employee as emp')
                                    ->select('emp.Name as Employee','emp.Email')
                                    ->where('emp.IdPosition', $IdPosition)
                                    ->where('emp.Actived', 1)
                                    ->get();
                                
                                if(count($itemMail)>0) { foreach ($itemMail as $key => $val) {
                                    $data['Employee'] = $val->Employee;
                                    $data['Email'] = $val->Email;

                                    $this->History->sendMail($data, $dataMail, $dataObjectEmail = []);
                                } }
                            }
                        } elseif (strpos(strtolower($exp[1]), 'sch') !== false) {
                            $IdPosition = json_decode(session('adminvue')->ParentPosition);
                            
                            if($IdPosition!=0 || $IdPosition!=null) {
                                $itemMail = $this->MainDB->table('employee as emp')
                                    ->select('emp.Name as Employee','emp.Email')
                                    ->where('emp.IdPosition', $IdPosition[0]->Id)
                                    ->where('emp.Actived', 1)
                                    ->get();
                                
                                if(count($itemMail)>0) { foreach ($itemMail as $key => $val) {
                                    $data['Employee'] = $val->Employee;
                                    $data['Email'] = $val->Email;

                                    $this->History->sendMail($data, $dataMail, $dataObjectEmail = []);
                                } }
                            }
                        } else {
                            $IdPosition = session('adminvue')->IdPosition;
                            
                            if($IdPosition!=0 || $IdPosition!=null) {
                                $itemMail = $this->MainDB->table('employee as emp')
                                    ->select('emp.Name as Employee','emp.Email')
                                    ->where('emp.IdDepartment', 67)
                                    ->where('emp.IdPosition', '<>', $IdPosition)
                                    ->where('emp.Actived', 1)
                                    ->get();
                                
                                if(count($itemMail)>0) { foreach ($itemMail as $key => $val) {
                                    $data['Employee'] = $val->Employee;
                                    $data['Email'] = $val->Email;

                                    $this->History->sendMail($data, $dataMail, $dataObjectEmail = []);
                                } }

                                $getPeloporPosition = [];
                                array_push($getPeloporPosition, $item->IdPosition);
                                array_push($getPeloporPosition, $item->IdPublish);
                                array_push($getPeloporPosition, $item->IdSectionPublish);
                                array_push($getPeloporPosition, $item->deptHeadPelopor);
                                
                                $itemMailPelopor = $this->MainDB->table('employee as emp')
                                    ->select('emp.Name as Employee','emp.Email')
                                    ->leftjoin('position as pst','pst.Id','=','emp.IdPosition')
                                    ->whereIn('pst.Id', $getPeloporPosition)
                                    ->where('emp.IdDepartment', $item->IdDepartment)
                                    ->where('emp.Actived', 1)
                                    ->get();
                                
                                if(count($itemMailPelopor)>0) { foreach ($itemMailPelopor as $key => $val) {
                                    $data['Employee'] = $val->Employee;
                                    $data['Email'] = $val->Email;

                                    $this->History->sendMail($data, $dataMail, $dataObjectEmail = []);
                                } }
                                
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
                                    
                                    if(count($relevantItemMail)>0) { foreach ($relevantItemMail as $key => $val) {
                                        $data['Employee'] = $val->Employee;
                                        $data['Email'] = $val->Email;
    
                                        $this->History->sendMail($data, $dataMail, $dataObjectEmail = []);
                                    } }
                                }
                            }
                        }
                        
                    }catch (Exception $e){
                        return json_encode(array(
                            'status'=>false,
                            'message'=>'Setujui Data Gagal, Pengiriman Email Invalid!',
                            'validation'=>$validation->errors(),
                        ));
                    }

                } else {
                    return json_encode(array(
                        'status'=>false,
                        'message'=>'Anda Bukan Sebagai Caretaker!',
                    ));
                }
            }

            $this->History->store(31,13,json_encode($item));
            DB::commit();
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
        $item = DB::table('nod_report as nod')
            ->select('nod.*','noe.DatePublish', 'pst.Id as deptHeadPelopor')
            ->leftjoin('users as usr','usr.Id','=','nod.UserDept')
            ->leftjoin('employee as emp','emp.Id','=','usr.IdEmployee')
            ->leftjoin('position as pst','pst.Id','=','emp.IdPosition')
            ->leftjoin('noe_report as noe','noe.Id','=','nod.IdNOEReport')
            ->where('nod.Id', $request->input('Id'))
            ->first();

        $itemNOEVerif = DB::table('noe_verif_evaluation')
            ->select('RelevantDept')
            ->where('IdNOEReport', $item->IdNOEReport)
            ->where('TypeData',0)
            ->where('Actived',1)
            ->first();

        $RelevantDept = json_decode($itemNOEVerif->RelevantDept, true);
        $resultDept = [];
        if($RelevantDept) {
            foreach ($RelevantDept as $key => $val) {
                if($val['Id'] && $val['RelevantDept'] !== 'QA') {
                    array_push($resultDept, $val['Id']);
                }
            }
        }
        
        $userDepartment = $this->MainDB->table('users as usr')
            ->select('emp.IdDepartment')
            ->leftjoin('employee as emp','emp.Id','=','usr.IdEmployee')
            ->where('usr.Id',$item->UserEntry)
            ->where('usr.Actived','>',0)
            ->first();
        
        $itemCaretaker = $this->AppWeb->checkCaretaker(session('adminvue')->IdDepartment,session('adminvue')->IdEmployee,session('adminvue')->Id);
        $valPosition = session('adminvue')->CodePosition;
        $exp = explode('.', $valPosition);

        $diffDay = $this->AppWeb->diffDateApprove($item->DatePublish);
        $StatusTimeDept = 1;
        if($diffDay>12) $StatusTimeDept = 2;

        $StatusTimeQA = 1;
        if($diffDay>15) $StatusTimeQA = 2;

        DB::begintransaction();
        try{
            if($itemNOEVerif) {
                // jika department head terkait
                if($RelevantDept) {
                    foreach ($RelevantDept as $key => $val) {
                        if(session('adminvue')->IdDepartment == $val['Id']) {
                            if($itemCaretaker) {
                                DB::table('nod_relevant')
                                ->insert([
                                    'IsMandatory'=>1,
                                    'DescriptionMandatory'=>$request->input('DescriptionCaretaker'),
                                    'IdNODReport'=>$request->input('Id'),
                                    'IdDepartment'=>$val['Id'],
                                    'IdUsers'=>session('adminvue')->Id,
                                    'Status'=>2,
                                    'UserEntry'=>session('adminvue')->Id
                                ]);
                            } else {
                                if(strpos(strtolower($exp[1]), 'dh') === false) {
                                    return json_encode(array(
                                        'status'=>false,
                                        'message'=>'Anda Bukan Sebagai Caretaker!',
                                    ));
                                } else {
                                    DB::table('nod_relevant')
                                    ->insert([
                                        'IdNODReport'=>$request->input('Id'),
                                        'IdDepartment'=>$val['Id'],
                                        'IdUsers'=>session('adminvue')->Id,
                                        'Status'=>2,
                                        'UserEntry'=>session('adminvue')->Id
                                    ]);
                                }
                            }
                        }
                    }
                    DB::table('nod_report')
                    ->where('Id', $request->input('Id'))
                    ->update([
                        'Status'=>9,
                        'IsClosed'=>1,
                        'StatusTimeDept'=>$StatusTimeDept,
                        'StatusTimeQA'=>$StatusTimeQA
                    ]);
                }
            }

            if($userDepartment) {
                // jika department pelapor sama dengan department head pelapor
                if($userDepartment->IdDepartment == session('adminvue')->IdDepartment) {
                    // jika posisi sebagai dept head
                    if(strpos(strtolower($exp[1]), 'dh') !== false || $itemCaretaker) {
                        if($itemCaretaker) {
                            DB::table('nod_report')
                            ->where('Id', $request->input('Id'))
                            ->update([
                                'IsMandatoryDept'=>1,
                                'DescriptionMandatoryDept'=>$request->input('DescriptionCaretaker'),
                                'Status'=>9,
                                'IsClosed'=>1,
                                'DateDept'=>date('Y-m-d H:i:s'),
                                'UserDept'=>session('adminvue')->Id,
                                'StatusTimeDept'=>$StatusTimeDept,
                                'StatusTimeQA'=>$StatusTimeQA
                            ]);
                        } else {
                            DB::table('nod_report')
                            ->where('Id', $request->input('Id'))
                            ->update([
                                'Status'=>9,
                                'IsClosed'=>1,
                                'DateDept'=>date('Y-m-d H:i:s'),
                                'UserDept'=>session('adminvue')->Id,
                                'StatusTimeDept'=>$StatusTimeDept,
                                'StatusTimeQA'=>$StatusTimeQA
                            ]);
                        }
                    } else {
                        return json_encode(array(
                            'status'=>false,
                            'message'=>'Anda Bukan Sebagai Caretaker!',
                        ));
                    }
                }
                // jika department QA
                if(session('adminvue')->IdDepartment == 67) {
                    if(strpos(strtolower($exp[1]), 'apj') !== false || strpos(strtolower($exp[1]), 'dh') !== false || $itemCaretaker) {
                        if(strpos(strtolower($exp[1]), 'apj') !== false) {
                            DB::table('nod_report')
                            ->where('Id', $request->input('Id'))
                            ->update([
                                'Status'=>9,
                                'IsClosed'=>1,
                                'DateQAAPJ'=>date('Y-m-d H:i:s'),
                                'UserQAAPJ'=>session('adminvue')->Id,
                                'StatusTimeQA'=>$StatusTimeQA
                            ]);
                        } else if($itemCaretaker) {
                            DB::table('nod_report')
                            ->where('Id', $request->input('Id'))
                            ->update([
                                'IsMandatoryQA'=>1,
                                'DescriptionMandatoryQA'=>$request->input('DescriptionCaretaker'),
                                'Status'=>9,
                                'IsClosed'=>1,
                                'DateQA'=>date('Y-m-d H:i:s'),
                                'UserQA'=>session('adminvue')->Id,
                                'StatusTimeQA'=>$StatusTimeQA
                            ]);
                        } else {
                            DB::table('nod_report')
                            ->where('Id', $request->input('Id'))
                            ->update([
                                'Status'=>9,
                                'IsClosed'=>1,
                                'DateQA'=>date('Y-m-d H:i:s'),
                                'UserQA'=>session('adminvue')->Id,
                                'StatusTimeQA'=>$StatusTimeQA
                            ]);
                        }
                    } else {
                        return json_encode(array(
                            'status'=>false,
                            'message'=>'Anda Bukan Sebagai Caretaker!',
                        ));
                    }
                }
            }

            DB::table('noe_report')
            ->where('Id', $item->IdNOEReport)
            ->update([
                'IsNOD'=>0
            ]);

            try{
            
            $itemMailPelopor = [];
            $itemMailRelevant = [];
            $itemMailQA = [];
            if($item->Status === 'Disetujui oleh Section Head' || $item->Status === 'Disetujui Oleh QA Section Head') {
                $getPeloporPosition = [];
                array_push($getPeloporPosition, $item->IdPosition);
                array_push($getPeloporPosition, $item->IdPublish);
                array_push($getPeloporPosition, $item->IdSectionPublish);
                array_push($getPeloporPosition, $item->deptHeadPelopor);
                                
                $itemMailPelopor = $this->MainDB->table('employee as emp')
                    ->select('emp.Name as Employee','emp.Email')
                    ->leftjoin('position as pst','pst.Id','=','emp.IdPosition')
                    ->whereIn('pst.Id', $getPeloporPosition)
                    ->where('emp.IdDepartment', $item->IdDepartment)
                    ->where('emp.Actived', 1)
                    ->get();

                if($item->Status === 'Disetujui Oleh QA Section Head') {
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
                       
                        $itemMailRelevant = $this->MainDB->table('employee as emp')
                        ->select('emp.Name as Employee','emp.Email')
                        ->whereIn('emp.IdPosition', $getPosition)
                        ->where('emp.Actived', 1)
                        ->get();   
                    }

                    //QA Departement
                    $itemMailQA = $this->MainDB->table('employee as emp')
                                ->select('emp.Name as Employee','emp.Email')
                                ->where('emp.IdDepartment',session('adminvue')->IdDepartment)
                                ->where('emp.Actived', 1)
                                ->get();
                }
            }
            
                    $data['Subject'] = 'NOD Report - Rejected';
                    $data['Title'] = 'Data NOD telah ditolak, Oleh :';

                    $dataMail['Penolak'] = session('adminvue')->Name .' | '. session('adminvue')->Position .' - '. session('adminvue')->Department;
                    $dataMail['NOD Number'] = $item->NODNumber;
                    $dataMail['Proper Condition'] = $item->ProperCondition;
                    $dataMail['Man'] = $item->Man;
                    $dataMail['Machine'] = $item->Machine;
                    $dataMail['Method'] = $item->Method;
                    $dataMail['Material'] = $item->Material;
                    $dataMail['Milieu'] = $item->Milieu;
                
                if($item->Status === 'Disetujui oleh Section Head' || $item->Status === 'Disetujui Oleh QA Section Head') {
                    

                    if(count($itemMailPelopor)>0) { 
                        foreach ($itemMailPelopor as $key => $val) {
                            $data['Employee'] = $val->Employee;
                            $data['Email'] = $val->Email;

                            $this->History->sendMail($data, $dataMail, $dataObjectEmail=[]);
                        } 
                    } 
                    
                    if($item->Status === 'Disetujui Oleh QA Section Head') {
                        if(count($itemMailRelevant)>0) { foreach ($itemMailRelevant as $key => $val) {
                            $data['Employee'] = $val->Employee;
                            $data['Email'] = $val->Email;
    
                            $this->History->sendMail($data, $dataMail, $dataObjectEmail=[]);
                        } }
    
                        if(count($itemMailQA)>0) { foreach ($itemMailQA as $key => $val) {
                            $data['Employee'] = $val->Employee;
                            $data['Email'] = $val->Email;
    
                            $this->History->sendMail($data, $dataMail, $dataObjectEmail = []);
                        } }
                    }
                }
                
            }catch (Exception $e){
                return json_encode(array(
                    'status'=>false,
                    'message'=>'Tolak Data Gagal, Pengiriman Email Invalid!',
                    'validation'=>$validation->errors(),
                ));
            }

            $this->History->store(31,14,json_encode($item));
            DB::commit();
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

    public function revision(Request $request)
    {
        $item = DB::table('nod_report as nod')
            ->select('nod.*','noe.DatePublish', 'emp.IdPosition as IdDeptHeadPelopoer')
            ->leftjoin('noe_report as noe','noe.Id','=','nod.IdNOEReport')
            ->leftjoin('users as usr','usr.Id','=','nod.UserDept')
            ->leftjoin('employee as emp','emp.Id','=','usr.IdEmployee')
            ->where('nod.Id', $request->input('Id'))
            ->first();
        

        $itemNOEVerif = DB::table('noe_verif_evaluation')
            ->select('RelevantDept')
            ->where('IdNOEReport', $item->IdNOEReport)
            ->where('TypeData',0)
            ->where('Actived',1)
            ->first();

        $RelevantDept = json_decode($itemNOEVerif->RelevantDept, true);
        $filterResultDept = [];
        if($RelevantDept) {
            foreach ($RelevantDept as $key => $val) {
                if(session('adminvue')->IdDepartment == $val['Id']) {
                    array_push($filterResultDept, $val['Id']);
                }
            }
        }

        $itemNODRelevant = DB::table('nod_relevant')
            ->where('IdNODReport', $request->input('Id'))
            ->where('Status',1)
            ->where('Actived',1)
            ->count();
        
        $itemCaretaker = $this->AppWeb->checkCaretaker(session('adminvue')->IdDepartment,session('adminvue')->IdEmployee,session('adminvue')->Id);
        $valPosition = session('adminvue')->CodePosition;
        $exp = explode('.', $valPosition);

        DB::begintransaction();
            try{
                if($filterResultDept && $item->Status=='Disetujui oleh Dept Head' )
                {
                    // if relevant dept head has caretaker
                    if($itemCaretaker) {
                        DB::table('nod_relevant')
                        ->insert([
                            'IsMandatory'=>1,
                            'DescriptionMandatory'=>$request->input('DescriptionCaretaker'),
                            'IdNODReport'=>$request->input('Id'),
                            'IdDepartment'=>$filterResultDept[0],
                            'IdUsers'=>session('adminvue')->Id,
                            'Status'=>1,
                            'UserEntry'=>session('adminvue')->Id
                        ]);
                    } else {
                        if(strpos(strtolower($exp[1]), 'dh') === false) {
                            return json_encode(array(
                                'status'=>false,
                                'message'=>'Anda Bukan Sebagai Caretaker!',
                            ));
                        } else {
                            DB::table('nod_relevant')
                            ->insert([
                                'IdNODReport'=>$request->input('Id'),
                                'IdDepartment'=>$filterResultDept[0],
                                'IdUsers'=>session('adminvue')->Id,
                                'Status'=>1,
                                'UserEntry'=>session('adminvue')->Id
                            ]);

                            $diffDay = $this->AppWeb->diffDateApprove($item->DatePublish);
                            $StatusTimeDept = 1;
                            if($diffDay>12) $StatusTimeDept = 2;
            
                            DB::table('nod_report')
                            ->where('Id', $request->input('Id'))
                            ->update([
                                'Status'=>10, // status ganti di revisi oleh dept head terkait
                                'IdReportDept'=>9,   // back to Departement pelapor, from below (Admin), type user 9 = admin
                                'IsRevision'=>1, // data Revisi di ganti jadi status True
                                'StatusTimeDept'=>$StatusTimeDept
                            ]);
                            
                            $itemMail = $this->MainDB->table('employee as emp')
                            ->select('emp.Name as Employee','emp.Email')
                            ->whereIn('emp.IdPosition', [$item->IdPosition, $item->IdPublish, $item->IdSectionPublish, $item->IdDeptHeadPelopoer ])
                            ->where('emp.Actived', 1)
                            ->get();    
                            
                            if($itemMail != null)
                            {
                                $data['Subject'] = 'NOD Report - Revision';
                                $data['Title'] = 'Data NOD telah diperiksa, Oleh :';

                                $dataMail['Diperiksa'] = session('adminvue')->Name .' | '. session('adminvue')->Position .' - '. session('adminvue')->Department;
                                $dataMail['NOD Number'] = $item->NODNumber;
                                $dataMail['Proper Condition'] = $item->ProperCondition;
                                $dataMail['Man'] = $item->Man;
                                $dataMail['Machine'] = $item->Machine;
                                $dataMail['Method'] = $item->Method;
                                $dataMail['Material'] = $item->Material;
                                $dataMail['Milieu'] = $item->Milieu;

                                if(count($itemMail)>0) { foreach ($itemMail as $key => $val) {
                                    $data['Employee'] = $val->Employee;
                                    $data['Email'] = $val->Email;
                                    
                                    $this->History->sendMail($data, $dataMail, $dataMailObject=[]);
                                } }
                            }
                        }
                    }

                }
                
                $this->History->store(31,13,json_encode($item));
                DB::commit();
            }catch (Exception $e){
            DB::rollback();
            return json_encode(array(
                'status'=>false,
                'message'=>'Revisi Data Gagal, Invalid Server Side!',
            ));
        }
        return response()->json([
            'status'=>true,
            'message'=>'Revisi Data Sukses!',
        ]);
    }

    public function export($id){
        $itemReport = DB::table('nod_report as nod')
            ->select(
                'nod.*',
                'noe.Event',
                'nve.IdDeviation',
                'emp.Name as IdCAPIC',
                'empy.Name as IdPAPIC',
                'emp1.Name as UserEntry',
                'emp2.Name as UserDept',
                'emp3.Name as UserQA',
                'vcn.status_capa as StatusCapa',
                'vcn.verifikasi_efektifitas_capa as verifikasiCapa',
                'vcn.name_verfication',
                'vcn.time_finished_verfication'
            )
            ->join('noe_report as noe','noe.Id','=','nod.IdNOEReport')
            ->join('noe_verif_evaluation as nve','nve.IdNOEReport','=','nod.IdNOEReport')
            ->leftjoin('employee as emp','emp.Id','=','nod.IdCAPIC')
            ->leftjoin('employee as empy','empy.Id','=','nod.IdPAPIC')
            ->leftjoin('users as usr1','usr1.Id','=','nod.UserEntry')
            ->leftjoin('employee as emp1','emp1.Id','=','usr1.IdEmployee')
            ->leftjoin('users as usr2','usr2.Id','=','nod.UserDept')
            ->leftjoin('employee as emp2','emp2.Id','=','usr2.IdEmployee')
            ->leftjoin('users as usr3','usr3.Id','=','nod.UserQA')
            ->leftjoin('employee as emp3','emp3.Id','=','usr3.IdEmployee')
            ->leftjoin('verifikasi_capa_nod as vcn','vcn.id_approved_nod','=','nod.Id')
            ->where('nve.TypeData',1)
            ->where('nod.Actived',1)
            ->where('nod.Id',$id)
            ->first();
        
        $itemReview = null;
        $itemDetail = [];
        if($itemReport != null) {

            $itemCA = DB::table('nod_report_action as nra')
            ->select('emp.Name as PIC','nra.Date','nra.Description')
            ->leftjoin('employee as emp','emp.Id','=','nra.IdPIC')
            ->where('nra.IdNODReport',$itemReport->Id)
            ->where('nra.Type',0)
            ->where('nra.Actived',1)
            ->get();

            $itemPA = DB::table('nod_report_action as nra')
            ->select('emp.Name as PIC','nra.Date','nra.Description')
            ->leftjoin('employee as emp','emp.Id','=','nra.IdPIC')
            ->where('nra.IdNODReport',$itemReport->Id)
            ->where('nra.Type',1)
            ->where('nra.Actived',1)
            ->get();

            $IdDeviation = json_decode($itemReport->IdDeviation, true);
            $resultDeviation = '';
            if($IdDeviation) {
                foreach ($IdDeviation as $key => $val) {
                    if($val['Deviation']) {
                        $resultDeviation .= $val['Deviation'].'; ';
                    }
                }
            }
            $itemReport->IdDeviation = $resultDeviation;
            if($itemReport->UserEntry == 'IT Treenear Indo') $itemReport->UserEntry = '';
            if($itemReport->UserDept == 'IT Treenear Indo') $itemReport->UserDept = '';
            if($itemReport->UserQA == 'IT Treenear Indo') $itemReport->UserQA = '';
            if($itemReport->Date) $itemReport->Date = \DateTime::createFromFormat('Y-m-d H:i:s', $itemReport->Date)->format('d.m.y H:i');
            $itemReport->CADate = ''; // \DateTime::createFromFormat('Y-m-d', $itemReport->CADate)->format('d/m/Y');
            $itemReport->PADate = ''; // \DateTime::createFromFormat('Y-m-d', $itemReport->PADate)->format('d/m/Y');
            if($itemReport->CreateAt) $itemReport->CreateAt = \DateTime::createFromFormat('Y-m-d H:i:s', $itemReport->CreateAt)->format('d.m.y');
            if($itemReport->DateDept) $itemReport->DateDept = \DateTime::createFromFormat('Y-m-d H:i:s', $itemReport->DateDept)->format('d.m.y');
            if($itemReport->DateQA) $itemReport->DateQA = \DateTime::createFromFormat('Y-m-d H:i:s', $itemReport->DateQA)->format('d.m.y');

            $itemReview = DB::table('nod_review as nrv')
                ->select(
                    'nrv.Id',
                    'nrv.IsOSA',
                    'nrv.VerifCAPA',
                    'nrv.DescriptionCAPA',
                    'nrv.DateQA as DateCAPA',
                    'emp.Name as UserCAPA'
                )
                ->leftjoin('users as usr','usr.Id','=','nrv.UserQA')
                ->leftjoin('employee as emp','emp.Id','=','usr.IdEmployee')
                ->where('nrv.Actived',1)
                ->where('nrv.Id',$itemReport->Id)
                ->first();

            if(!empty($itemReview)) {
                if($itemReview->DateCAPA) $itemReview->DateCAPA = \DateTime::createFromFormat('Y-m-d H:i:s', $itemReview->DateCAPA)->format('d.m.y');
                if($itemReview->UserCAPA == 'admin') $itemReview->UserCAPA = '';

                $itemDetail = DB::table('nod_review_detail')
                ->select('Assesment','Description')
                ->where('IdNODReview',$itemReview->Id)
                ->where('Actived',1)
                ->get();
            }

            $dataAnotherEffect = [];
            $getAnotherEffect = [];
            $setSelectedTrue = false;
            $setSelectedFalse = false;
            if($itemReport->Status == "Disetujui Oleh QA Section Head" || $itemReport->Status == "Disetujui oleh Dept Head Terkait" || $itemReport->Status == "Disetujui oleh QA Dept.Head") {
                $anotherEffect = json_decode($itemReport->DescAnotherEffect);
                if($anotherEffect !== null) {
                    if($anotherEffect[0] === false) {
                        array_push($dataAnotherEffect, $anotherEffect[0]);
                        $setSelectedFalse = true;
                    } else {
                        foreach($anotherEffect as $key => $effect) {
                            if($effect !== null) {
    
                                $setSelectedTrue = true;
                                $getAnotherEffect = DB::table('another_effect as ane')
                                        ->select('ane.id_effect','ane.title_effect')
                                        ->where('ane.id_effect',$effect->id_effect)
                                        ->first();
                                
                                $dataAnotherEffect[$key] = 
        
                                    [ 
                                        'title_effect' => $getAnotherEffect->title_effect, 
                                        'selected'  => $effect->selected,
                                        'text'      => $effect->text
                                    ];
    
                            }
                        }   
                    }
                } 
            }
            
            $verifikasiCapa = [];
            $setCapaFalse = false;
            $setCapaTrue = false;
            $getdataCapaTrue = '';
            $nameVerificationCAPA = '';
            $timeVerificationCAPA = '';
            if($itemReport->StatusCapa === 'Disetujui oleh QA Section Head' || $itemReport->StatusCapa === 'Diverifikasi oleh QA Dept Head') {
                $verifikasiCapa = json_decode($itemReport->verifikasiCapa);
                if($verifikasiCapa->selected === true) {
                    $setCapaTrue = $verifikasiCapa->selected;
                    $getdataCapaTrue = $verifikasiCapa->efektifitasDesc;
                } else {
                    $setCapaFalse = $verifikasiCapa->selected;
                }
                $nameVerificationCAPA = $itemReport->name_verfication;
                $timeVerificationCAPA = $itemReport->time_finished_verfication;
                $timeVerificationCAPA = \DateTime::createFromFormat('Y-m-d H:i:s',$timeVerificationCAPA )->format('d.m.y');
            }
        }     
        
        $itemDeptTerkait = DB::table('nod_relevant as nrl')
            ->select(
                'nrl.*',
                'emp.Name as UserTerkait'
            )
            ->leftjoin('users as usr','usr.Id','=','nrl.IdUsers')
            ->leftjoin('employee as emp','emp.Id','=','usr.IdEmployee')
            ->where('nrl.Status',1)
            ->where('nrl.Actived',1)
            ->where('nrl.IdNODReport',$id)
            ->get();

        $dtHeader = DB::table('setting_header')
            ->select('*')
            ->where('Type',1)
            ->where('Actived',1)
            ->first();

        $Title = "Data NOD";
        $Header = "Laporan Deviasi (NOD)";
        $SubHeader = "Notice Of Deviation";

        $view = view('export-pdf.header-noe-nod',compact('Title','Header','SubHeader','dtHeader'))->render();
        $view .= view('export-pdf.data-nod',compact('itemReport','itemDeptTerkait','itemReview','itemDetail','itemCA','itemPA','setSelectedFalse','setSelectedTrue','dataAnotherEffect','setCapaFalse','setCapaTrue','getdataCapaTrue','nameVerificationCAPA','timeVerificationCAPA'))->render();
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
        $canvas->page_text(35, 815, $header->Title, null, 10, array(0, 0, 0));
        return $pdf->stream();
    }
}
