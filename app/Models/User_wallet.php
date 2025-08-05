<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User_wallet extends Model
{
    protected $fillable = [
      "user_id",
      "balance"
    ];

    public function user () {

        return $this->belongsTo(User::class);

    }
}
