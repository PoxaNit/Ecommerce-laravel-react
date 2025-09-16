<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order_item extends Model
{
    protected $fillable = [
      "order_id",
      "quantity",
      "price_each",
      "subtotal",
      "product_id",
      "in_discount"
    ];

    public function order () {

        return $this->belongsTo(Order::class);

    }

    public function product () {

        return $this->belongsTo(Product::class);

    }
}
