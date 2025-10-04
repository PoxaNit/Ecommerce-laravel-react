<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use App\Models\Product;

class ImageDirectoryCleaner implements ShouldQueue
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

        $image_paths = Product::pluck("image_path")->toArray();

        foreach (glob(public_path("images/products/byUsers"."/"."*")) as $file):

            $exists_in_database = 0;

            foreach ($image_paths as $path):

                if (pathinfo($path, PATHINFO_BASENAME) === pathinfo($file, PATHINFO_BASENAME)) $exists_in_database = 1;

            endforeach;

            if (!$exists_in_database):

                unlink($file);

            endif;

        endforeach;

    }
}
