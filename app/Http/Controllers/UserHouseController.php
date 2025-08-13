<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User_house;
use App\Models\User;
use App\Models\Static_house;
use App\Models\House_product;
use App\Models\User_wallet;

class UserHouseController extends Controller
{
    public function index ($user_id) {

        $user = User::findOrFail($user_id);

        $houses = $user->houses;

        $data = [];

        foreach ($houses as $house):

            $static_house = Static_house::find($house->static_house_id);

            $subData = [
              "name" => $static_house->name,
              "description" => $static_house->description,
              "cost" => $static_house->cost,
              "capacity" => $static_house->capacity,
              "image_path" => $static_house->image_path,
              "occupied_space" => $house->occupied_space,
              "available_space" => $house->available_space,
              "is_active" => $house->is_active
            ];

            $data[] = $subData;

        endforeach;

        return response()->json([
          "success" => true,
          "message" => "OK",
          "data" => $data
        ], 200);

    }

    public function store ($user_id, $static_house_id) {

        $user = User::find($user_id);

        if (! $user):

            return response()->json([
              "message" => "No user found with id $user_id",
              "success" => false,
              "data" => null
            ], 400);

        endif;


        $static_house = Static_house::find($static_house_id);

        if (! $static_house):

            return response()->json([
              "message" => "Static house with id $static_house_id not found",
              "success" => false,
              "data" => null
            ], 404);

        endif;


        $wallet = $user->wallet;

        if ($static_house->cost > $wallet->balance):

            return response()->json([
              "message" => "The cost of the house is greater than the balance in user wallet",
              "success" => false,
              "data" => null
            ], 409);

        endif;


        $user_have_no_houses = true;

        foreach ($user->houses as $house):

            $user_have_no_houses = false;

            if ($house->static_house_id === $static_house->id):

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
          "is_active" => $user_have_no_houses ? true : false,
          "occupied_space" => 0.00,
          "available_space" => $static_house->capacity
        ]);


        $wallet->balance = bcsub($wallet->balance, $static_house->cost, 2);

        $wallet->save();

        $data = [
          "house" => $house,
          "updated_user_balance" => $wallet->balance
        ];

        return response()->json([
          "message" => "Created!",
          "success" => true,
          "data" => $data
        ], 201);

    }

    public function destroy ($user_id, $static_house_id) {

        $user = User::find($user_id);

        if (! $user):

            return response()->json([
              "message" => "User with id $user_id not found",
              "success" => false,
              "data" => null
            ], 404);

        endif;

        $house = User_house::where("static_house_id", $static_house_id)
                           ->where("user_id", $user->id)
                           ->first();

        if (! $house):

            return response()->json([
              "message" => "User house with id $static_house_id not found",
              "success" => false,
              "data" => null
            ], 404);

        endif;

        $wallet = $user->wallet;

        $products = $house->products;

        $totalMoney = Static_house::find($static_house_id)->cost / 2;

        foreach ($products as $product):

            $realProduct = $product->product;

            $totalMoney = bcadd($totalMoney, ($realProduct->price / 2) * $product->quantity, 2);

        endforeach;

        $wallet->balance = bcadd($wallet->balance, $totalMoney, 2);

        $wallet->save();

        $house->delete();

        $data = [
          "total_money_earned" => $totalMoney,
          "updated_user_balance" => $wallet->balance
        ];

        return response()->json([
          "message" => "Deleted!",
          "success" => true,
          "data" => $data
        ], 200);

    }

    public function deleteProduct ($user_id, $house_id, $product_id, Request $request) {

        $validated = $request->validate([
          "quantity" => "numeric"
        ]);

        $user = User::findOrFail($user_id);

        $house = User_house::where("user_id", $user_id)
                           ->where("static_house_id", $house_id)
                           ->first();

        if (! $house):

            return response()->json([
              "message" => "house with id $house_id not found",
              "success" => false,
              "data" => null
            ], 400);

        endif;

        $product = House_product::where("product_id", $product_id)
                                ->where("user_house_id", $house->id)
                                ->first();

        if (! $product):

            return response()->json([
              "message" => "product with id " . $product_id . " not found in user house with id " . $house->static_house_id,
              "success" => false,
              "data" => null
            ], 400);

        endif;

        if ($validated["quantity"] > $product->quantity):

            return response()->json([
              "message" => "Quantity solicited is greater than product quantity in the house",
              "success" => false,
              "data" => null
            ], 409);

        endif;

        $volume = $product->product->volume() * $validated["quantity"];

        $house->occupied_space -= $volume;

        $house->available_space += $volume;

        $house->save();

        $wallet = $user->wallet;

        $moneyEarned = ($product->product->price / 2) * $validated["quantity"];

        $wallet->balance = bcadd($wallet->balance, $moneyEarned, 2);

        $wallet->save();

        $product->delete();

        $data = [
          "total_money_earned" => $moneyEarned,
          "house" => [
            "available_space" => $house->available_space,
            "capacity" => $house->static_house->capacity
          ]
        ];

        return response()->json([
          "message" => "Deleted!",
          "success" => true,
          "data" => $data
        ], 200);

    }

    public function deleteAllProducts ($user_id, $house_id) {

       $user = User::find($user_id);

       if (! $user):

           return response()->json([
             "message" => "user with id $user_id not found",
             "success" => false,
             "data" => null
           ], 400);

       endif;

       $house = User_house::where("user_id", $user_id)
                          ->where("static_house_id", $house_id)
                          ->first();

       if (! $house):

           return response()->json([
             "message" => "user house with id $house_id not found",
             "success" => false,
             "data" => null
           ], 400);

       endif;

       $wallet = $user->wallet;

       $moneyEarned = 0.00;

       $there_are_items = false; // Check if there is any item in house

       foreach ($house->products as $product):

           $there_are_items = true;

           $realProduct = $product->product;

           $volume = $realProduct->volume() * $product->quantity;

           $house->occupied_space -= $volume;

           $house->available_space += $volume;

           $house->save();

           $moneyEarned += ($realProduct->price / 2) * $product->quantity;

       endforeach;

       if (! $there_are_items):

           return response()->json([
             "message" => "there are no items in user house with id $house_id",
             "success" => false,
             "data" => null
           ], 400);

       endif;

       House_product::where("user_house_id", $house->id)
                    ->delete();

       $wallet->balance = bcadd($wallet->balance, $moneyEarned, 2);

       $wallet->save();

       $data = [
         "total_money_earned" => $moneyEarned,
         "house" => [
           "available_space" => $house->available_space,
           "capacity" => $house->static_house->capacity
         ]
       ];

       return response()->json([
         "message" => "Deleted!",
         "success" => true,
         "data" => $data
       ], 200);

    }

    public function house_activation ($user_id, $static_house_id, Request $request) {

        $validated = $request->validate([
          "activate" => "required|boolean"
        ]);

        $user = User::find($user_id);

        if (! $user):

            return response()->json([
              "message" => "User with id $user_id not found",
              "success" => false,
              "data" => null
            ], 400);

        endif;

        $house = User_house::where("static_house_id", $static_house_id)
                           ->where("user_id", $user_id)
                           ->first();

        if (! $house):

            return response()->json([
              "message" => "House $static_house_id not found",
              "success" => false,
              "data" => null
            ], 400);

        endif;

        if ($validated["activate"]): // If it's to activate

            $active_house = $user->houses
                                  ->where("is_active", $validated["activate"])
                                  ->first();

            if ($active_house):

                if ($active_house->static_house_id === $house->static_house_id):

                    return response()->json([
                      "message" => "House $static_house_id is already active",
                      "success" => false,
                      "data" => null
                    ], 409);

                endif;

                $active_house->is_active = false;
                $active_house->save();

            endif;

            $house->is_active = true;
            $house->save();

            $houseData = [
              "user_id" => $house->user_id,
              "static_house_id" => $house->static_house_id,
              "is_active" => true,
              "occupied_space" => $house->occupied_space,
              "available_space" => $house->available_space
            ];


            $data = [
              "active_house" => $houseData
            ];

            return response()->json([
              "message" => "House $static_house_id now is active",
              "success" => true,
              "data" => $data
            ], 200);

        else:

            $house_active = $user->houses
                                 ->where("is_active", true)
                                 ->first();

            if (! $house_active):

                return response()->json([
                  "message" => "House $static_house_id is not active",
                  "success" => false,
                  "data" => null
                ], 400);

            endif;

            $house_active->is_active = false;

            $house_active->save();

            $houseData = [
              "user_id" => $house_active->user_id,
              "static_house_id" => $house_active->static_house_id,
              "is_active" => false,
              "occupied_space" => $house_active->occupied_space,
              "available_space" => $house_active->available_space
            ];

            $data = [
              "updated_house" => $houseData
            ];

            return response()->json([
              "message" => "House $static_house_id is now not active",
              "success" => true,
              "data" => $data
            ], 200);

        endif;

    }

}
