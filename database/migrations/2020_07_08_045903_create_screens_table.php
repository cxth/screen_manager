<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateScreensTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('screens', function (Blueprint $table) {
            $table->string('id')->unique();
            //$table->primary('id'); 
            $table->unsignedBigInteger('outlet_id'); // FK
            $table->integer('group__screen_id')->nullable(); 
            $table->text('description')->nullable();
            $table->string('brand', 50)->nullable();
            $table->string('resolution', 50)->nullable();
            $table->dateTime('activation_date');
            $table->string('equipment_model_installed', 50)->nullable();
            $table->string('teamviewer_details', 50)->nullable();
            $table->softDeletes();
            $table->timestamps();

            // Foreign KEY
            $table->foreign('outlet_id')->references('id')->on('outlets')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    /*
     public function down()
    {
        Schema::dropIfExists('screens');
    }
    */
    public function down()
    {
        Schema::table('screens', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
}
