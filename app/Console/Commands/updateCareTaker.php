<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Http\Controllers\BackEnd\CaretakerControll;
use DB;

class updateCareTaker extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'update:datestartcaretaker';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update data Caretaker set active';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        \Log::info('Date Start update status actived');

        $today = date('Y-m-d');
        $status = 0;
        $controller = new CaretakerControll();
        $getData = $controller->updateByCron();
        $eachData = $getData->toArray();

        $dateStart = [];
        $statusCaretaker = [];
        foreach ($eachData as $key => $value) 
        {
            $statusCaretaker[$key] = $value->Status;
            $dateStart[$key] = $value->DateStart; 
        }
        
        if(in_array($today, $dateStart))
        {
            $status = 1;
        }
        
        $result = array_map('strval', array_values(array_filter($dateStart, function ($value) use ($today) {
            return $value === $today;
        })));

        DB::table('caretaker')
            ->whereIn('DateStart', $result)
            ->update([
                'Status'=>$status,
            ]);
        \Log::info('Date Start update status actived');
        
    }
}
