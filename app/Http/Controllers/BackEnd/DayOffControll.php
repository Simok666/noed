<?php

namespace App\Http\Controllers\BackEnd;

use Laravel\Passport\Passport;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use Validator;
use Carbon\Carbon;
use App\Http\Controllers\Utils\AppWebControll;

class DayOffControll extends Controller
{
    protected $AppWeb;
    protected $History;
    protected $MainDB;

    public function __construct() {
        $this->AppWeb = new AppWebControll();
        $this->History = new HistoryControll();
        $this->MainDB = DB::connection('mysql');
    }

    public function index(Request $request) {
    	$sortRules = $request->input('sort');
        $limit = $request->input('per_page');
        $searchValue = json_decode($request->input('search'));
        // print_r($searchValue->name);exit();
        list($field, $dir) = explode('|', $sortRules);
        
        $query = DB::table('day_off as dyo')
            ->select(
                DB::raw('count(dyo.Id) as `Total`'),
                DB::raw('YEAR(dyo.Date) Year'),
                DB::raw('MONTH(dyo.Date) Month'),
                'dyo.Code as id'
            )
            ->orderBy($field, $dir)
            ->groupBy('Code','Year','Month')
            ->where('dyo.Actived',1);

        if ($searchValue) {
            $query->where(function($query) use ($searchValue) {
                foreach ($searchValue as $key=>$val) {
                    $key = str_replace('__', '.', $key);
                    if($key=='dyo.Year')
                        $query->whereYear('dyo.Date', 'like', '%'.$val.'%');
                    if($key=='dyo.Month')
                        $query->whereMonth('dyo.Date', 'like', '%'.$val.'%');
                }
            });
        }

        $data = $query->paginate($limit);

        return $data;
    }

    public function dataTableDayOff(Request $request)
    {
        $sortRules = $request->input('sort');
        $limit = $request->input('per_page');
        $searchValue = json_decode($request->input('search'));
        list($field, $dir) = explode('|', $sortRules);

        $query = $this->MainDB->table('day_off as df')
            ->select(
                'df.Id as id',
                'df.Date',
                'df.NameDayOff',
            )
            ->orderBy($field, $dir)
            ->where('df.Actived','>',0);

        if ($searchValue) {
            $query->where(function($query) use ($searchValue) {
                foreach ($searchValue as $key=>$val) {
                    // if there is request input periode
                    if ($key == "df__Month" || $key == "df__Year")
                    {
                        if($val!='' && $val!=null)
                        {
                            if($key == "df__Year")
                                {   
                                    $yearConvertDigits = Carbon::createFromFormat('y', $val);
                                    $searchData = $yearConvertDigits->format('Y');
                                    if($searchData!='' && $searchData!=null) $query->where('df.Date', 'like', '%'.$searchData.'%');            
                                }
                                else
                                {
                                    if($val <= 12)
                                    {
                                        $month = Carbon::createFromFormat('m', $val);
                                        if($val!='' && $val!=null) $query->whereMonth('df.Date', '=', $month->format('m'));            
                                    }
                                    else
                                    {
                                        if($val!='' && $val!=null) $query->whereMonth('df.Date', '=', '');
                                    }            
                                }            
                        }                     
                    }
                }
            });
        }

        $data = $query->paginate($limit);

        return $data;
    }

    public function show(Request $request)
    {
        $item = $this->MainDB->table('day_off as df')
            ->select(
                'df.Id as id',
                'df.Date',
                'df.NameDayOff',
            )
            ->where('df.Id',$request->input('Id'))
            ->where('df.Actived','>',0)
            ->first();
        
        return json_encode(array(
            'status'=>true,
            'data'=>$item,
        ));
    }

    public function edit(Request $request) {
        $item = $this->MainDB->table('day_off')
            ->select('*')
            ->where('Actived',1)
            ->where('Id',$request->input('Id'))
            ->first();
       
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

        $item = $this->MainDB->table('day_off')
            ->select('Date','NameDayOFF')
            ->where('Actived',1)
            ->where('Id',$request->input('Id'))
            ->first();
        
        if($item->Date!=$request->input('Date')) {
            $isExist = $this->AppWeb->checkDataOneColMainDB('day_off','Date',$request->input('Date'));
            if($isExist>0) {
                return json_encode(array(
                    'status'=>false,
                    'message'=>'Data Date Sudah Ada!',
                    'validation'=>$validation->errors(),
                ));
            }
        }

        if($item->NameDayOFF!=$request->input('NameDayOFF')) {
            $isExist = $this->AppWeb->checkDataOneColMainDB('day_off','NameDayOFF',$request->input('NameDayOFF'));
            if($isExist>0) {
                return json_encode(array(
                    'status'=>false,
                    'message'=>'Data Nama Libur Sudah Ada!',
                    'validation'=>$validation->errors(),
                ));
            }
        }

        DB::begintransaction();
        try{
            $this->MainDB->table('day_off')
            ->where('Id', $request->input('Id'))
            ->update([
                'Date'=>$request->input('Date'),
                'NameDayOff'=>$request->input('NameDayOff')
            ]);

            $this->History->store(21,2,json_encode($requestData));
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

    public function detail($Id) {

        $item = DB::table('day_off as dyo')
            ->select(
                'dyo.Date',
                'usr.UserName'
            )
            ->leftjoin('users as usr','usr.Id','=','dyo.UserEntry')
            ->where('dyo.Code', $Id)
            ->where('dyo.Actived',1)
            ->orderBy('dyo.Date')
            ->get();

        return json_encode(array(
            'status'=>true,
            'data'=>$item
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

        $isExist = $this->AppWeb->checkDataOneColMainDB('day_off','Date',$request->input('Date'));
        if($isExist>0) {
            return json_encode(array(
                'status'=>false,
                'message'=>'Data Day Off Sudah Ada!',
                'validation'=>$validation->errors(),
            ));
        }

        DB::begintransaction();
        try{
            DB::table('day_off')
            ->insert([
                'Code'=>Carbon::parse($request->input('Date'))->format('Y-m'),
                'Date'=>$request->input('Date'),
                'UserEntry'=>session('adminvue')->Id,
                'NameDayOff'=>$request->input('NameDayOff'),
            ]);

            $this->History->store(48,1,json_encode($requestData));
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
        $date = $request->input('Id');
        $data = explode('-', $date);
        
        DB::begintransaction();
        try{
            if($data[0]=='all') {
                $this->MainDB->table('day_off')
                ->whereYear('Date', $data[1])
                ->whereMonth('Date', $data[2])
                ->delete();
            } else {
                $this->MainDB->table('day_off')
                ->where('Date', $date)
                ->delete();
            }

            $this->History->store(48,3,$date);
            DB::commit();
        }catch (Exception $e){
            DB::rollback();
            return json_encode(array(
                'status'=>false,
                'message'=>'Hapus Data Gagal, Invalid Server Side!',
            ));
        }

        return json_encode(array(
            'status'=>true,
            'message'=>'Hapus Data Sukses!',
        ));

    }

    public function deleteLibur(Request $request) {
        $id = $request->input('Id');
        
        DB::begintransaction();
        try{
            $this->MainDB->table('day_off')
                ->where('Id', $id)
                ->delete();
        
            $this->History->store(48,3,$id);
            DB::commit();
        }catch (Exception $e){
            DB::rollback();
            return json_encode(array(
                'status'=>false,
                'message'=>'Hapus Data Gagal, Invalid Server Side!',
            ));
        }

        return json_encode(array(
            'status'=>true,
            'message'=>'Hapus Data Sukses!',
        ));

    }

    function validation(){
        return [
            'Date'=>'required'
        ];

    }


}
