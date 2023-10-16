<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateVerifikasiCapaNodTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('verifikasi_capa_nod', function (Blueprint $table) {
            $table->id();
            $table->integer('id_approved_nod');
            $table->integer('attachment_capa');
            $table->enum('status_capa', ['Disetujui oleh QA Section Head', 'Diverifikasi oleh QA Dept Head']);
            $table->integer('actived');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('verifikasi_capa_nod');
    }
}
