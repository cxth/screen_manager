<?php

namespace App\Http\Controllers;

use App\User;
use Carbon\Carbon;
use App\Model\Link;
use App\Model\Outlet;
use App\Model\Screen;
use App\Model\Schedule;
use App\Model\Media_Asset;
use App\Model\Session_Log;
use App\Model\Group_Screen;
use Illuminate\Http\Request;
use App\Model\Screen_Session;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Session_Log as AppSession_Log;
use Illuminate\Support\Facades\Cookie;
//use App\Http\Resources\ScheduleGroupResource;
use App\Http\Resources\ScheduleResource;
use Symfony\Component\HttpFoundation\Response;

class ScheduleController extends Controller
{
    
    public function __construct()
    {
      header('Set-Cookie: cross-site-cookie=bar; SameSite=None; Secure', false);
    }

    public function test()
    {
      //dd(Screen::first('id'));
      $screen = Screen::first();
      return $screen['id'];
    }
  
    /**
     * Web // Default controller for front-end display
     *
     * @return client screen view
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
        $data['user'] = Auth::user()->username;
        echo "<pre></pre>";
        //setcookie('cross-site-cookie', 'name', ['samesite' => 'None', 'secure' => true]);
        return view('page', $data);
    }

    /**
     * API // Get latest URL from AJAX request in client Front-end.
     *
     * @return \Illuminate\Http\Response
     * 
     */
    public function getUrl()
    {
        if (!Auth::user())
        {
            return ['invalid-user'];
        }

        // admin view
        if (Auth::user()->username == 'admin')
        {
           
          // @debug
          // test cookie
          //return Cookie::get('cscreen');
          
          
          // catch view screen from admin 

            $uscreen = session('uscreen');

            // @debug
            //return ['uscreen' => $uscreen, 'cookie' => Cookie::get('cscreen')];

            $screen = Screen::find($uscreen);

            // @debug
            //return ['uscreen' => $uscreen, 'screen' => $screen];

            if (!$screen)
            {
              session(['uscreen' => null]);
              return ['deactivated-user'];
            }
        }
        else
        {
          // auto-login
          $screen = Screen::find(Auth::user()->username);
          if (!$screen)
          {
            return ['invalid-user'];
          }
        }
        
        // @debug
        //return $screen;

        // log request
        $this->logSession($screen->id);

        $schedule = $this->nowShowing($screen);
        return $schedule;


        if ($schedule->isEmpty()) {
            // @TODO: default image or URL here...
            return ['no-content'];
        }

        //dd($schedule[0]->id);
        // active session history log
        $this->logSessionHistory($screen, Schedule::find($schedule[0]->id));
        
        return $schedule;
    }

    /**
     * Web // Log request for Active Sessions Monitoring 
     *
     * @return null
     * 
     */
    private function logSession($screen_id)
    {
      Screen_Session::updateOrCreate(
        ['screen_id' => $screen_id],
        ['request_log' => Carbon::now()]
      );
    }

    /**
     * Web // Log request for Active Sessions Monitoring 
     *
     * @return null
     * 
     */
    private function logSessionHistory(Screen $screen, Schedule $schedule)
    {
      $screen_id = $screen->id;
      $outlet_id = $screen->outlet_id;
      $outlet_int = $screen->outlet->int_id;
      $outlet_name = $screen->outlet->name;
      $link_id = $schedule->link_id;
      $media_asset = $schedule->link->media__asset_id;
      $media_asset_id = Media_Asset::find($media_asset)->id;
      $media_asset_name = Media_Asset::find($media_asset)->name;

      $log = new Session_Log;
      $log->screen_id = $screen_id;
      $log->outlet_id = $outlet_id;
      $log->link_id = $link_id;
      $log->media__asset_id = $media_asset_id;
      $log->outlet_int_id = $outlet_int;
      $log->outlet_name = $outlet_name;
      $log->media__asset_name = $media_asset_name;
      $log->save();

    }

    
    /**
     * API // get encrypted string
     * 
     * @return string
     */
    public function getScreenAutologin(Request $request)
    {
      return urlencode($this->encryptText($request->screen_id) . "__" . $request->screen_id);
    }

    /**
     * Helper // encrypt string
     * 
     * @return string
     */
    private function encryptText($string)
    {
      return openssl_encrypt ($string, 'AES-128-CBC' , 'client', 0, $iv="abcdefghi1234567");
    }

