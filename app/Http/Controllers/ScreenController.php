<?php

namespace App\Http\Controllers;

use App\User;
use Carbon\Carbon;
use App\Model\Outlet;
use App\Model\Screen;
use App\Model\Screen_Session;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Http\Resources\ScreenResource;
use App\Http\Resources\ScreenSessionResource;
use App\Model\Schedule;
use App\Model\Session_Log;
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
     * Get screen details
     *
     * @return \Illuminate\Http\Response
     * @url /api/screen/all
     */
    public function getData(Screen $screen)
    {
        return $screen;
      
        // $result = Screen::find($screen);
        // return ScreenResource::collection($result);
    }

    public function getActive()
    {
        $minutes = env('SCREEN_ACTIVE_TIMEOUT', 15); 
        $result = Screen_Session::where('request_log', '>=', Carbon::now()->subMinutes($minutes)->toDateTimeString())->get();   
        return ScreenSessionResource::collection($result);
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
        // get latest screen count
        $screen = DB::table('screens')
                     ->select(DB::raw('count(*) as count'))
                     ->where('outlet_id', '=', $request->outlet_id)
                     ->first();
  
        $screen_counter = $screen->count + 1;
        $oint_id = $request->outlet_intid;
        $id = $oint_id.'SS'.$screen_counter;
        $count = Screen::where('id', $id)->count();

        do {
          $screen_counter++;
          $id = $oint_id.'SS'.$screen_counter;
          $count = Screen::where('id', $id)->count();
        } while ($count > 0);

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
     * Show the form for editing the specified resource.
     *
     * @param  \App\Model\Screen  $screen
     * @return \Illuminate\Http\Response
     */
    public function updateData(Request $request)
    {
        if ($request) {
          $screen = Screen::find($request->id);
          if (isset($request->description)) $screen->description = $request->description;
          if (isset($request->resolution)) $screen->resolution = $request->resolution;
          if (isset($request->equipment_model_installed)) $screen->equipment_model_installed = $request->equipment_model_installed;
          if (isset($request->teamviewer_details)) $screen->teamviewer_details = $request->teamviewer_details;
          if (isset($request->activation_date)) $screen->activation_date = $request->activation_date;
          $screen->save();
          return $screen;
        }
        return "no-request";
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
    public function destroy(Screen $screen)
    {
        // delete users
        $user = User::where('username', '=', $screen->id)->firstOrFail();
        if ($user == null)
        {
          return;
        }
        
        // delete user
        //User::find($user->id)->delete();
        User::find($user->id)->forceDelete();
        // delete schedule
        Schedule::where('screen_id', '=', $screen->id)->delete();
        // delete screen
        //$screen->delete();
        $screen->forceDelete();
        //delete on session
        Screen_Session::where('screen_id', '=', $screen->id)->delete();
        Session_Log::where('screen_id', '=', $screen->id)->delete();

        session(['uscreen' => null]);
        return response(null, Response::HTTP_NO_CONTENT);
    }
}
