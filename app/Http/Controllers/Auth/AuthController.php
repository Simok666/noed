<?php

namespace App\Http\Controllers\Auth;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Crypt;
use Carbon\Carbon;
use Ramsey\Uuid\Uuid;
use DB;
use Session;
use stdClass;
use App\Http\Controllers\BackEnd\HistoryControll;
use Mail;
use Pusher\Pusher;

class AuthController extends Controller
{
    protected $History;
    protected $MainDB;

    public function __construct(){
        $this->History = new HistoryControll();
        $this->middleware('guest:adminvue', ['except' => ['logout', 'getLogout']]);
        $this->MainDB = DB::connection('mysql');
    }

    public function register(Request $request) {
        $requestData = $request->all();

        DB::begintransaction();
        try{
            $this->MainDB->table('users')
            ->insert([
                'Code'=>Uuid::uuid1()->toString(),
                'IdEmployee'=>0,
                'UserName'=>random_int(820000000000,899999999999),
                'Password'=>Crypt::encrypt("admin"),
                'api_token'=>Crypt::encrypt("20laravuetreenear20"),
                'UserEntry'=>0
            ]);

            DB::commit();
        }catch (Exception $e){
            DB::rollback();
            return array('status'=>422,'message'=>'Register Failed');
        }

        return array('status'=>200,'message'=>'Register Success');
    }

    public function login(Request $request){

        $userName = $request->input('username');
        $password = $request->input('password');

        $lockApps = $this->MainDB->table('versionapp')
            ->select('TypeApp')
            ->where('Id', 1)
            ->first();

        $item = $this->MainDB->table('users as usr')
        ->select(
            'usr.Id',
            'usr.UserName',
            'usr.Password'
        )
        ->where('usr.UserName', $userName)
        ->where('usr.Actived','>',0)
        ->first();

        if(!empty($item)){
            if(Crypt::decrypt($item->Password)===$password){

                $dataUser = $this->MainDB->table('employee as emp')
                ->select(
                    'usr.Id',
                    'emp.Id as IdEmployee',
                    'emp.Name',
                    'emp.Photo',
                    'usr.UserName',
                    'usrd.TypeUser',
                    'emp.IdDepartment',
                    'emp.IdPosition',
                    'pst.Parent as ParentPosition',
                    'dpt.Code as DepartmentCode',
                    'dpt.Department',
                    'pst.Name as Position',
                    'pst.Code as CodePosition'
                )
                ->join('users as usr','usr.IdEmployee','emp.Id')
                ->join('users_detail as usrd','usrd.IdUsers','=','usr.Id')
                ->join('position as pst','pst.Id','emp.IdPosition')
                ->join('department as dpt','dpt.Id','emp.IdDepartment')
                ->where('emp.Actived','>',0)
                ->where('usrd.Apps',2)
                ->where('pst.Actived',1)
                ->where('dpt.Actived',1)
                ->where('usr.Id',$item->Id)
                ->first();
                // dd($dataUser->TypeUser);

                if(empty($dataUser) || $dataUser==null) return response()->json(['status'=>422,'dataUser'=>null,'message'=>'User Tidak Mempunyai Akses Ke Aplikasi Ini!'], 422);

                if($dataUser->TypeUser!=1 && $dataUser->TypeUser!=8) {
                    if($lockApps->TypeApp=='ADMIN') return response()->json(['status'=>422,'dataUser'=>null,'message'=>'Aplikasi Dikunci oleh Admin!'], 422);
                }

                if($dataUser->ParentPosition==0) {
                    DB::begintransaction();
                    try{
                        DB::table('caretaker')
                        ->where('IdDepartment', $dataUser->IdDepartment)
                        ->where('Status', 1)
                        ->where('Actived', 1)
                        ->update([
                            'Status'=>0
                        ]);

                        DB::commit();
                    }catch (Exception $e){
                        DB::rollback();
                    }
                }

                $accessMenu = DB::table('user_access')
                ->select(
                    'Action'
                )
                ->where('IdTypeUser',$dataUser->TypeUser)
                ->value('Action');
                session()->put('accessMenu', $accessMenu);

                $filterUser = new stdClass();
                $filterUser->EmpName = substr($dataUser->Name, 0, 25);
                $filterUser->TypUser = $dataUser->TypeUser;
                $filterUser->Photo = $dataUser->Photo;
                $filterUser->UserName = $dataUser->UserName;
                $filterUser->accessMenu = $this->getAccessMenu($accessMenu);

                if( !file_exists($dataUser->Photo) ){
                    $filterUser->Photo = 'clouds/backend/files/images/users/user-default.png';
                }

                $this->allowAccess(json_decode($accessMenu));
                session()->put('adminvue', $dataUser);
                $this->History->store(1,6,json_encode($dataUser));
                return response()->json(['status'=>200,'dataUser'=>$filterUser,'message'=>'Login Success']);
            }else{
                return response()->json(['status'=>422,'dataUser'=>null,'message'=>'User Name or Password Wrong!'], 422);
            }
        }

        return response()->json(['status'=>422,'dataUser'=>null,'message'=>'Data User Name Invalid!'], 422);
    }

