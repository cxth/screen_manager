<?php

namespace App\Model;

use App\Model\Screen;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Outlet extends Model
{
    use SoftDeletes;
  
    protected $fillable = [
        'id','int_id','name','group','type','address','city','contact_no','operator',
        'created_at','updated_at'
    ];

    public function screen()
    {
        return $this->hasMany(Screen::class);
        
    }

    public function schedule()
    {
        return $this->belongsToMany('App\Model\Schedule')->using('App\Model\Screen');
    }
}
