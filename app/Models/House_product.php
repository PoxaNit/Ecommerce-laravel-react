<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class House_product extends Model
{
    protected $fillable = [
      "user_house_id",
      "product_id",
      "quantity"
    ];

    protected function house () {

        return $this->belongsTo(User_house::class);

    }

    protected function product () {

        return $this->belongsTo(Product::class);

    }

}
