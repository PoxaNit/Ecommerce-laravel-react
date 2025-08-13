<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User_house extends Model
{
    protected $fillable = [
      "user_id",
      "static_house_id",
      "is_active",
      "occupied_space",
      "available_space"
    ];

    public function user () {

        return $this->belongsTo(User::class);

    }

    public function products () {

        return $this->hasMany(House_product::class);

    }

    public function static_house () {

        return $this->belongsTo(Static_house::class);

    }

}
