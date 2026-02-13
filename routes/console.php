<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;
use App\Jobs\ExpireDiscountsJob;
use App\Jobs\ImageDirectoryCleaner;
use App\Jobs\BuyProducts;
use App\Jobs\ReloadProductStock;
use App\Jobs\ActiveProducts;
use App\Jobs\DeactiveProducts;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Schedule::job(new ExpireDiscountsJob)->everySecond();
Schedule::job(new ImageDirectoryCleaner)->daily();
Schedule::job(new BuyProducts)->everySecond();
Schedule::job(new ReloadProductStock)->everyFourMinutes();
Schedule::job(new ActiveProducts)->everyFiveMinutes();
Schedule::job(new DeactiveProducts)->everyFiveMinutes();
