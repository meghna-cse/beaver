<?php

namespace App\Http\Controllers;

use App\Models\CourseInstructor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CourseInstructorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // fetch all course instructors
        $courseInstructors = CourseInstructor::with(['course', 'instructor'])->get();

        // return response
        return response()->json([
            'success' => true,
            'message' => 'Course instructors fetched successfully.',
            'data' => $courseInstructors
        ], 200);
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
        // validate request
        $rules = [
            'course_id' => 'required|integer|exists:courses,id',
            'instructor_id' => 'required|integer|exists:users,id',
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => implode(" ",$validator->messages()->all(":message")),
                'data'=>null,
            ], 400);
        }

        // check if the course instructor already exists
        $courseInstructor = CourseInstructor::where('course_id', $request->course_id)
            ->where('instructor_id', $request->instructor_id)
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

        $courseInstructor->course_id = $request->course_id;
        $courseInstructor->instructor_id = $request->instructor_id;
        $courseInstructor->created_by = auth()->user()->id;
        $courseInstructor->updated_by = auth()->user()->id;

        $courseInstructor->save();

        // return response
        return response()->json([
            'success' => true,
            'message' => 'Course instructor created successfully.',
            'data' => $courseInstructor
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(CourseInstructor $courseInstructor)
    {
        // fetch course instructor
        $courseInstructor = CourseInstructor::with(['course', 'instructor'])->find($courseInstructor->id);
        return response()->json([
            'success' => true,
            'message' => 'Course instructor fetched successfully.',
            'data' => $courseInstructor
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CourseInstructor $courseInstructor)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CourseInstructor $courseInstructor)
    {
        // validate request
        $rule = [
            'course_id' => 'required|integer|exists:courses,id',
            'instructor_id' => 'required|integer|exists:users,id',
        ];

        $validator = Validator::make($request->all(), $rule);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => implode(" ",$validator->messages()->all(":message")),
                'data'=>null,
            ], 400);
        }

        // check if the course instructor already exists
        $instructorExists = CourseInstructor::where('course_id', $request->course_id)
            ->where('instructor_id', $request->instructor_id)
            ->exists();

        if ($instructorExists) {
            return response()->json([
                'success' => false,
                'message' => 'Course instructor already exists.',
                'data'=>null,
            ], 409);
        }

        // update course instructor
        $courseInstructor->course_id = $request->course_id;
        $courseInstructor->instructor_id = $request->instructor_id;
        $courseInstructor->updated_by = auth()->user()->id;

        $courseInstructor->save();

        // return response
        return response()->json([
            'success' => true,
            'message' => 'Course instructor updated successfully.',
            'data' => $courseInstructor
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CourseInstructor $courseInstructor)
    {
        //
        $courseInstructor->delete();

        // return response
        return response()->json([
            'success' => true,
            'message' => 'Course instructor deleted successfully.',
            'data' => null
        ], 200);
    }
}
