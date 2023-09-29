<?php

namespace App\Http\Controllers\BackEnd;

use Laravel\Passport\Passport;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use App\Helper;
use Validator;
use App\Http\Controllers\Utils\UploadFileControll;
use App\Http\Controllers\Utils\AppWebControll;
use Carbon\Carbon;

class CorrectionNOEVerificationControll extends Controller
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
            ->where(function ($query) {
                if(session('adminvue')->TypeUser!=8 && session('adminvue')->IdDepartment != 67 && session('adminvue')->TypeUser != 19) {
                    $query->where('emp.IdDepartment',session('adminvue')->IdDepartment);
                }
            })
            ->where('noe.Actived','>',0)
            ->where('crt.TypeData',2)
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
            ->where('TypeData',2)
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
        if(!empty($item)) 
        {
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
            'loc.Name as Location'
        )
        ->leftjoin('product as pdc','pdc.Id','=','noe.IdProduct')
        ->leftjoin('location as loc','loc.Id','=','noe.IdLocation')
        ->where('noe.Id',$request->input('Id'))
        ->first();
        
        $TypeData = 1; // type data tabel correction
        $Status = 1; // status tabel noe_report
        $IsPublish = 0; // IsPublish tabel noe_report
        $Modul = 27; // id module
        $IsPath = 8; //8 path correction-noe-report
        if($item!=null) {
            if($item->Status === 'Disetujui oleh Unit Head' || $item->Status === 'Disetujui oleh Sect Head') {
                $TypeData = 2;
                $IsPublish = 1;
                $Modul = 28;
                $IsPath = 9; //9 path correction-noe-verification

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
                    // ->where('Code', 'like', '%'.'.uh')
                    ->where('Code', $getChildCode->Code)
                    ->where('IdDepartment', session('adminvue')->IdDepartment)
                    ->where('Actived', 1)
                    ->first();
                
                if($dtPst==null) $isActive = 0;
                else $isActive = $dtPst->Status;
                
                $Status = 2; //2: Dilaporkan ke Unit Head
                if(!$isActive) $Status = 3; //3: Dilaporkan ke Sect Head
    
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
        if($itemCaretaker && $item->Status=='Disetujui oleh Sect Head') $isCaretaker = true;

        $getChildToAnswer =DB::table('position')
            ->select('Id','Code')
            ->where(function ($getChildToAnswer) use ($request) {
                if(session('adminvue')->TypeUser == 15) // if dept head
                {
                    // $getChildToAnswer->where('Parent', 'LIKE','%{"Id":'.session('adminvue')->IdPosition.'%')
                    // ->where('Id', $request->input('SectionPublish')); 
                    $getChildToAnswer->where('Id', $request->input('IdPublish'));
                }
                elseif(session('adminvue')->TypeUser == 14) // if section head
                {
                    $getChildToAnswer->where('Parent', 'LIKE','%{"Id":'.session('adminvue')->IdPosition.'%')
                    ->where('Id', $request->input('IdPublish'));
                }
                elseif(session('adminvue')->TypeUser == 13) // if unit head
                {
                    $getChildToAnswer->where('Parent', 'LIKE','%{"Id":'.session('adminvue')->IdPosition.'%');
                }
            })
            ->where('Actived', 1)
            ->first();
        
        if($isCaretaker) {
            $arr = [
                'TypeData'=>$TypeData,
                'Number'=>$request->input('Number'),
                'Description'=>$request->input('Description'),
                'Attachment'=>$Attachment,
                'TypeUser'=>session('adminvue')->TypeUser,
                'ChildToAnswer'=> $getChildToAnswer->Id,
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
                'ChildToAnswer'=> $getChildToAnswer->Id,
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
                    'Status'=>$Status,
                    'IsPublish'=>$IsPublish,
                    'IsCorrection'=>1
                ]);
            
            try{
                
                if($Status==1) {
                    $itemMail = $this->MainDB->table('employee as emp')
                        ->select('emp.Name as Employee','emp.Email')
                        ->leftjoin('users as usr','usr.IdEmployee','=','emp.Id')
                        ->where('usr.Id', $item->UserEntry)
                        ->where('emp.Actived', 1)
                        ->get();
                    
                } else {
                    
                    $itemPosition = 0;
                    $valPosition = session('adminvue')->CodePosition;
                    $exp = explode('.', $valPosition);
                    if(strpos(strtolower($exp[1]), 'sch') !== false) $itemPosition = 2;
                    if(strpos(strtolower($exp[1]), 'dh') !== false) $itemPosition = 3;
                    
                    if($itemPosition==2) {
                        $dtPosition = DB::table('position')
                            ->select('Id')
                            // ->where('Code', 'like', '%'.'.uh')
                            ->where('Code', $getChildCode->Code)
                            ->where('IdDepartment', session('adminvue')->IdDepartment)
                            ->where('Actived', 1)
                            ->first();
                        
                        if($dtPosition!=null) $IdPosition[] = $dtPosition->Id;
                        else $IdPosition[] = 0;
                    } else if($itemPosition==3) {
                        if($Status==2) {
                            $dtPosition = DB::table('position')
                                ->select('Id')
                                // ->where('Code', 'like', '%'.'.uh')
                                ->where('Id', $request->input('IdPublish'))
                                ->where('IdDepartment', session('adminvue')->IdDepartment)
                                ->where('Actived', 1)
                                ->first();
                        
                            if($dtPosition!=null) $IdPosition[] = $dtPosition->Id;
                        }
                        
                        $dtPosition = DB::table('position')
                            ->select('Id')
                            ->where('Code', $getChildCode->Code)
                            ->where('IdDepartment', session('adminvue')->IdDepartment)
                            ->where('Actived', 1)
                            ->first();
                        
                        if($dtPosition!=null) $IdPosition[] = $dtPosition->Id;
                        else $IdPosition[] = 0;
                    } else {
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
