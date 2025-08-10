#!/bin/bash

 token=$1

 curl -X GET \
      -H "Authorization: Bearer $token" \
         "http://localhost:8000/api/users/1/houses/all"
