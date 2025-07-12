#!/bin/bash

 token=$1

 curl -X DELETE \
      -H "Authorization: Bearer $token" \
      http://localhost:8000/api/logout
