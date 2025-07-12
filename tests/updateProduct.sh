#!/bin/bash

 token=$1

 curl -X PATCH \
      -d "{\"name\":\"UPDATED!!\"}" \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer $token" \
      http://localhost:8000/api/products/51
