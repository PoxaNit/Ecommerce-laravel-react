<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Discount;
use App\Models\Product;

class DiscountController extends Controller
{


    public function index () {

        return Discount::all();

    }

    public function makeDiscount ($product_id, Request $request) {

        $validated = $request->validate([
          "discountPercent" => "required|numeric|min:0.00|max:100.00",
          "starts_at" => "nullable|date",
          "ends_at" => "required|date|after_or_equal:start_at"
        ]);

        $product = Product::find($product_id); // Verify if product_id is a valid id

        if (!$product):

            return response()->json([
              "message" => "Product with with $product_id not found",
              "data" => null,
              "success" => false
            ], 400);

        endif;

        $starts_at = $validated["starts_at"] ?? null;

        Discount::create([
          "product_id" => $product_id,
          "percent" => $validated["discountPercent"],
          "starts_at" => $validated["starts_at"] ?? null,
          "ends_at" => $validated["ends_at"],
          "is_active" =>  $starts_at ? false : true
        ]);

        return response()->json([
          "message" => "Discount Applied!",
          "data" => null,
          "success" => true
        ], 200);

    }

}
