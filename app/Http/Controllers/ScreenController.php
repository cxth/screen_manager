<?php

namespace App\Http\Controllers;

use App\User;
use App\Model\Outlet;
use App\Model\Screen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Http\Resources\ScreenResource;
use Carbon\Carbon;
use Symfony\Component\HttpFoundation\Response;

class ScreenController extends Controller
{
    
    /**
     * Display all listing of the screens
     *
     * @return \Illuminate\Http\Response
     * @url /api/screen/all
     */
    public function listAll()
    {
        $result = Screen::all();
        return ScreenResource::collection($result);
    }
    
    
    /**
     * Display a listing of the screens
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
        //return $request;
        // get latest screen count
        $screen = DB::table('screens')
                     ->select(DB::raw('count(*) as count'))
                     ->where('outlet_id', '=', $request->outlet_id)
                     ->first();
      
        $screen_counter = $screen->count + 1;
        $oint_id = $request->outlet_intid;
        $id = $oint_id.'SS'.$screen_counter;
        $data = [
          'id' => $id,
          'outlet_id' => $request->outlet_id,
          'description' => $request->screen_description,
          'activation_date' => Carbon::today()
        ];
        //return $data;
        $row = Screen::create($data);

        //create login account
        $user = User::updateOrCreate(
            ['username' => $row->id],
            [
              'username' => $row->id,  
              'name' => $row->description,
              'email' => $row->id.'@gmail.com',
              'password' => Hash::make('password??'),
            ]
        );

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
