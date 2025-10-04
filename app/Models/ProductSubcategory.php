<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductSubcategory extends Model
{

    public function category () {

        return $this->parentCategory;

    }

}
