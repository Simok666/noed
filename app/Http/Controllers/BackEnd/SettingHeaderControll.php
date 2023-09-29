<?php

namespace App\Http\Controllers\BackEnd;

use Laravel\Passport\Passport;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use Validator;
use App\Http\Controllers\Utils\AppWebControll;
use Carbon\Carbon;


class SettingHeaderControll extends Controller
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

        $query = DB::table('setting_header as sth')
            ->select('sth.*','sth.Id as id','usr.UserName')
            ->leftjoin('users as usr','usr.Id','=','sth.UserUpdate')
            ->orderBy($field, $dir)
            ->where('sth.Actived',1);

        if ($searchValue) {
            $query->where(function($query) use ($searchValue) {
                foreach ($searchValue as $key=>$val) {
                    // if there is request input periode
                    if ($key == "sth__Month" || $key == "sth__Year")
                    {
                        if($val!='' && $val!=null)
                        {
                            if($key == "sth__Year")
                                {   
                                    $yearConvertDigits = Carbon::createFromFormat('y', $val);
                                    $searchData = $yearConvertDigits->format('Y');
                                    if($searchData!='' && $searchData!=null) $query->where('sth.Date', 'like', '%'.$searchData.'%');            
                                }
                                else
                                {
                                    if($val <= 12)
                                    {
                                        $month = Carbon::createFromFormat('m', $val);
                                        if($val!='' && $val!=null) $query->whereMonth('sth.UpdateAt', '=', $month->format('m'));            
                                    }
                                    else
                                    {
                                        if($val!='' && $val!=null) $query->whereMonth('sth.UpdateAt', '=', '');
                                    }           
                                }            
                        }            
                    }
                    else 
                    {
                        if($key == "sth__Date" && !empty($val))
                        {
                            if($val!='' && $val!=null)
                            {
                                $date = str_replace('.', '-', $val);
                                $yearConvertDigits = Carbon::createFromFormat('d-m-y', $date);
                                $yearFormats = $yearConvertDigits->format('d-m-Y');
                        
                                $val = date('Y-m-d', strtotime($yearFormats));
                                if($val!='' && $val!=null) $query->where('sth.Date', 'like', '%'.$val.'%');
                            }
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

    public function edit(Request $request)
    {
        $item = DB::table('setting_header')
            ->select('*')
            ->where('Id', $request->Id)
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

        DB::begintransaction();
        try{
            DB::table('setting_header')
            ->where('Id',$request->input('Id'))
            ->update([
                'Name'=>$request->input('Name'),
                'Date'=>$request->input('Date'),
                'Number'=>$request->input('Number'),
                'NumberRef'=>$request->input('NumberRef'),
                'Title'=>$request->input('Title'),
                'UserUpdate'=>session('adminvue')->Id
            ]);

            $this->History->store(47,2,json_encode($requestData));
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

    function validation(){
        return [
            'Name'=>'required',
            'Date'=>'required',
            'Number'=>'required',
            'NumberRef'=>'required',
            'Title'=>'required'
        ];

    }


}
