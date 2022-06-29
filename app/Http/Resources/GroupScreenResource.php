<?php

namespace App\Http\Resources;

use App\Model\Screen;
use Illuminate\Http\Resources\Json\JsonResource;

class GroupScreenResource extends JsonResource
{
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
            'name' => $this->name,
            'icon' => $this->icon,
            'screens' => Screen::where('group__screen_id', $this->id)->get()
        ];
    }
}
