<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Discount extends Model
{

    protected $fillable = [
      "percent",
      "starts_at",
      "ends_at",
      "is_active",
      "product_id"
    ];

    protected $casts = [
      'starts_at' => 'datetime',
      'ends_at'   => 'datetime',
    ];

    public function product () {

        return $this->belongsTo(Product::class);

    }

}
