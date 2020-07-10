<?php

namespace App\Http\Controllers;

use App\Model\Screen;
use App\Model\Schedule;
use Illuminate\Http\Request;
use App\Http\Resources\ScheduleResource;
use App\Model\Group_Screen;
use App\Model\Link;
use App\Model\Outlet;
use Carbon\Carbon;

class ScheduleController extends Controller
{
    
    /**
     * Default controller for front-end display
     */
    public function default()
    {
        $schedule = Schedule::latest('show_datetime')->first();
        echo "<pre>";
        print_r($schedule->url);
        echo "</pre>";
        return view('page', compact('schedule'));
    }

    /**
     * Test controller
     */
    public function test()
    {
        //$schedule = Schedule::all();
        $screen = Screen::find('CFCEBSS01');
        $test = $screen->outlet;

        //$test = Screen::where('outlet_id')
        dd($test->name);
    }
    
    
    
    /**
     * Display a listing of the todays schedule for all outlets.
     *
     * @url /schedule
     * @return \Illuminate\Http\Response
     */
    public function index()
    {            
        return ScheduleResource::collection(Schedule::whereDate('show_datetime', Carbon::today())
            ->orderBy('screen_id', 'asc')->get());
    }


    /**
     * Display a listing of the todays schedule for selected outlets.
     *
     * @url api/schedule/outlet/1
     * @return \Illuminate\Http\Response
     */
    public function showOutlet(Outlet $outlet)
    {            
        foreach($outlet->screen as $k => $v) 
        {
            $screens[] = $v->id;
        }
        $result = Schedule::select('*')
            ->whereIn('screen_id', $screens)
            ->whereDate('show_datetime', Carbon::today())
            ->get();

        return ScheduleResource::collection($result);
    }


    /**
     * Display a listing of the todays schedule for selected outlets.
     *
     * @url api/schedule/screen/CFANGSS03
     * @return \Illuminate\Http\Response
     */
    public function showScreen(Screen $screen)
    {               
        return $result = [$screen];
        return ScheduleResource::collection($result);
    }



    /**
     * Display a listing of the todays schedule for selected outlets.
     *
     * @url api/schedule/screen/CFANGSS03
     * @return \Illuminate\Http\Response
     */
    public function showGroup(Group_Screen $group)
    {            
        dd($group);
        
        $result = [];
        return ScheduleResource::collection($result);
    }


    /**
     * Display a listing of the todays schedule for selected outlets.
     *
     * @url api/schedule/screen/CFANGSS03
     * @return \Illuminate\Http\Response
     */
    public function showLink(Link $link)
    {            
       
        return $result = [$link];
        return ScheduleResource::collection($result);
    }


    /**
     * Update schedule on selected screen.
     *
     * @url api/schedule/screen/1
     * @return \Illuminate\Http\Response
     */
    public function onScreen(Request $request)
    {            
       
        return $result = [$request->all()];
        return ScheduleResource::collection($result);
    }


    /**
     * Update schedule on selected group.
     *
     * @url api/schedule/group/1
     * @return \Illuminate\Http\Response
     */
    public function onGroup(Request $request, Group_Screen $group)
    {            
       
        return $result = [$request->all()];
        return ScheduleResource::collection($result);
    }

   

    /**
     * Get latest URL from AJAX request.
     *
     * @return \Illuminate\Http\Response
     */
    public function getUrl()
    {
        $schedule = Schedule::latest('show_datetime')->first();
        return $schedule->url;
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Model\Schedule  $schedule
     * @return \Illuminate\Http\Response
     */
    public function show(Schedule $schedule)
    {
       
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Model\Schedule  $schedule
     * @return \Illuminate\Http\Response
     */
    public function edit(Schedule $schedule)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Model\Schedule  $schedule
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Schedule $schedule)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Model\Schedule  $schedule
     * @return \Illuminate\Http\Response
     */
    public function destroy(Schedule $schedule)
    {
        //
    }
}
