<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name',
        'description',
        'slug',
        'short_description',
        'price',
        'old_price',
        'stock',
        'image_path',
        'is_active',
        'weight',
        'height',
        'width',
        'length',
        'sku',
        'categories'
    ];

    protected $casts = [
        'categories' => 'array',
    ];

    public function volume () {

        return $this->width * $this->height * $this->length;

    }

    public function calculateDiscount (
      $percent = 0.00,
      $price = null
    ) {

        $price = $price ?? $this->price;

        $newPrice =
          bcmul(
            $price,
            (1 - bcdiv($percent, 100, 2)),
            2
          );

        return $newPrice;

    }

    public function inDiscount () {

        return Discount::where("product_id", $this->id)
                         ->where("is_active", true)
                         ->where("ends_at", ">=", now())
                         ->exists();

    }

    public function priceWithDiscount () {

        if ($this->inDiscount()):

            $discounts = Discount::where("product_id", $this->id)
				  ->where("is_active", true)
				  ->get();
            $price = 0.00;

	    foreach ($discounts as $discount):

                $price = bcadd($price, $this->calculateDiscount($discount->percent), 2);

	    endforeach;

            return $price;

        else:

            return $this->price;

        endif;

    }

}



