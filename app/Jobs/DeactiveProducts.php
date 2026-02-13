<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use App\Models\Product;

class DeactiveProducts implements ShouldQueue
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

        $randomProduct = Product::where("is_active", 1)
        ->inRandomOrder()
	->first();

        $randomProduct->is_active = 0;

	$randomProduct->save();

    }
}
