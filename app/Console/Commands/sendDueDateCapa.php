<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use DB;
use Illuminate\Support\Facades\Log;
use App\Helper;

class sendDueDateCapa extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sendemail:duedate {group}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send Email Due Date Verifikasi CAPA';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
        $this->MainDB = DB::connection('mysql');
        $this->logger = \Log::channel('customlog');
        $this->Helper = new Helper();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $group = $this->argument('group');

        $getCapaItem = $this->MainDB->table('nod_report_action as nra')
        ->select('nra.*', 'nod.*', 'loc.Name as nameLocation')
        ->leftjoin('nod_report as nod', 'nod.Id', '=', 'nra.IdNODReport')
        ->leftjoin('noe_report as noe', 'noe.Id', '=', 'nod.IdNOEReport')
        ->leftjoin('location as loc', 'loc.Id', '=', 'noe.IdLocation')
        ->where('nod.Status', 8)  // status nod di setujui QA dept head 
        ->where('nra.Actived', 1)  
        ->get();

        if($group === 'CA') {
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
                ->leftjoin('nod_report as nod', 'nod.Id', '=', 'nra.IdNODReport')
                ->where('nod.Status', 8)
                ->where('nra.Type', 0)
                ->where('nra.Actived', 1)
                ->get(); 

            $getAllCAPicId = [];
            foreach($NODCA as $key => $val) {
                    $getAllCAPicId[] = $val->IdCAPIC;
            } 

            if(!empty($getAllCAPicId)) {
                $itemMail = $this->MainDB->table('employee as emp')
                                    ->select('emp.Name as Employee','emp.Email')
                                    ->whereIN('emp.Id', $getAllCAPicId)
                                    ->where('emp.Actived', 1)
                                    ->get();

                    $this->Helper->sendEmailCapa($getCapaItem, $NODCA, $NODPA = null ,$itemMail);
            }
        } elseif ($group === 'PA') {
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
            ->leftjoin('nod_report as nod', 'nod.Id', '=', 'nra.IdNODReport')
            ->where('nod.Status', 8)
            ->where('nra.Type', 1)
            ->where('nra.Actived', 1)
            ->get();

            $getAllPAPicId = [];
            foreach($NODPA as $key => $val) {
                    $getAllPAPicId[] = $val->IdPAPIC;
            } 

            if(!empty($getAllPAPicId)) {
                $itemMail = $this->MainDB->table('employee as emp')
                                    ->select('emp.Name as Employee','emp.Email')
                                    ->whereIN('emp.Id', $getAllPAPicId)
                                    ->where('emp.Actived', 1)
                                    ->get();

                    $this->Helper->sendEmailCapa($getCapaItem, $NODCA = null, $NODPA ,$itemMail);
            }
        }
        

       return true;
    }
}
