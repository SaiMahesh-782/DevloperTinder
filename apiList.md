## authRouter

POST /SignUp
POST /Login
POST /Logout

## ProfileRouter

GET /profile/view
PATCH /profile/edit
PATCH /profile/changepassword

## Requests Router
POST /request/review/aacepted/:requestId
POST /request/review/rejected/:requestId
POST /request/review/ignored/:requestId
POST /request/review/intersted:requestId

## UserRouter
GET /user/Connections
GET /user/requests/
GET /user/feed