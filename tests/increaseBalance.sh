#!/bin/bash

 token=$1

 curl -X POST \
      -H "Authorization: Bearer $token" \
      -H "Content-Type: application/json" \
      -d "{\"quantity\":\"1000000.30\"}" \
      "http://localhost:8000/api/users/1/wallet/balance"
