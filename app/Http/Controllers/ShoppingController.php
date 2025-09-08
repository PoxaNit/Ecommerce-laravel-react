<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Product;
use App\Models\Cart_item;
use App\Models\House_product;
use App\Models\User_house;
use App\Models\User_wallet;
use App\Models\Order;
use App\Models\Order_item;

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

        if ( // If item already exists in cart in any quantity
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
          "data" => $cart->items,
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
              "data" => $cart->items,
              "success" => true
            ], 200);

        endif;

        $cart_item->quantity -= $validated["quantity"];

        $cart_item->save();

        return response()->json([
          "message" => $cart_item->product->name . " removed from cart (" . $validated["quantity"] . " items)!",
          "data" => $cart->items,
          "success" => true
        ], 200);

    }

    public function checkout ($user_id) {

        $user = User::find($user_id);

        if (! $user):

            return response()->json([
              "message" => "user with id " . $user_id . " not found",
              "success" => false,
              "data" => null
            ], 400);

        endif;

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




        $items_info = [];

        $wallet = $user->wallet;

        $totalCost = 0.00;


        foreach ($cart_items as $item):

            $product = Product::find($item->product_id);

            $subtotal = bcadd(0, $product->price * $item->quantity, 2);

            $items_info[] = [
              "product_id" => $product->id,
	      "subtotal" => $subtotal,
	      "quantity" => $item->quantity,
	      "price_each" => $product->price
            ];

            $totalCost = bcadd($totalCost, $subtotal, 2);

        endforeach;


        if ($wallet->balance < $totalCost):

            return response()->json([
              "message" => "Insufficient balance",
              "success" => false,
              "data" => null
            ], 400);

        endif;


        $house = User_house::where("user_id", $user->id)
                           ->where("is_active", true)
                           ->first();

        if (! $house) {

            return response()->json([
              "message" => "No active house found!",
              "success" => false,
              "data" => null
            ], 422);

        }

        $totalVolume = 0.00;


        foreach ($cart_items as $item):

            $product = $item->product;

            $totalVolume = bcadd($totalVolume, $product->volume() * $item->quantity, 2);

        endforeach;


        if ($totalVolume > $house->available_space):

            return response()->json([
              "message" => "Insufficient space in the house!",
              "success" => false,
              "data" => null
            ], 409);

        endif;


     // Decreasing product stock and creating records on house_products table
        foreach ($cart_items as $item):

            $product = $item->product;

            $product->stock -= $item->quantity;

            $product->save();

            if (
                House_product::where("product_id", $product->id)
                             ->where("user_house_id", $house->id)
                             ->doesntExist()
               ):

                House_product::create([
                  "product_id" => $product->id,
                  "user_house_id" => $house->id,
                  "quantity" => $item->quantity
                ]);

            else:

                $house_product = House_product::where("product_id", $product->id)
                                              ->where("user_house_id", $house->id)
                                              ->first();

                $house_product->quantity += $item->quantity;

                $house_product->save();

            endif;

          // Taking off the items from the cart...
            $item->delete();

        endforeach;

        $house->occupied_space += $totalVolume;

        $house->available_space -= $totalVolume;

        $house->save();

        $wallet->balance = bcsub($wallet->balance, $totalCost, 2);

        $wallet->save();


        $order = Order::create([
          "user_id" => $user_id,
          "total_paid" => $totalCost
        ]);


        foreach ($items_info as $item):

            Order_item::create([
	      "order_id" => $order["id"],
	      "quantity" => $item["quantity"],
	      "price_each" => $item["price_each"],
	      "subtotal" => $item["subtotal"],
	      "product_id" => $item["product_id"]
	    ]);

        endforeach;

        $data = [
          "total_cost" => $totalCost,
          "total_products_volume" => $totalVolume,
          "house_id" => $house->static_house_id,
          "user_balance" => $wallet->balance
        ];

        return response()->json([
          "message" => "purchase made!",
          "data" => $data,
          "success" => true
        ], 200);

    }

}
