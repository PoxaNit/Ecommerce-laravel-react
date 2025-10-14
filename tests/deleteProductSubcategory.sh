#!/bin/bash

 token=$1

 subcategory_id=$2

 curl -X DELETE \
      -H "Authorization: Bearer $token" \
      -H "Accept: application/json" \
         "http://localhost:8000/api/product/subcategories/${subcategory_id}" | jq
