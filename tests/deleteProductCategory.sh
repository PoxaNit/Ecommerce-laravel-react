#!/bin/bash

 token=$1

 category_id=$2

 curl -X DELETE \
      -H "Authorization: Bearer $token" \
      -H "Accept: application/json" \
         "http://localhost:8000/api/product/categories/${category_id}" | jq
