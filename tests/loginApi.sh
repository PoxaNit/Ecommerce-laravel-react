#!/bin/bash

 curl -X POST \
      -H "Content-Type: application/json" \
      -d "{\"email\":\"jc.5047792@gmail.com\", \"password\":\"123\"}" \
      -s \
      http://localhost:8000/api/login
