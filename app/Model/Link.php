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
        return $this->belongsTo(Media_Asset::class);
    }

    public function schedule()
    {
        return $this->hasMany(Schedule::class);
    }
    
}
