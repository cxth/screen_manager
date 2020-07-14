<?php

namespace App\Http\Controllers;

use App\Model\Outlet;
use Illuminate\Http\Request;
use App\Http\Resources\OutletResource;
use App\Model\Screen;
use Symfony\Component\HttpFoundation\Response;

class OutletController extends Controller
{
    /**
     * Display a listing of the outlets.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return OutletResource::collection(Outlet::all());
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
        Outlet::create($request->all());
        return response('Saved', Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Model\Outlet  $outlet
     * @return \Illuminate\Http\Response
     */
    public function show(Outlet $outlet)
    {
        return new OutletResource($outlet);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Model\Outlet  $outlet
     * @return \Illuminate\Http\Response
     */
    public function edit(Outlet $outlet)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Model\Outlet  $outlet
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Outlet $outlet)
    {
        $outlet->update($request->all());
        return response("updated", Response::HTTP_ACCEPTED);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Model\Outlet  $outlet
     * @return \Illuminate\Http\Response
     */
    public function destroy(Outlet $outlet)
    {
        $outlet->delete();
        return response(null, Response::HTTP_NO_CONTENT);
    }
}
