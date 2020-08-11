<?php

namespace App\Http\Controllers;

use App\Model\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    /**
     * AJAX // Upload File
     *
     * @return \Illuminate\Http\Response
     */
    public function upload(Request $request)
    {
      
      // if (!Auth::user())
      // {
      //   return 'invalid user';
      // }

      $upload = $request->file->store('public');
      $f = explode('public/',$upload);
      $filename = $f[1];
      $path = 'storage/' . $filename;

      $data = [
        'name' => $request->name,
        'origname' => $request->file('file')->getClientOriginalName(),
        'type' => $request->file('file')->extension(),
        'filename' => $filename,
        'path' => $path,
        'size' => Storage::size($upload)
      ];
     
      //store File value
      $file = new File;
      $file->name = $data['name'];
      $file->path = $data['path'];
      $file->orig_filename = $data['origname'];
      $file->size = $data['size'];
      $file->type = $data['type'];
      $file->save();
    
    }


    /**
     * AJAX // Get Files
     *
     * @return \Illuminate\Http\Response
     */
    public function get()
    {
      // if (!Auth::user())
      // {
      //   return 'invalid user';
      // }  
      return File::all();
    }

    /**
     * Host and Render Clip
     *
     * @return html
     */
    public function watch()
    {
      $request = $_REQUEST;
      if (!isset($request['v']))
      {
        return ['Invalid request parameter'];
      }
      $data['video'] = asset($request['v']);
      return view('player', $data);
    }

    /**
     * AJAX // Delete video clip
     *
     * @return response
     */
    public function delete(File $file)
    {
      // if (!Auth::user())
      // {
      //   return 'invalid user';
      // }

      $path = str_replace('storage', 'public', $file->path);
      Storage::delete($path);

      $file->delete();

    }




    // Helper
    public function getVideoURL($path)
    {
      return asset($path);
    }
}
