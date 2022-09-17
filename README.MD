![Alt text](https://raw.githubusercontent.com/JoemarDev/School-System-API/main/logo.png)
# Schooolify API

* This API is still on progress
* Feel Free to contribute 


## ChangeLogs

### v0.0.1 (09/14/22)
1. Create Schema Model for Student , Teacher , Subject 
2. Create Controller for the models
3. Add CRUD Functionality in controllers.

### v0.0.2 (09/15/22)
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


### v0.0.3 (09/16/22)
1. Refractor Student Schedule and Subject Schedule Controller and convert it to One Controller as ScheduleController
2. Able to remove the subject schedule from student.
3. Able to change the subject schedule 
    - Checks if it will have conflict to other subject
    - Pick from the subject schedule that already assign from the teacher.
4. Clean then authentication middlewares in route files. Add All Persmision to middleware to temporary access all functionality whoever is login
5. Add Routes to get student schedule information
6. New Models 
    - Quiz
    - Exam,

### v0.0.4 (09/17/22)
1. Get teacher Schedule
2. Get all the student list from the subject that is scheduled to teacher.
3. Update the Create Student Subject Schedule 
    - from receving the student from the cookie
    - to manually add it from body.
4. Able to remove the subject to teacher
    - Remove Also From The Student Schedule
5. Able to update the teacher from shedule


### TODO for v0.0.5

1. Add Student Subject
    - List all the subject that assign on the student
    - Get All Student 

2. Able to assign fixed subject to student
    - Student not allowed to have all the subject
    - route for assigining a subject to student

3. Add  ATTENDANCE , Project , Activity , MODEL
    - CRUD
    - Average Computation

4. Student Daily Stats
5. Lesson Plan
