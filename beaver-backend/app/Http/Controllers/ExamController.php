<?php

namespace App\Http\Controllers;

use App\Models\Exam;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ExamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // filter exams by course
        $course = request()->query('course_id');

        // fetch all exams
        $exams = Exam::query();

        if ($course){
            $exams = $exams->where('course_id',$course);
        }

        $exams = $exams->with(['course','examType','examFormat'])->get();

        return response()->json([
            'status' => 'success',
            'message' => 'Exams fetched successfully',
            'data' => $exams,
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
            'exam_name' => 'required|string',
            'course_id' => 'required|integer|exists:courses,id',
            'exam_date' => 'required',
            'exam_type' => 'required|integer|exists:exam_types,id',
            'exam_format' => 'required|integer|exists:exam_formats,id',
            'max_score' => 'required|numeric',
            'passing_score' => 'required|numeric',
        ];

        $validator = Validator::make($request->all(),$rules);

        if ($validator->fails()){
            return response()
                ->json([
                    'status'=>'Failed',
                    'message'=>implode(" ",$validator->messages()->all(":message")),
                    'data'=>null,
                ],400);
        }

        $examExists = Exam::query()
            ->where('name',$request->name)
            ->where('course_id',$request->course_id)
            ->exists();

        if ($examExists){
            return response()
                ->json([
                    'status'=>'failed',
                    'message'=>'Exam with given name exists for this course',
                    'data'=>null,
                ],409);
        }

        $exam = new Exam();

        $exam->name = $request->exam_name;
        $exam->course_id = $request->course_id;
        $exam->exam_date = $request->exam_date;
        $exam->exam_type_id = $request->exam_type;
        $exam->exam_format_id = $request->exam_format;
        $exam->max_score = $request->max_score;
        $exam->passing_score = $request->passing_score;
        $exam->created_by = auth()->user()->id;

        $exam->save();

        return response()
            ->json([
                'status'=>'success',
                "message"=>"Created exam successfully",
                "data"=>$exam
            ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Exam $exam)
    {
        // return defined exam
        return response()
            ->json([
                'status'=>'success',
                'message'=>'Exam retrieved successfully',
                'data'=>$exam,
            ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Exam $exam)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Exam $exam)
    {
        // validate request
        $rules = [
            'exam_name' => 'required|string',
            'course_id' => 'required|integer|exists:courses,id',
            'exam_date' => 'required',
            'exam_type' => 'required|integer|exists:exam_types,id',
            'exam_format' => 'required|integer|exists:exam_formats,id',
            'max_score' => 'required|numeric',
            'passing_score' => 'required|numeric',
        ];

        $validator = Validator::make($request->all(),$rules);

        if ($validator->fails()){
            return response()
                ->json([
                    'status'=>'Failed',
                    'message'=>implode(" ",$validator->messages()->all(":message")),
                    'data'=>null,
                ],400);
        }

        $exam->name = $request->exam_name;
        $exam->course_id = $request->course_id;
        $exam->exam_date = $request->exam_date;
        $exam->exam_type_id = $request->exam_type;
        $exam->exam_format_id = $request->exam_format;
        $exam->max_score = $request->max_score;
        $exam->passing_score = $request->passing_score;
        $exam->updated_by = auth()->user()->id;

        $exam->save();

        return response()
            ->json([
                'status'=>'success',
                "message"=>"Updated exam successfully",
                "data"=>$exam
            ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Exam $exam)
    {
        // delete
        $exam->delete();

        return response()
            ->json([
                'status'=>'Success',
                'message'=>'Deleted exam successfully',
                'data'=>null,
            ]);
    }
}
