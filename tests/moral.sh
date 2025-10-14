#!/bin/bash

 function moral {

     ./createUser.sh

     token=$(./loginApi.sh | jq -r .token)

     ./increaseBalance.sh $token

     ./logout.sh $token

 }

 function getToken {

     token=$(./loginApi.sh | jq -r .token)

 }
