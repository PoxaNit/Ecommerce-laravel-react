#!/bin/bash

 curl -X POST \
      -H "Content-Type: application/json" \
      -d "{\"quantity\":20}" \
      http://localhost:8000/api/users/2/cart/add-product/3
