# Aarogya Link
#### Version: 1.0
#### Author: Satyam Thakur
#### Team Name: S⁵
#### Start Date: 13/10/2025
#### End Date: 31/12/2025


## 1. Overview
Aarogya Link is a comprehensive health management system designed to streamline patient care, medical records, and healthcare services. The platform aims to connect patients, healthcare providers, and medical facilities through an integrated digital solution.

## 2. Features
- **Patient Management**: Maintain detailed patient profiles, including medical history, prescriptions, appointment schedules, data share One Hospital to another Hospital.
- **Doctor Management**: Enable doctors to manage their schedules, patient consultations, and treatment plans effectively.
- **Admin Management**: Provide administrative tools for managing users, appointments, and system settings.
- **Appointment Scheduling**: Allow patients to book, reschedule, and cancel appointments with healthcare providers.
- **Electronic Health Records (EHR)**: Store and manage patient health records securely, enabling easy access for authorized personnel.
- **Elctronic Medical Records (EMR)**: Digitally manage patient medical records for efficient retrieval and updates.
- **Analytics and Reporting**: Provide insights into patient care, treatment outcomes, and operational efficiency
- **ChatGPT API Integration**: Use ChatGPT API for health-related queries and prescription explanations.
- **Payment Gateway Integration**: Secure payment processing using Razorpay.
- **Role-Based Access Control**: Differentiate access levels for patients, doctors, and admin.
- **Chat Bot Integration**: Implement chat bot for instant support and information retrieval.

## 3. Technology Stack
- **Frontend**: React.js, HTML, CSS, Tailwind CSS, JavaScript.
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Backend Dependencies**: Mongoose, JWT, bcryptjs, cors, dotenv, cloudinary, multer , nodemailer, mailgen,  short-unique-id, cookie-parser.
- **Payment Gateway**: Razorpay.
- **Frontend Dependencies**: Axios, react-router-dom, react-icons, hot-toaster

## 4. Goals & Objectives

### **Primary Goals**
- Provide a seamless doctor appointment booking system.
- Enable patients to securely pay using Razorpay.
- Allow doctors to accept or reject appointments easily.
- Ensure smooth communication between patient and doctor.

### **Secondary Goals**
- Provide appointment tracking for patients.
- Improve doctor response time.
- Maintain secure and fast authentication using JWT.
- Offer a clean dashboard for both doctor and patient.


## 5. User Personas
- **Patients**: Individuals seeking medical consultations and health management services.
- **Doctors**: Healthcare professionals providing medical consultations and treatments.
- **Admin**: Personnel managing the healthcare facility's operations and system maintenance.   


## 6. Fetures
### 5.1 Patient Features
- User Registration, Login, Logout.
- Pasword Forget and Reset.
- OAuthentication using JWT.
- User Profile.
- Search Doctors.
- Doctor Details.
- Book Appointment.
- View Appointments Status.
- Payment Gateway Integration using Razorpay.
- Appointment History.
- See the data shared from one hospital to another hospital.
- Using ChatGPT API for health-related queries and the Prescription explaination.
### 5.2 Doctor Features
- Doctor Registration, Login, Logout.
- Pasword Forget and Reset.
- OAuthentication using JWT.
- Doctor Profile.
- View Appointment Requests.
- Accept/Reject Appointment Requests.
- View Appointment History.
- See the data shared from one hospital to another hospital.
- Dashboard to see the total appointments, total patients, total earnings etc.
### 5.3 Admin Features
- Admin Login, Logout.
- OAuthentication using JWT.
- Manage Doctors.
- Manage Patients.
- View All Appointments.
- Generate Reports.
- Shared the data from one hospital to another hospital.
- block/unblock Doctors and Patients.
- Dashboard to see total doctors, total patients, total appointments, total earnings etc.


### 7. Functional Requirements
### **http://localhost:4500/api**
#### 7.1 User Authentication 
##### **/auth**
- POST-  /register : Register a new user (patient/doctor).
- POST-  /login : Authenticate user and provide JWT token.
- POST-  /logout : Logout user and invalidate JWT token.
- POST-  /forgot-password : Initiate password reset process.
- POST-  /reset-password : Reset user password using token.
#### 7.2 User Management

##### **/user**
- GET-  /profile : Retrieve user profile information.
- PUT-  /profile/update : Update user profile information.


#### **/doctor**
- POST- /createDoctor : Request to admin for User to Doctor account upgrade.
- Get- /list : Get the List of all the Doctors at the same Hospital not another hospital.
- GET- /:id : Get the Details for a specific doctor not show another doctor.
- GEt- /appointments/:id : Book the appoinemnt and payment for the Doctor.

#### **/appointments**



#### **chat**




#### 7.3 Doctor Management
##### **/doctor**








#### 7.4 Admin Management
##### **/admin**


#### 7.5 Laboratory Management
##### **/laboratory**


## 8. Data Base
- Link for ER Diagram: https://app.diagrams.net/?src=about#G1gA0g-ikmYzfW7kFU99DZStYVNa07keFf




## 9. Timeline
 - The project End Time line is 31/12/2025.

## 10. Deployment 
- At this time period for frontend deployment we are using Natlify and for backend we are using Render.
