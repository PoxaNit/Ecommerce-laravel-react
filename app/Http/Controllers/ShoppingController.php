<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Product;
use App\Models\Cart_item;

class ShoppingController extends Controller
{

    public function addToCart (Request $request, $user_id, $product_id) {

        $validated = $request->validate([
          "quantity" => "required|numeric|min:1"
        ]);

        $product = Product::findOrFail($product_id);

        if ($validated["quantity"] > $product->stock):

            return response()->json([
              "message" => "Quantity solicited is greater than stock!",
              "data" => null,
              "success" => false
            ], 422);

        endif;

        $user = User::findOrFail($user_id);

        $cart = $user->cart;

        if ( // If item already exists in cart with any quantity
            $cart_item = Cart_item::where("product_id", $product->id)
                         ->where("cart_id", $cart->id)
                         ->first()
           ):

            $cart_item->quantity += $validated["quantity"];

            $cart_item->save();

        else:

            $validated["cart_id"] = $cart->id;

            $validated["product_id"] = $product->id;

            $cart_item = Cart_item::create($validated);


        endif;

        return response()->json([
          "message" => "Product added to cart!",
          "data" => $cart_item->product,
          "success" => true
        ], 200);

    }

    public function removeFromCart (Request $request, $user_id, $product_id) {

        $validated = $request->validate([
          "quantity" => "required|numeric"
        ]);

        if ($validated["quantity"] <= 0):

            return response()->json([
              "message" => "Quantity must be greater than zero!",
              "data" => null,
              "success" => false
            ], 422);

        endif;

        $user = User::findOrFail($user_id);

        $cart = $user->cart;

        $cart_item = Cart_item::where("cart_id", $cart->id)
                     ->where("product_id", $product_id)
                     ->firstOrFail();

        $quantity_in_cart = $cart_item->quantity;


      // Check if it is to remove from cart or just decrease the amount from cart
        if ($validated["quantity"] >= $quantity_in_cart):

            $cart_item->delete();

            return response()->json([
              "message" => "Product removed from cart!",
              "data" => null,
              "success" => true
            ], 204);

        endif;

        $cart_item->quantity -= $validated["quantity"];

        $cart_item->save();

        return response()->json([
          "message" => $cart_item->product->name . " removed from cart (" . $validated["quantity"] . " items)!",
          "data" => $cart_item->product,
          "success" => true
        ], 200);

    }

    public function checkout ($user_id) {

        $user = User::findOrFail($user_id);

        $cart = $user->cart;

        $cart_items = Cart_item::where("cart_id", $cart->id)
                                 ->get();

        if (! isset($cart_items[0])):

            return response()->json([
              "message" => "There is no items in the cart!",
              "data" => null,
              "success" => false
            ], 422);

        endif;

        $quantity_out_of_stock = []; // Items with quantity solicited out of stock

        foreach ($cart_items as $item):

          // Verifying if item quantity is out of stock

            $product = $item->product;

            if ($item->quantity > $product->stock):

                $quantity_out_of_stock[] = $product->name;

            endif;

        endforeach;



        if (isset($quantity_out_of_stock[0])):

            return response()->json([
              "message" => "Quantity solicited is greater than stock: " . implode(", ", $quantity_out_of_stock),
              "data" => null,
              "success" => false
            ], 422);

        endif;



        foreach ($cart_items as $item):

            $product = $item->product;

            $product->stock -= $item->quantity;

            $product->save();

          // Taking off the items from the cart...
            $item->delete();

        endforeach;

        return response()->json([
          "message" => "purchase made!",
          "data" => null,
          "success" => true
        ], 200);

    }

}
