#!/bin/bash

 curl -X PATCH \
      -H "Content-Type: application/json" \
      -d "{\"quantity\":30}" \
      http://localhost:8000/api/users/2/cart/products/2
