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
        Schema::create("static_houses", function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string("name");
            $table->string("description");
            $table->float("cost");
            $table->float("capacity");
            $table->string("image_path");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::drop("static_houses");
    }
};
