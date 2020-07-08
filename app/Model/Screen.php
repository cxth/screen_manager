<?php

namespace App\Model;

use App\Model\Outlet;
use Illuminate\Database\Eloquent\Model;

class Screen extends Model
{
    protected $fillable = [
        'outlet_id','description','brand','resolution','activation_date',
        'equipment_model_installed', 'teamviewer_details','created_at','updated_at'   
    ];

    public function outlet()
    {
        return $this->hasOne(Outlet::class);
    }

    public function schedule()
    {
        return $this->belongsToMany(Schedule::class);
    }
}