    public function logout(Request $request) {
        Auth::guard('adminvue')->logout();
        $request->session()->flush();
        $request->session()->regenerate();
        Session::flush();
    }

    public function ForgotPassword(Request $request){
        $email = $request->input('email');

        $Employee = DB::table('employee')
            ->select('Id as IdEmployee','Email','Name')
            ->where('Actived','>',0)
            ->where('Email',$email)
            ->first();

        do {
            $AuthCode = mt_rand(10000, 99999);
            $isAuthCode = DB::table('forgot_password')
                ->where('Code', $AuthCode)
                ->count();
        } while ( $isAuthCode > 0);

        if(!empty($Employee)){
            DB::begintransaction();
            try{
               DB::table('forgot_password')
                ->insert([
                    'IdEmployee'=>$Employee->IdEmployee,
                    'Code'=>$AuthCode,
                    'Email'=>$Employee->Email,
                    'UserEntry'=>99
                ]);
                
                DB::commit();
            }catch(Exception $e){
                DB::rollback();
                return response()->json(['status'=>422,'dataUser'=>null,'message'=>'Lupa Password Gagal!'], 422);    
            }

            try {
                Mail::send('email.mail-code',['AuthCode'=>$AuthCode], function($message) use ($Employee, $email) {
                    $message->from(env('MAIL_USERNAME', 'it.support@widatra.com'), 'Web e-DMS | do-not-reply');
                    $message->to($email, $Employee->Name)->subject('Kode Verifikasi Reset Password');
                });
            }catch(Exception $e){
                return response()->json(['status'=>422,'dataUser'=>null,'message'=>'Lupa Password Gagal!'], 422);    
            }

            $Employee->AuthCode = $AuthCode;
            return response()->json(['status'=>200,'dataUser'=>$Employee,'message'=>'Lupa Password Success']);

        }else{
            return response()->json(['status'=>422,'dataUser'=>null,'message'=>'Data Karyawan Tidak Ada!'], 422);
        }
    }

    public function VerificationCode(Request $request){
        $authcode = $request->input('codeauth');
        $IdEmployee = $request->input('IdEmployee');

        $CodeAuth = DB::table('forgot_password')
            ->select('Code')
            ->where('IdEmployee',$IdEmployee)
            ->orderby('Id','desc')
            ->first();

        if($authcode == $CodeAuth->Code){
            $filterUser = new stdClass();
            $filterUser->IdEmployee = $IdEmployee;
            return response()->json(['status'=>200,'dataUser'=>$filterUser,'message'=>'Verifikasi Kode Success']);
        }else{
            return response()->json(['status'=>422,'dataUser'=>null,'message'=>'Kode Verifikasi Salah!'], 422);
        }
    }

