<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLinksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('links', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('media__asset_id');
            $table->string('name', 200);
            $table->string('url', 2083)->nullable();
            $table->text('description')->nullable();
            $table->timestamps();

            // Foreign KEY!!!
            $table->foreign('media__asset_id')->references('id')->on('media__assets');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('links');
    }
}
