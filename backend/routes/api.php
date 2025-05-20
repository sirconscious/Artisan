<?php

use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\api\JobsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');
Route::post('/login', [AuthController::class, 'login']); 
Route::post('/register', [AuthController::class, 'register']); 
Route::get('/user', [AuthController::class, 'getUser'])->middleware('auth:sanctum'); 
Route::get('/jobs', [JobsController::class, 'index']);
Route::post('/jobs', [JobsController::class, 'add'])->middleware('auth:sanctum');