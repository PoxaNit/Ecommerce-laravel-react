#!/bin/bash

 token=$1

 curl -X POST \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer ${token}" \
      -d "{\"quantity\":20}" \
      http://localhost:8000/api/users/1/cart/add-product/2
