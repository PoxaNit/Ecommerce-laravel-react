<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Static_house;

class StaticHousesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (glob(database_path("seeders/data/static_houses") . "/" . "*.json") as $file):

            $jsons = json_decode(file_get_contents($file), true);

            foreach ($jsons as $json):

                Static_house::create($json);

            endforeach;

        endforeach;
    }
}
