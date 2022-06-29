<?php

namespace App\Http\Controllers;

use App\Model\Screen;
use App\Model\Group_Screen;
use Illuminate\Http\Request;
use App\Http\Resources\GroupScreenResource;
use phpDocumentor\Reflection\Types\Null_;
use Symfony\Component\HttpFoundation\Response;

class GroupScreenController extends Controller
{
    
    /**
     * Display a listing of all groups with screens.
     *
     * @return \Illuminate\Http\Response
     */
    public function showAll()
    {
        return GroupScreenResource::collection(Group_Screen::all());
    }


    /**
     * Update the specified screens to new group.
     *
     * @return \Illuminate\Http\Response
     */
    public function updateScreens(Request $request)
    {        
        Screen::where('id', $request->screen_id)
                ->update(['group__screen_id' => $request->group_screen_id]);
        return response('Saved', Response::HTTP_CREATED);
    }

    /**
     * Update the specified screens to NULL group.
     *
     * @return \Illuminate\Http\Response
     */
    public function destroyScreens(Request $request)
    {        
        Screen::where('id', $request->screen_id)
                ->update(['group__screen_id' => NULL]);
        return response('Saved', Response::HTTP_CREATED);
    }


    /**
     * Display a listing of the group with screens.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Group_Screen $group)
    {
        return new GroupScreenResource($group);
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
     * Store a newly created group.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        Group_Screen::create($request->all());
        return response('Saved', Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Model\Group_Screen  $group_Screen
     * @return \Illuminate\Http\Response
     */
    public function show(Group_Screen $group)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Model\Group_Screen  $group_Screen
     * @return \Illuminate\Http\Response
     */
    public function edit(Group_Screen $group_Screen)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Model\Group_Screen  $group_Screen
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Group_Screen $group)
    {
        $group->update($request->all());
        return response("updated", Response::HTTP_ACCEPTED);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Model\Group_Screen  $group_Screen
     * @return \Illuminate\Http\Response
     */
    public function destroy(Group_Screen $group)
    {
        $group->delete();
        return response(null, Response::HTTP_NO_CONTENT);
    }
}
