<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ScreenResource extends JsonResource
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
            'outlet_id' => $this->outlet_id,
            'group_screens_id' => $this->group__screen_id,
            'description' => $this->description,
            'brand' => $this->brand,
            'resolution' => $this->resolution,
            'activation' => $this->activation_date,
            'equipment_model_installed' => $this->equipment_model_installed,
            'teamviewer_details' => $this->teamviewer_details
        ];
    }
}
