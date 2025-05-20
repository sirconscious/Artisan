<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function register(Request $request){
        $credentials = $request->validate([
            "name" => "required", 
            "email" => "required|email" , 
            "password" => "required|confirmed" , 
            "role"=>"required"
        ]) ;
        User::create($credentials) ; 
        return response()->json(["message" => "success"], 201) ; 
    } 
    public function login(Request $request){
        $credentials = $request->validate([
            "email" => "required|email" , 
            "password" => "required"
        ]) ;
        $user = User::where("email", $credentials["email"])->first();
        if(!$user ){
            return response()->json(["message" => "User not found or not verified"], 404);
        }
        if(! auth()->attempt($credentials)){
            return response()->json(["message" => "Invalid credentials"], 401);
        }
        $user = auth()->user();
        $token = $user->createToken("token")->plainTextToken;
        return response()->json(["token" => $token]);
        
    } 
    public function getUser(Request $request){
    
        return response()->json($request->user());
    }
}
