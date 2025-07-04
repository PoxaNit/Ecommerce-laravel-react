#!/bin/bash

 curl -X POST \
      -H "Content-Type: application/json" \
      -d "{\"name\":\"Júlio\", \"email\":\"jc.5047792@gmail.com\", \"password\":\"123\"}" \
      http://localhost:8000/api/users
