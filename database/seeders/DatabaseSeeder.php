<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->call([ProductSeeder::class]);
        $this->call([StaticHousesSeeder::class]);
        $this->call([GamesSeeder::class]);
        $this->call([ProductCategoriesSeeder::class]);
        $this->call([ProductSubcategorySeeder::class]);
    }
}
