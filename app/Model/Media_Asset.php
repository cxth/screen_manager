<?php

namespace App\Model;

use App\Model\Link;
use Illuminate\Database\Eloquent\Model;

class Media_Asset extends Model
{
    protected $fillable = [
        'id','name','icon','description','created_at','updated_at'   
    ];

    public function link()
    {
        return $this->hasMany(Link::class);
    }

    public function schedule()
    {
        return $this->belongsToMany(Schedule::class);
    }


}
