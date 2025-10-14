#!/bin/bash

 token=$1

 mode=$2 # category or subcategory

 id=$3

 bool=$4

 curl -X PATCH \
      -H "Accept: application/json" \
      -H "Authorization: Bearer $token" \
      -H "Content-Type: application/json" \
      -d "{\"active\":$bool}" \
         http://localhost:8000/api/product/$([[ $mode = "category" ]] && echo "categories"; [[ $mode = "subcategory" ]] && echo "subcategories")/active/$id | jq
