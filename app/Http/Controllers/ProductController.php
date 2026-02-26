<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;
use App\Models\ProductCategory;
use App\Models\ProductSubcategory;

class ProductController extends Controller
{
    public function index() {

        $data = [
          "products" => Product::all()
        ];

        return response()->json([
          "message" => "OK",
          "data" => $data,
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



    public function store(Request $request) {

        $validated = $request->validate([
          "name"              => "required|string|max:255",
          "description"       => "required|string|max:255",
          "short_description" => "required|string|max:255",
          "price"             => "required|numeric|min:0",
          "stock"             => "required|numeric|min:0",
          "is_active"         => "required|boolean",
          "weight"            => "required|numeric|min:0.00",
          "height"            => "required|numeric|min:0.00",
          "width"             => "required|numeric|min:0.00",
          "length"            => "required|numeric|min:0.00",
          "slug"              => "required|string",
          "sku"               => "required|string",
          "category"          => "required|string",
          "subcategory"       => "required|string",
          "image"             => "required|image|mimes:jpg,jpeg,png|max:2048",
        ]);

        if (Product::where("slug", $validated["slug"])->exists()) {
            return response()->json([
              "message" => "Slug already exists.",
              "data" => null,
              "success" => false
            ], 400);
        }

        if (Product::where("sku", $validated["sku"])->exists()) {
            return response()->json([
              "message" => "SKU already exists.",
              "data" => null,
              "success" => false
            ], 400);
        }


        $category = ProductCategory::where("name", $validated["category"])->first();

        $subcategory = ProductSubcategory::where("name", $validated["subcategory"])->first();

        if (!$category) {

            return response()->json([
              "message" => "Category $validated[category] does not exist.",
              "data" => null,
              "success" => false
            ], 400);
        }

        if (!$subcategory) {

            return response()->json([
              "message" => "Subcategory $validated[subcategory] does not exist.",
              "data" => null,
              "success" => false
            ], 400);
        }

        if (!($subcategory->category() === $validated["category"])):

            return response()->json([
              "message" => "$validated[subcategory] subcategory doesn't belong to $validated[category] category.",
              "data" => null,
              "success" => false
            ], 400);

        endif;

        $imagePath = null;

        if ($request->hasFile("image")) {

            $directory = "images/products/byUsers";

            $uniqueId  = Str::uuid()->toString();

            $extension = $request->file("image")->getClientOriginalExtension();

            $fileName  = $uniqueId . "." . $extension;

            $request->file("image")->move($directory, $fileName);

            $imagePath = "images/products/byUsers/{$fileName}";
        }

        // Merge categories (JSON) and remove category/subcategory
        $categoriesJson = json_encode([
          "category"    => $validated["category"],
          "subcategory" => $validated["subcategory"]
        ]);

        unset($validated["category"], $validated["subcategory"]);

        $product = Product::create(array_merge($validated, [
          "categories"      => json_decode($categoriesJson),
          "image_path"      => $imagePath,
        ]));

        return response()->json([
          "message" => "Product created!",
          "data"    => Product::all(),
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
          => "sometimes|boolean",
          "weight"
          => "sometimes|numeric|min:0.00",
          "height"
          => "sometimes|numeric|min:0.00",
          "width"
          => "sometimes|numeric|min:0.00",
          "length"
          => "sometimes|numeric|min:0.00",
          "categories"
          => "sometimes|json"
        ]);

        $data = [
          "name"
          => $validated["name"],
          "description"
          => $validated["description"],
          "short_description"
          => $validated["short_description"],
          "price"
          => $validated["price"],
          "stock"
          => $validated["stock"],
          "is_active"
          => $validated["is_active"],
          "weight"
          => $validated["weight"],
          "width"
          => $validated["width"],
          "height"
          => $validated["height"],
          "length"
          => $validated["length"],
          "categories"
          => null
        ];

        if ($validated["categories"] ?? null):

            $data["categories"] = json_decode($validated["categories"]);

        endif;

        if (!ProductSubcategory::where("name", $data["categories"]->subcategory)->where("parentCategory", $data["categories"]->category)->exists()):

            $categoryName = $data["categories"]->category;
            $subcategoryName = $data["categories"]->subcategory;

            return response()->json([
              "message" => "Subcategory " . $data["categories"]->subcategory . " doesn't belong to category " . $data["categories"]->category,
              "data" => null,
              "success" => false
            ], 400);

        endif;

        $product = Product::findOrFail($id);
$beforeUpdate = $product;

        $product->update($data);

        $dataToSend = [
          "products" => Product::all(),
          "updated product" => $product,
          "product before update" => $beforeUpdate,
          "data variable" => $data
        ];

        return response()->json([
          "message" => "Updated! stock came from frontend: $validated[stock]. from data variable: $data[stock]",
          "data" => $dataToSend,
          "success" => true
        ], 200);

    }

    public function delete ($id) {

        $product = Product::findOrFail($id);

        $product->delete();

        return response()->json([
          "message" => "Deleted!",
          "data" => Product::all(),
          "success" => true
        ], 200);

    }

}
