<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProductCategory;
use App\Models\ProductSubcategory;

class ProductCategoryAndSubcategoryController extends Controller
{

    public function index () {

        $categories = ProductCategory::all();

        $subcategories = ProductSubcategory::all();

        $data = [
          "categories" => $categories,
          "subcategories" => $subcategories
        ];

        return response()->json([
          "message" => "OK",
          "data" => $data,
          "success" => true
        ], 200);

    }

}
