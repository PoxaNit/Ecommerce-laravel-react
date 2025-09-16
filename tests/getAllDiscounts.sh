#!/bin/bash

 token=$1

 curl -X GET \
      -H "Accept: application/json" \
      -H "Authorization: Bearer $token" \
      http://localhost:8000/api/discounts/products
