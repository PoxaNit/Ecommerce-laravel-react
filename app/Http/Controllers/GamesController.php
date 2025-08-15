<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Game;

class GamesController extends Controller
{

    public function index () {

        return Game::all();

    }

    public function show ($game_id) {

        $game = Game::find($game_id);

        if (! $game):

            return response()->json([
              "message" => "Game with id $game_id not found",
              "success" => false,
              "data" => null
            ], 400);

        endif;

        return response()->json([
          "message" => "OK",
          "success" => true,
          "data" => $game
        ], 200);

    }

}
