<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login (Request $request) {

        $credentials = $request->validate([
          "email" => "required|string|max:255",
          "password" => "required|string|max:255"
        ]);

        $user = User::where("email", $credentials["email"])
                ->first();

        if (! $user || ! Hash::check($credentials["password"], $user->password)):

            return response()->json([
              "message" => "Invalid credentials!",
              "success" => false,
              "data" => null
            ], 401);

        endif;

        $existingToken = $user->tokens()->first();

        if ($existingToken):

            return response()->json([
              "message" => "User is already logged in!",
              "success" => false,
              "data" => null
            ], 403);

        endif;

        $token = $user->createToken("api-token")
                      ->plainTextToken;

        return response()->json([
          "message" => "Logged sucessful!",
          "success" => true,
          "data" => $user,
          "token" => $token
        ], 200);

    }

    public function logout (Request $request) {

        if (! $request->header("Authorization")):

            return response->json([
              "message" => "Where is the token??"
            ], 400);

        endif;

        $request->user()->tokens()->delete();

        return response()->noContent();

    }
}
