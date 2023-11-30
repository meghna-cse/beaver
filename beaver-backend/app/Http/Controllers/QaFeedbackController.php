<?php

namespace App\Http\Controllers;

use App\Models\QaFeedback;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class QaFeedbackController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // filter according to qa id, exam id, course objective id, course id
        $qaId = \request()->query('qa_id');
        $examId = \request()->query('exam_id');
        $courseObjectiveId = \request()->query('course_objective_id');
        $courseId = \request()->query('course_id');

        $qaFeedback = QaFeedback::query();

        if ($qaId != null){
            $qaFeedback = $qaFeedback->where('created_by','=',$qaId);
        }

        if ($examId != null){
            $qaFeedback = $qaFeedback->where('exam_id','=',$examId);
        }

        if ($courseObjectiveId != null){
            $qaFeedback = $qaFeedback->where('course_objective_id','=',$courseObjectiveId);
        }

        if ($courseId != null){
            $qaFeedback = $qaFeedback->whereHas('courseObjective', function ($query) use($courseId){
                $query->where('course_id','=',$courseId);
            });
            $qaFeedback = $qaFeedback->orWhereHas('exam', function ($query) use($courseId){
                $query->whereHas('course', function ($query) use($courseId){
                    $query->where('id','=',$courseId);
                });
            });
        }

        $qaFeedback = $qaFeedback->with(['exam','courseObjective']);

        return response()
            ->json([
                'status' => 'Success',
                'message' => 'Fetched qa feedback successfully',
                'data' => $qaFeedback->get(),
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
            'exam_id' => 'sometimes|exists:exams,id',
            'course_objective_id' => 'sometimes|required_if:exam_id,null|exists:course_objectives,id',
            'comment' => 'required|string',
        ];

        $validator = Validator::make($request->all(),$rules);

        if ($validator->fails()){
            return response()
                ->json([
                    'status' => 'Failed adding qa feedback',
                    'message' => implode(" ", $validator->messages()->all(":message")),
                    'data' => $validator->errors(),
                ],422);
        }

        $qaFeedback = new QaFeedback();

        $qaFeedback->exam_id = $request->exam_id;
        $qaFeedback->course_objective_id = $request->course_objective_id;
        $qaFeedback->comment = $request->comment;
        $qaFeedback->created_by = auth()->user()->id;

        $qaFeedback->save();

        return response()
            ->json([
                'status' => 'Success',
                'message' => 'Created qa feedback successfully',
                'data' => $qaFeedback,
            ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(QaFeedback $qaFeedback)
    {
        $qaFeedback = QaFeedback::query()
            ->where('id','=',$qaFeedback->id)
            ->with(['exam','courseObjective'])
            ->get();

        return response()
            ->json([
                'status' => 'Success',
                'message' => 'Retrieved successfully',
                'data' => $qaFeedback,
            ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(QaFeedback $qaFeedback)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, QaFeedback $qaFeedback)
    {
        // update
        $rules = [
            'exam_id' => 'sometimes|exists:exams,id',
            'course_objective_id' => 'sometimes|required_if:exam_id,null|exists:course_objectives,id',
            'comment' => 'required|string',
        ];

        $validator = Validator::make($request->all(),$rules);

        if ($validator->fails()){
            return response()
                ->json([
                    'status' => 'Failed updating qa feedback',
                    'message' => implode(" ", $validator->messages()->all(":message")),
                    'data' => $validator->errors(),
                ]);
        }

        $qaFeedback->exam_id = $request->exam_id;
        $qaFeedback->course_objective_id = $request->course_objective_id;
        $qaFeedback->comment = $request->comment;
        $qaFeedback->updated_by = auth()->user()->id;

        $qaFeedback->save();

        return response()
            ->json([
                'status' => 'Success',
                'message' => 'Updated qa feedback successfully',
                'data' => $qaFeedback,
            ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(QaFeedback $qaFeedback)
    {
        // delete
        $qaFeedback->delete();

        return response()
            ->json([
                'status' => 'Success',
                'message' => 'Successfully deleted qa feedback',
                'data' => null,
            ]);
    }
}
