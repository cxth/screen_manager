<?php

namespace App\Http\Controllers;

use App\User;
use Carbon\Carbon;
use App\Model\Outlet;
use App\Model\Screen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use App\Http\Resources\OutletResource;
use Symfony\Component\HttpFoundation\Response;

class OutletController extends Controller
{
    
    /**
     * Count screens on the selected outlet
     *
     * @return Integer
     */
    public function countScreens($outlet_id)
    {
        //return $outlet_id;
        //$count = App\Flight::where('active', 1)->count();
        return Screen::where('outlet_id', $outlet_id)->count();
    }


    /**
     * Get screen_ID on the selected outlet
     *
     * @return Integer
     */
    public function getScreens($outlet_id)
    {
        //return $outlet_id;
        //$count = App\Flight::where('active', 1)->count();
        return Screen::where('outlet_id', $outlet_id)->get('id');
    }

  
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
     * Reactivate outlet
     */
    public function reactivate($outlet_id)
    {
        //user
        //screen
        // get all screens --NO--
        // $screen = Screen::withTrashed()
        //     ->where('outlet_id', $outlet_id)
        //     ->get('id');

        // return $screen;

        //outlet
        Outlet::withTrashed()
          ->where('id', $outlet_id)
          ->restore();
    }

    /**
     * Check outlet ID status
     */
    public function check($outlet_intid)
    {
        //return $outlet_intid;
        $outlet =  Outlet::withTrashed()
          ->where('int_id', $outlet_intid)
          ->get();

        //return $outlet[0]->deleted_at;
        // return empty($deleted);
        if (!$outlet->isEmpty())
        {
          // check if deactivated
          if ($outlet[0]->deleted_at != null)
          {
            $this->reactivate($outlet[0]->id);
            return 'outlet-reactivated';
          }
          else
          {
            return 'outlet-exist';
          }
        }
        return 'no-record';
 
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
        
        $outlet_intid = strtoupper($request->outlet_id);

        // check if deactivated
        if ($this->check($outlet_intid) == 'outlet-exist')
        {
          return 'outlet-exist';
        }

        // create Outlet
        $outlet = Outlet::firstOrCreate(
          ['int_id' => $outlet_intid],
          [
            'int_id' => $outlet_intid,
            'name' => $request->outlet_name
          ]
        );

        $request->merge([
          'outlet_id' => $outlet->id,
          'outlet_intid' => $outlet_intid,
          'screen_description' => $request->outlet_name . " SS1"
          ]);

        // create Screen
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
        $row = Screen::create($data);

        //create User account
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
