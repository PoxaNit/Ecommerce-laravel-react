#!/bin/bash

 token=$1

 category_name=$([[ -z $2 ]] && echo "test_category" || echo $2)

 curl -X POST                                           \
      -H "Authorization: Bearer $token"                 \
      -H "Accept: application/json"                     \
      -H "Content-Type: application/json"               \
      -d "{\"name\":\"${category_name}\"}"                    \
         "http://localhost:8000/api/product/categories" | jq
