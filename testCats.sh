#!/bin/bash

BASE_URL="http://localhost:3000/api/v1/user"

echo "=== GET all users ==="
curl -s $BASE_URL
echo -e "\n\n"

echo "=== POST new user ==="
NEW_USER=$(curl -s -X POST $BASE_URL \
-H "Content-Type: application/json" \
-d '{
  "name": "Jane Doe",
  "username": "janedoe",
  "email": "jane@metropolia.fi",
  "role": "admin",
  "password": "admin"
}')
echo $NEW_USER
echo -e "\n\n"

# Extract new user ID from the POST response
NEW_ID=$(echo $NEW_USER | grep -o '"user_id":[0-9]*' | grep -o '[0-9]*')

echo "=== GET new user by ID ($NEW_ID) ==="
curl -s $BASE_URL/$NEW_ID
echo -e "\n\n"

echo "=== PUT update user ($NEW_ID) ==="
curl -s -X PUT $BASE_URL/$NEW_ID \
-H "Content-Type: application/json" \
-d '{
  "user_id": '"$NEW_ID"',
  "name": "Jane Doe Updated",
  "username": "janedoe",
  "email": "jane.updated@metropolia.fi",
  "role": "user",
  "password": "newpassword"
}'
echo -e "\n\n"

echo "=== GET updated user ($NEW_ID) ==="
curl -s $BASE_URL/$NEW_ID
echo -e "\n\n"

echo "=== DELETE user ($NEW_ID) ==="
curl -s -X DELETE $BASE_URL/$NEW_ID
echo -e "\n\n"

echo "=== GET all users after deletion ==="
curl -s $BASE_URL
echo -e "\n"