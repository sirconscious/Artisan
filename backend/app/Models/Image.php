<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    protected $fillable = ["path", "job_id"] ;
    public function job(){
        return $this->belongsTo(Job::class);
    }
}
