<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Job;
use Illuminate\Http\Request;

class JobsController extends Controller
{
    public function index(){
        $jobs = Job::with('images')->get();
        return response()->json(["jobs" => $jobs]) ;
    } 
    public function add(Request $request){
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'adresse' => 'required|string|max:255',
            'date' => 'required|',
            'time_preference' => 'required|string|max:255',
            'description' => 'required|string',
            'urgency' => 'required|string|max:255',
            'budget' => 'required|integer',
            'contact_preference' => 'required|string|max:255',
        ]) ;
        $data["user_id"] = auth()->user()->id ;
        $job = Job::create($data);
        if ($request->hasFile('photos')) {
            $image = $request->store("images", "public");
            $job->images()->create([
                "path" => $image 
            ]);
        }
        return response()->json(["job" => $job]) ;
    }
}
