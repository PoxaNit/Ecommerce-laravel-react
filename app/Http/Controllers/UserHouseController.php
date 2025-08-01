<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User_house;
use App\Models\User;
use App\Models\Static_house;
use App\Models\House_product;

class UserHouseController extends Controller
{
    public function index ($user_id) {

        $user = User::findOrFail($user_id);

        $houses = $user->houses();

        return response()->json([
          "success" => true,
          "message" => "OK",
          "data" => $houses
        ], 200);

    }

    public function store ($user_id, $static_house_id) {

        $user = User::findOrFail($user_id);

        $static_house = Static_house::findOrFail($static_house_id);

        foreach ($user->houses() as $house):

            if ($house->id === $static_house->id):

                return response()->json([
                  "message" => "User already have house with id '$static_house_id'",
                  "success" => false,
                  "data" => null
                ], 409);

            endif;

        endforeach;

        $house = User_house::create([
          "user_id" => $user->id,
          "static_house_id" => $static_house->id,
          "is_active" => false
        ]);

        return response()->json([
          "message" => "Created!",
          "success" => true,
          "data" => $house
        ], 201);

    }

    public function destroy ($user_id, $static_house_id) {

        $user = User::findOrFail($user_id);

        $house = User_house::findOrFail($static_house_id);

        $house->delete();

        return response()->json([
          "message" => "Deleted!",
          "success" => true,
          "data" => null
        ], 200);

    }

    public function deleteProduct ($user_id, $house_id, $product_id) {

        $user = User::findOrFail($user_id);

        $house = User_house::findOrFail($house_id);

        House_product::where("user_house_id", $house->id)
                     ->where("product_id", $product_id)
                     ->delete();

        return response()->json([
          "message" => "Deleted!",
          "success" => true,
          "data" => null
        ], 200);

    }

    public function deleteAllProducts ($user_id, $house_id) {

       $user = User::findOrFail($user_id);

       $house = User_house::findOrFail($house_id);

       House_product::where("user_house_id", $house->id)
                      ->delete();

       return response()->json([
         "message" => "Deleted!",
         "success" => true,
         "data" => null
       ], 200);

    }

}
