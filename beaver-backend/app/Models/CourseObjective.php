<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CourseObjective extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'course_id',
        'created_by',
        'updated_by',
        'status',
    ];

    /**
     * Get the course that owns the course objective.
     */
    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    /**
     * Get the user that created the course objective.
     */
    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Get the user that updated the course objective.
     */
    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
