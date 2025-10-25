#!/bin/bash

 clear

 function commit {

     echo -e "\n\033[1;33mDo you want to commit the changes? \033[1;36m(y/N)"

     read -n 1 answer


     if [[ $answer != y ]] && [[ $answer != Y ]]; then

         exit 0

     fi

     git add .

     echo -e "\n\033[1;32mUpdates made:"

     read changes_made

     git commit -m "$changes_made"

     echo -e "\033[1;33mTo wich branch do you want to send the updates:"

     read branch

     git push origin "$branch"

 }

 trap commit SIGINT

 php artisan serve &

 ./scripts/executeJobs.sh