    /**
     * Auto-log client screen from url.
     *
     * @url /client?r=<encrypted_string>__<screen_id>
     * @return /Auth::user()
     */
    public function clientLogin()
    {
      $request = $_REQUEST;
      //dd($request['r']);
      if (!isset($request['r']))
      {
        return ['Invalid request parameter'];
      }
      
      $param = explode('__',$request['r']);
      if (count($param) != 2)
      {
        return ['Invalid key parameter'];
      }

      if ($param[0] == $this->encryptText($param[1]))
      {
        $user = User::where('username', $param[1])->first();
        if ($user == null)
        {
          return redirect('/bye');
        }
        
        if ($user->id)
        {
          Auth::logout();
          Auth::loginUsingId($user->id, true);
          return redirect('/');
        }

      }
      
      return redirect('/bye');
    }


    /**
     * View client screen from admin
     * 
     * @url /admin/screen/{screen}
     */
    public function viewScreen($screen)
    {
        if (!Auth::user())
        {
            return redirect('/login');
        }
        if (Auth::user()->username != "admin")
        {
            return redirect('/');
        }

        // set session for admin
        sleep(2);
        session(['uscreen' => $screen]);

        // set cookie instead
        Cookie::make('cscreen', $screen, 120);

        // @debug
        // return session('uscreen');

        $data['user'] = $screen;
        echo "<pre></pre>";
        // @goto 
        return view('page', $data);
    }


    /**
     * Display now showing for front-end per screen
     */
    public function nowShowing(Screen $screen)
    {    
        $arr = [$screen->id];
        $result = DB::table('schedules')
            ->leftJoin('links', 'schedules.link_id', '=', 'links.id')
            ->whereRaw('screen_id = ?
                        AND show_datetime < NOW() 
                        AND (expire_datetime > NOW() 
                        OR expire_datetime is NULL) 
                        ORDER BY show_datetime DESC', $arr)
                        ->get(); // `get` because of '->isEmpty()'

        // $result = DB::select('SELECT 
        //             s.id AS id,
        //             s.screen_id AS screen_id,
        //             s.link_id AS link_id,
        //             s.url AS url,
        //             s.show_datetime AS show_datetime,
        //             s.expire_datetime AS expire_datetime,
        //             s.created_at AS created_at,
        //             s.updated_at AS updated_at,
        //             l.media__asset_id AS media_asset_id
        //             FROM schedules AS s
        //             LEFT JOIN links AS l
        //             ON s.link_id = l.id
        //             WHERE s.screen_id = ?', $arr);
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
     * API // Display a listing of todays schedule by ADMIN API.
     *
     * @url api/schedule/ss/CFANGSS03
     * @return \Illuminate\Http\Response
     */
    public function showScreen(Screen $screen)
    {               
        // $result = $screen->schedule()
        //     ->whereDate('show_datetime', Carbon::today())
        //     ->orderBy('show_datetime', 'desc')
        //     ->get();
        $arr = [$screen->id];
        $result = DB::table('schedules')
            ->whereRaw('screen_id = ?
                        AND show_datetime < NOW() 
                        AND (expire_datetime > NOW() 
                        OR expire_datetime is NULL) 
                        ORDER BY show_datetime DESC', $arr)
                        ->get();
        return ScheduleResource::collection($result);
    }

    /**
     * API // Display a listing of todays schedule by ADMIN API.
     *
     * @url api/schedule/ss/CFANGSS03
     * @return \Illuminate\Http\Response
     */
    public function showScreenCalendar(Screen $screen)
    {               
        // $result = $screen->schedule()
        //     ->whereDate('show_datetime', Carbon::today())
        //     ->orderBy('show_datetime', 'desc')
        //     ->get();
        $arr = [$screen->id];
        $result = DB::table('schedules')
            ->whereRaw('screen_id = ?
                        ORDER BY show_datetime DESC', $arr)
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
     * API // Update schedule on selected screen [NO GROUP].
     *
     * @url POST api/schedule/screen/1
     * @return \Illuminate\Http\Response
     */
    public function onScreen(Request $request, Screen $screen)
    {            
        //if link_id is NULL insert into `links` table
        // dont remove this -- for foreign key check
        if (!$request->link_id)
        {
            $link = Link::create(
                [
                    'media__asset_id' => $request->media__asset_id,
                    'name' => $request->link_name,
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
                    'name' => $request->link_name,
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
        //setcookie('cross-site-cookie', 'name', time()+3600);

        $user = Auth::user();

        // flush and regenerate session
        // session()->flush();
        // session()->regenerate();

        // regenerate tokens
        $user->tokens()->delete();
        $bearer = $user->createToken('token-name')->plainTextToken;
        $data['token'] = json_encode($bearer);

        // regenerate session if null
        if (session('uscreen') === null)
        {
          session()->regenerate();
          $screen = Screen::first();
          session(['uscreen' => $screen['id']]);
        }
        $data['uscreen'] = session('uscreen');

        // test cookie
        $data['cscreen'] = Cookie::get('cscreen');

        return view('admin', $data);
    }
}
