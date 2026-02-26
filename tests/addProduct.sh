#!/bin/bash

 token=$1

 curl -X POST \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer ${token}" \
      -H "Accept: application/json" \
      -d "{\"quantity\":1}" \
      http://localhost:8000/api/users/1/cart/add-product/1
