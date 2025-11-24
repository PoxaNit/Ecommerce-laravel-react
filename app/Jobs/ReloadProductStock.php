<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use App\Models\Product;

class ReloadProductStock implements ShouldQueue
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

        $randomIndex = rand(0, count($products) - 1);

        $randomProduct = $products[$randomIndex];

        $randomNumber = rand(10, 40);

        $randomProduct->stock += $randomNumber;

        if ($randomProduct->stock > 50):

         // Max stock
            $randomProduct->stock = 50;

        endif;

        $randomProduct->save();

    }
}
