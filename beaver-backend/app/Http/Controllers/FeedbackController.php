<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Feedback;
use App\Models\Course;
use Illuminate\Support\Facades\Http;

class FeedbackController extends Controller
{
    //
    
    public function store(Request $request)
    {
        // Validate the incoming request
        $validatedData = $request->validate([
            'course_id' => 'required|integer|exists:courses,id',
            'instructor_id' => 'required|integer|exists:users,id',
            'feedback' => 'required|string',
        ]);

        // Create a new feedback entry
        $feedback = new Feedback();
        $feedback->course_id = $validatedData['course_id'];
        $feedback->instructor_id = $validatedData['instructor_id'];
        $feedback->feedback_text = $validatedData['feedback'];
        $sentimentAnalysis = $this->analyzeSentiment($request->feedback);
        $feedback->sentiment_score = $sentimentAnalysis['score'] ?? 0.0;
        $feedback->feedback_type = $sentimentAnalysis['type'] ?? 'neutral';
        $feedback->save();

        // Return a success response
        return response()->json(['message' => 'Feedback submitted successfully']);
    }

    

    private function analyzeSentiment($text) {
        $response = Http::withHeaders([
            'X-RapidAPI-Key' => config('services.rapidapi.key'),
            'X-RapidAPI-Host' => config('services.rapidapi.host')
        ])->get('https://' . config('services.rapidapi.host') . '/analyze/', [
            'text' => $text
        ]);

        return $response->json();
    }


    public function index()
    {
        $feedbackData = Feedback::with('course')
            ->get()
            ->groupBy('course_id')
            ->map(function ($feedbacks, $courseId) {
                return [
                    'course' => Course::find($courseId)->name,
                    'feedbacks' => [
                        'positive' => $feedbacks->where('feedback_type', 'positive')->values(),
                        'neutral' => $feedbacks->where('feedback_type', 'neutral')->values(),
                        'negative' => $feedbacks->where('feedback_type', 'negative')->values(),
                    ]
                ];
            })
            ->filter(function ($courseFeedback) {
                // Only include courses with at least one feedback
                return $courseFeedback['feedbacks']['positive']->count() > 0
                    || $courseFeedback['feedbacks']['neutral']->count() > 0
                    || $courseFeedback['feedbacks']['negative']->count() > 0;
            });

        return response()->json(['data' => $feedbackData], 200);
    }




}
