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
                'vcn.id',
                'vcn.id_approved_nod as id_Approve',
                'nod.NODNumber',
                'vcn.status_capa as statusCAPA',
                'vcn.is_publish as isPublish'
            )
            ->join('nod_report as nod','nod.Id','=','vcn.id_approved_nod')
            ->where('vcn.actived', 1);

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
                        ->where('nod.IsCapaVerified',0)
                        ->get(); 
       
        $getDataVerifikasiCapa =  DB::table('verifikasi_capa_nod as vcn')
        ->select('*')
        ->where('vcn.is_approved',0)
        ->get();
       
        $result = [];
        $nodGetCAPA = [];
        if(count($getDataVerifikasiCapa) > 0) {

            foreach($getDataVerifikasiCapa as $keyCapa => $valCapa) {
                    array_push($nodGetCAPA, $valCapa->id_approved_nod);
            }
            foreach($getDataNODAcc as $keyNod => $valNod) {
                if (!in_array($valNod->Id, $nodGetCAPA)) {
                    array_push($result, $valNod);
                    // $result[$keyNod] = $valNod;
                }
            }
        } else {
            $result = $getDataNODAcc;
        }

        return response()->json([
            'data' => $result
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
            ->where('nod.Id',$request->IdNOD)
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

            $getUserEntry = session('adminvue')->IdPosition;
    
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
                    
                    if($anotherEffect[0] === 'false') {
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
                if($item->Status == 'Disetujui Oleh QA Section Head' || $item->Status == 'Disetujui oleh Dept Head Terkait' || $item->Status == 'Disetujui oleh QA Dept.Head' || $item->Status == 'Direvisi') {

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
            'getUserEntry'=>$getUserEntry,
            'position'=>$itemPosition,
            'department'=>session('adminvue')->IdDepartment,
            'deptTerkait'=>$deptTerkait,
            'getAnotherEffect'=>$getAnotherEffect,
            'selectedAnotherEffect'=> $dataAnotherEffect,
            'statusDeptTerkait'=>$statusDeptTerkait,
            'isCaretaker'=>$itemCaretaker
        ));
    }

    public function store(Request $request) {
        $requestData = $request->all();
        
        $validation = Validator::make($request->all(),$this->validation(),
            $messages = ['required' => 'This field is required.']);

        $capaFile = [];
        if($request->has('CAPAFile') && $request->file('CAPAFile')!=null) {
            $arrFile = $request->file('CAPAFile');
            foreach($arrFile as $key=>$val) {
                if(pathinfo($val->getClientOriginalName(), PATHINFO_EXTENSION)) {
                    $capaFile[$key] = $this->UploadFile->uploadFile($val,5); //5 path noe-report
                }
            }
        }

        if(count($capaFile) > 0) {
            $capaFile = json_encode($capaFile);
        } else {
            $capaFile = json_encode($capaFile);
        }

        $verifPAFile = [];
        if($request->has('verifPAFile') && $request->file('verifPAFile')!=null) {
            $arrFilePA = $request->file('verifPAFile');
            foreach($arrFilePA as $key=>$val) {
                if(pathinfo($val->getClientOriginalName(), PATHINFO_EXTENSION)) {
                    $verifPAFile[$key] = $this->UploadFile->uploadFile($val,5); //5 path noe-report
                }
            }
        }
        
        if(count($verifPAFile) > 0) {
            $verifPAFile = json_encode($verifPAFile);
        } else {
            $verifPAFile = json_encode($verifPAFile);
        }
    
        DB::begintransaction();
        try{
            DB::table('verifikasi_capa_nod')
                ->insert([
                    'id_approved_nod' => $request->input('NODAccNumber'),
                    'attachment_capa' => $capaFile,
                    'another_attachment_capa' => $verifPAFile,
                    'status_capa'=> 1,
                    'user_entry'=> $request->input('userEntry'),
                    'is_approved'=> 0,
                    'is_correction' => 0,
                    'actived' => 1,
                    'created_at'=> Carbon::now()->format('Y-m-d H:i:s'),
                    'updated_at'=> Carbon::now()->format('Y-m-d H:i:s')
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
            'noe.BatchNo',
            'noe.NOENumber',
            'noe.Date',
            'noe.IdPublish',
            'nve.IdPublish as publishSection',
            'pdc.Name as Product',
            'noe.Event',
            'nod.*',
            'vcn.attachment_capa as fileCAPA',
            'vcn.status_capa as statusCapa',
            'vcn.verifikasi_efektifitas_capa as efektivitasCapa',
            'vcn.another_attachment_capa as verifFilePA'
        )
        ->leftjoin('nod_report as nod','nod.IdNOEReport', '=', 'noe.Id')
        ->leftjoin('verifikasi_capa_nod as vcn', 'vcn.id_approved_nod', '=', 'nod.Id')
        ->leftjoin('product as pdc','pdc.Id','=','noe.IdProduct')
        ->leftjoin('noe_verif_evaluation as nve','nve.IdNOEReport','=','noe.Id')
        ->whereNotNull('nve.IdPublish')
        ->where('nod.Id',$request->Id)
        ->where('noe.Actived',1)
        ->first();

        if (!empty($item)) {
            $fileCAPA = json_decode($item->fileCAPA);
            $item->fileCAPA = $fileCAPA;
            
            $FileCAPADownload = [];
            foreach ($fileCAPA as $key => $val) {
                $arr = [];
                if($val) {
                    $result = explode("/",$val);
                    array_push($arr, $result[4]);
                }
                array_push($arr, $val);
                array_push($FileCAPADownload, $arr);
            }
            $item->FileCAPADownload = $FileCAPADownload;

            $verifPAFile = json_decode($item->verifFilePA);
            $item->verifFilePA = $verifPAFile;
        
            $FileVerifPADownload = [];
            foreach ($verifPAFile as $key => $val) {
                $arr = [];
                if($val) {
                    $result = explode("/",$val);
                    array_push($arr, $result[4]);
                }
                array_push($arr, $val);
                array_push($FileVerifPADownload, $arr);
            }
            $item->FileVerifPADownload = $FileVerifPADownload;

            $item->efektivitasCapa = json_decode($item->efektivitasCapa);

            if($item->statusCapa === 'Disetujui oleh QA Section Head') {
                $item->deptHead = session('adminvue')->Name;
            }

        }
        
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

            $getUserEntry = session('adminvue')->IdPosition;

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
                    
                    if($anotherEffect[0] === 'false') {
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
                if($item->Status == 'Disetujui Oleh QA Section Head' || $item->Status == 'Disetujui oleh Dept Head Terkait' || $item->Status == 'Disetujui oleh QA Dept.Head' || $item->Status == 'Direvisi') {

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
            'getUserEntry'=>$getUserEntry,
            'position'=>$itemPosition,
            'department'=>session('adminvue')->IdDepartment,
            'deptTerkait'=>$deptTerkait,
            'getAnotherEffect'=>$getAnotherEffect,
            'selectedAnotherEffect'=> $dataAnotherEffect,
            'statusDeptTerkait'=>$statusDeptTerkait,
            'isCaretaker'=>$itemCaretaker
        ));
    }

    public function delete(Request $request) {
       
        $item = DB::table('verifikasi_capa_nod')
            ->select('*')
            ->where('id', $request->input('Id'))
            ->first();

        DB::begintransaction();
        try{
            DB::table('verifikasi_capa_nod')
            ->where('id', $request->input('Id'))
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

    function validation() {
        return [
            'NODAccNumber' => 'required'
        ];
    }

    public function update (Request $request) {
        $requestData = $request->all();
       
        $validation = Validator::make($request->all(),$this->validation(),
            $messages = ['required' => 'This field is required.']);

        $capaFile = [];
        if($request->has('CAPAFile') && $request->file('CAPAFile')!=null) {
            $arrFile = $request->file('CAPAFile');
            foreach($arrFile as $key=>$val) {
                if(pathinfo($val->getClientOriginalName(), PATHINFO_EXTENSION)) {
                    $capaFile[$key] = $this->UploadFile->uploadFile($val,5); //5 path noe-report
                }
            }
        }

        $OldCAPAFile = json_decode($request->input('OldCAPAFile'));
        foreach($OldCAPAFile as $key=>$val){
            array_push($capaFile,$val);
        }

        if(count($capaFile) > 0) {
            $capaFile = json_encode($capaFile);
        } else {
            $capaFile = '';
        }

        $verifPAFile = [];
        if($request->has('verifPAFile') && $request->file('verifPAFile')!=null) {
            $arrFile = $request->file('verifPAFile');
            foreach($arrFile as $key=>$val) {
                if(pathinfo($val->getClientOriginalName(), PATHINFO_EXTENSION)) {
                    $verifPAFile[$key] = $this->UploadFile->uploadFile($val,5); //5 path noe-report
                }
            }
        }

        $OldVerifPAFile = json_decode($request->input('OldVerifPAFile'));
        foreach($OldVerifPAFile as $key=>$val){
            array_push($verifPAFile,$val);
        }

        if(count($verifPAFile) > 0) {
            $verifPAFile = json_encode($verifPAFile);
        } else {
            $verifPAFile = '';
        }

        $isApproved = 0;
        $isCapaCorrection = 0;
        $verifEfektifitasCapa = json_decode($request->input('verifikasiEfektivitasCapa'));
        
        if(!empty($verifEfektifitasCapa) && $verifEfektifitasCapa->isEfektifitas === false) {
            $isApproved = 1;
        } else if ($verifEfektifitasCapa->isEfektifitas === true) {
            $isCapaCorrection = 1;
        }
       
        DB::begintransaction();
        try{
            DB::table('verifikasi_capa_nod')
            ->where('id_approved_nod', $request->input('NODAccNumber'))
            ->update([
                'attachment_capa' => $capaFile,
                'another_attachment_capa' => $verifPAFile,
                'verifikasi_efektifitas_capa' => $request->input('verifikasiEfektivitasCapa'),
                'is_approved' => $isApproved,
                'is_correction' => $isCapaCorrection,
                'updated_at'=> Carbon::now()->format('Y-m-d H:i:s')
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

    public function publish(Request $request) {
        $item = DB::table('verifikasi_capa_nod as vcn')
            ->select('*','nod.NODNumber')
            ->leftjoin('nod_report as nod','nod.Id','=','vcn.id_approved_nod')
            ->where('vcn.id_approved_nod', $request->input('Id'))
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

        $valStatus = 2; // di setujui oleh qa section head

        DB::begintransaction();
        try{
            DB::table('verifikasi_capa_nod')
            ->where('id_approved_nod', $request->input('Id'))
            ->where('actived',1)
            ->update([
                'status_capa'=>$valStatus,
                'is_publish' => 1,
            ]);

            try{
                $idPosition = session('adminvue')->ParentPosition;
                
                if($idPosition!=0 || $idPosition!=null) {
                    $itemMail = $this->MainDB->table('employee as emp')
                        ->select('emp.Name as Employee','emp.Email')
                        ->where('emp.IdPosition', json_decode($idPosition)[0]->Id)
                        ->where('emp.Actived', 1)
                        ->get();
                    
                    $this->Helper->sendEmailVerifiCapa($item, $NODCA, $NODPA, $itemMail, $valStatus);
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
        $item = DB::table('verifikasi_capa_nod as vcn')
                    ->select('vcn.*', 'nod.*', 'pst.Id as deptHeadPelopor')
                    ->leftjoin('nod_report as nod','nod.Id','=','vcn.id_approved_nod')
                    ->leftjoin('users as usr','usr.Id','=','nod.UserDept')
                    ->leftjoin('employee as emp','emp.Id','=','usr.IdEmployee')
                    ->leftjoin('position as pst','pst.Id','=','emp.IdPosition')
                    // ->leftjoin('noe_report as noe','noe.Id','=','nod.IdNOEReport')
                    // ->leftjoin('nod_relevant as nr', 'nr.IdNODReport','=','nod.Id')
                    ->where('vcn.id_approved_nod', $request->input('Id'))
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
        
        if($item->is_correction === 1) {
            $valStatus = 5;
        } else {
            $valStatus = 3;
        }
       
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

        DB::begintransaction();
        try {
            if($item->is_correction === 1) {
                DB::table('verifikasi_capa_nod as vcn')
                    ->where('vcn.id_approved_nod', $request->input('Id'))
                    ->where('actived',1)
                    ->update([
                        'vcn.status_capa' => $valStatus,
                    ]);
                    
                DB::table('nod_report as nod')
                    ->where('nod.Id', $request->input('Id'))
                    ->where('nod.Actived', 1)
                    ->update([
                        'nod.Status' => 10,
                        'nod.IsRevision' => 1
                    ]);
            } else {
                DB::table('verifikasi_capa_nod as vcn')
                    ->where('vcn.id_approved_nod', $request->input('Id'))
                    ->where('actived',1)
                    ->update([
                        'vcn.status_capa' => $valStatus,
                        'vcn.name_verfication'=> $request->input('deptHeadVerification'),
                        'vcn.time_finished_verfication' => Carbon::now()->format('Y-m-d H:i:s')
                    ]);
    
                DB::table('nod_report as nod')
                    ->where('nod.Id', $request->input('Id'))
                    ->where('nod.Actived', 1)
                    ->update([
                        'nod.IsCapaVerified' => 1
                    ]);
            }

            try {
                if($item->is_correction === 1) {
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
                    
                    $this->Helper->sendEmailVerifiCapa($item, $NODCA, $NODPA, $itemMailPelopor, $valStatus);  

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

                        $this->Helper->sendEmailVerifiCapa($item, $NODCA, $NODPA, $relevantItemMail, $valStatus);  
                    
                        
                    }

                    $itemPosition = DB::table('position')
                        ->select('Id')
                        ->where('IdDepartment', 67) 
                        ->where('Id', $item->user_entry)
                        ->where('Actived', 1)
                        ->first();

                } else {
                    $itemPosition = DB::table('position')
                        ->select('Id')
                        ->where('IdDepartment', 67) 
                        ->where('Id', $item->user_entry)
                        ->where('Actived', 1)
                        ->first();
                }
                    
                if($itemPosition!=null) $IdPosition = $itemPosition->Id;
                else $IdPosition = 0;
                
                if($IdPosition!=0) {
                    $itemMail = $this->MainDB->table('employee as emp')
                        ->select('emp.Name as Employee','emp.Email')
                        ->where('emp.IdPosition', $IdPosition)
                        ->where('emp.Actived', 1)
                        ->get();
                   
                    $this->Helper->sendEmailVerifiCapa($item, $NODCA, $NODPA, $itemMail, $valStatus);   
                }
                
                $this->History->store(25,13,json_encode($item));
                DB::commit();
            } catch (Exception $e) {
                return json_encode(array(
                    'status'=>false,
                    'message'=>'Publish Data Gagal, Pengiriman Email Invalid!',
                    'validation'=>$validation->errors(),
                ));
            }

        } catch (Exception $e) {
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
        
        $item = DB::table('verifikasi_capa_nod as vcn')
                    ->select('*', 'nod.NODNumber')
                    ->leftjoin('nod_report as nod','nod.Id','=','vcn.id_approved_nod')
                    ->where('vcn.id_approved_nod', $request->input('Id'))
                    ->first();

        $valStatus = 4;

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

        if(!empty($item)) {
            $item->rejectdesc = $request->input('Description');
        }

        DB::begintransaction();
        try{
            DB::table('verifikasi_capa_nod as vcn')
                ->where('vcn.id_approved_nod', $request->input('Id'))
                ->where('vcn.actived',1)
                ->update([
                    'status_capa' => $valStatus,
                    'reject_description' => $request->input('Description'),
                    'is_approved' => 0,
                    'actived' => 0
                ]);

            try{
                $itemPosition = DB::table('position')
                        ->select('Id')
                        ->where('IdDepartment', session('adminvue')->IdDepartment) 
                        ->where('Id', $item->user_entry)
                        ->where('Actived', 1)
                        ->first();
                
                if($itemPosition!=null) $IdPosition = $itemPosition->Id;
                else $IdPosition = 0;
                
                if($IdPosition!=0) {
                    $itemMail = $this->MainDB->table('employee as emp')
                        ->select('emp.Name as Employee','emp.Email')
                        ->where('emp.IdPosition', $IdPosition)
                        ->where('emp.Actived', 1)
                        ->get();
                    
                    $this->Helper->sendEmailVerifiCapa($item, $NODCA, $NODPA, $itemMail, $valStatus);   
                }

                $this->History->store(25,14,json_encode($item));
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

    function descriptionReject(Request $request) {
        $item = DB::table('verifikasi_capa_nod as vcn')
            ->select('vcn.reject_description as description')
            ->where('vcn.reject_description','<>',null)
            ->where('vcn.id',$request->Id)
            ->where('vcn.actived',1)
            ->first();

        $description = 'Deskripsi tidak tertulis';

        if($item!=null) $description = $item->description;
        
        return json_encode(array(
            'status'=>true,
            'data'=>$description,
        ));
    }

    public function correction(Request $request) {
        $requestData = $request->all();
        $validation = Validator::make($request->all(),$this->validationCorrection(),
            $messages = ['required' => 'This field is required.']);

        if ($validation->fails()) {
            return json_encode(array(
                'status'=>false,
                'message'=>'Silahkan lengkapi kolom *Wajib Diisi',
                'validation'=>$validation->errors(),
            ));
        }

        $item = DB::table('verifikasi_capa_nod as vcn')
        ->select('*', 'nod.NODNumber')
        ->leftjoin('nod_report as nod','nod.Id','=','vcn.id_approved_nod')
        ->where('vcn.id_approved_nod', $request->input('Id'))
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
        
        $arr = [
            'TypeData'=>6, // -> type koreksi nod verifikasi CAPA
            'Number'=>$request->input('Number'),
            'Description'=>$request->input('Description'),
            'TypeUser'=>0,
            'ChildToAnswer'=>0,
            'Attachment'=>'[]',
            'UserEntry'=>session('adminvue')->Id,
        ];

        DB::begintransaction();
        try {
            $status = 1;
            
            DB::table('correction')
                ->insert($arr);
            
            DB::table('verifikasi_capa_nod as vcn')
                ->where('vcn.id_approved_nod', $request->input('Id'))
                ->update([
                    'vcn.status_capa' => $status,
                    'vcn.is_publish' => 0
                ]);
            try {
              
                $itemPosition = DB::table('position')
                        ->select('Id')
                        ->where('IdDepartment', session('adminvue')->IdDepartment) 
                        ->where('Id', $item->user_entry)
                        ->where('Actived', 1)
                        ->first();
                
                if($itemPosition!=null) $idPosition = $itemPosition->Id;
                else $idPosition = 0;
                
                if($idPosition != 0) {
                    $itemMail = $this->MainDB->table('employee as emp')
                        ->select('emp.Name as Employee','emp.Email')
                        ->where('emp.IdPosition', $idPosition)
                        ->where('emp.Actived', 1)
                        ->get();
                }
                
                $data['Subject'] = 'Verifikasi CAPA - Correction';
                $data['Title'] = 'Pengajuan efektivitas CAPA terdapat koreksi/diperlukan perbaikan dengan rincian sebagai berikut :';

                $dataMail['Korektor'] = session('adminvue')->Name .' | '. session('adminvue')->Position .' - '. session('adminvue')->Department;
                $dataMail['NOD Number'] = $item->NODNumber;
                foreach($NODCA as $keyCa => $valCa) {      
                    $dataMail['Dekskripsi Corrective Action (CA) ' . ($keyCa + 1)] = $valCa->CADescription;
                }
                foreach($NODPA as $keyPa => $valPa) {
                    $dataMail['Dekskripsi Corrective Action (PA) ' . ($keyPa + 1)] = $valPa->PADescription;
                }
                
                $dataMail['Correction'] = $request->input('Description');
                
                if(count($itemMail)>0) { foreach ($itemMail as $key => $val) {
                    $data['Employee'] = $val->Employee;
                    $data['Email'] = $val->Email;
                    
                    $this->History->sendMail($data, $dataMail, $dataObjectEmail=[]);
                } }

                $this->History->store(33,15,json_encode($requestData));
                DB::commit();
            } catch (Exception $e) {
                return json_encode(array(
                    'status'=>false,
                    'message'=>'Koreksi Data Gagal, Pengiriman Email Invalid!',
                    'validation'=>$validation->errors(),
                ));
            }

        } catch(Exception $e) {
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

    function validationCorrection(){
        return [
            'Description'=>'required'
        ];
    }
}
