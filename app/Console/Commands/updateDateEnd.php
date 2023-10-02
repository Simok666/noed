<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Http\Controllers\BackEnd\CaretakerControll;
use DB;

class updateDateEnd extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'update:dateendcaretaker';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Update data Caretaker set non active';

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
            $dateEnd[$key] = $value->DateEnd; 
        }
        
        if(in_array($today, $dateEnd))
        {
            $status = 0;
            \Log::info('if Date End today set status still Actived');
        }
        else {
            \Log::info('set status Not Actived');
        }
        
        $result = array_map('strval', array_values(array_filter($dateEnd, function ($value) use ($today) {
            \Log::info($value);
            return $value === $today;
        })));
        
        \Log::info($status);
        DB::table('caretaker')
            ->whereIn('DateEnd', $result)
            ->update([
                'Status'=>$status,
            ]);

    }
}
