#!/bin/bash

 token=$1

 curl -X POST \
      -H "Accept: application/json" \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer $token" \
      -d "{\"discountPercent\":\"100\", \"starts_at\":\"2025-9-16T04:50:00\", \"ends_at\":\"2025-09-16T04:53:30\"}" \
      http://localhost:8000/api/discounts/products/1
