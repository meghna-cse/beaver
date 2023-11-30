<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('exams', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->unsignedBigInteger('course_id');
            $table->dateTime('exam_date');
            $table->unsignedBigInteger('exam_type_id');
            $table->unsignedBigInteger('exam_format_id');
            $table->integer('max_score');
            $table->integer('passing_score');
            $table->unsignedBigInteger('created_by')->nullable();
            $table->unsignedBigInteger('updated_by')->nullable();
            $table->tinyInteger('status')->default(1);
            $table->timestamps();

            // foreign keys
            $table->foreign('course_id')->references('id')->on('courses');
            $table->foreign('exam_type_id')->references('id')->on('exam_types');
            $table->foreign('exam_format_id')->references('id')->on('exam_formats');
            $table->foreign('created_by')->references('id')->on('users');
            $table->foreign('updated_by')->references('id')->on('users');

            // unique constraint
            $table->unique(['name', 'course_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exams');
    }
};
