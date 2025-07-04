<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Product;

class ProductController extends Controller
{
    public function index() {

        return response()->json([
          "message" => "OK",
          "data" => Product::all(),
          "success" => true
        ]);

    }

    public function show ($id) {

        $product = Product::findOrFail($id);

        return response()->json([
          "message" => "OK",
          "data" => $product,
          "success" => true
        ], 200);

    }

    public function store (Request $request) {

        $validated = $request->validate([
          "name"
          => "required|string|max:255",
          "description"
          => "required|string|max:255",
          "short_description"
          => "required|string|max:255",
          "price"
          => "required|numeric|min:0",
          "stock"
          => "required|numeric|min:0",
          "is_active"
          => "required|boolean"
        ]);


        Product::create($validated);

        return response()->json([
          "message" => "Created!",
          "data" => $validated,
          "success" => true
        ], 201);

    }


    public function update (Request $request, $id) {

        $validated = $request->validate([
          "name"
          => "sometimes|string|max:255",
          "description"
          => "sometimes|string|max:255",
          "short_description"
          => "sometimes|string|max:255",
          "price"
          => "sometimes|numeric|min:0",
          "stock"
          => "sometimes|numeric|min:0",
          "is_active"
          => "sometimes|boolean"
        ]);


        $product = Product::findOrFail($id);

        $product->update($validated);

        return response()->json([
          "message" => "Updated!",
          "data" => $product,
          "success" => true
        ], 200);

    }

    public function delete ($id) {

        $product = Product::findOrFail($id);

        $product->delete();

        return response()->json([
          "message" => "Deleted!",
          "data" => null,
          "success" => true
        ], 204);

    }

}
