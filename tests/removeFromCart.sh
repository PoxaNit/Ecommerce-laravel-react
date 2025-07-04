#!/bin/bash

 curl -X POST \
      -H "Content-Type: application/json" \
      -d "{\"quantity\":10}" \
      http://localhost:8000/api/users/2/cart/remove-product/2
