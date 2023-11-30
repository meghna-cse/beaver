<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exam extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'course_id',
        'exam_date',
        'exam_type_id',
        'exam_format_id',
        'max_score',
        'passing_score',
        'created_by',
        'updated_by',
        'status',
    ];

    protected $appends = [
        'exam_type_name',
        'exam_format_name',
        'course_name',
    ];

    public function getExamTypeNameAttribute()
    {
        return $this->examType->type;
    }

    public function getExamFormatNameAttribute()
    {
        return $this->examFormat->format;
    }

    public function getCourseNameAttribute()
    {
        return $this->course->name;
    }

    /**
     * Get the course that owns the exam.
     */
    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    /**
     * Get the exam type that owns the exam.
     */
    public function examType()
    {
        return $this->belongsTo(ExamType::class);
    }

    /**
     * Get the exam format that owns the exam.
     */
    public function examFormat()
    {
        return $this->belongsTo(ExamFormat::class);
    }

    /**
     * Get the user that created the exam.
     */
    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Get the user that updated the exam.
     */
    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
