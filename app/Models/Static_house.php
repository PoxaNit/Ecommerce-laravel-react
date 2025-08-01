<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Static_house extends Model
{
    protected $fillable = [
      "name",
      "description",
      "cost",
      "capacity",
      "image_path"
    ];

}
