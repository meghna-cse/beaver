<?php

namespace App\Http\Controllers;

use App\Models\StudentEnrolment;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class StudentEnrolmentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // fetch student enrolments
        // by student, by course
        $course = request()->query('course');
        $student = request()->query('student');

        $studentEnrolments = StudentEnrolment::query();

        if ($course) {
            $studentEnrolments->where('course_id', $course);
        }

        if ($student) {
            $studentEnrolments->where('student_id', $student);
        }

        return response()
            ->json([
                'status'=>'success',
                'message'=>'student enrolments retrieved successfully',
                'data'=>$studentEnrolments->get()
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
        // validate request
        $rules = [
            'student_id'=>'required|exists:users,id',
            'course_id'=>'required|exists:courses,id',
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()){
            return response()->json([
                'success' => false,
                'message' =>implode(",",$validator->errors()->all()),
                'data' => $validator->errors()
            ], 400);
        }

        $studentEnrolmentExist = StudentEnrolment::query()
            ->where('student_id', $request->student_id)
            ->where('course_id', $request->course_id)
            ->exists();

        if ($studentEnrolmentExist) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Student already enrolled in this course',
                'data' => null
            ], 400);
        }

        // create student enrolment
        $studentEnrolment = new StudentEnrolment();

        $studentEnrolment->student_id = $request->student_id;
        $studentEnrolment->course_id = $request->course_id;
        $studentEnrolment->created_by = auth()->user()->id;

        $studentEnrolment->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Student enrolled successfully',
            'data' => $studentEnrolment
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(StudentEnrolment $studentEnrolment)
    {
        // fetch student enrolment
        return response()->json([
            'status' => 'success',
            'message' => 'Student enrolment retrieved successfully',
            'data' => $studentEnrolment
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(StudentEnrolment $studentEnrolment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, StudentEnrolment $studentEnrolment)
    {
        // validate request
        $rules = [
            'student_id'=>'required|exists:users,id',
            'course_id'=>'required|exists:courses,id',
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()){
            return response()->json([
                'success' => false,
                'message' =>implode(",",$validator->errors()->all()),
                'data' => $validator->errors()
            ], 400);
        }

        $studentEnrolmentExist = StudentEnrolment::query()
            ->where('student_id', $request->student_id)
            ->where('course_id', $request->course_id)
            ->where('id', '!=', $studentEnrolment->id)
            ->exists();

        if ($studentEnrolmentExist) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Student already enrolled in this course',
                'data' => null
            ], 400);
        }

        $studentEnrolment->student_id = $request->student_id;
        $studentEnrolment->course_id = $request->course_id;
        $studentEnrolment->updated_by = auth()->user()->id;

        $studentEnrolment->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Student enrollment updated successfully',
            'data' => $studentEnrolment
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StudentEnrolment $studentEnrolment)
    {
        // delete student enrolment
        $studentEnrolment->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Student enrolment deleted successfully',
            'data' => null
        ]);
    }
}
