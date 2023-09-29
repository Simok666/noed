<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AnotherEffectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('another_effect')->insert([
            [
                "id_effect"             => 1,
                "title_effect"          => "Pelulusan produk jadi (jelaskan)",
                "created_at"            => Carbon::now()->format('Y-m-d H:i:s'),
                "updated_at"            => Carbon::now()->format('Y-m-d H:i:s'),
            ],
            [
                "id_effect"             => 2,
                "title_effect"          => "Penolakan produk jadi (jelaskan)",
                "created_at"            => Carbon::now()->format('Y-m-d H:i:s'),
                "updated_at"            => Carbon::now()->format('Y-m-d H:i:s'),
            ],
            [
                "id_effect"             => 3,
                "title_effect"          => "Dokumentasi (jelaskan)",
                "created_at"            => Carbon::now()->format('Y-m-d H:i:s'),
                "updated_at"            => Carbon::now()->format('Y-m-d H:i:s'),
            ],
            [
                "id_effect"             => 4,
                "title_effect"          => "Regulatory (jelaskan)",
                "created_at"            => Carbon::now()->format('Y-m-d H:i:s'),
                "updated_at"            => Carbon::now()->format('Y-m-d H:i:s'),
            ],
            [
                "id_effect"             => 5,
                "title_effect"          => "Pengendalian perubahan (jelaskan)",
                "created_at"            => Carbon::now()->format('Y-m-d H:i:s'),
                "updated_at"            => Carbon::now()->format('Y-m-d H:i:s'),
            ],
            [
                "id_effect"             => 6,
                "title_effect"          => "Kualifikasi dan Validasi (jelaskan)",
                "created_at"            => Carbon::now()->format('Y-m-d H:i:s'),
                "updated_at"            => Carbon::now()->format('Y-m-d H:i:s'),
            ],
            [
                "id_effect"             => 7,
                "title_effect"          => "Audit (jelaskan)",
                "created_at"            => Carbon::now()->format('Y-m-d H:i:s'),
                "updated_at"            => Carbon::now()->format('Y-m-d H:i:s'),
            ],
            [
                "id_effect"             => 8,
                "title_effect"          => "Keluhan produk (jelaskan)",
                "created_at"            => Carbon::now()->format('Y-m-d H:i:s'),
                "updated_at"            => Carbon::now()->format('Y-m-d H:i:s'),
            ],
            [
                "id_effect"             => 9,
                "title_effect"          => "Penarikan kembali produk (jelaskan)",
                "created_at"            => Carbon::now()->format('Y-m-d H:i:s'),
                "updated_at"            => Carbon::now()->format('Y-m-d H:i:s'),
            ],
            [
                "id_effect"             => 10,
                "title_effect"          => "Lain-lain (jelaskan)",
                "created_at"            => Carbon::now()->format('Y-m-d H:i:s'),
                "updated_at"            => Carbon::now()->format('Y-m-d H:i:s'),
            ]
        ]);
    }
}
