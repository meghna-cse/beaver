<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QaFeedback extends Model
{
    use HasFactory;

    protected $fillable = [
        'exam_id',
        'course_objective_id',
        'comment',
        'created_by',
        'updated_by',
        'status',
    ];

    protected $appends = [
        'course_objective_name',
        'exam_name',
    ];

    public function getCourseObjectiveNameAttribute()
    {
        return $this->courseObjective?->name;
    }

    public function getExamNameAttribute()
    {
        return $this->exam?->name;
    }

    public function exam()
    {
        return $this->belongsTo(Exam::class,'exam_id');
    }

    public function courseObjective()
    {
        return $this->belongsTo(CourseObjective::class,'course_objective_id');
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class,'created_by');
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class,'updated_by');
    }
}
