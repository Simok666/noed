<?php

namespace App\Http\Controllers\BackEnd;

use Laravel\Passport\Passport;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use Validator;
use App\Http\Controllers\Utils\AppWebControll;
use App\Http\Controllers\Utils\UploadFileControll;

class DoubleBookControll extends Controller
{
    protected $AppWeb;
    protected $History;
    protected $MainDB;
    protected $edmsDB;
    protected $UploadFile;

    public function __construct() {
        $this->AppWeb = new AppWebControll();
        $this->History = new HistoryControll();
        $this->MainDB = DB::connection('mysql');
        $this->edmsDB = DB::connection('edms_db');
        $this->UploadFile = new UploadFileControll();
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
                'nod.NODNumber',
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
                'usr.Id as IdUser'
            )
            ->join('nod_report as nod','nod.IdNOEReport','=','noe.Id')
            ->leftjoin('product as pdc','pdc.Id','=','noe.IdProduct')
            ->leftjoin('location as loc','loc.Id','=','noe.IdLocation')
            ->leftjoin('users as usr','usr.Id','=','noe.UserEntry')
            ->orderBy($field, $dir)
            ->where(function($query) {
                if(session('adminvue')->TypeUser!=8 && session('adminvue')->TypeUser!=19)
                    $query->where('noe.IdDepartment',session('adminvue')->IdDepartment);
            })
            ->where('nod.Status', 8)
            ->where('nod.Actived', 1)
            ->where('noe.Status', 9)
            ->where('noe.Actived', 1);

        if ($searchValue) {
            $query->where(function($query) use ($searchValue) {
                foreach ($searchValue as $key=>$val) {
                    $key = str_replace('__', '.', $key);
                    if($val!='' && $val!=null) $query->where($key, 'like', '%'.$val.'%');
                }
            });
        }

        $data = $query->paginate($limit);

        session()->put('ExportDataNOE',$data);

