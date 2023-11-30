<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentEnrolment extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'course_id',
        'created_by',
        'updated_by',
        'status',
    ];

    protected $appends = [
        'student_name',
        'course_name',
    ];

    public function getStudentNameAttribute()
    {
        return $this->student->name;
    }

    public function getCourseNameAttribute()
    {
        return $this->course->name;
    }

    public function student()
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    public function course()
    {
        return $this->belongsTo(Course::class, 'course_id');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
