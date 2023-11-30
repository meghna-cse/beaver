<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TicketController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // check if raised by is set
        $raisedBy = \request()->query('raised_by');

        $tickets = Ticket::query();

        if ($raisedBy){
            $tickets = $tickets->where('raised_by','=',$raisedBy);
        }

        return response()
            ->json([
                'status' => 'success',
                'message' => 'Ticket retrieved successfully',
                'data' => $tickets->with(['raisedBy'])->get(),
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
            'title' => 'required|string',
            'description' => 'required|string',
            'priority_level' => 'required|string|in:Low,Medium,High',
        ];

        $validator = Validator::make($request->all(),$rules);

        if ($validator->fails()){
            return response()->json([
                'status' => 'failed',
                'message' =>implode(",",$validator->errors()->all()),
                'data' => $validator->errors()
            ], 400);
        }

        $ticket = new Ticket();

        $ticket->title = $request->title;
        $ticket->description = $request->description;
        $ticket->priority = $request->priority_level;
        $ticket->raised_by = auth()->user()->id;
        $ticket->created_by = auth()->user()->id;
        $ticket->status = 0;

        $ticket->save();

        return response()
            ->json([
                'status' => 'success',
                'message' => 'Ticket added successfully',
                'data' => $ticket,
            ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Ticket $ticket)
    {
        // fetch ticket
        return response()
            ->json([
                'status' => 'success',
                'message' => 'Ticket retrieved successfully',
                'data' => Ticket::query()->where('id','=',$ticket->id)
                    ->with(['raisedBy'])->get(),
            ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Ticket $ticket)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Ticket $ticket)
    {
        // validate request
        $rules = [
            'title' => 'required|string',
            'description' => 'required|string',
            'priority_level' => 'required|string|in:Low,Medium,High',
            'raised_by' => 'required|integer|exists:users,id',
        ];

        $validator = Validator::make($request->all(),$rules);

        if ($validator->fails()){
            return response()->json([
                'status' => 'failed',
                'message' =>implode(",",$validator->errors()->all()),
                'data' => $validator->errors()
            ], 400);
        }

        $ticket->title = $request->title;
        $ticket->description = $request->description;
        $ticket->priority = $request->priority_level;
        $ticket->raised_by = auth()->user()->id;
        $ticket->updated_by = auth()->user()->id;

        $ticket->save();

        return response()
            ->json([
                'status' => 'success',
                'message' => 'Ticket updated successfully',
                'data' => $ticket,
            ]);
    }

    public function toggleTicketStatus(Ticket $ticket)
    {
        // toggle the status of the ticket
        $ticket->status = !$ticket->status;
        $ticket->updated_by = auth()->user()->id;

        $ticket->save();

        return \response()
            ->json([
                'status' => 'success',
                'message' => 'Updated ticket status successfully',
                'data' => $ticket,
            ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ticket $ticket)
    {
        // delete
        $ticket->delete();

        return response()
            ->json([
                'status' => 'success',
                'message' => 'Ticket deleted successfully',
                'data' => null,
            ]);
    }
}
