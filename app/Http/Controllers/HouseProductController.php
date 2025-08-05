<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\House_product;
use App\Models\User_house;
use App\Models\User_wallet;
use App\Models\Product;

class HouseProductController extends Controller
{

    public function index ($user_id) {

        $user = User::findOrFail($user_id);

        $houses = $user->houses;

        $products = [];

        foreach ($houses as $house):

            foreach ($house->products as $product):

                $products[] = $product->product;

            endforeach;

        endforeach;

        return response()->json([
          "message" => "OK",
          "data" => $products,
          "success" => true
        ], 200);

    }

    public function show ($user_id, $house_id) {

        $user = User::findOrFail($user_id);

        $house = User_house::where("static_house_id", $house_id)
                           ->where("user_id", $user->id)
                           ->first();

        if (! $house):

            return response()->json([
              "message" => "It wasn't possible to found user house with id " . $house_id,
              "success" => false,
              "data" => null
            ], 400);

        endif;

        $house_items = $house->products;

        $products = [];

        foreach ($house_items as $item):

            $products[] = $item->product;

        endforeach;

        $data = [
          "quantity_of_products" => count($products),
          "products" => $products
        ];

        return response()->json([
          "message" => "OK",
          "data" => $data,
          "success" => true
        ], 200);

    }

    public function deleteAll ($user_id) {

        $user = User::find($user_id);

        if (! $user):

            return response()->json([
              "message" => "User with id $user_id not found",
              "success" => false,
              "data" => null
            ], 400);

        endif;

        $wallet = $user->wallet;

        $houses = $user->houses;

        $totalMoney = 0.00; // (Earned back)

        foreach ($houses as $house):

            $products = $house->products;

            $there_are_items = false;

            foreach ($products as $product):

                $there_are_items = true;

                $realProduct = $product->product;

                $volume = ($realProduct->volume() * $product->quantity);

                $house->occupied_space -= $volume;

                $house->available_space += $volume;

                $house->save();

                $totalMoney = bcadd($totalMoney, ($realProduct->price / 2) * $product->quantity, 2);

                House_product::where("user_house_id", $house->id)
                             ->where("product_id", $realProduct->id)
                             ->delete();

            endforeach;

        endforeach;

            if (! $there_are_items):

                return response()->json([
                  "message" => "there are no items in any user house",
                  "success" => false,
                  "data" => null
                ], 200);

            endif;


        $wallet->balance = bcadd($wallet->balance, $totalMoney, 2);

        $wallet->save();

        $data = [
          "total_money_earned" => $totalMoney
        ];

        return response()->json([
          "message" => "Deleted!",
          "success" => true,
          "data" => $data
        ], 200);

    }

    public function deleteProduct ($user_id, $product_id) {

        $user = User::findOrFail($user_id);

        $houses = $user->houses;

        $wallet = $user->wallet;

        $totalMoney = 0.00;

        foreach ($houses as $house):

            $product = House_product::where("user_house_id", $house->id)
                                      ->where("product_id", $product_id)
                                      ->first();


            if (! $product):

                return response()->json([
                  "message" => "there is not any product with id $product_id in user inventory",
                  "success" => false,
                  "data" => null
                ], 400);

            endif;

            $realProduct = $product->product;

            $volume = ($realProduct->volume() * $product->quantity);

            $house->occupied_space -= $volume;

            $house->available_space += $volume;

            $house->save();

            $totalMoney = bcadd($totalMoney, ($realProduct->price / 2) * $product->quantity, 2);


            $product->delete();

        endforeach;


        $wallet->balance = bcadd($wallet->balance, $totalMoney, 2);

        $wallet->save();


        $data = [
          "total_money_earned" => $totalMoney
        ];

        return response()->json([
          "message" => "Deleted!",
          "success" => true,
          "data" => $data
        ], 200);

    }

}
