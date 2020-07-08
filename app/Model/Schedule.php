<?php

namespace App\Model;

use App\Model\Link;
use App\Model\Screen;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    protected $fillable = [
        'screen_id','group_screen_id','link_id','url','show_datetime','expire_datetime','created_at','updated_at'];

    public function screen()
    {
        return $this->hasMany(Screen::class);
    }

    public function outlet()
    {
        return $this->hasManyThrough('App\Model\Outlet','App\Model\Screen');
    }

    public function link()
    {
        return $this->hasMany(Link::class);
    }
    
    public function group_screen()
    {
        return $this->hasMany(Group_Screen::class);
    }
    
}
