<?php

namespace App\Providers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\ServiceProvider;
use Illuminate\Http\Resources\Json\JsonResource;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        JsonResource::withoutWrapping();

        if(env('APP_DEBUG')) {
          DB::listen(function($query) {
            //   File::append(
            //       storage_path('/logs/query.log'),
            //       $query->sql . ' [' . implode(', ', $query->bindings) . ']' . PHP_EOL
            //  );
          });
      }
    }
}