    public function ResetPassword(Request $request){
        $IdEmployee = $request->input('IdEmployee');
        $newpassword = $request->input('newpassword');
        $newpasswordrepeat = $request->input('newpasswordrepeat');

        $Email = DB::table('employee')
        ->select('Email')
        ->where('Id',$request->input('IdEmployee'))
        ->first();

        $Employee = [];
        if($Email != null) {
            $Employee = DB::table('employee')
            ->select('Id')
            ->where('Email',$Email->Email)
            ->get();
        }

        if($newpassword == $newpasswordrepeat){
            DB::begintransaction();
            try{
                if(count($Employee) > 0) { foreach ($Employee as $val) {
                    DB::table('users')
                    ->where('IdEmployee', $val->Id)
                    ->update([
                        'Password'=>Crypt::encrypt($request->input('newpassword')),
                        'api_token'=>Crypt::encrypt($request->input('newpassword')),
                    ]);
                } }

                DB::commit();
            }catch(Exception $e){
                DB::rollback();
                return response()->json(['status'=>422,'dataUser'=>null,'message'=>'Update Password Gagal!'], 422);
            }

            return response()->json(['status'=>200,'dataUser'=>$IdEmployee,'message'=>'Update Password Success']);
        }else{
            return response()->json(['status'=>422,'dataUser'=>null,'message'=>'Konfirmasi Password Tidak Sama Dengan Password Baru!'], 422);
        }
    }

    public function restrictedPage() {
        return view('404')->render();
    }

    public function getSession(Request $request){
        $data = session('adminvue');

        return json_encode(array(
            'status'=>true,
            'data'=>$data
        ));
    }

    public function getUser(){
        $users = DB::table('users')
            ->select('*')
            ->where('Actived','>',0)
            ->where('Id',session('adminvue')->Id)
            ->first();
       
        return response()->json([
            'user_id'=>$users->Id,
            'user_name'=>$users->UserName
        ]);
    }

    public function pusherAuth(Request $request)
    {
       $user = session()->get('adminvue');
       $socketId = $request['socket_id'];
       $channelName = $request['channel_name'];
       $key = config('broadcasting.connections.pusher.key');
       $secret = config('broadcasting.connections.pusher.secret');
       $appId = config('broadcasting.connections.pusher.app_id');
       
       if($user)
       {
            $digest = "sha256";
            $string_to_sign = $socketId .":". $channelName;
        
            $signature = hash_hmac($digest, $string_to_sign, $secret);
            $auth = $key .":{$signature}";
            
            return response()->json([
                'auth' => $auth,
            ]); 
            
       }
       else
       {
            header('', true, 403);
            return response()->json([
                'status' => 403,
                'message' => 'Forbidden'
            ]); 
       }
    }

    public function reAccessMenu(Request $request) {
        $accessMenu = session('accessMenu');
        $menu = $this->getAccessMenu($accessMenu);
        return response()->json(['status'=>200,'accessMenu'=>$menu,'message'=>'ReAccess Menu Success']);
    }

    public function getAccessMenu($accessMenu) {
        $path = base_path()."/public/clouds/menu.json";
        $jsonMenu = file_get_contents($path);
        $jsonTree = json_decode($jsonMenu);

        if(!empty($accessMenu)){
            $Action = json_decode($accessMenu);
            foreach($jsonTree as $key=>$val){
                $val->opened = true;
                $val->selected = false;
                $val->disabled = false;
                $val->loading = false;

                $key1 = array_search($val->id, array_column($Action, 'id'));
                if($key1 !== false){
                    $val->selected = $Action[$key1]->selected;
                }

                if(!empty($val->children)){
                    foreach($val->children as $k=>$v){
                        $v->opened = true;
                        $v->selected = false;
                        $v->disabled = false;
                        $v->loading = false;

                        $key2 = false;
                        if(isset($Action[$key1]->children))
                            $key2 = array_search($v->id, array_column($Action[$key1]->children, 'id'));
                        if($key2 !== false){
                            $v->selected = $Action[$key1]->children[$key2]->selected;
                        }

                        if(!empty($v->children)){
                            foreach($v->children as $i=>$value){
                                $value->opened = false;
                                $value->selected = false;
                                $value->disabled = false;
                                $value->loading = false;

                                $key3 = false;
                                if(isset($Action[$key1]->children[$key2]->children))
                                    $key3 = array_search($value->id, array_column($Action[$key1]->children[$key2]->children, 'id'));
                                if($key3 !== false){
                                    $value->selected = $Action[$key1]->children[$key2]->children[$key3]->selected;
                                }
                            }
                        }
                    }
                }
            }
        }

        return $jsonTree;
    }

