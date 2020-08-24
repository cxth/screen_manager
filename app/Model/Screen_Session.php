<?php

namespace App\Model;

use App\Model\Screen;
use Illuminate\Database\Eloquent\Model;

class Screen_Session extends Model
{
  protected $fillable = [
      'id','screen_id','request_log'   
  ];

  protected $primaryKey = 'id';

  public function screen()
  {
    return $this->belongsTo(Screen::class);
  }
}
