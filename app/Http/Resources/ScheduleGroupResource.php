<?php

namespace App\Http\Resources;

use App\Model\Schedule;
use Illuminate\Http\Resources\Json\JsonResource;

class ScheduleGroupResource extends JsonResource
{
    
    function __construct(Schedule $model)
    {
        parent::__construct($model);
    }
    
    
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'screen_id' => $this->screen_id,
            'group_screen_id' => $this->group__screen_id,
            'link_id' => $this->link_id,
            'url' => $this->url,
            'show_datetime' => $this->show_datetime,
            'expire_datetime' => $this->expire_datetime
        ];
    }
}
