#!/bin/bash

 token=$1

 curl -X GET \
      -H "Authorization: Bearer $token" \
      -H "Accept: application/json" \
      http://localhost:8000/api/users/1/checkout