    private function allowAccess($Menu) {
        $allowMenu['/AdminVue/check-token'] = true;
        $allowMenu['/RoleAdmin/main/dashboard'] = true;
        $allowMenu['/RoleAdmin/main/profile'] = true;
        $allowMenu['/RoleAdmin/main/form-profile'] = true;

        $path = base_path()."/public/clouds/menu.json";
        $jsonMenu = file_get_contents($path);
        $jsonMenu = json_decode($jsonMenu);

        foreach($Menu as $key=>$val){
            if( isset($val->selected) && $val->selected == true ) {
                $show = str_replace('data-', 'show-', $val->value);

                $allowMenu[$val->value] = true;
                $allowMenu[$show] = true;

                $key1 = array_search($val->id, array_column($jsonMenu, 'id'));
                if($key1 !== false){ if(isset($jsonMenu[$key1]->submenu) && !empty($jsonMenu[$key1]->submenu)) {
                    foreach ($jsonMenu[$key1]->submenu as $value) {
                        $type = isset($value->type) ? $value->type : '';
                        if($type=='show') $allowMenu[$value->value] = true;
                    }
                } }
            }

            if(!empty($val->children)){ foreach($val->children as $k=>$v){
                if( isset($v->selected) && $v->selected == true ) {
                    $show = str_replace('data-', 'show-', $v->value);

                    $allowMenu[$v->value] = true;
                    $allowMenu[$show] = true;

                    $key2 = false;
                    if(isset($jsonMenu[$key1]->children))
                        $key2 = array_search($v->id, array_column($jsonMenu[$key1]->children, 'id'));
                    if($key2 !== false){ if(isset($jsonMenu[$key1]->children[$key2]->submenu) && !empty($jsonMenu[$key1]->children[$key2]->submenu)) {
                        foreach ($jsonMenu[$key1]->children[$key2]->submenu as $value) {
                            $type = isset($value->type) ? $value->type : '';
                            if($type=='show') $allowMenu[$value->value] = true;
                        }
                    } }
                }

                if(!empty($v->children)){ foreach($v->children as $i=>$val){
                    if( isset($val->selected) && $val->selected == true ) {
                        $show = str_replace('data-', 'show-', $val->value);

                        $allowMenu[$val->value] = true;
                        $allowMenu[$show] = true;

                        $key3 = false;
                        if(isset($jsonMenu[$key1]->children[$key2]->children))
                            $key3 = array_search($val->id, array_column($jsonMenu[$key1]->children[$key2]->children, 'id'));
                        if($key3 !== false){
                        if(isset($jsonMenu[$key1]->children[$key2]->children[$key3]->submenu) && !empty($jsonMenu[$key1]->children[$key2]->children[$key3]->submenu)) {
                            foreach ($jsonMenu[$key1]->children[$key2]->children[$key3]->submenu as $value) {
                                $type = isset($value->type) ? $value->type : '';
                                if($type=='show') $allowMenu[$value->value] = true;
                            }
                        } }

                        if(!empty($val->children)){ foreach($val->children as $ii=>$vVal){
                            if( isset($vVal->selected) && $vVal->selected == true ) {
                                $allowMenu[$vVal->value] = true;
                            }
                        } }
                    }
                } }
            } }
        }
        session()->put('allow_menu', $allowMenu);
    }

}
