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

class VerifCAPAReportControll extends Controller
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
    }

    public function index(Request $request) {
        $sortRules = $request->input('sort');
        $limit = $request->input('per_page');
        $searchValue = $request->input('search');
        
        list($field, $dir) = explode('|', $sortRules);

        $query = DB::table('verifikasi_capa_nod as vcn')
            ->select(
                'vcn.id_approved_nod as id_Approve',
                'nod.NODNumber',
                'vcn.status_capa as statusCAPA',
            )
            ->join('nod_report as nod','nod.Id','=','vcn.id_approved_nod')
            ->where('vcn.actived', '>', 1);

        if($searchValue) {
            $query->where(function($query) use ($searchValue) {
                foreach ($searchValue as $key=>$val) {
                    $key = str_replace('__', '.', $key);
                    if($val != '' && $val != null) $query->where($key, 'like', '%'.$val.'%');
                }
            });
        }

        $data = $query->paginate($limit);

        return $data;
       
    }

    public function getAccNumber(Request $request) {
        $getDataNODAcc = DB::table('nod_report as nod')
                        ->select('*')
                        ->where('nod.Status', 8) // disetujui QA Dept. Head
                        ->where('nod.Actived', 1)
                        ->get();
        
        return response()->json([
            'data' => $getDataNODAcc
        ]);
    }

    public function getDataNOD(Request $request) {
        $item = DB::table('noe_report as noe')
            ->select(
                'noe.BatchNo',
                'noe.NOENumber',
                'noe.Date',
                'noe.IdPublish',
                'nve.IdPublish as publishSection',
                'pdc.Name as Product',
                'noe.Event',
                'nod.*'
            )
            ->leftjoin('nod_report as nod','nod.IdNOEReport', '=', 'noe.Id')
            ->leftjoin('product as pdc','pdc.Id','=','noe.IdProduct')
            ->leftjoin('noe_verif_evaluation as nve','nve.IdNOEReport','=','noe.Id')
            
            ->whereNotNull('nve.IdPublish')
            ->where('noe.Id',$request->Id)
            ->where('noe.Actived',1)
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
            ->where('nra.IdNODReport', $request->input('IdNOD'))
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
            ->where('nra.IdNODReport', $request->input('IdNOD'))
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
                            if($effect !== null) {
                                $dataAnotherEffect[$key] = 
        
                                    [ 
                                        'id_effect' => $effect->id_effect, 
                                        'selected'  => $effect->selected,
                                        'text'      => $effect->text
                                    ];
                                
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

    public function store() {
        
    }
}
