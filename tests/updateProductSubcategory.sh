#!/bin/bash

 token=$1

 subcategory_id=$2

 curl -X PATCH \
      -H "Authorization: Bearer $token" \
      -H "Accept: application/json" \
      -H "Content-Type: application/json" \
      -d "{\"name\":\"testttt\"}" \
         "http://localhost:8000/api/product/subcategories/${subcategory_id}"
