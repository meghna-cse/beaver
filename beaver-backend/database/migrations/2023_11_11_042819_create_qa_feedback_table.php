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
        Schema::create('qa_feedback', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('exam_id')->nullable();
            $table->unsignedBigInteger('course_objective_id')->nullable();
            $table->text('comment')->nullable();
            $table->timestamps();
            $table->unsignedBigInteger('created_by')->nullable();
            $table->unsignedBigInteger('updated_by')->nullable();
            $table->tinyInteger('status')->default(1);

            // foreign keys
            $table->foreign('exam_id')->references('id')->on('exams');
            $table->foreign('course_objective_id')->references('id')->on('course_objectives');
            $table->foreign('created_by')->references('id')->on('users');
            $table->foreign('updated_by')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('qa_feedback');
    }
};
