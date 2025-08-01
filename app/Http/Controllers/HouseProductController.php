<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\House_product;
use App\Models\User_house;

class HouseProductController extends Controller
{

    public function index ($user_id) {

        $user = User::findOrFail($user_id);

        $houses = $user->houses();

        $products = [];

        foreach ($houses as $house):

            $products[] = $house->products();

        endforeach;

        return response()->json([
          "message" => "OK",
          "data" => $products,
          "success" => true
        ], 200);

    }

    public function show ($user_id, $house_id) {

        $user = User::findOrFail($user_id);

        $house = User_house::findOrFail($house_id);

        $products = $house->products();

        return response()->json([
          "message" => "OK",
          "data" => $products,
          "success" => true
        ], 200);

    }

    public function deleteAll ($user_id) {

        $user = User::findOrFail($user_id);

        $houses = $user->houses();

        foreach ($houses as $house):

            $products = $house->products();

            foreach ($products as $product):

                House_product::where("user_house_id", $house->id)
                             ->where("product_id", $product->id)
                             ->delete();
            endforeach;

        endforeach;


        return reponse()->json([
          "message" => "Deleted!",
          "success" => true,
          "data" => null
        ], 200);

    }

    public function destroy ($user_id, $product_id) {

        $user = User::findOrFail($user_id);

        $houses = $user->houses();

        foreach ($houses as $house):

            House_product::where("user_house_id", $house->id)
                         ->where("product_id", $product_id)
                         ->delete();

        endforeach;

        return response()->json([
          "message" => "Deleted!",
          "success" => true,
          "data" => null
        ], 200);

    }

}
