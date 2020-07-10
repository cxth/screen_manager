<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class LinkResource extends JsonResource
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
            'media_asset_id' => $this->media__asset_id,
            'name' => $this->name,
            'url' => $this->url,
            'description' => $this->description
        ];
    }
}
