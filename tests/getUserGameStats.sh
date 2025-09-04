#!/bin/bash

 token=$1

 user_id=$([[ -z $2 ]] && echo 1 || echo $2)

 game_id=$([[ -z $3 ]] && echo 1 || echo $3)

 curl -X GET \
      -H "Accept: application/json" \
      -H "Authorization: Bearer $token" \
         "http://localhost:8000/api/users/$user_id/game_stats"
