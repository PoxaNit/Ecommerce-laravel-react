#!/bin/bash

 clear

 function commit {

     echo -e "\n\033[1;33mDo you want to commit the changes? \033[1;36m(y/N)\033[1;36m\n"

     read -n 1 answer


     if [[ $answer != y ]] && [[ $answer != Y ]]; then

         exit 0

     fi

     git add .

     echo -e "\n\033[1;32mUpdates made:\033[1;36m"

     read changes_made

     git commit -m "$changes_made"

     echo -e "\033[1;33mTo wich branch do you want to send the updates:\033[1;36m"

     read branch

     echo -e "\033[1;33m"

     git push origin "$branch"

     echo -e "\033[1;36m"

 }

 trap commit SIGINT

 php artisan serve &

 ./scripts/executeJobs.sh
