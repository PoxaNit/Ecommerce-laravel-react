<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Game_score;
use App\Models\Game;

class GameScoresController extends Controller
{

    public function show ($user_id, $game_id) {

        $user = User::find($user_id);

        if (! $user):

            return response()->json([
              "message" => "User with id $user_id not found",
              "success" => false,
              "data" => null
            ], 400);

        endif;

        $game_scores = Game_score::where("user_id", $user_id)
                                 ->get();

        $total_matches   = 0;
        $total_points    = 0;
        $total_victories = 0;
        $total_draws     = 0;
        $total_defeats   = 0;

        foreach ($game_scores as $game_score):

            switch ($game_score->result):

                case "victory":
                  $total_victories++;
                  break;

                case "defeat":
                  $total_defeats++;
                  break;

                case "draw":
                  $total_draws++;
                  break;

                default: continue;

            endswitch;

            $total_matches++;

            $total_points += $game_score->points_reward;

        endforeach;

        $data = [
          "total_matches" => $total_matches,
          "total_victories" => $total_victories,
          "total_defeats" => $total_defeats,
          "total_draws" => $total_draws,
          "total_points" => $total_points
        ];

        return response()->json([
          "message" => "OK",
          "success" => true,
          "data" => $data
        ], 200);

    }

    public function store ($user_id, $game_id, Request $request) {

        $validated = $request->validate([
          "result" => "required|string|in:victory,draw,defeat",
          "points_reward" => "required|integer"
        ]);

        $user = User::find($user_id);

        if (! $user):

            return response()->json([
              "message" => "User with id $user_id not found",
              "success" => false,
              "data" => null
            ], 400);

        endif;

        $game = Game::find($game_id);

        if (! $game): // Validate game id

            return response()->json([
              "message" => "Game with id $game_id not found",
              "success" => false,
              "data" => null
            ], 400);

        endif;

        $game_score = Game_score::create([
          "game_id" => $game_id,
          "user_id" => $user_id,
          "points_reward" => $validated["points_reward"],
          "result" => $validated["result"]
        ]);



      // Changing user stats
        $user_stats = $user->game_stats;

        $user_stats->total_matches++;

        switch ($validated["result"]):

            case "victory":
              $user_stats->total_victories++;
              break;

            case "draw":
              $user_stats->total_draws++;
              break;

            case "defeat":
              $user_stats->total_defeats++;
              break;

        endswitch;

        $user_stats->total_points += $validated["points_reward"];

        $user_stats->save();




        $data = [
          "match_score" => $game_score
        ];


        return response()->json([
          "message" => "OK",
          "success" => true,
          "data" => $data
        ], 201);

    }

}
