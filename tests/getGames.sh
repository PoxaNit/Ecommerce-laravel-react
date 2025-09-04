#!/bin/bash

 token=$1

 game_id=$2

 curl -X GET \
      -H "Accept: application/json" \
      -H "Authorization: Bearer $token" \
         "http://localhost:8000/api/games/$game_id"
