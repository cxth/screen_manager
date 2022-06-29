<?php

namespace App\Http\Resources;

use App\Model\Outlet;
use App\Model\Screen;
use Illuminate\Http\Resources\Json\JsonResource;

class ScreenSessionResource extends JsonResource
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
        $outlet = Outlet::find($screen->outlet_id);
        
        return [
          'id' => $screen->id,
          'description' => $screen->description,
          'outlet_id' => $screen->outlet_id,
          'outlet_name' => $outlet->name
        ];
    }
}
