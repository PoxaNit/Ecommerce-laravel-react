#!/bin/bash

 token=$1

 curl -H "Authorization: Bearer $token"\
      http://localhost:8000/api/products/all
