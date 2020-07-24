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
        
        $outlet_intid = strtoupper($request->outlet_id);

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
