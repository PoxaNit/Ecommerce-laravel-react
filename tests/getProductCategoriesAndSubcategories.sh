#!/bin/bash

 token=$1

 curl -H "Authorization: Bearer $token" \
      -H "Accept: application/json" \
         "http://localhost:8000/api/product/categories_subcategories" | jq
