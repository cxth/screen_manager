<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSessionLogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('session__logs', function (Blueprint $table) {
            $table->id();
            $table->string('screen_id')->unique();
            $table->unsignedBigInteger('outlet_id')->index();
            $table->integer('link_id')->unsigned()->index();
            $table->unsignedBigInteger('media__asset_id')->index();
            $table->string('outlet_int_id', 100);
            $table->string('outlet_name', 100);
            $table->string('media__asset_name', 100);
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
        Schema::dropIfExists('session__logs');
    }
}
