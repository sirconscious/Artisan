<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    protected $fillable = [
        "title" , 
        "category" , 
        'location' ,
        'adresse' ,
        "date" ,
        'time_preference',
        'description' ,
        "urgency",
        "budget",
        "contact_preference",
        "user_id"
    ] ; 
    public function images(){
        return $this->hasMany(Image::class);
    }
}
