<?php

namespace App\Http\Controllers;

use App\Model\Outlet;
use App\Model\Screen;
use Illuminate\Http\Request;
use App\Http\Resources\ScreenResource;
use Symfony\Component\HttpFoundation\Response;

class ScreenController extends Controller
{
    /**
     * Display a listing of the screen.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Outlet $outlet)
    {
        //return $outlet->screen;
        return ScreenResource::collection($outlet->screen);
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
        Screen::create($request->all());
        return response('Saved', Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Model\Screen  $screen
     * @return \Illuminate\Http\Response
     */
    public function show(Outlet $outlet, Screen $screen)
    {
        return new ScreenResource($screen);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Model\Screen  $screen
     * @return \Illuminate\Http\Response
     */
    public function edit(Screen $screen)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Model\Screen  $screen
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Outlet $outlet, Screen $screen)
    {
        $screen->update($request->all());
        return response("updated", Response::HTTP_ACCEPTED);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Model\Screen  $screen
     * @return \Illuminate\Http\Response
     */
    public function destroy(Outlet $outlet, Screen $screen)
    {
        $screen->delete();
        return response(null, Response::HTTP_NO_CONTENT);
    }
}
