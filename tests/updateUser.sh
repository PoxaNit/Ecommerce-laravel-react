#!/bin/bash

 curl -X PATCH \
      -H "Content-Type: application/json" \
      -d "{\"name\":\"CHANGED!!\"}" \
      http://localhost:8000/api/users/2
