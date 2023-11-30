<?php

namespace App\Http\Controllers;

use App\Models\StudentPerformance;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class StudentPerformanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // by student id, by exam id, by course id, by instructor id
        $student = request()->query('student_id');
        $exam = request()->query('exam_id');
        $course = request()->query('course_id');
        $instructor = request()->query('instructor_id');

        $studentPerformances = StudentPerformance::query();

        if ($student) {
            $studentPerformances->where('student_id', $student);
        }

        if ($exam) {
            $studentPerformances->where('exam_id', $exam);
        }

        if ($course) {
            $studentPerformances->whereHas('exam', function($query) use ($course) {
                $query->where('course_id', $course);
            });
        }

        if ($instructor) {
            $studentPerformances->whereHas('exam', function($query) use ($instructor) {
                $query->whereHas('course', function($query) use ($instructor) {
                    $query->whereHas('courseInstructors', function($query) use ($instructor) {
                        $query->where('instructor_id', $instructor);
                    });
                });
            });
        }

        $studentPerformances = $studentPerformances->with(['exam','student','course']);

        return response()->json([
           'status' => 'success',
            'message' => 'Student performances retrieved successfully.',
            'data' => $studentPerformances->get(),
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
            'student_id' => 'required|exists:users,id',
            'exam_id' => 'required|exists:exams,id',
            'score' => 'required|numeric|min:0',
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => implode(" ",$validator->messages()->all(':message')),
                'data' => null,
            ], 422);
        }

        // check if student already has a performance for this exam
        $studentPerformanceExists = StudentPerformance::query()
            ->where('student_id', $request->student_id)
            ->where('exam_id', $request->exam_id)
            ->exists();

        if ($studentPerformanceExists) {
            return response()->json([
                'status' => 'error',
                'message' => 'Student performance already exists for this exam for this student.',
                'data' => null,
            ], 422);
        }

        // create student performance
        $studentPerformance = new StudentPerformance();

        $studentPerformance->student_id = $request->student_id;
        $studentPerformance->exam_id = $request->exam_id;
        $studentPerformance->score = $request->score;
        $studentPerformance->created_by = auth()->user()->id;

        $studentPerformance->save();



        return response()->json([
            'status' => 'success',
            'message' => 'Student performance created successfully.',
            'data' => $studentPerformance,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(StudentPerformance $studentPerformance)
    {
        $studentPerformance = StudentPerformance::with(['exam','student','course'])
            ->where('id','=',$studentPerformance->id)
            ->get();
        // show student performance
        return response()
            ->json([
                'status' => 'Success',
                'message' => 'Fetched student performance successfully',
                'data' => $studentPerformance,
            ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(StudentPerformance $studentPerformance)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, StudentPerformance $studentPerformance)
    {
        // validate request
        $rules = [
            'student_id' => 'required|exists:users,id',
            'exam_id' => 'required|exists:exams,id',
            'score' => 'required|numeric|min:0',
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Student performance creation failed.',
                'errors' => $validator->errors(),
            ], 422);
        }

        // check if student already has a performance for this exam
        $studentPerformanceExists = StudentPerformance::query()
            ->where('student_id', $request->student_id)
            ->where('exam_id', $request->exam_id)
            ->where('id','!=',$studentPerformance->id)
            ->exists();

        if ($studentPerformanceExists) {
            return response()->json([
                'status' => 'error',
                'message' => 'Student performance already exists for this exam for this student.',
                'data' => null,
            ], 422);
        }

        $studentPerformance->student_id = $request->student_id;
        $studentPerformance->exam_id = $request->exam_id;
        $studentPerformance->score = $request->score;
        $studentPerformance->updated_by = auth()->user()->id;

        $studentPerformance->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Student performance updated successfully.',
            'data' => $studentPerformance,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(StudentPerformance $studentPerformance)
    {
        // delete
        $studentPerformance->delete();

        return response()
            ->json([
                'status' => 'Success',
                'message' => 'Deleted student performance successfully',
                'data' => null,
            ]);
    }

    /**
     * Get average student performance based on the course id when provided instructor id
     */
    public function getAverageStudentPerformanceByCourse()
    {
        $instructor_id = request()->query('instructor_id');

        $studentPerformances = StudentPerformance::query()
            ->join('exams', 'student_performances.exam_id', '=', 'exams.id')
            ->join('courses', 'exams.course_id', '=', 'courses.id')
            ->join('course_instructors', 'courses.id', '=', 'course_instructors.course_id');

        if ($instructor_id != null) {
            $studentPerformances = $studentPerformances
                ->where('course_instructors.instructor_id', $instructor_id);
        }

        $studentPerformances = $studentPerformances
            ->select('courses.id','courses.name',DB::raw('AVG(score) as average_score'))
            ->groupBy('courses.id','courses.name')
            ->get();

        return response()->json([
            'status' => 'success',
            'message' => 'Average student performances retrieved successfully.',
            'data' => $studentPerformances,
        ]);
    }
}
