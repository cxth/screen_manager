<?php

namespace App\Model;

use App\Model\Media_Asset;
use App\Model\Schedule;
use Illuminate\Database\Eloquent\Model;


class Link extends Model
{
    protected $fillable = [
        'id','media__asset_id','name','url','description'   
    ];

    public function media_asset()
    {
        return $this->hasMany(Media_Asset::class);
    }

    public function schedule()
    {
        return $this->belongsToMany(Schedule::class);
    }

    
}
