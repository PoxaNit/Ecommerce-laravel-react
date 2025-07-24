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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string("name");
            $table->text("description");
            $table->string("slug")->nullable();
            $table->string("short_description")->nullable();
            $table->decimal("price", 10, 2);
            $table->decimal("old_price", 10, 2)->nullable();
            $table->integer("stock")->nullable();
            $table->string("image_path")->nullable();
            $table->boolean("is_active")->nullable();
            $table->decimal("weight", 8, 2)->nullable();
            $table->decimal("height", 8, 2)->nullable();
            $table->decimal("width", 8, 2)->nullable();
            $table->decimal("length", 8, 2)->nullable();
            $table->string("sku")->nullable();
            $table->json("categories");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
