#!/bin/bash

 token=$1

 user_id=$([[ -z $2 ]] && echo 1 || echo $2)

 game_id=$([[ -z $3 ]] && echo 1 || echo $3)

 result=$([[ -z $4 ]] && echo victory || echo $4)

 points_reward=$([[ -z $5 ]] && echo 10 || echo $5)

 curl -X POST \
      -H "Authorization: Bearer $token" \
      -H "Accept: application/json" \
      -H "Content-Type: application/json" \
      -d "{\"result\":\"$result\", \"points_reward\":\"$points_reward\"}" \
         "http://localhost:8000/api/users/$user_id/game_stats/game/$game_id"
