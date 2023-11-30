<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($sender_id,$receiver_id)
    {
        $messages = Message::query()
            ->where(function ($query) use ($sender_id,$receiver_id){
                return $query->where('sender_id',$sender_id)
                    ->orWhere('receiver_id',$sender_id);
            })
            ->where(function ($query) use ($receiver_id){
                return $query->where('sender_id',$receiver_id)
                    ->orWhere('receiver_id',$receiver_id);
            })
            ->with(['sender','receiver'])
            ->orderBy('created_at','asc')
            ->get();

        return response()
            ->json([
                'status' => 'Success',
                'message' => 'Retrieved chat successfully',
                'data' => $messages
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
            'sender_id' => 'required|integer|exists:users,id',
            'receiver_id' => 'required|integer|exists:users,id',
            'message_content' => 'required|string',
        ];

        $validator = Validator::make($request->all(),$rules);

        if($validator->fails()){
            return response()
                ->json([
                    'status' => 'Failed',
                    'message' => implode(" ",$validator->messages()->all(':message')),
                    'data' => null,
                ]);
        }

        $message = new Message();

        $message->sender_id = $request->sender_id;
        $message->receiver_id = $request->receiver_id;
        $message->content = $request->message_content;
        $message->message_time = now();
        $message->created_by = auth()->user()->id;

        $message->save();

        return response()
            ->json([
                'status' => 'success',
                'message' => 'Message sent successfully',
                'data' => $message
            ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Message $message)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Message $message)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Message $message)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Message $message)
    {
        //
    }
}
