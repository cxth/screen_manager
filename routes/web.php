<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('welcome');
// });


// Web Route
Route::get('/','ScheduleController@default'); 
Route::get('/logout','HomeController@logout');

// AJAX
Route::get('/request','ScheduleController@getUrl');

// Test routes
Route::get('/test','ScheduleController@test');


// Admin
Route::get('/admin','ScheduleController@admin');
Route::get('/admin/{screen}','ScheduleController@viewScreen');

Auth::routes(['register' => false, 'reset' => false]);
//Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::get('/clear-cache', function() {
    $message = "";
    Artisan::call('cache:clear');
        $message .= " Cache is cleared <br/>";
    Artisan::call('route:clear');
        $message .= " Route is cleared <br/>";
    Artisan::call('config:clear');
        $message .= " Config is cleared <br/>";
    Artisan::call('view:clear');
        $message .= " View is cleared <br/>";
    return $message;
});
