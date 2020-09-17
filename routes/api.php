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

Route::middleware('auth:sanctum')->apiResource('/outlet','OutletController');
Route::middleware('auth:sanctum')->get('/countscreens/{outlet_id}','OutletController@countScreens');
Route::middleware('auth:sanctum')->get('/getscreens/{outlet_id}','OutletController@getScreens');
Route::middleware('auth:sanctum')->get('/media/all','MediaAssetController@listAll');
Route::middleware('auth:sanctum')->apiResource('/media','MediaAssetController');
Route::middleware('auth:sanctum')->apiResource('/{outlet}/screen','ScreenController');
Route::middleware('auth:sanctum')->get('/getscreen/{screen}','ScreenController@getData');
Route::middleware('auth:sanctum')->post('/getscreen','ScreenController@updateData');
Route::middleware('auth:sanctum')->get('/screen/all','ScreenController@listAll');
Route::middleware('auth:sanctum')->get('/screen/active','ScreenController@getActive');
Route::middleware('auth:sanctum')->post('/screen/login','ScheduleController@getScreenAutologin');
Route::middleware('auth:sanctum')->delete('/screen/{screen}','ScreenController@destroy');
Route::middleware('auth:sanctum')->post('/l','LinkController@store');
Route::middleware('auth:sanctum')->get('/l','LinkController@showAll');
Route::middleware('auth:sanctum')->get('/l/{link}','LinkController@show');
Route::middleware('auth:sanctum')->patch('/l/{link}','LinkController@update');
Route::middleware('auth:sanctum')->delete('/l/{link}','LinkController@deleteLinkSched');

Route::get('/m/{medium}/link','LinkController@index');
Route::get('/g/{group}/id','GroupScreenController@index');
Route::patch('/g/{group}/id','GroupScreenController@update');
Route::delete('/g/{group}/id','GroupScreenController@destroy');
Route::post('/g/{group}/screen','GroupScreenController@updateScreens');
Route::delete('/g/{group}/screen','GroupScreenController@destroyScreens');
Route::get('/g','GroupScreenController@showAll');
Route::post('/g','GroupScreenController@store');
Route::get('/schedule/group/{group}','ScheduleController@showGroup');
Route::post('/schedule/group/{group}','ScheduleController@onGroup');
Route::delete('/schedule/{schedule}','ScheduleController@destroy');

Route::middleware('auth:sanctum')->get('/schedule','ScheduleController@index');
Route::middleware('auth:sanctum')->get('/schedule/outlet/{outlet}','ScheduleController@showOutlet');
Route::middleware('auth:sanctum')->get('/schedule/ss/{screen}','ScheduleController@showScreen')->name('schedule.screen');
Route::middleware('auth:sanctum')->get('/schedule/calendar/{screen}','ScheduleController@showScreenCalendar')->name('schedule-calendar.screen');
Route::middleware('auth:sanctum')->get('/schedule/link/{link}','ScheduleController@showLink');
Route::middleware('auth:sanctum')->post('/schedule/screen/{screen}','ScheduleController@onScreen');
Route::middleware('auth:sanctum')->get('/schedule/now/{screen}','ScheduleController@nowShowing');
Route::middleware('auth:sanctum')->post('/upload','FileController@upload');
Route::middleware('auth:sanctum')->get('/get','FileController@get');
Route::middleware('auth:sanctum')->delete('/clip/delete/{file}','FileController@delete');