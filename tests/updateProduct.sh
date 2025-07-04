#!/bin/bash

 curl -X PATCH \
      -d "{\"name\":\"UPDATED!!\"}" \
      -H "Content-Type: application/json" \
      http://localhost:8000/api/products/51
