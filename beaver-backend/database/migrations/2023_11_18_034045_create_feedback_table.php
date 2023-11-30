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
        Schema::create('feedback', function (Blueprint $table) {
            $table->id('feedback_id');
            $table->string('course_id');
            $table->unsignedBigInteger('instructor_id')->nullable();
            $table->text('feedback_text');
            $table->decimal('sentiment_score', 5, 2)->nullable();
            $table->string('feedback_type');
            $table->timestamps();

            //foreign key
            $table->foreign('course_id')->references('id')->on('courses');
            $table->foreign('instructor_id')->references('id')->on('users');
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('feedback');
    }
};
