#!/bin/bash

 token=$1

 subcategory_name=$([[ -z $2 ]] && echo "test_subcategory" || echo $2)

 curl -X POST                                           \
      -H "Authorization: Bearer $token"                 \
      -H "Accept: application/json"                     \
      -H "Content-Type: application/json"               \
      -d "{\"name\":\"${subcategory_name}\", \"parentCategory\":\"test_category\"}"                    \
         "http://localhost:8000/api/product/subcategories" | jq
