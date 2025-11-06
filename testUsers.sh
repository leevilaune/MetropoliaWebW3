#!/bin/bash

curl -X GET http://localhost:3000/api/v1/user | jq

echo ""

curl -X POST http://localhost:3000/api/v1/user \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "username": "janedoe",
    "email": "jane@metropolia.fi",
    "role": "admin",
    "password": "admin"
  }' | jq

echo ""

curl -X GET http://localhost:3000/api/v1/user/3 | jq

curl -X PUT http://localhost:3000/api/v1/user/3 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe Updated",
    "username": "janedoe",
    "email": "jane.updated@metropolia.fi",
    "role": "user",
    "password": "newpassword",
    "user_id": 3
}' | jq

echo ""

curl -X DELETE http://localhost:3000/api/v1/user/3 | jq

echo ""

curl -X GET http://localhost:3000/api/v1/user/3 | jq