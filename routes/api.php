<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CartItemController;
use App\Http\Controllers\ShoppingController;


 // Product routes
Route::get('products/all', [ProductController::class, "index"]);
Route::get("products/{product_id}", [ProductController::class, "show"]);
Route::post("products", [ProductController::class, "store"]);
Route::patch("products/{product_id}", [ProductController::class, "update"]);
Route::delete("products/{product_id}", [ProductController::class, "delete"]);





 //User routes
Route::get("users/{user_id}", [UserController::class, "show"]);
Route::post("users", [UserController::class, "store"]);
Route::patch("users/{user_id}", [UserController::class, "update"]);
Route::delete("users/{user_id}", [UserController::class, "delete"]);




 //Cart routes
Route::get("users/{user_id}/cart", [CartController::class, "show"]);
Route::delete("users/{user_id}/cart", [CartController::class, "delete"]);


 //Cart items routes
Route::post("users/{user_id}/cart/", [CartItemController::class, "store"]);
Route::patch("users/{user_id}/cart/product/{product_id}", [CartItemController::class, "update"]);
Route::delete("users/{user_id}/cart/product/{product_id}", [CartItemController::class, "delete"]);



 //Shopping routes
Route::post("users/{user_id}/cart/add-product/{product_id}", [ShoppingController::class, "addToCart"]);
Route::post("users/{user_id}/cart/remove-product/{product_id}", [ShoppingController::class, "removeFromCart"]);
Route::get("users/{user_id}/checkout", [ShoppingController::class, "checkout"]);
