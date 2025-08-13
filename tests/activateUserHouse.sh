#!/bin/bash

 token=$1

 boolean=$([[ -z $2 ]] && echo "true" || echo $2)

 user_id=$([[ -z $3 ]] && echo 1 || echo $3)

 house_id=$([[ -z $4 ]] && echo 1 || echo $4)

 curl -X PATCH \
      -H "Accept: application/json" \
      -H "Authorization: Bearer $token" \
      -H "Content-Type: application/json" \
      -d "{\"activate\":\"$boolean\"}" \
         "http://localhost:8000/api/users/$user_id/houses/static_houses/$house_id/activate"
