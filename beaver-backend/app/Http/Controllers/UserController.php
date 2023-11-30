<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $role_id = \request()->query('role_id');

        // fetch all users
        $users = User::query();

        if ($role_id != null){
            $users = $users->where('role_id','=',$role_id);
        }

        // return response
        return response()->json([
            'success' => true,
            'message' => 'Users fetched successfully.',
            'data' => $users->get()
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
            'name' => 'required|string',
            'username' => 'required|string|unique:users,username',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string',
            'mobile' => 'required|string',
            'identification_number' => 'required|string|unique:users,identification_number',
            'role_id' => 'required|integer|exists:roles,id',
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'failed',
                'message' =>implode(",",$validator->errors()->all()),
                'data' => $validator->errors()
            ], 400);
        }

        // create user
        $user = new User();

        $user->name = $request->name;
        $user->username = $request->username;
        $user->email = strtolower($request->email);
        $user->password = bcrypt($request->password);
        $user->mobile = $request->mobile;
        $user->identification_number = $request->identification_number;
        $user->role_id = $request->role_id;

        $user->save();

        // return response
        return response()->json([
            'status' => 'success',
            'message' => 'User created successfully.',
            'data' => $user
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // get user
        $user = User::find($id);

        // check if user doesn't exist
        if (!$user) {
            return response()->json([
                'status' => 'failed',
                'message' => 'User not found.',
                'data' => null
            ], 404);
        }else{
            // return response
            return response()->json([
                'status' => 'success',
                'message' => 'User fetched successfully.',
                'data' => $user
            ], 200);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // validate request
        $rules = [
            'name' => 'required|string',
            'username' => 'required|string|unique:users,username,'.$id,
            'email' => 'required|email|unique:users,email,'.$id,
            'mobile' => 'required|string',
            'identification_number' => 'required|string|unique:users,identification_number,'.$id,
            'role_id' => 'required|integer|exists:roles,id',
        ];

        $validator = Validator::make($request->all(),$rules);

        if ($validator->fails()){
            return response()->json([
                'status' => 'failed',
                'message' =>implode(",",$validator->errors()->all()),
                'data' => $validator->errors()
            ], 400);
        }

        // get user
        $user = User::find($id);

        // check if user doesn't exist
        if (!$user) {
            return response()->json([
                'status' => 'failed',
                'message' => 'User not found.',
                'data' => null
            ], 404);
        }else{
            // update user
            $user->name = $request->name;
            $user->username = $request->username;
            $user->email = strtolower($request->email);
            $user->mobile = $request->mobile;
            $user->identification_number = $request->identification_number;
            $user->role_id = $request->role_id;

            $user->save();

            // return response
            return response()->json([
                'status' => 'success',
                'message' => 'User updated successfully.',
                'data' => $user
            ], 200);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // get user
        $user = User::find($id);

        // check if user doesn't exist
        if (!$user) {
            return response()->json([
                'status' => 'failed',
                'message' => 'User not found.',
                'data' => null
            ], 404);
        }else{
            // delete user
            $user->delete();

            // return response
            return response()->json([
                'status' => 'success',
                'message' => 'User deleted successfully.',
                'data' => null
            ], 204);
        }
    }

    // login
    public function login(Request $request)
    {
        // validate request
        $rules = [
            'username' => 'required|string',
            'password' => 'required|string',
        ];

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()){
            return response()->json([
                'status' => 'failed',
                'message' =>implode(",",$validator->errors()->all()),
                'data' => $validator->errors()
            ], 400);
        }

        // attempt login
        if (auth()->attempt($request->only('username', 'password'))) {
            // get user
            $user = auth()->user();

            // create token
            $token = $user->createToken('admin')->plainTextToken;

            // return response
            return response()->json([
                'status' => 'success',
                'message' => 'User logged in successfully.',
                'data' => [
                    'user' => $user,
                    'token' => $token
                ]
            ], 200);
        }else{
            // return response
            return response()->json([
                'status' => 'failed',
                'message' => 'Invalid username or password.',
                'data' => null
            ], 401);
        }
    }


    // logout
    public function logout(Request $request)
    {
        // get user
        $user = $request->user();

        // delete token
        $user->tokens()->delete();

        // return response
        return response()->json([
            'status' => 'success',
            'message' => 'User logged out successfully.',
            'data' => null
        ], 200);
    }

    // change password
    public function changePassword(Request $request)
    {
        // validate request
        $rules = [
            'old_password' => 'required|string',
            'new_password' => 'required|string',
        ];

        $validator = Validator::make($request->all(),$rules);

        if ($validator->fails()){
            return response()->json([
                'status' => 'failed',
                'message' =>implode(",",$validator->errors()->all()),
                'data' => $validator->errors()
            ], 400);
        }

        // get user
        $user = $request->user();

        // check if old password is correct
        if (!auth()->attempt(['username' => $user->username, 'password' => $request->old_password])) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Invalid old password.',
                'data' => null
            ], 401);
        }else{
            // update password
            $user->password = bcrypt($request->new_password);

            $user->save();

            // return response
            return response()->json([
                'status' => 'success',
                'message' => 'Password changed successfully.',
                'data' => null
            ], 200);
        }
    }

    public function deactivateUser(User $user)
    {
        // check if the request has been made by the administrator
        if (auth()->user()->role_id != 3){
            return response()->json([
                'status' => 'failed',
                'message' => 'You are not authorized to perform this action.',
                'data' => null
            ], 401);
        }

        // deactivate user
        $user->status = !$user->status;
        $user->updated_by = auth()->user()->id;

        $user->save();

        return \response()
            ->json([
                'status' => 'success',
                'message' => 'Deactivated user successfully',
                'data' => $user,
            ]);
    }
}
