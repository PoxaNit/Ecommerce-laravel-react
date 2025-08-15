<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Game_score extends Model
{
    protected $fillable = [
      "user_id",
      "game_id",
      "points_reward",
      "result"
    ];

    public function user () {

        return $this->belongsTo(User::class);

    }

    public function game () {

        return $this->belongsTo(Game::class);

    }

}
