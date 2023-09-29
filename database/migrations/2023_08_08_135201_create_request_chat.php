<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRequestChat extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('request_chat', function (Blueprint $table) {
            $table->id();
            $table->string('nod_number');
            $table->text('deviation');
            $table->integer('id_status');
            $table->integer('id_position');
            $table->text('id_team');
            $table->text('question');
            $table->dateTime('date_request');
            $table->dateTime('start_time');
            $table->dateTime('end_time');
            $table->integer('Actived');
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
        Schema::dropIfExists('request_chat');
    }
}
