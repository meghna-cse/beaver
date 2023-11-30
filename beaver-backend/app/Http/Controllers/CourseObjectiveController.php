<?php

namespace App\Http\Controllers;

use App\Models\CourseObjective;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CourseObjectiveController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // check if course is defined
        $course = \request()->get('course');

        // list the various objectives
        $courseObjectives = CourseObjective::query();

        if ($course != null){
            $courseObjectives = $courseObjectives
                ->where('course_id','=',$course);
        }

        return response()
            ->json([
               'status'=>'success',
                'message'=>'Fetched course objectives successfully',
                'data'=>$courseObjectives->get(),
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
            'course_id' => 'required|integer|exists:courses,id',
        ];

        $validator = Validator::make($request->all(),$rules);


        if ($validator->fails()){
            return response()->json([
                'success' => false,
                'message' =>implode(",",$validator->errors()->all()),
                'data' => $validator->errors()
            ], 400);
        }

        $courseObjective = new CourseObjective();

        $courseObjective->name = $request->name;
        $courseObjective->description = $request->description;
        $courseObjective->course_id = $request->course_id;
        $courseObjective->created_by = auth()->user()->id;
        $courseObjective->status = 1;

        $courseObjective->save();

        return response()
            ->json([
                'status' => 'success',
                'message' => 'Course objective created successfully',
                'data' => $courseObjective,
            ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(CourseObjective $courseObjective)
    {
        // retrieve course objective
        return response()
            ->json([
                'status'=>'success',
                'message'=>'Course objective retrieved successfully',
                'data'=>$courseObjective,
            ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CourseObjective $courseObjective)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CourseObjective $courseObjective)
    {
        // validate request
        $rules = [
            'name' => 'required|string',
            'description' => 'required|string',
            'course_id' => 'required|integer|exists:courses,id',
        ];

        $validator = Validator::make($request->all(),$rules);

        if ($validator->fails()){
            return response()->json([
                'success' => false,
                'message' =>implode(",",$validator->errors()->all()),
                'data' => $validator->errors()
            ], 400);
        }

        $courseObjective->name = $request->name;
        $courseObjective->description = $request->description;
        $courseObjective->course_id = $request->course_id;
        $courseObjective->updated_by = auth()->user()->id;

        $courseObjective->save();

        return response()
            ->json([
                'status' => 'success',
                'message' => 'Course objective updated successfully',
                'data' => $courseObjective
            ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CourseObjective $courseObjective)
    {
        // delete
        $courseObjective->delete();

        return response()
        ->json([
            'status' => 'success',
            'message' => 'Course objective deleted successfully',
            'data' => null
        ]);
    }
}
