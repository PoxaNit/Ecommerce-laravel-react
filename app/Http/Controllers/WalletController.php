<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User_wallet;
use App\Models\User;

class WalletController extends Controller
{
    public function showBalance ($user_id) {

        $user = User::findOrFail($user_id);

        return response()->json([
          "message" => "OK",
          "success" => true,
          "data" => $user->wallet->balance
        ], 200);

    }

    public function increaseBalance ($user_id, Request $request) {

        $validated = $request->validate([
          "quantity" => "decimal:2"
        ]);

        $user = User::findOrFail($user_id);

        $wallet = User_wallet::where("user_id", $user->id)->first();

        $wallet->balance = bcadd($wallet->balance, $validated["quantity"], 2);

        $wallet->save();

        return response()->json([
          "message" => "Balance increased!",
          "success" => true,
          "data" => $wallet->balance
        ], 200);

    }

    public function decreaseBalance ($user_id, Request $request) {

        $validated = $request->validate([
          "quantity" => "decimal:2"
        ]);

        $user = User::findOrFail($user_id);

        $wallet = $user->wallet;

        if ($wallet->balance < $validated["quantity"]):

            return response()->json([
              "message" => "Insufficient balance",
              "success" => false,
              "data" => $wallet->balance
            ], 400);

        endif;

        $wallet->balance = bcsub($wallet->balance, $validated["quantity"], 2);

        $wallet->save();

        return response()->json([
          "message" => "Balance decreased!",
          "success" => true,
          "data" => $wallet->balance
        ], 200);

    }

}
