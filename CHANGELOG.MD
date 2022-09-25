![Alt text](https://raw.githubusercontent.com/JoemarDev/School-System-API/main/logo.png)
# Schooolify API

* This API is still on progress
* You can check the (Prototype) API Documention in this link [Schooolify API](https://documenter.getpostman.com/view/16604401/2s7Ymz8Ma7).


## Change Logs

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
4. Clean then authentication middlewares in route files. 
    - Add All Persmision to middleware to temporary access all functionality whoever is login
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


### v0.0.5 (09/18/22)
1. Add .env_example
2. Course
    - Create a model for COURSE
    - CRUD IMPLEMENTATION
    - Course must have a subject list from (SUBJECT MODEL)
    - Able to get all the student have this course
3. Subject Model 
    - Must have a lesson plan (Lesson Plan Model)
    - Able to show all the lesson plan for the subjects.
4. Lesson Plan
    - Create a model for LessonPlan
    - CRUD IMPLEMENTATION
5. Able to check all the students Subjects


### v0.0.6 (09/19/22)
1. Remove Quiz model 
    - Rerfractor , Join it in Exam Model.
2. Implement Exam CRUD
    - Able to automatically compute the average of the exams
    - exam can only be add based on the subject and the course of students as well quiz.
    - add enum attributes (exam, quiz)
3. Combine Exam and Quiz Controller 
    - Add Middleware in the routes to identify the type of exam


### v0.0.7 (09/20/22)
1. Implement Attendace 
    - CRUD Features
    - Student must have only 1 attendace perday
    - attendance must be under in the subject
    - check if the student is own the subject
2. Create a route where it can calculate the average attendance of the student
3. Implement Project & Activity
    - CRUD Implementation
    - Subject Student Course Validator
4. Check student Subject Average


### v0.0.8 (09/21/22)
1. Implement Grading Formula
    - CRUD Functionality
    - Fixed Amount of Grading Fomula 
        Allowed :
        - quiz
        - attendace 
        - exam
        - project
        - activity
    - Automaticlly update the existing one , if create with the same type of fomula
2. Getting the average of the student subject is based on Grading Formula
3. Check Student Total Average


### v0.0.9 (09/22/22)

1. Work on progress populate script
2. Re-work the codes  of checking if the subject have the course
3. Change course data schema type of subject.
4. Update the ResetDatabase Script
5. Update the pre methods in Subject Model
    - Delete all related model when the subject is deleted.

### v1.0.0 (09/24/22)
1. Update The Controller of creating subject , make sure that it validate the course that will be passed
    - If the course is passed as a string convert it to array to properly handle in the mongo schema


### v1.0.1(09/25/22)
1. Create Admin Account
2. Create Route For Creating a admin account
    - Check if have a existing admin account
    - Create Route for creating admin account
    - Can update admin password
3. Create a authentication route for admin
4. Create a populate script
5. Finish Reset Database Script


### TODO for v1.0.2
1. Create a test script
2. Create a swagger UI documentation
3. Create a README Installation
    - Provide the features of the system
    - Provide the future feature to be realease.
4. Make the first realease.   