<?php

namespace App\Http\Controllers;

use App\Model\Link;
use App\Model\Media_Asset;
use Illuminate\Http\Request;
use App\Http\Resources\LinkResource;
use Symfony\Component\HttpFoundation\Response;

class LinkController extends Controller
{
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function showAll()
    {
        return LinkResource::collection(Link::all());
    }
    
    
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Media_Asset $medium)
    {
        return LinkResource::collection($medium->link);
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
        Link::create($request->all());
        return response('Saved', Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Model\Link  $link
     * @return \Illuminate\Http\Response
     */
    public function show(Link $link)
    {
        return new LinkResource($link);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Model\Link  $link
     * @return \Illuminate\Http\Response
     */
    public function edit(Link $link)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Model\Link  $link
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Link $link)
    {
        $link->update($request->all());
        return response("updated", Response::HTTP_ACCEPTED);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Model\Link  $link
     * @return \Illuminate\Http\Response
     */
    public function destroy(Link $link)
    {
        $link->delete();
        return response(null, Response::HTTP_NO_CONTENT);
    }
}
