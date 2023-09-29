<?php

namespace App\Http\Controllers\BackEnd;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;
use Session;
use Mail;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class HistoryControll extends Controller
{

    public function sendMail($data, $dataMail, $dataObjectEmail) {
        Mail::send('email.email',['data'=>$data, 'dataMail'=>$dataMail, 'dataObjectEmail'=>$dataObjectEmail], function($message) use ($data) {
            $message->from(env('MAIL_USERNAME', 'it.support@widatra.com'), 'Web e-DMS | do-not-reply');
            $message->to($data['Email'], $data['Employee'])->subject($data['Subject']);
        });
    }

    public function sendMailCareTaker($data, $dataMail, $dataObjectEmail, $groupCC) {
        Mail::send('email.email',['data'=>$data, 'dataMail'=>$dataMail, 'dataObjectEmail'=>$dataObjectEmail], function($message) use ($data, $groupCC) {
            $message->from(env('MAIL_USERNAME', 'it.support@widatra.com'), 'Web e-DMS | do-not-reply');
            $message->to($data['Email'], $data['Employee'])->subject($data['Subject']);
            $message->cc($groupCC);
        });
    }

    public function storeApi($idmodule,$action,$desc,$userEntry){
        DB::table('history')
            ->insert([
                'IdModule'=>$idmodule,
                'Description'=>$desc,
                'Action'=>$action,
                'From'=>2,  // 2: Form Api
                'UserEntry'=>session('adminvue')->Id
            ]);
    }

    public function store($idmodule,$action,$desc){
        DB::table('history')
            ->insert([
                'IdModule'=>$idmodule,
                'Description'=>$desc,
                'Action'=>$action,
                'UserEntry'=>session('adminvue')->Id
            ]);
    }

    public static function storePrintReport($idmodule){
        DB::table('printed_history')
            ->insert([
                'IdModule'=>$idmodule,
                'UserEntry'=>session('adminvue')->Id
            ]);
    }
}
