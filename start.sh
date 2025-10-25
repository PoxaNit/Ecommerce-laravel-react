#!/bin/bash

 clear

 function commit {

     echo "Do you want to commit the changes? (y/N)"

     read -n 1 answer


     if [[ $answer != y ]] && [[ $answer != Y ]]; then

         exit 0

     fi

     git add .

     echo "Updates made:"

     read changes_made

     git commit -m "$changes_made"

     echo "Wich branch:"

     read branch

     git push origin $branch

 }

 trap commit SIGINT

 php artisan serve &

 ./scripts/executeJobs.sh
