<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Model\Link;
use App\Model\Outlet;
use App\Model\Screen;
use App\Model\Schedule;
use App\Model\Group_Screen;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\ScheduleResource;
use App\Http\Resources\ScheduleGroupResource;
use Symfony\Component\HttpFoundation\Response;

class ScheduleController extends Controller
{
    
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        // disabled due to Admin API not accessible
        //$this->middleware('auth');
    }
    
    
    /**
     * Default controller for front-end display
     * @TODO for deletion
     */
    public function default()
    {
        if (!Auth::user())
        {
            return redirect('/login');
        }
        if (Auth::user()->username == "admin")
        {
            return redirect('/admin');
        }
        echo "<pre></pre>";
        //setcookie('cross-site-cookie', 'name', ['samesite' => 'None', 'secure' => true]);
        return view('page');
    }

    /**
     * Get latest URL from AJAX request in client Front-end.
     *
     * @return \Illuminate\Http\Response
     * @TODO for deletion
     */
    public function getUrl()
    {
        if (!Auth::user())
        {
            return redirect('/login');
        }
        $screen = Screen::find(Auth::user()->username);

        //$screen = Screen::find('CFANGSS03');
        if (!$screen)
        {
            return ["invalid-user"];
        }

        $schedule = $this->nowShowing($screen);
        //var_dump($schedule->isEmpty());
        if ($schedule->isEmpty()) {
            // @TODO: default image or URL here
        }
        
        return $schedule;
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
     * Display now showing for front-end per screen
     */
    public function nowShowing(Screen $screen)
    {
        $arr = [$screen->id];
        $result = DB::table('schedules')
            ->whereRaw('screen_id = ?
                        AND show_datetime < NOW() 
                        AND (expire_datetime > NOW() 
                        OR expire_datetime is NULL) 
                        ORDER BY show_datetime DESC', $arr)
                        ->get();
        return $result;
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
            ->orderBy('show_datetime', 'desc')
            ->get();

        return ScheduleResource::collection($result);
    }


    /**
     * Display a listing of todays schedule by ADMIN API.
     *
     * @url api/schedule/ss/CFANGSS03
     * @return \Illuminate\Http\Response
     */
    public function showScreen(Screen $screen)
    {               
        
        $result = $screen->schedule()
            ->whereDate('show_datetime', Carbon::today())
            ->orderBy('show_datetime', 'desc')
            ->get();
        return ScheduleResource::collection($result);
    }



    /**
     * Display a listing of todays schedule for selected group.
     *
     * @url api/schedule/group/{group}
     * @return \Illuminate\Http\Response
     */
    public function showGroup(Group_Screen $group)
    {            
        $result = $group->schedule()
            ->whereDate('show_datetime', Carbon::today())
            ->get();
        return ScheduleResource::collection($result);
    }


    /**
     * Display a listing of the todays schedule for selected link.
     *
     * @url api/schedule/link/{link}
     * @return \Illuminate\Http\Response
     */
    public function showLink(Link $link)
    {            
        $result = $link->schedule()
            ->whereDate('show_datetime', Carbon::today())
            ->get();
        return ScheduleResource::collection($result);
    }


    /**
     * Update schedule on selected screen [NO GROUP].
     *
     * @url POST api/schedule/screen/1
     * @return \Illuminate\Http\Response
     */
    public function onScreen(Request $request, Screen $screen)
    {            
        // if link_id is NULL insert into `links` table
        if (!$request->link_id)
        {
            $link = Link::create(
                [
                    'media__asset_id' => 100,
                    'name' => 'custom URL',
                    'url' => $request->url
                ]
            );
            $request->merge(['link_id' => $link->id]);
        }

        Schedule::create($request->all());
        return response('Saved', Response::HTTP_CREATED);
    }


    /**
     * Update schedule on selected group.
     *
     * @url api/schedule/group/1
     * @return \Illuminate\Http\Response
     */
    public function onGroup(Request $request, Group_Screen $group)
    {            
        
        
        $request['group__screen_id'] = intval($request->group__screen_id);
        $request['link_id'] = intval($request->link_id);
        if (!$request->link_id)
        {
            $link = Link::create(
                [
                    'media__asset_id' => 100,
                    'name' => 'custom URL',
                    'url' => $request->url
                ]
            );
            $request->merge(['link_id' => $link->id]);
        }

        Schedule::create($request->all());
        return response('Saved', Response::HTTP_CREATED);
        
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
     * @url /schedule/{schedule}
     */
    public function destroy(Schedule $schedule)
    {
        $schedule->delete();
        return response(null, Response::HTTP_NO_CONTENT);
    }


     /**
     * Admin Page.
     *
     * @return \Illuminate\Http\Response
     * @url /admin
     */
    public function admin()
    {
        if (!Auth::user())
        {
            return redirect('/login');
        }
        if (Auth::user()->username != "admin")
        {
            return redirect('/');
        }
        setcookie('cross-site-cookie', 'name', ['samesite' => 'None', 'secure' => true]);
        return view('admin');
    }
}
