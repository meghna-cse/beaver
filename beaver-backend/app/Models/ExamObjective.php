<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExamObjective extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'exam_id',
        'created_by',
        'updated_by',
        'status',
    ];

    public function exam()
    {
        return $this->belongsTo(Exam::class,'exam_id');
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
