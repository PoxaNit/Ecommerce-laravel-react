#!/bin/bash

 token=$1

 category_id=$2

 curl -X PATCH \
      -H "Authorization: Bearer $token" \
      -H "Accept: application/json" \
      -H "Content-Type: application/json" \
      -d "{\"name\":\"test_category\"}" \
         "http://localhost:8000/api/product/categories/${category_id}" | jq
