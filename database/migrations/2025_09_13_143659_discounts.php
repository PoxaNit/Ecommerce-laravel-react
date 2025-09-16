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
        Schema::create("discounts", function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId("product_id")->constrained()->onDelete("cascade");
            $table->decimal("percent", 5, 2)->default(0.00);
            $table->boolean("is_active")->default(true);
            $table->datetime("starts_at")->nullable();
            $table->datetime("ends_at");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::drop("discounts");
    }
};
