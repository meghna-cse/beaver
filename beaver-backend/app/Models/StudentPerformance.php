<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StudentPerformance extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'exam_id',
        'score',
        'created_by',
        'updated_by',
        'status',
    ];

    public function student()
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    public function exam()
    {
        return $this->belongsTo(Exam::class, 'exam_id');
    }

    public function course()
    {
        return $this->hasOneThrough(
            Course::class,
            Exam::class,
            'course_id',
            'id',
            'exam_id'
        );
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
