<?php

 foreach (glob("*.json") as $json):

     $a = json_decode(file_get_contents($json), true);

     $t = gettype($a);

     echo $t;

 endforeach;
