# School System API

## Progress Logs

### v0.0.1
1. Create Schema Model for Student , Teacher , Subject 
2. Create Controller for the models
3. Add CRUD Functionality in controllers.

### v0.0.2
1. Add Authentication for teacher and students (Cookies , JWT , Middleware)
2. Teacher routes is not allowed for students cookies
3. Add Profile Routes for Teacher and Student 
    - Able to see User Information
4. Able to assign a subject to teacher
    - Check if teacher is applicable to specific schedule
    - Compute the Class Session duration
5. Student Is able to pick a subject schedule
    - Student can look up to the subject list with the teacher who is teaching it.
    - Time compatible able to anylyze if the student is fit on that schedule.
6. Student is able to see his schedule 
    - Subject Info
    - Teacher Info


### TODO for v0.0.3
1. Able to change the subject schedule 
    - Checks if it will have conflict to other subject
2. Able to remove the subject schedule from student.
3. Able to remove the subject to teacher
4. Clean then authentication middlewares in route files.
5. Able to assign fixed subject to student
    - Student not allowed to have all the subject
    - route for assigining a subject to student
6. Add QUIZ , ATTENDANCE , REPORT , EXAM , RECITATION MODEL


