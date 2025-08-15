<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Game_user_stat;
use App\Models\User;

class GameUserStatsController extends Controller
{
    public function index () {

        return Game_user_stat::all();

    }

    public function show ($user_id) {

        $user = User::find($user_id);

        if (! $user):

            return response()->json([
              "message" => "User with id $user_id not found",
              "success" => false,
              "data" => null
            ], 400);

        endif;

        return response()->json([
          "message" => "OK",
          "success" => true,
          "data" => $user->game_stats
        ], 200);

    }

}
