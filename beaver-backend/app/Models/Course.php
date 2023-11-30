<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'created_by',
        'updated_by',
        'status',
    ];

    protected $appends = [
        'instructor_name',
    ];

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    /**
     * Get the students enrolled to the course.
     */
    public function students()
    {
        return $this->hasManyThrough(
            User::class,
            StudentEnrolment::class,
            'course_id', // Foreign key on student_enrolments table...
            'id', // Foreign key on users table...
            'user_id' // Local key on student_enrolments table...
        );
    }

    public function getInstructorNameAttribute()
    {
        return CourseInstructor::query()
            ->where('course_id',$this->id)
            ->first()
            ->instructor->name ?? '';
    }
    
    /**
     * Get the course instructors for Feedback Analysis
     */
    public function instructors()
    {
        // 'created_by' is the ID of the user who created the course
        return $this->belongsTo(User::class, 'created_by');
    }
}
