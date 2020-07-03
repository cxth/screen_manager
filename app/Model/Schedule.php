<?php

namespace App\Model;

use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    protected $fillable = ['screen_id','url','show_datetime','expire_datetime'];
}
