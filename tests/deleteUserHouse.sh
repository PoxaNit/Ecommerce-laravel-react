#!/bin/bash

 token=$1

 id=$([[ -z $2 ]] && echo 1 || echo $2)

 curl -X DELETE \
      -H "Authorization: Bearer $token" \
         "http://localhost:8000/api/users/1/houses/static_houses/$id"
