<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use App\Models\Product;

class BuyProducts implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {

        $products = Product::all();

        $activeProducts = $products->where("is_active", true)->all();

        $randomIndex = rand(0, count($activeProducts) - 1);

        $productToBuy = $activeProducts[$randomIndex];

        $randomNumberToBuy= rand(1, $productToBuy->stock);

        $productToBuy->stock -= $randomNumberToBuy;

        if ($productToBuy->stock === 0):

            $productToBuy->is_active = 0; // It's not more available to user

        endif;

        $productToBuy->save();

    }
}
