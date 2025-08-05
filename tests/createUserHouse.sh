#!/bin/bash

 token=$1

 curl -X POST \
      -H "Authorization: Bearer $token" \
         "http://localhost:8000/api/users/1/houses/static_houses/1"
