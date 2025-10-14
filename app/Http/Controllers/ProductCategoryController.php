<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProductCategory;
use App\Models\ProductSubcategory;
use App\Models\Product;

class ProductCategoryController extends Controller
{

    public function index () {

        return response()->json([
          "message" => "OK",
          "data" => ProductCategory::all(),
          "success" => true
        ], 200);

    }

    public function store (Request $request) {

        $validated = $request->validate([
          "name" => "required|string"
        ]);

        if (ProductCategory::where("name", $validated["name"])->exists()):

            return response()->json([
              "message" => "Category $validated[name] already exists.",
              "data" => null,
              "success" => false
            ], 400);

        endif;

        ProductCategory::create($validated);

        return response()->json([
          "message" => "Created!",
          "data" => ProductCategory::all(),
          "success" => true
        ], 201);

    }

    public function update ($category_id, Request $request) {

        $validated = $request->validate([
          "name" => "required|string"
        ]);

        $category = ProductCategory::find($category_id);

        if (!$category):

            return response()->json([
              "message" => "Category with ID $category_id not found.",
              "data" => null,
              "success" => false
            ], 400);

        endif;


        if ($validated["name"] !== $category->name):

            foreach (Product::all() as $product):

                $json = $product->categories;

                $product_belongs_to_this_category = ($json["category"] === $category->name);

                if ($product_belongs_to_this_category):

                    $newJson = [
                      "category" => $validated["name"],
                      "subcategory" => $json["subcategory"]
                    ];

                    $product->update(["categories" => $newJson]);

                endif;

            endforeach;

        endif;


        $category->update($validated);

        return response()->json([
          "message" => "Updated!",
          "data" => ProductCategory::all(),
          "success" => true
        ], 200);

    }

    public function delete ($category_id) {

        $category = ProductCategory::find($category_id);

        if ($category):


            foreach (ProductSubcategory::where("parentCategory", ProductCategory::find($category_id)->name)->get() as $subcategory):

                $subcategory->delete();

            endforeach;


            $product = ProductCategory::find($category_id);

            if ($product):

                $product->delete();

            endif;

        else:

            return response()->json([
              "message" => "Category with ID $category_id not found.",
              "data" => null,
              "success" => false
            ], 400);

        endif;

        foreach (Product::all() as $product):

            $json = $product->categories;

            $product_belongs_to_this_category = ($json["category"] === $category->name);

            if ($product_belongs_to_this_category):

                $updatedData = [
                  "category" => "uncategorized",
                  "subcategory" => null
                ];

                $product->categories = $updatedData;

                $product->save();

            endif;

        endforeach;

        return response()->json([
          "message" => "Deleted!",
          "data" => ProductCategory::all(),
          "success" => true
        ], 200);

    }

    public function activation ($category_id, Request $request) {

        $validated = $request->validate([
          "active" => "boolean"
        ]);

        $category = ProductCategory::find($category_id);

        if (!$category):

            return response()->json([
              "message" => "Category with ID $category_id not found.",
              "success" => false,
              "data" => null
            ], 400);

        endif;

        $category->update($validated);

        $active = $validated["active"] ? "active" : "deactive";

        return response()->json([
          "message" => "Category ".$category->name." is $active",
          "success" => true,
          "data" => ProductCategory::all()
        ], 200);

    }

}
