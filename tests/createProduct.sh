#!/bin/bash

 token=$1

 curl -X POST \
      -d "{\"name\":\"test_product\", \"description\":\"testing...\", \"short_description\":\"...\", \"price\":12, \"stock\":30, \"is_active\":true}" \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer $token" \
      http://localhost:8000/api/products
