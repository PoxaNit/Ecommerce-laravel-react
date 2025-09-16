<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CartItemController;
use App\Http\Controllers\ShoppingController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\WalletController;
use App\Http\Controllers\HouseProductController;
use App\Http\Controllers\UserHouseController;
use App\Http\Controllers\StaticHousesController;
use App\Http\Controllers\GamesController;
use App\Http\Controllers\GameScoresController;
use App\Http\Controllers\GameUserStatsController;
use App\Http\Controllers\DiscountController;
use App\Http\Middleware\AuthenticateWithToken;
use App\Http\Middleware\VerifyIfIsAdmin;

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


 // Inventory routes
Route::get("users/{user_id}/inventory", [HouseProductController::class, "index"]);
Route::get("users/{user_id}/inventory/houses/{house_id}", [HouseProductController::class, "show"]);
Route::delete("users/{user_id}/inventory", [HouseProductController::class, "deleteAll"]);
Route::delete("users/{user_id}/inventory/products/{product_id}", [HouseProductController::class, "deleteProduct"]);



 // User house routes
Route::get("users/{user_id}/houses", [UserHouseController::class, "index"]);
Route::post("users/{user_id}/houses/static_houses/{static_house_id}", [UserHouseController::class, "store"]);
Route::delete("users/{user_id}/houses/static_houses/{static_house_id}", [UserHouseController::class, "destroy"]);
Route::patch("users/{user_id}/inventory/houses/{house_id}/products/{product_id}", [UserHouseController::class, "deleteProduct"]);
Route::delete("users/{user_id}/inventory/houses/{house_id}", [UserHouseController::class, "deleteAllProducts"]);
Route::patch("users/{user_id}/houses/static_houses/{static_house_id}/activate", [UserHouseController::class, "house_activation"]);

 // Static house routes
Route::get("users/{user_id}/houses/all", [StaticHousesController::class, "index"]);


 // Wallet routes
Route::get("users/{user_id}/wallet/balance", [WalletController::class, "showBalance"]);
Route::post("users/{user_id}/wallet/balance", [WalletController::class, "increaseBalance"]);
Route::patch("users/{user_id}/wallet/balance", [WalletController::class, "decreaseBalance"]);

 // User stats routes

Route::get("game_stats", [GameUserStatsController::class, "index"]);
Route::get("users/{user_id}/game_stats", [GameUserStatsController::class, "show"]);


 // Game scores routes

Route::get("users/{user_id}/game_stats/game/{game_id}", [GameScoresController::class, "show"]);
Route::post("users/{user_id}/game_stats/game/{game_id}", [GameScoresController::class, "store"]);

 // Game routes

Route::get("games", [GamesController::class, "index"]);
Route::get("games/{game_id}", [GamesController::class, "show"]);


  Route::middleware([VerifyIfIsAdmin::class])->group(function () {

       // Discount routes

      Route::get("discounts/products", [DiscountController::class, "index"]);
      Route::post("discounts/products/{product_id}", [DiscountController::class, "makeDiscount"]);

  });


});
