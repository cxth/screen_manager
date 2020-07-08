<?php

namespace App\Model;

use App\Model\Link;
use Illuminate\Database\Eloquent\Model;

class Media_Asset extends Model
{
    protected $fillable = [
        'id','name','icon','created_at','updated_at'   
    ];

    public function link()
    {
        return $this->belongsTo(Link::class);
    }

    public function schedule()
    {
        return $this->belongsToMany(Schedule::class);
    }


}
