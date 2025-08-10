<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Static_house;
use App\Models\User_house;
use App\Models\User;

class StaticHousesController extends Controller
{

    public function index ($user_id) {

        $user = User::find($user_id);

        if (! $user):

            return response()->json([
              "message" => "User with ID $user_id not found",
              "success" => false,
              "data" => null
            ], 400);

        endif;

        $static_houses = Static_house::all();

        $user_houses = $user->houses;

        $houses = [];

        foreach ($static_houses as $static_house):

            $user_house = $user_houses->where("static_house_id", $static_house->id)
                                      ->first();

            if ($user_house):

                $products = [];

                foreach ($user_house->products as $product):

                    $item = [
                      "quantity" => $product->quantity,
                      "product" => $product->product
                    ];

                    $products[] = $item;

                endforeach;

                $data = [
                  "name" => $static_house->name,
                  "description" => $static_house->description,
                  "cost" => $static_house->cost,
                  "capacity" => $static_house->capacity,
                  "image_path" => $static_house->image_path,
                  "available_space" => $user_house->available_space,
                  "occupied_space" => $user_house->occupied_space,
                  "is_active" => $user_house->is_active,
                  "belongs_to_user" => true,
                  "house_id" => $user_house->static_house_id,
                  "itens" => $products
                ];

            else:

                $data = [
                  "name" => $static_house->name,
                  "description" => $static_house->description,
                  "cost" => $static_house->cost,
                  "capacity" => $static_house->capacity,
                  "image_path" => $static_house->image_path,
                  "belongs_to_user" => false,
                  "house_id" => $static_house->id
                ];

            endif;

            $houses[] = $data;

        endforeach;

        return response()->json([
          "message" => "OK",
          "success" => true,
          "data" => $houses
        ], 200);

    }

}
