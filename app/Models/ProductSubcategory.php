<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductSubcategory extends Model
{

    protected $fillable = [
      "name",
      "parentCategory",
      "active"
    ];

    public function category () {

        return $this->parentCategory;

    }

}
