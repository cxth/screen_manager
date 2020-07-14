<?php

namespace App\Http\Controllers;

use App\Model\Media_Asset;
use Illuminate\Http\Request;
use App\Http\Resources\MediaAssetResource;
use Symfony\Component\HttpFoundation\Response;

class MediaAssetController extends Controller
{
    
    
    /**
     * Display all listing of the media group with links
     *
     * @return \Illuminate\Http\Response
     * @url /api/media/all
     */
    public function listAll()
    {
        $result = Media_Asset::all();
        //$result = Media_Asset::find(1)->link;
        //dd($result);
        return MediaAssetResource::collection($result);
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return MediaAssetResource::collection(Media_Asset::all());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        Media_Asset::create($request->all());
        return response('Saved', Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Model\Media_Asset  $media_Asset
     * @return \Illuminate\Http\Response
     */
    public function show(Media_Asset $medium)
    {
        //return $medium;
        return new MediaAssetResource($medium);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Model\Media_Asset  $media_Asset
     * @return \Illuminate\Http\Response
     */
    public function edit(Media_Asset $media_Asset)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Model\Media_Asset  $media_Asset
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Media_Asset $medium)
    {
        $medium->update($request->all());
        return response("updated", Response::HTTP_ACCEPTED);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Model\Media_Asset  $media_Asset
     * @return \Illuminate\Http\Response
     */
    public function destroy(Media_Asset $medium)
    {
        $medium->delete();
        return response(null, Response::HTTP_NO_CONTENT);
    }
}
