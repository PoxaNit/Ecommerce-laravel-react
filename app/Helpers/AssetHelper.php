<?php

 namespace App\Helpers;


 class AssetHelper {

     public static function getAsset (string $extension): ?string {

         if ($path = glob(public_path("build/assets/*.$extension"))):

             return asset("build/assets/" . basename($path[0]));

         else:

             return null;

         endif;

     }

 }


