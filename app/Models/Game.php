<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    protected $fillable = [
      "name",
      "description",
      "slug",
      "min_players",
      "max_players"
    ];

    protected $casts = [
      "rewards" => "array"
    ];

}
