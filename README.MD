# School System API

## Road map

### Day 1 Update (version : 0.0.1)
1. Create Schema Model for Student , Teacher , Subject , Class-Schedule
2. Create Controller for the models
3. Add CRUD Functionality in controllers.

### Day 2 Update (version : 0.0.2)
1. Add Authentication for teacher and students (Cookies , JWT , Middleware)
2. Teacher routes is not allowed for students cookies
3. Add Profile Routes for Teacher and Student 
    - Able to see User Information
4. Update Class Schedule Routes :
    - If the routes not found a user type admin it will refer to user_id of existing client and find the records base on their ID.

### TODO
1. Get Student Available Time Schedule
2. Get Teacher AVailable Time Schedule
3. Add Middleware on Create Class Schedule , check if both user is available into time provided.
    - Install moment
    - Create UTILS to format the time and read it properly