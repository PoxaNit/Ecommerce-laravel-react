<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Game;

class GamesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (glob(database_path("seeders/data/games") . "/" . "*.json") as $file):

            $json = json_decode(file_get_contents($file), true);

            Game::create($json);

        endforeach;
    }
}
