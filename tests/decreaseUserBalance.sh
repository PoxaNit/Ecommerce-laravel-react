#!/bin/bash

 token=$1

 curl -X PATCH \
      -H "Authorization: Bearer $token" \
      -H "Content-Type: application/json" \
      -d "{\"quantity\":\"50.89\"}" \
         "http://localhost:8000/api/users/1/wallet/balance"
