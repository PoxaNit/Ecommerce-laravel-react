<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Game_user_stat extends Model
{
    protected $fillable = [
      "user_id",
      "total_matches",
      "total_victories",
      "total_defeats",
      "total_draws",
      "total_points"
    ];

    public function user () {

        return $this->belongsTo(User::class);

    }

}
