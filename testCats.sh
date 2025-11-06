#!/bin/bash

curl -X GET http://localhost:3000/api/v1/cat | jq
echo ""

curl -X POST http://localhost:3000/api/v1/cat \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Garfield",
    "birthdate": "2015-04-20",
    "weight": 27,
    "owner": "Jon Arbuckle",
    "image": "https://upload.wikimedia.org/wikipedia/en/thumb/b/bc/Garfield_the_Cat.svg/1200px-Garfield_the_Cat.svg.png"
  }' | jq
echo ""

curl -X GET http://localhost:3000/api/v1/cat/3 | jq
echo ""

curl -X PUT http://localhost:3000/api/v1/cat/3 \
  -H "Content-Type: application/json" \
  -d '{
    "cat_id": 3,
    "name": "Garfield Updated",
    "birthdate": "2015-04-20",
    "weight": 25,
    "owner": "Jon Arbuckle",
    "image": "https://upload.wikimedia.org/wikipedia/en/thumb/b/bc/Garfield_the_Cat.svg/1200px-Garfield_the_Cat.svg.png"
  }' | jq
echo ""

curl -X GET http://localhost:3000/api/v1/cat/3 | jq
echo ""

curl -X DELETE http://localhost:3000/api/v1/cat/3 | jq
echo ""

curl -X GET http://localhost:3000/api/v1/cat | jq
echo ""