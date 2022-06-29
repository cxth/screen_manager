<?php

namespace App\Http\Resources;


use App\Model\Link;
use App\Model\Media_Asset;
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
        $link = Link::find($this->link_id);
        $media_asset = Media_Asset::find($link->media__asset_id);
        
        return [
            $outlet->name => [
                'schedule_id' => $this->id,
                'screen_id' => $this->screen_id,
                'outlet_id' => $outlet->id,
                'outlet' => $outlet->name,
                'group_screen_id' => $this->group__screen_id,
                'link_id' => $this->link_id,
                'media_asset_name' => $media_asset->name,
                'link_name' => $link->name,
                'url' => $this->url,
                'show_datetime' => $this->show_datetime,
                'expire_datetime' => $this->expire_datetime
            ] 
        ];
    }
}
