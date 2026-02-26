#!/bin/bash

 token=$1

 curl -X PATCH \
      -d "{\"is_active\":1}" \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer $token" \
      -H "Accept: application/json" \
      http://localhost:8000/api/products/1
