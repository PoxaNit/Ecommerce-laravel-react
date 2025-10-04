<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductCategory extends Model
{

    public function subcategories () {

        return $this->hasMany(ProductSubcategory::class);

    }

}
