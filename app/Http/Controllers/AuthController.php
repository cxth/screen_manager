<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
  // public function login(Request $request)
  // {
  //   try {
  //     $request->validate([
  //       'username' => 'required',
  //       'password' => 'required'
  //     ]);
  //     $credentials = request(['username', 'password']);
  //     if (!Auth::attempt($credentials)) {
  //       return response()->json([
  //         'status_code' => 500,
  //         'message' => 'Unauthorized'
  //       ]);
  //     }
  //     $user = User::where('username', $request->username)->first();
  //     if ( ! Hash::check($request->password, $user->password, [])) {
  //       throw new \Exception('Error in Login');
  //     }
  //     $tokenResult = $user->createToken('authToken')->plainTextToken;
  //     return response()->json([
  //       'status_code' => 200,
  //       'access_token' => $tokenResult,
  //       'token_type' => 'Bearer',
  //     ]);
  //   } catch (\Exception $error) {
  //     return response()->json([
  //       'status_code' => 500,
  //       'message' => 'Error in Login',
  //       'error' => $error,
  //     ]);
  //   }
  // }
}
