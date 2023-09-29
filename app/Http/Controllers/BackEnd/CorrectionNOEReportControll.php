<?php

namespace App\Http\Controllers\BackEnd;

use Laravel\Passport\Passport;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use Carbon\Carbon;

class CorrectionNOEReportControll extends Controller
{
    protected $MainDB;

    public function __construct() {
        $this->MainDB = DB::connection('mysql');
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
            ->leftjoin('noe_report as noe','noe.NOENumber','=','crt.Number')
            ->orderBy($field, $dir)
            ->where(function ($query)  {
                if(session('adminvue')->TypeUser!=8 && session('adminvue')->IdDepartment != 67 && session('adminvue')->TypeUser != 19) {
                    $query->where('emp.IdDepartment',session('adminvue')->IdDepartment);
                }
            })
            ->Where('noe.Actived','>',0)
            ->where('crt.TypeData',1)
            ->where('crt.Actived','>',0);

        if ($searchValue) {
            $query->where(function($query) use ($searchValue) {
                foreach ($searchValue as $key=>$val) {
                    $key = str_replace('__', '.', $key);
                    if($val!='' && $val!=null) {
                        if($key == "crt.CreateAt" && !empty($val))
                        {
                            $date = str_replace('.', '-', $val);
                            $yearConvertDigits = Carbon::createFromFormat('d-m-y', $date);
                            $yearFormats = $yearConvertDigits->format('d-m-Y');
                                        
                            $val = date('Y-m-d', strtotime($yearFormats));
                            
                            if($val!='' && $val!=null) $query->where('crt.CreateAt', 'like', '%'.$val.'%');
                        }
                        
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
            ->where('TypeData',1)
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
}
