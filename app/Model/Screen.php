<?php

namespace App\Model;

use App\Model\Outlet;
use App\Model\Schedule;
use Illuminate\Database\Eloquent\Model;

class Screen extends Model
{
    protected $fillable = [
        'id','outlet_id','group__screen_id','description','brand','resolution','activation_date',
        'equipment_model_installed', 'teamviewer_details','created_at','updated_at'   
    ];

    protected $primaryKey = 'id'; // or null
    public $incrementing = false;
    protected $casts = [
      'id' => 'string'
    ];
    protected $keyType = 'string';

    public function outlet()
    {
        //return $this->hasOne(Outlet::class);
        return $this->belongsTo(Outlet::class);
    }

    public function schedule()
    {
        //return $this->belongsToMany(Schedule::class);
        return $this->hasMany(Schedule::class); // Success on schedule per screen
    }
}
