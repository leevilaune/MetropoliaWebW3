#!/bin/bash

curl -X GET http://localhost:3000/api/v1/cat | jq
echo ""

curl -X PUT http://localhost:3000/api/v1/cat/3 \
  -F "cat_id=3" \
  -F "cat_name=Garfield Updated" \
  -F "birthdate=2015-04-20" \
  -F "weight=25" \
  -F "owner=37" \
  -F "image=@/Users/leevilaune/metropolia_webdev/MetropoliaWebW3/public/garfield.png" \
  | jq
echo ""
echo ""

curl -X GET http://localhost:3000/api/v1/cat/3 | jq
echo ""

curl -X PUT http://localhost:3000/api/v1/cat/3 \
  -F "cat_id=3" \
  -F "cat_name=Garfield Updated" \
  -F "birthdate=2015-04-20" \
  -F "weight=25" \
  -F "owner=37" \
  -F "image=@/Users/leevilaune/metropolia_webdev/MetropoliaWebW3/public/garfield.png" \
  | jq
echo ""

curl -X GET http://localhost:3000/api/v1/cat/3 | jq
echo ""

curl -X DELETE http://localhost:3000/api/v1/cat/3 | jq
echo ""

curl -X GET http://localhost:3000/api/v1/cat | jq
echo ""