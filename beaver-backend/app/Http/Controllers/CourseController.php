<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use App\Models\CourseInstructor;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $course = Course::all();

        return response()
            ->json([
                'status' => 'success',
                'message' => 'Course retrieved successfully',
                'data' => $course
            ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // $latest_course = Course::latest()->limit(1)->get();
        // return response()->json([
        //     'success' => false,
        //     'message' => ' exists.',
        //     'data'=>$latest_course[0] -> id,
        // ], 409);




         
        // validate request
        $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
        ]);

        // create course
        $course = new Course();

        $course->name = $request->name;
        $course->description = $request->description;
        $course->created_by = auth()->user()->id;
        $course->status = 1;

        $course->save();

        
        //add instructor
        $latest_course = Course::latest()->limit(1)->get();
         // check if the course instructor already exists
         $courseInstructor = CourseInstructor::where('course_id', $latest_course[0]->id)
         ->where('instructor_id', auth()->user()->id)
         ->first();

        if ($courseInstructor) {
            return response()->json([
                'success' => false,
                'message' => 'Course instructor already exists.',
                'data'=>null,
            ], 409);
        }

        // create course instructor
        $courseInstructor = new CourseInstructor();

        $courseInstructor->course_id = $latest_course[0]->id;
        $courseInstructor->instructor_id = auth()->user()->id;
        $courseInstructor->created_by = auth()->user()->id;
        $courseInstructor->updated_by = auth()->user()->id;

        $courseInstructor->save();

        // return response
        return response()->json([
            'success' => true,
            'message' => 'Course instructor and Course created successfully.',
            'data1' => $courseInstructor,
            'data' => $course
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Course $course)
    {
        // get course
        $course = Course::find($course->id);

        return response()
            ->json([
                'status' => 'success',
                'message' => 'Course retrieved successfully',
                'data' => $course
            ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Course $course)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Course $course)
    {
        // validate request
        $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
        ]);

        // update course
        $course = Course::find($course->id);

        $course->name = $request->name;
        $course->description = $request->description;

        $course->save();

        return response()
            ->json([
                'status' => 'success',
                'message' => 'Course updated successfully',
                'data' => $course
            ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Course $course)
    {
        // delete course
        $course = Course::find($course->id);

        $course->delete();

        return response()
            ->json([
                'status' => 'success',
                'message' => 'Course deleted successfully',
                'data' => $course
            ]);
    }
}
