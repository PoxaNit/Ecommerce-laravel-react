<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ProductCategory;

class ProductCategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        foreach (glob(database_path("seeders/data/product_categories")."/"."*.json") as $file):

            $json = json_decode(file_get_contents($file), true);

            foreach ($json as $element):

                ProductCategory::create($element);

            endforeach;

        endforeach;

    }
}
