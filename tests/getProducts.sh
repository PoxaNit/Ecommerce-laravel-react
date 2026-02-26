#!/bin/bash

 curl -X GET \
      -H "Accept: application/json" \
      -H "Authorization: Bearer $1" \
      http://127.0.0.1:8000/api/products
