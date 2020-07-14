<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
*/

Route::apiResource('/outlet','OutletController');
Route::apiResource('/{outlet}/screen','ScreenController');

Route::get('/media/all','MediaAssetController@listAll');
Route::apiResource('/media','MediaAssetController');

Route::get('/screen/all','ScreenController@listAll');


//Route::apiResource('/m/{medium}/link','LinkController');
Route::get('/m/{medium}/link','LinkController@index');
Route::post('/l','LinkController@store');
Route::get('/l','LinkController@showAll');
Route::get('/l/{link}','LinkController@show');
Route::patch('/l/{link}','LinkController@update');
Route::delete('/l/{link}','LinkController@destroy ');

//Route::apiResource('/g/{group}/screens','GroupScreenController');
Route::get('/g/{group}/id','GroupScreenController@index');
Route::patch('/g/{group}/id','GroupScreenController@update');
Route::delete('/g/{group}/id','GroupScreenController@destroy');
Route::post('/g/{group}/screen','GroupScreenController@updateScreens');
Route::delete('/g/{group}/screen','GroupScreenController@destroyScreens');
Route::get('/g','GroupScreenController@showAll');
Route::post('/g','GroupScreenController@store');

//Route::apiResource('/schedule','ScheduleController');
Route::get('/schedule','ScheduleController@index');
Route::get('/schedule/outlet/{outlet}','ScheduleController@showOutlet');
Route::get('/schedule/ss/{screen}','ScheduleController@showScreen')->name('schedule.screen');
Route::get('/schedule/group/{group}','ScheduleController@showGroup');
Route::get('/schedule/link/{link}','ScheduleController@showLink');
Route::post('/schedule/screen/{screen}','ScheduleController@onScreen');
Route::post('/schedule/group/{group}','ScheduleController@onGroup');
Route::delete('/schedule/{schedule}','ScheduleController@destroy');

Route::get('/schedule/now/{screen}','ScheduleController@nowShowing');


