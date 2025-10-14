<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProductSubcategory;
use App\Models\ProductCategory;
use App\Models\Product;

class ProductSubCategoryController extends Controller
{

    public function index () {

        return response()->json([
          "message" => "OK",
          "data" => ProductSubCategory::all(),
          "success" => true
        ], 200);

    }

    public function store (Request $request) {

        $validated = $request->validate([
          "name" => "required|string",
          "parentCategory" => "required|string"
        ]);

        if (!ProductCategory::where("name", $validated["parentCategory"])->exists()):

            return response()->json([
              "message" => "Category $validated[parentCategory] doesn't exist.",
              "data" => null,
              "success" => false
            ], 400);

        endif;

        if (ProductSubcategory::where("name", $validated["name"])->exists()):

            return response()->json([
              "message" => "Subcategory $validated[name] already exists.",
              "data" => null,
              "success" => false
            ], 400);

        endif;

        ProductSubCategory::create($validated);

        return response()->json([
          "message" => "Created!",
          "data" => ProductSubCategory::all(),
          "success" => true
        ], 201);

    }

    public function update ($subcategory_id, Request $request) {

        $validated = $request->validate([
          "name" => "sometimes|string",
          "parentCategory" => "sometimes|string"
        ]);

        if (($validated["parentCategory"] ?? null) && !ProductCategory::where("name", $validated["parentCategory"])->exists()):

            return response()->json([
              "message" => "Category $validated[parentCategory] doesn't exist.",
              "data" => null,
              "success" => false
            ], 400);

        endif;


        $subcategory = ProductSubCategory::find($subcategory_id);

        if (!$subcategory):

            return response()->json([
              "message" => "Sub-Category with ID $subcategory_id not found.",
              "data" => null,
              "success" => false
            ], 400);

        endif;


        if ($validated["name"] !== $subcategory->name):

            foreach (Product::all() as $product):

                $json = $product->categories;

                $this_product_belongs_to_this_subcategory = ($json["subcategory"] === $subcategory->name);

                if ($this_product_belongs_to_this_subcategory):

                    $newJson = [
                      "category" => $json["category"],
                      "subcategory" => $validated["name"]
                    ];

                    $product->update(["categories" => $newJson]);

                endif;

            endforeach;

        endif;

        $subcategory->update($validated);

        return response()->json([
          "message" => "Updated!",
          "data" => ProductSubCategory::all(),
          "success" => true
        ], 200);

    }

    public function delete ($subcategory_id) {

        $subcategory = ProductSubcategory::find($subcategory_id);

        if ($subcategory):

            ProductSubCategory::find($subcategory_id)->delete();

        else:

            return response()->json([
              "message" => "Sub-Category with ID $subcategory_id not found.",
              "data" => null,
              "success" => false
            ], 400);

        endif;


        foreach (Product::all() as $product):

            $json = $product->categories;

            $product_belongs_to_this_subcategory = ($json["subcategory"] === $subcategory->name);

            if ($product_belongs_to_this_subcategory):

                $updatedData = [
                  "category" => $json["category"],
                  "subcategory" => null
                ];

                $product->categories = $updatedData;

                $product->save();

            endif;

        endforeach;


        return response()->json([
          "message" => "Deleted!",
          "data" => ProductSubCategory::all(),
          "success" => true
        ], 200);

    }

    public function activation ($subcategory_id, Request $request) {

        $validated = $request->validate([
          "active" => "boolean"
        ]);

        $subcategory = ProductSubcategory::find($subcategory_id);

        if (!$subcategory):

            return response()->json([
              "message" => "Subcategory with ID $subcategory_id not found.",
              "success" => false,
              "data" => null
            ], 400);

        endif;

        $subcategory->update($validated);

        $active = $validated["active"] ? "active" : "deactive";

        return response()->json([
          "message" => "Subcategory ".$subcategory->name." is $active.",
          "success" => true,
          "data" => ProductSubcategory::all()
        ], 200);

    }

}
