<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ChatStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('chat_status')->insert([
            [
                "status"            => "Open",
                "descriptions"      => "Request Chat",
                "created_at"        => Carbon::now()->format('Y-m-d H:i:s'),
                "updated_at"         => Carbon::now()->format('Y-m-d H:i:s'),
            ],
            [
                "status"            => "Done",
                "descriptions"      => "Chat Forum Selesai",
                "created_at"        => Carbon::now()->format('Y-m-d H:i:s'),
                "updated_at"         => Carbon::now()->format('Y-m-d H:i:s'),
            ],
            [
                "status"            => "InProgress",
                "descriptions"      => "Chat Forum Sedang Berjalan",
                "created_at"        => Carbon::now()->format('Y-m-d H:i:s'),
                "updated_at"         => Carbon::now()->format('Y-m-d H:i:s'),
                
            ],
            [
                "status"            => "Expired",
                "descriptions"      => "Chat Forum Melebihi Batas Waktu",
                "created_at"        => Carbon::now()->format('Y-m-d H:i:s'),
                "updated_at"         => Carbon::now()->format('Y-m-d H:i:s'),
            ],
            [
                "status"            => "Cancel",
                "descriptions"      => "Chat ditunda",
                "created_at"        => Carbon::now()->format('Y-m-d H:i:s'),
                "updated_at"         => Carbon::now()->format('Y-m-d H:i:s'),
            ]
        ]);
    }
}
