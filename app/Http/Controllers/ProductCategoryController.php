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


       // Check if there is already a category with this name
        if (!(ProductCategory::where("name", $validated["name"])->exists())):

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

            foreach (ProductSubcategory::all() as $subcategory):

                if ($subcategory->parentCategory === $category->name):

                    $subcategory->parentCategory = $validated["name"];

                    $subcategory->save();

                endif;

            endforeach;


            $category->update($validated);

        else:

            return response()->json([
              "message" => "Category with name $validated[name] already exists.",
              "data" => null,
              "success" => false
            ]);

        endif;


        $data = [
          "categories" => ProductCategory::all(),
          "subcategories" => ProductSubcategory::all(), // In the frontend, the components uses the categories's parentCategory property, so it can be worthy to sync the data
          "products" => Product::all()
        ];

        return response()->json([
          "message" => "Updated!",
          "data" => $data,
          "success" => true
        ], 200);

    }

    public function delete ($category_id) {

        $category = ProductCategory::find($category_id);

        if ($category):


            foreach (ProductSubcategory::where("parentCategory", ProductCategory::find($category_id)->name)->get() as $subcategory):

                $subcategory->delete();

            endforeach;

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

        $category->delete();

        $data = [
          "categories" => ProductCategory::all(),
          "products"   => Product::all()
        ];

        return response()->json([
          "message" => "Deleted!",
          "data" => $data,
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
