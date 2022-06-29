<?php

namespace App\Http\Resources;

use App\Http\Resources\LinkResource;
use App\Model\Media_Asset;
use Illuminate\Http\Resources\Json\JsonResource;

class MediaAssetResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $media = Media_Asset::find($this->id);
        
        return [
            'id' => $this->id,
            'name' => $this->name,
            'icon' => $this->icon,
            'description' => $this->description,
            'links' => LinkResource::collection($media->link)
        ];
    }
}
