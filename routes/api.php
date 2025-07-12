<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CartItemController;
use App\Http\Controllers\ShoppingController;
use App\Http\Controllers\AuthController;
use App\Http\Middleware\AuthenticateWithToken;



Route::post("login", [AuthController::class, "login"]);

Route::post("users", [UserController::class, "store"]);


Route::middleware(AuthenticateWithToken::class)->group(function () {

Route::delete("logout", [AuthController::class, "logout"]);


 // Product routes
Route::get('products/', [ProductController::class, "index"]);
Route::get("products/{product_id}", [ProductController::class, "show"]);
Route::post("products", [ProductController::class, "store"]);
Route::patch("products/{product_id}", [ProductController::class, "update"]);
Route::delete("products/{product_id}", [ProductController::class, "delete"]);





 //User routes
Route::get("users/{user_id}", [UserController::class, "show"]);
Route::patch("users/{user_id}", [UserController::class, "update"]);
Route::delete("users/{user_id}", [UserController::class, "delete"]);




 //Cart routes
Route::get("users/{user_id}/cart", [CartController::class, "show"]);
Route::delete("users/{user_id}/cart", [CartController::class, "delete"]);



 //Shopping routes
Route::post("users/{user_id}/cart/add-product/{product_id}", [ShoppingController::class, "addToCart"]);
Route::post("users/{user_id}/cart/remove-product/{product_id}", [ShoppingController::class, "removeFromCart"]);
Route::get("users/{user_id}/checkout", [ShoppingController::class, "checkout"]);

});
