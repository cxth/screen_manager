<?php

namespace App\Model;

use App\Model\Screen;
use Illuminate\Database\Eloquent\Model;

class Group_Screen extends Model
{
    protected $fillable = [
        'id','name','icon','screen_id','created_at','updated_at'
    ];

    public function screen()
    {
        return $this->hasMany(Screen::class);
    }

    public function schedule()
    {
        return $this->hasMany(Schedule::class);
    }
}