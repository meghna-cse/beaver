<?php

namespace App\Http\Controllers;

use App\Models\ExamFormat;
use Illuminate\Http\Request;

class ExamFormatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // exam formats
        return response()->json([
            'status' => 'success',
            'message' => 'Exam formats fetched successfully.',
            'data' => ExamFormat::all('id','format')
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(ExamFormat $examFormat)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ExamFormat $examFormat)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ExamFormat $examFormat)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ExamFormat $examFormat)
    {
        //
    }
}
