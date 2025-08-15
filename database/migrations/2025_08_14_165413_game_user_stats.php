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
        Schema::create("game_user_stats", function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId("user_id")->constrained()->onDelete("cascade");
            $table->integer("total_matches")->default(0);
            $table->integer("total_victories")->default(0);
            $table->integer("total_defeats")->default(0);
            $table->integer("total_draws")->default(0);
            $table->integer("total_points")->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::drop("game_user_stats");
    }
};
