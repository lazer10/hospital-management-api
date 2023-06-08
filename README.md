### Hospital Management API

## INSTALLATION

### Installing Dependencies

Run
`yarn install` or `npm i`
`npm run dev`

### Sequelize Initiation

`npx sequelize db:migrate`
`npx sequelize --help`

### .env
Create a .env file in the root directory and paste in this

```
PORT=
JWT_SECRET=
DEV_DATABASE_URL=
ADMIN_EMAIL=
ADMIN_PASSWORD=
```

## Routes Menu

### Admin
- [Admin Login](#1-Admin-Login-Post-Request)

### Department
- [Add Department](#2-Add-Department-Post-Request)
- [Fetch All Department](#3-Fetch-All-Department-Get-Request)
- [Fetch Department By Id](#3-Fetch-Department-By-Id-Get-Request)

### Doctor
- [Add Doctor](#1-Add-Doctor-Post-Request)

### 1. Admin Login: POST Request

End Point
```
/api/admin/login
```

Body
```json
{
    "email": "admin@gmail.com",
    "password": "admin!123"
    
}
```

Response
```json
{
    "status": 200,
    "message": "Login successful",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTY4Mzk2ODE5MH0.jcaIUS92c0oJIvKa1ERkZD5d6IOchwc_j48hR9d4XTo",
        "email": "admin@gmail.com",
        "role": "Admin",
        "logginTime": "5/13/2023, 10:56:30 AM"
    }
}
```

### 2. Add Department: POST Request

End Point
```
/api/departments/new
```

Body
```json
{
   "name": "dental"
}
```
Response
```json
{
    "status": 201,
    "message": "Department added successfully",
    "data": {
        "id": "99359e57-4b44-4fb2-b337-b0b92583cc31",
        "name": "dental",
        "created_at_milli": "1683922388868",
        "updatedAt": "2023-05-12T20:13:09.072Z",
        "createdAt": "2023-05-12T20:13:09.072Z"
    }
}
```
### 3. Fetch All Department: GET Request

End Point
```
/api/departments/
```

Response
```json
{
    "status": 200,
    "message": "Departments retrieved successfully",
    "data": [
        {
            "id": "b728c4a0-6b63-4b6d-b4ea-835b7a440698",
            "name": "dental",
            "created_at_milli": "1683967970756",
            "createdAt": "2023-05-13T08:52:51.062Z",
            "updatedAt": "2023-05-13T08:52:51.062Z"
        },
        {
            "id": "c63fcf16-fc1f-42e6-9fa1-ef70f4d9d81f",
            "name": "dentl",
            "created_at_milli": "1683967979665",
            "createdAt": "2023-05-13T08:52:59.669Z",
            "updatedAt": "2023-05-13T08:52:59.669Z"
        }
    ]
}
```
### 3. Fetch Department By Id: GET Request

End Point
```
/api/departments/:id
```
Response
```json

{
    "status": 200,
    "message": "Department with id c63fcf16-fc1f-42e6-9fa1-ef70f4d9d81f successfully retreived!",
    "data": {
        "id": "c63fcf16-fc1f-42e6-9fa1-ef70f4d9d81f",
        "name": "dentl",
        "created_at_milli": "1683967979665",
        "createdAt": "2023-05-13T08:52:59.669Z",
        "updatedAt": "2023-05-13T08:52:59.669Z"
    }
}
```
### 1. Add Doctor: POST Request

End Point
```
/api/doctors/new
```

Body
```json
{
    "firstName":"rush",
     "lastName":"jon",
     "email":"alainotui@mail.com",
     "departments":["ecf93aaf-26d8-4c59-9a76-377325b6f187","cac44f0c-695e-42cf-8b6e-4a1c52ea16db"]
}
```
Response
```json
{
    "status": 201,
    "message": "Doctor successfully added",
    "data": {
        "doctor": {
            "id": "a7258965-c137-452d-a43a-7c095fee0be9",
            "firstName": "rush",
            "lastName": "jon",
            "email": "alainotxi@mail.com",
            "departments": [
                "ecf93aaf-26d8-4c59-9a76-377325b6f187",
                "cac44f0c-695e-42cf-8b6e-4a1c52ea16db"
            ],
            "isVerified": false,
            "updatedAt": "2023-06-05T09:16:59.431Z",
            "createdAt": "2023-06-05T09:16:59.431Z"
        }
    }
}
```