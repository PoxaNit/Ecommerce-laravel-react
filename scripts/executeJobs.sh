#!/bin/bash


 function killProcesses {

     for p in ./.tmp/PIDs/executeJobs/*.pid; do

         kill $(cat $p) &> /dev/null

         rm $p &> /dev/null

     done

     for l in ./.tmp/logs/executeJobs/*.log; do

         rm $l

     done

     exit 0

 }

 trap "killProcesses" 2

 php artisan queue:work >> "./.tmp/logs/executeJobs/queueWork.log" 2>&1 &

 echo $! > "./.tmp/PIDs/executeJobs/queueWork.pid"

 while true; do

     php artisan schedule:run >> "./.tmp/logs/executeJobs/scheduleRun.log" 2>&1

     sleep 60

 done
