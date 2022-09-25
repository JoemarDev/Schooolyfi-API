![Alt text](https://raw.githubusercontent.com/JoemarDev/School-System-API/main/logo.png)
# Schooolify API
Schooolify api provides you a ready made API System for mostly used in school management system.

* API BETA Release(v1.0.1)
* You can check the (Prototype) API Documention in this link [Schooolify API](https://documenter.getpostman.com/view/16604401/2s7Ymz8Ma7).

## Change Log
[Change log records](https://github.com/JoemarDev/Schooolyfi-API/blob/main/CHANGELOG.MD)

## Installation
Install Packages
```bash
npm install
```
And Run
```bash
npm run dev
```

For Creating a dummy data run
```bash
node PopulateData.js
```

For Resetting the database run
```bash
node ResetDatabase.js
```

## Features
1. Authentication by jsonwebtoken and implemented via cookies. (3 types of role)
    - Admin Account
    - Student Account
    - Teacher Account
2. Student Mangement
3. Teacher Management
4. Lesson Plan Management
5. Subjects Management
6. Course Management
7. Schedule Management
8. Grading Calculation

## Future Plan
1. Add Parent Portal
2. Add Online Classroom
    - Classroom Chat
    - Video class room.


## TECH
* [NODE JS] - ES6
* [MONGODB] - NOSQL


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[GNU General Public License v3.0](https://github.com/JoemarDev/Schooolyfi-API/blob/main/LICENSE)