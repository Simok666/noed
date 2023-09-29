<?php

namespace App\Http\Controllers\BackEnd;

use Laravel\Passport\Passport;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Session;
use DB;
use Validator;
use Carbon\Carbon;
use App\Http\Controllers\Utils\UploadFileControll;
use App\Http\Controllers\Utils\AppWebControll;
use Ramsey\Uuid\Uuid;
use Crypt;

class ProfileControll extends Controller
{
    protected $UploadFile;
    protected $AppWeb;
    protected $History;
    protected $MainDB;

    public function __construct() {
    	$this->UploadFile = new UploadFileControll();
        $this->AppWeb = new AppWebControll();
        $this->History = new HistoryControll();
        $this->MainDB = DB::connection('mysql');
    }

    public function index(Request $request) {
        $item = $this->MainDB->table('users as usr')
            ->select(
                'usr.Id as id',
                'usr.Code',
                'usr.UserName',
                'emp.Name as EmpName',
                'emp.NIP',
                'emp.CellPhone',
                'emp.Photo',
                'dpt.Department',
                'pst.Name as Position',
                'emp.UpdateAt'
            )
            ->leftjoin('employee as emp','emp.Id','=','usr.IdEmployee')
            ->leftjoin('department as dpt','dpt.Id','=','emp.IdDepartment')
            ->leftjoin('position as pst','pst.Id','=','emp.IdPosition')
            ->where('usr.Actived','>',0)
            ->where('pst.Actived',1)
            ->where('dpt.Actived',1)
            ->where('usr.Id', session('adminvue')->Id)
            ->first();

        if( !file_exists($item->Photo) ){
            $item->Photo = 'clouds/backend/files/images/users/user-default.png';
        }

        if(!empty($item)){
            $item->UpdateAt = Carbon::parse($item->UpdateAt)->format('l, d-m-Y H:i:s');
        }

        return json_encode(array(
            'status'=>true,
            'data'=>$item,
        ));
    }

    public function edit(Request $request)
    {
        $item =$this->MainDB->table('users as usr')
            ->select(
                'usr.Id as id',
                'usr.Code',
                'emp.Name as EmpName',
                'emp.NIP',
                'emp.CellPhone',
                'emp.Photo'
            )
            ->leftjoin('employee as emp','emp.Id','=','usr.IdEmployee')
            ->where('usr.Actived','>',0)
            ->where('usr.Id', $request->input('Id'))
            ->first();

        if( !file_exists($item->Photo) ){
            $item->Photo = 'clouds/backend/files/images/users/user-default.png';
        }

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

        $dtUser =$this->MainDB->table('users')
            ->select('IdEmployee','Password')
            ->where('Actived','>',0)
            ->where('Id', $request->input('Id'))
            ->first();

        $isChangePass = false;
        if($request->input('OldPassword')!='undefined' && $request->input('NewPassword')!='undefined' && $request->input('ConfirmPassword')!='undefined'){
            $oldPassword = Crypt::decrypt($dtUser->Password);
            if($request->input('OldPassword') != $oldPassword){
                return json_encode(array(
                    'status'=>false,
                    'message'=>'Password Lama Salah! Silahkan Cek Kembali',
                    'validation'=>$validation->errors(),
                ));
            }else{
                if($request->input('ConfirmPassword') != $request->input('NewPassword')){
                    return json_encode(array(
                        'status'=>false,
                        'message'=>'Konfirmasi Password Baru Salah! Silahkan Cek Kembali',
                        'validation'=>$validation->errors(),
                    ));
                }else{
                    $isChangePass = true;
                }
            }
        }

        $Photo = $request->input('OldFile');
        if($request->has('File') && $request->file('File')!=null){
            if( pathinfo($request->file('File')->getClientOriginalName(), PATHINFO_EXTENSION) ){
                // format: uploadFile($File, $pathFolder=0, $FileName='')
                $Photo = $this->UploadFile->uploadFile($request->file('File'), 2);
            }
        }

        if($Photo=='') $Photo = 'clouds/backend/files/images/users/user-default.png';

        DB::begintransaction();
        try{
            $this->MainDB->table('employee')
                ->where('Id',$dtUser->IdEmployee)
                ->update([
                    'Name'=>$request->input('EmpName'),
                    'NIP'=>$request->input('NIP'),
                    'CellPhone'=>$request->input('CellPhone'),
                    'Photo'=>$Photo
                ]);

            if($isChangePass){
                $this->MainDB->table('users')
                    ->where('Id', $request->input('Id'))
                    ->update([
                        'Password'=>Crypt::encrypt($request->input('NewPassword')),
                    ]);
            }

            $this->History->store(1,2,json_encode($requestData));
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

    function validation() {
        return [

        ];
    }

    function getLockApps(Request $request) {
        $item = $this->MainDB->table('versionapp')
            ->select('TypeApp')
            ->where('Id', 1)
            ->first();

        return json_encode(array(
            'status'=>true,
            'data'=>$item->TypeApp,
            'TypeUser'=>session('adminvue')->TypeUser
        ));
    }

    function lockApps(Request $request) {
        $TypeApp = $request->Status ? 1 : 2;

        DB::begintransaction();
        try{
            $this->MainDB->table('versionapp')
            ->where('Id', 1)
            ->update([ 'TypeApp'=>$TypeApp ]);
            DB::commit();
        }catch (Exception $e){
            DB::rollback();
            return json_encode(array(
                'status'=>false,
                'message'=>'Lock Apps Failed, Server Invalid!'
            ));
        }

        return json_encode(array(
            'status'=>true,
            'message'=>'Lock Apps Success!'
        ));
    }

}
