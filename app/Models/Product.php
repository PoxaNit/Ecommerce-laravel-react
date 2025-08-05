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

}



