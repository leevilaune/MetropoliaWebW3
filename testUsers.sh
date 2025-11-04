#!/bin/bash

BASE_URL="http://localhost:3000/api/v1/user"

# Helper: safely pretty-print JSON if valid
print_json_or_raw() {
  local body="$1"
  if echo "$body" | jq empty >/dev/null 2>&1; then
    echo "$body" | jq .
  else
    echo "$body"
  fi
}

# Helper: run curl and show details
run_curl() {
  local METHOD=$1
  local URL=$2
  local DATA=$3

  echo ">>> $METHOD $URL"
  if [ -n "$DATA" ]; then
    echo "Request body:"
    echo "$DATA" | jq .
  fi

  if [ -n "$DATA" ]; then
    RESPONSE=$(curl -s -w "\n%{http_code}" -X "$METHOD" "$URL" \
      -H "Content-Type: application/json" \
      -d "$DATA")
  else
    RESPONSE=$(curl -s -w "\n%{http_code}" -X "$METHOD" "$URL")
  fi

  BODY=$(echo "$RESPONSE" | sed '$d')
  STATUS=$(echo "$RESPONSE" | tail -n1)

  echo "Status: $STATUS"
  echo "Response:"
  print_json_or_raw "$BODY"
  echo "------------------------------------"
  echo
}

echo "=== GET all users ==="
run_curl GET "$BASE_URL"

echo "=== POST new user ==="
NEW_USER_JSON='{
  "name": "Jane Doe",
  "username": "janedoe",
  "email": "jane@metropolia.fi",
  "role": "admin",
  "password": "admin"
}'
POST_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL" \
  -H "Content-Type: application/json" \
  -d "$NEW_USER_JSON")
BODY=$(echo "$POST_RESPONSE" | sed '$d')
STATUS=$(echo "$POST_RESPONSE" | tail -n1)
echo "Status: $STATUS"
echo "Response:"
print_json_or_raw "$BODY"
echo "------------------------------------"
echo

# Extract ID (supports "user_id" or fallback "cat_id")
NEW_ID=$(echo "$BODY" | grep -o '"user_id":[0-9]*' | grep -o '[0-9]*')
if [ -z "$NEW_ID" ]; then
  NEW_ID=$(echo "$BODY" | grep -o '"cat_id":[0-9]*' | grep -o '[0-9]*')
fi

if [ -z "$NEW_ID" ]; then
  echo "❌ Failed to extract new user ID from POST response."
  exit 1
fi

echo "=== GET new user by ID ($NEW_ID) ==="
run_curl GET "$BASE_URL/$NEW_ID"

echo "=== PUT update user ($NEW_ID) ==="
UPDATE_JSON=$(cat <<EOF
{
  "name": "Jane Doe Updated",
  "username": "janedoe",
  "email": "jane.updated@metropolia.fi",
  "role": "user",
  "password": "newpassword",
  "user_id": $NEW_ID
}
EOF
)
run_curl PUT "$BASE_URL/$NEW_ID" "$UPDATE_JSON"

echo "=== GET updated user ($NEW_ID) ==="
run_curl GET "$BASE_URL/$NEW_ID"

echo "=== DELETE user ($NEW_ID) ==="
run_curl DELETE "$BASE_URL/$NEW_ID"

echo "=== GET all users after deletion ==="
run_curl GET "$BASE_URL"