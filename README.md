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
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=25
SMTP_USER=apikey
SMTP_PASS=
SENDGRID_EMAIL_RECEIVER=
```

## Routes Menu

### Admin

- [Admin Login](#1-Admin-Login-Post-Request)

### Department

- [Add Department](#2-Add-Departments-Post-Request)
- [Fetch All Department](#3-Fetch-All-Departments-Get-Request)
- [Fetch Department By Id](#3-Fetch-Departments-By-Id-Get-Request)
- [Update Department By Id](#4-Update-Departments-By-Id-Put-Request)

### Doctor

- [Add Doctor](#1-Add-Doctors-Post-Request)
- [Doctor Login](#2-Doctors-Login-Post-Request)
- [Fetch Doctor Profile](#3-Fetch-Doctors-Profile-Get-Request)
- [Change Doctor Default Password](#4-Change-Doctors-Password-Put-Request)
- [Edit Doctor Profile](#5-Edit-Doctors-Profile-Put-Request)

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

### 2. Add Departments: POST Request

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

### 3. Fetch All Departments: GET Request

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

### 3. Fetch Departments By Id: GET Request

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

### 4. Update Departments By Id: Put Request

End Point

```
/api/departments/:id/update
```

Body

```json
{
  "name": "medecine"
}
```

Response

```json
{
  "status": 200,
  "message": "Department with successfully updated!",
  "data": {
    "name": "medecine"
  }
}
```

### 1. Add Doctors: POST Request

End Point

```
/api/doctors/new
```

Body

```json
{
  "firstName": "rush",
  "lastName": "jon",
  "email": "alainotui@mail.com",
  "departments": [
    "ecf93aaf-26d8-4c59-9a76-377325b6f187",
    "cac44f0c-695e-42cf-8b6e-4a1c52ea16db"
  ]
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

### 2. Doctors Login: POST Request

End Point

```
/api/doctors/login
```

Body

```json
{
  "email": "mvualain@gmail.com",
  "password": "t1uqpk"
}
```

Response

```json
{
  "status": 200,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im12dWFsYWluQGdtYWlsLmNvbSIsInJvbGUiOiJEb2N0b3IiLCJpYXQiOjE2ODY5MjExNDR9.HbhIwIvad-5-nzMs07U44GWI-xUk3MFo8_bcBSUXv_c",
    "email": "mvualain@gmail.com",
    "role": "Doctor",
    "logginTime": "6/16/2023, 3:12:25 PM"
  }
}
```

### 3. Fetch Doctors Profile: Get Request

End Point

```
/api/doctors/my-profile
```

Response

```json
{
  "status": 200,
  "message": "Doctor profile retrieved successfully",
  "data": {
    "email": "mvualain@gmail.com",
    "role": "Doctor"
  }
}
```

### 4. Change Doctors Password: Put Request

End Point

```
/api/doctors/change-password
```

Body

```json
{
  "oldPassword": "8yrrrrr!o",
  "newPassword": "8yrrrrr!p"
}
```

Response

```json
{
  "status": 200,
  "message": "Password changed successfully"
}
```

### 5. Edit Doctors Profile: Put Request

End Point

```
/api/doctors/edit-profile
```

Body

```json
{
  "firstName": "llllllll",
  "lastName": "kkkkk"
}
```

Response

```json
{
  "status": 200,
  "message": "Profile updated successfully",
  "data": {
    "id": "f3ba2117-8951-4a33-b54a-f4d13fb25e32",
    "firstName": "llllllll",
    "lastName": "kkkkk",
    "email": "mvumbalain@gmail.com",
    "departments": [
      "c610cb9f-df3d-48bf-b000-d3fc598cbd65",
      "693fc5a5-f43b-4d5c-b71d-af03d7df24cd"
    ],
    "isVerified": false,
    "createdAt": "2023-06-22T09:28:53.020Z",
    "updatedAt": "2023-06-28T12:48:32.723Z"
  }
}
```
