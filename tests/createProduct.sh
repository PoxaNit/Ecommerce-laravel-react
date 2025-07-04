#!/bin/bash

 curl -X POST \
      -d "{\"name\":\"test_product\", \"description\":\"testing...\", \"short_description\":\"...\", \"price\":12, \"stock\":30, \"is_active\":true}" \
      -H "Content-Type: application/json" \
      http://localhost:8000/api/products