        return $data;
    }

    function export(Request $request) {
        $dtIdNOE = $request->Id;
        if(!empty($dtIdNOE)) {
            DB::begintransaction();
            try{

                foreach ($dtIdNOE as $val) {
                    
                    $item = $this->MainDB->table('noe_report')
                    ->select('*')
                    ->where('Id', $val)
                    ->get();

                    $dtNOEReport = (array) $item[0];
                    $dtNOEReport['NOENumberOld'] = $dtNOEReport['NOENumberAcc'];

                    $item = $this->MainDB->table('noe_verif_evaluation')
                    ->select('*')
                    ->where('IdNOEReport', $val)
                    ->where('Actived', 1)
                    ->get();
                    $dtNOEVerif = $item;

                    $item = $this->MainDB->table('nod_report')
                    ->select('*')
                    ->where('IdNOEReport', $val)
                    ->where('Actived', 1)
                    ->get();
                    $dtNODReport = (array) $item[0];
                    $IdNODReport = (array) $item[0]->Id;

                    $item = $this->MainDB->table('nod_report_action')
                    ->select('*')
                    ->where('IdNODReport', $IdNODReport)
                    ->where('Actived', 1)
                    ->get();
                    $dtNODReportAction = $item;

                    $item = $this->MainDB->table('nod_relevant')
                    ->select('*')
                    ->where('IdNODReport', $IdNODReport)
                    ->where('Actived', 1)
                    ->get();
                    $dtNODRelevant = $item;

                    $item = $this->MainDB->table('nod_review')
                    ->select('*')
                    ->where('IdNODReport', $IdNODReport)
                    ->where('Actived', 1)
                    ->get();
                    $dtNODReview = $item;

                
                    $this->edmsDB->table('noe_report')
                    ->where('Id', $val)
                    ->delete();

                    $this->edmsDB->table('noe_verif_evaluation')
                    ->where('IdNOEReport', $val)
                    ->delete();

                    $this->edmsDB->table('nod_report')
                    ->where('IdNOEReport', $val)
                    ->delete();

                    $this->edmsDB->table('nod_report_action')
                    ->where('IdNODReport', $IdNODReport)
                    ->delete();

                    $this->edmsDB->table('nod_relevant')
                    ->where('IdNODReport', $IdNODReport)
                    ->delete();

                    $this->edmsDB->table('nod_review')
                    ->where('IdNODReport', $IdNODReport)
                    ->delete();


                    $this->edmsDB->table('noe_report')->insert($dtNOEReport);

                    foreach ($dtNOEVerif as $valNOEVerif) {
                        $insert = (array) $valNOEVerif;
                        $this->edmsDB->table('noe_verif_evaluation')->insert($insert);
                    }

                    $this->edmsDB->table('nod_report')->insert($dtNODReport);

                    foreach ($dtNODReportAction as $valNODAct) {
                        $insert = (array) $valNODAct;
                        $this->edmsDB->table('nod_report_action')->insert($insert);
                    }

                    foreach ($dtNODRelevant as $valNODRevelant) {
                        $insert = (array) $valNODRevelant;
                        $this->edmsDB->table('nod_relevant')->insert($insert);
                    }

                    if(count($dtNODReview)>0) {
                        $insertNODReview = (array) $dtNODReview[0];
                        $this->edmsDB->table('nod_review')->insert($insertNODReview);

                        $IdNODReview = $dtNODReview[0]->Id;
                        $item = $this->MainDB->table('nod_review_detail')
                        ->select('*')
                        ->where('IdNODReview', $IdNODReview)
                        ->where('Actived', 1)
                        ->get();
                        $dtNODRevDetail = $item;

                        $this->edmsDB->table('nod_review_detail')
                        ->where('IdNODReview', $IdNODReview)
                        ->delete();

                        foreach ($dtNODRevDetail as $valNODRevDetail) {
                            $insert = (array) $valNODRevDetail;
                            $this->edmsDB->table('nod_review_detail')->insert($insert);
                        }

                    }


                    $this->History->store(49,1,json_encode($dtNOEReport));
                }

            DB::commit();
            }catch (Exception $e){
                DB::rollback();
                return json_encode(array(
                    'status'=>false,
                    'message'=>'Export Data Gagal, Server Invalid!'
                ));
            }

            DB::begintransaction();
            try{
                $item = $this->edmsDB->table('noe_report')
                ->select('Id','NOENumberAcc')
                ->orderBy('NOENumberOld')
                ->whereYear('Date',$request->Year)
                ->get();

                $number = 1;
                foreach ($item as $key => $val) {
                    $num = explode('-', $val->NOENumberAcc);
                    $numAgain = explode('/', $num[1]);

                    $NNN = str_pad($number, 3, "0", STR_PAD_LEFT);
                    $NOENumber = $num[0].'-'.$NNN.'/NOE/'.$numAgain[2].'/'.$numAgain[3];
                    $NODNumber = $num[0].'-'.$NNN.'/NOD/'.$numAgain[2].'/'.$numAgain[3];

                    $this->edmsDB->table('noe_report')
                    ->where('Id', $val->Id)
                    ->update([
                        'NOENumberAcc'=>$NOENumber
                    ]);

                    $this->edmsDB->table('nod_report')
                    ->where('IdNOEReport', $val->Id)
                    ->update([
                        'NODNumber'=>$NODNumber
                    ]);

                    $number++;
                }

            DB::commit();
            }catch (Exception $e){
                DB::rollback();
                return json_encode(array(
                    'status'=>false,
                    'message'=>'Export Data Gagal, Server Invalid!'
                ));
            }

        } else {
            return json_encode(array(
                'status'=>false,
                'message'=>'Export Data Gagal, Data Empty!'
            ));
        }

        return json_encode(array(
            'status'=>true,
            'message'=>'Export Data Sukses!'
        ));
    }

    function updateFile(Request $request) {

        if($request->has('File') && $request->file('File')!=null) {
            $file = $request->file('File');
            if(pathinfo($file->getClientOriginalName(), PATHINFO_EXTENSION)) {
                $pathFile = $this->UploadFile->uploadFile($file,13,'ManualBook',1); //13 path /template
            }
        } else {
            return json_encode(array(
                'status'=>false,
                'message'=>'File Tidak Ada atau Type File Salah!'
            ));
        }

        return json_encode(array(
            'status'=>true,
            'message'=>'Update File Success!'
        ));
        
    }

}
