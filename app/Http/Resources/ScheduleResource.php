<?php

namespace App\Http\Resources;


use App\Model\Link;
use App\Model\Screen;
use Illuminate\Http\Resources\Json\JsonResource;

class ScheduleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $screen = Screen::find($this->screen_id);
        $outlet = $screen->outlet; 
        
        
        return [
            $outlet->name => [
                'schedule_id' => $this->id,
                'screen_id' => $this->screen_id,
                'outlet_id' => $outlet->id,
                'outlet' => $outlet->name,
                'group_screen_id' => $this->group__screen_id,
                'link_id' => $this->link_id,
                'link_name' => Link::find($this->link_id)->name,
                'url' => $this->url,
                'show_datetime' => $this->show_datetime,
                'expire_datetime' => $this->expire_datetime
            ] 
        ];
    }

    // public function with($request)
    // {
    //     $screen = Screen::find($this->screen_id);
    //     $outlet = $screen->outlet; 
        
        
    //     return [
    //         $outlet->name => [
    //             'id' => $this->id,
    //             'screen_id' => $this->screen_id,
    //             'outlet_id' => $outlet->id,
    //             'outlet' => $outlet->name,
    //             'group_screen_id' => $this->group_screen_id,
    //             'link_id' => $this->link_id,
    //             'url' => $this->url,
    //             'show_datetime' => $this->show_datetime,
    //             'expire_datetime' => $this->expire_datetime
    //         ] 
    //     ];
    // }
}
