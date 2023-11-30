<?php

namespace App\Http\Controllers;

use App\Models\ExamObjective;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ExamObjectiveController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // fetch all with exam, course
        // filter by exam id, course id

        $examId = \request()->query('exam_id');
        $courseId = \request()->query('course_id');

        $examObjectives = ExamObjective::query();

        if ($examId){
            $examObjectives = $examObjectives->where('exam_id','=',$examId);
        }

        if ($courseId){
            $examObjectives = $examObjectives->where('course_id','=',$courseId);
        }

        return response()
            ->json([
                'status' => 'Success',
                'message' => 'Exam objectives retrieved successfully',
                'data' => $examObjectives->with(['exam'])->get(),
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
            'name' => 'required|string',
            'description' => 'required|string',
            'exam_id' => 'integer|exists:exams,id',
        ];

        $validator = Validator::make($request->all(),$rules);

        if ($validator->fails()){
            return response()->json([
                'success' => false,
                'message' =>implode(",",$validator->errors()->all()),
                'data' => $validator->errors()
            ], 400);
        }

        // check for uniqueness
        $examObjectiveExists = ExamObjective::query()
            ->where('name','=',$request->name)
            ->where('exam_id','=',$request->exam_id)
            ->exists();

        if ($examObjectiveExists){
            return response()
                ->json([
                    'status' => 'Failed',
                    'message' => 'Objective with similar name for this given exam already exists',
                    'data' => null,
                ]);
        }

        $examObjective = new ExamObjective();

        $examObjective->name = $request->name;
        $examObjective->description = $request->description;
        $examObjective->exam_id = $request->exam_id;
        $examObjective->created_by = auth()->user()->id;

        $examObjective->save();

        return response()
            ->json([
                'status' => 'success',
                'message' => 'Exam objective created successfully',
                'data' => $examObjective
            ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(ExamObjective $examObjective)
    {
        // fetch exam objective
        return response()
            ->json([
                'status' => 'success',
                'message' => 'Exam objective fetched successfully',
                'data' => ExamObjective::query()
                    ->where('id','=',$examObjective->id)
                    ->with(['exam'])->get(),
            ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ExamObjective $examObjective)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ExamObjective $examObjective)
    {
        // validate request
        $rules = [
            'name' => 'required|string',
            'description' => 'required|string',
            'exam_id' => 'integer|exists:exams,id',
        ];

        $validator = Validator::make($request->all(),$rules);

        if ($validator->fails()){
            return response()->json([
                'success' => false,
                'message' =>implode(",",$validator->errors()->all()),
                'data' => $validator->errors()
            ], 400);
        }

        // check for uniqueness
        $examObjectiveExists = ExamObjective::query()
            ->where('name','=',$request->name)
            ->where('exam_id','=',$request->exam_id)
            ->where('id','!=',$examObjective->id)
            ->exists();

        if ($examObjectiveExists){
            return response()
                ->json([
                    'status' => 'Failed',
                    'message' => 'Objective with similar name for this given exam already exists',
                    'data' => null,
                ]);
        }

        $examObjective->name = $request->name;
        $examObjective->description = $request->description;
        $examObjective->exam_id = $request->exam_id;
        $examObjective->updated_by = auth()->user()->id;

        $examObjective->save();

        return response()
            ->json([
                'status' => 'success',
                'message' => 'Exam objective updated successfully',
                'data' => $examObjective
            ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ExamObjective $examObjective)
    {
        // delete
        $examObjective->delete();

        return response()
            ->json([
                'status' => 'Success',
                'message' => 'Deleted exam objective successfully',
                'data' => null,
            ]);
    }
}
