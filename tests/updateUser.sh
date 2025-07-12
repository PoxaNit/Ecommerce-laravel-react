#!/bin/bash

 token=$1

 curl -X PATCH \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer $token" \
      -d "{\"name\":\"CHANGED!!\"}" \
      http://localhost:8000/api/users/1
