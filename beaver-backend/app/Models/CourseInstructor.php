<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CourseInstructor extends Model
{
    use HasFactory;

    protected $fillable = [
        'course_id',
        'instructor_id',
        'created_by',
        'updated_by',
        'status',
    ];

    protected $appends = [
        'course_name',
        'instructor_name'
    ];

    public function getCourseNameAttribute()
    {
        return $this->course->name;
    }

    public function getInstructorNameAttribute()
    {
        return $this->instructor->name;
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function instructor()
    {
        return $this->belongsTo(User::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class,'updated_by');
    }
}
