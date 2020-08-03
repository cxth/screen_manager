<?php

namespace App\Model;

use App\Model\Media_Asset;
use App\Model\Schedule;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Link extends Model
{
    use SoftDeletes;
    
    protected $fillable = [
        'id','media__asset_id','name','url','description'   
    ];

    public function media_asset()
    {
        //return $this->hasMany(Media_Asset::class);
        return $this->belongsTo(Media_Asset::class); // for front-end get schedule
    }

    public function schedule()
    {
        //return $this->belongsToMany(Schedule::class);
        return $this->hasMany(Schedule::class); // okay on schedule per link
    }

    
}
