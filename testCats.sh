#!/bin/bash

BASE_URL="http://localhost:3000/api/v1/cats"

echo "=== GET all cats ==="
curl -s $BASE_URL
echo -e "\n\n"

echo "=== POST new cat ==="
NEW_CAT=$(curl -s -X POST $BASE_URL \
-H "Content-Type: application/json" \
-d '{
  "name": "Whiskers",
  "birthdate": "2020-05-01",
  "weight": 10,
  "owner": "Alice",
  "image": "https://example.com/whiskers.png"
}')
echo $NEW_CAT
echo -e "\n\n"

# Extract new cat ID from the POST response
NEW_ID=$(echo $NEW_CAT | grep -o '"cat_id":[0-9]*' | grep -o '[0-9]*')

echo "=== GET new cat by ID ($NEW_ID) ==="
curl -s $BASE_URL/$NEW_ID
echo -e "\n\n"

echo "=== PUT update new cat ($NEW_ID) ==="
curl -s -X PUT $BASE_URL/$NEW_ID \
-H "Content-Type: application/json" \
-d '{
  "cat_id":3,
  "name": "Whiskers Updated",
  "weight": 12
}'
echo -e "\n\n"

echo "=== GET updated cat ($NEW_ID) ==="
curl -s $BASE_URL/$NEW_ID
echo -e "\n\n"

echo "=== DELETE cat ($NEW_ID) ==="
curl -s -X DELETE $BASE_URL/$NEW_ID
echo -e "\n\n"

echo "=== GET all cats after deletion ==="
curl -s $BASE_URL
echo -e "\n"
