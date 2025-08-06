<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Models\Cart;
use App\Models\User_house;
use App\Models\Static_house;
use App\Models\User_wallet;

class UserController extends Controller
{

    public function show ($user_id) {

        $user = User::findOrFail($user_id);

        return response()->json([
          "message" => "OK",
          "data" => $user,
          "success" => true
        ], 200);

    }

    public function store (Request $request) {

        $validated = $request->validate([
          "name" => "required|string|max:255",
          "email" => "required|string|max:255",
          "password" => "required|string|max:255"
        ]);

        $user_test = User::where("email", $validated["email"])
                         ->first();

        if ($user_test):

            return response()->json([
              "message" => "User already exists!",
              "success" => false,
              "data" => null
            ], 409);

        endif;

        $hash = Hash::make($validated["password"]);

        $data = [
          "name" => $validated["name"],
          "email" => $validated["email"],
          "password" => $hash
        ];

        $user = User::create($data);

        User_wallet::create([
          "user_id" => $user->id,
          "balance" => 10000.00
        ]);

        Cart::create(["user_id" => $user->id]);

        User_house::create([
          "static_house_id" => 1,
          "user_id" => $user->id,
          "is_active" => true,
          "available_space" => Static_house::where("id", 1)->first()->capacity,
          "occupied_space" => 0.00
        ]);


        $user->wallet; // Load the wallet field in the return data

        return response()->json([
          "message" => "Created!",
          "data" => $user,
          "success" => true
        ], 201);

    }

    public function update (Request $request, $user_id) {

        $validated = $request->validate([
          "name" => "sometimes|string|max:255",
          "email" => "sometimes|string|max:255",
          "password" => "sometimes|string|max:255"
        ]);


        if (isset($validated["password"])):

            $validated["password"] =
            Hash::make($validated["password"]);

        endif;

        $user = User::findOrFail($user_id);

        $user->update($validated);

        $user->refresh();

        return response()->json([
          "message" => "Updated!",
          "data" => $user,
          "success" => true
        ], 200);

    }

    public function delete ($id) {

        $user = User::findOrFail($id);

        $user->delete();

        return response()->json([
          "message" => "Deleted!",
          "data" => null,
          "success" => true
        ], 204);

    }

}
