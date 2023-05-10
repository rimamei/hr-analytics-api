# HR Analytics API

The HR Analytics API offers data-driven insights for HR decision-making, including employee performance and recruitment. It helps businesses optimize workforce management and enhance employee satisfaction.

### Technology used

- NodeJS
- Express
- Prisma
- Typescript
- Yup
- Jsonwebtoken
- Bcryptjs
- Commitlint
- Eslint
- Prettier
- Husky
- Nodemon
- Tsconfig-path
- Lint-staged

### Getting Started

## Installation

### Clone

```
$ git clone https://github.com/rimamei/employee-api.git
$ cd employee-api
$ npm install
```

## Create Environment Variable

```
DATABASE_URL=YOUR_POSTGRESDB_URL
PORT=YOUR_PORT
JWT_SECRET = YOUR_SECRET_KEY
```

### Start Development Server

```
$ npm run dev
```

## API Endpoint

### Authentication

| No  | HTTP Method | URI                   | Operation     |
| --- | ----------- | --------------------- | ------------- |
| 1   | POST        | /api/v1/auth/register | Register user |
| 2   | POST        | /api/v1/auth/login    | Login User    |

### Department

| No  | HTTP Method | URI                    | Operation                   |
| --- | ----------- | ---------------------- | --------------------------- |
| 1   | GET         | /api/v1/departments    | Get all department data     |
| 2   | GET         | /api/v1/department/:id | Get detail department by id |
| 3   | POST        | /api/v1/department     | Create Department           |
| 4   | DELETE      | /api/v1/department/:id | Delete department           |
| 5   | PUT         | /api/v1/department/:id | Edit department             |

### Employee

| No  | HTTP Method | URI                  | Operation                 |
| --- | ----------- | -------------------- | ------------------------- |
| 1   | GET         | /api/v1/employees    | Get all employee data     |
| 2   | GET         | /api/v1/employee/:id | Get detail employee by id |
| 3   | POST        | /api/v1/employee     | Create employee           |
| 4   | DELETE      | /api/v1/employee/:id | Delete employee           |
| 5   | PUT         | /api/v1/employee/:id | Edit employee             |

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are greatly appreciated.

Fork the Project

1. Create your Feature Branch `git checkout -b [feature]`
2. Commit your Changes `git commit -m 'Add some feature'`
3. Push to the Branch `git push origin [feature]`
4. Open a Pull Request

---

Copyright © 2023 [Rima Mei Handayani](https://github.com/rimamei/)
