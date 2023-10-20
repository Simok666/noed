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
            $table->text('attachment_capa');
            $table->enum('status_capa', ['Dibuat oleh QA Section Head','Disetujui oleh QA Section Head', 'Diverifikasi oleh QA Dept Head', 'ditolak']);
            $table->integer('user_entry');
            $table->text('verifikasi_efektifitas_capa')->nullable();
            $table->text('reject_description')->nullable();
            $table->text('name_verfication')->nullable();
            $table->timestamp('time_finished_verfication')->nullable();
            $table->integer('is_approved');
            $table->integer('is_publish')->default(0);
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
