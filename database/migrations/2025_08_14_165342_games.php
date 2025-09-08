<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create("games", function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string("name");
            $table->string("description");
            $table->string('slug')->unique();
            $table->string("image_path");
            $table->json("rewards");
            $table->integer("min_players");
            $table->integer("max_players");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::drop("games");
    }
};
