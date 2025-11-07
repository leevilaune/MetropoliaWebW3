curl -X GET http://localhost:3000/api/v1/auth/me \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0MiwibmFtZSI6IkphbmUgRG9lIiwidXNlcm5hbWUiOiJqYW5lZG9lIiwiZW1haWwiOiJqYW5lQG1ldHJvcG9saWEuZmkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NjI1MDI3NzIsImV4cCI6MTc2MjU4OTE3Mn0.-_Ibl1_FyC7jtlRTAdgF2ki5VHA4-uSm7PuFNm_LCPU" \
  -H "Content-Type: application/json" | jq
