<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\User;
use App\Models\Cart_item;

class CartController extends Controller
{

    public function show ($user_id) {

        $user = User::findOrFail($user_id);

        $cart = $user->cart;

        $cart_items = $cart->items;

        $products_in_cart = [];

        foreach ($cart_items as $item):

            $product = $item->product;

            $products_in_cart[] = [
              "quantity" => $item->quantity,
              "product" => $product
            ];

        endforeach;

        return response()->json([
          "message" => "OK",
          "data" => $products_in_cart,
          "success" => true
        ], 200);

    }

    public function delete ($user_id) {

        $user = User::findOrFail($user_id);

        $cart = $user->cart;

        $cart_items = $cart->items;

        foreach ($cart_items as $item):

            $item->delete();

        endforeach;

        return response()->json([
          "message" => "Products removed from cart!!",
          "data" => null,
          "success" => true
        ], 200);

    }

}
