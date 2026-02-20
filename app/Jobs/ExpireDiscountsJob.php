<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use App\Models\User;
use App\Models\Discount;

class ExpireDiscountsJob implements ShouldQueue
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

        foreach (Discount::all() as $discount):

            $startsAt = \Carbon\Carbon::parse($discount->starts_at);

            $endsAt   = \Carbon\Carbon::parse($discount->ends_at);

            if ($discount->starts_at):

                if (now()->between($startsAt, $endsAt)):

                    $discount->is_active = true;

                else:

                    $discount->is_active = false;

                endif;

	    else:

		$discount->is_active = true;

	    endif;

                $discount->save();

        endforeach;

    }
}
