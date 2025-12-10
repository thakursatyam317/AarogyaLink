# Aarogya Link
#### Version: 1.0
#### Author: *Satyam Thakur*
#### Team Name: S⁵
#### Start Date: 13/10/2025
#### End Date: 31/12/2025


## 1. Overview
Aarogya Link is a comprehensive health management system designed to streamline patient care, medical records, and healthcare services. The platform aims to connect patients, healthcare providers, and medical facilities through an integrated digital solution.

## 2. Features
- **User Authentication**: Secure login and registration for patients, doctors, and admin using JWT.    // completed
- **OAuth**: Enable users to sign in using third-party services only Google.
- **Patient Management**: Maintain detailed patient profiles, including medical history, prescriptions, appointment schedules, Request to Admin shared the data from one Hospital to another hospital, data share One Hospital to another Hospital. 
- **Doctor Management**: Enable doctors to manage their schedules, patient consultations(Preception), and treatment plans effectively.
- **Admin Management**: Provide administrative tools for managing users, appointments, and system settings.
- **Appointment Scheduling**: Allow patients to book, reschedule, and cancel appointments with healthcare providers.
- **NAMASTE CODE Integration**: Preception when doctor add this for easy understanding.
- **ICD-11 Integration**: Standardize disease classification and coding for accurate diagnosis and treatment, easy understable for the another doctor.
- **Electronic Health Records (EHR)**: Store and manage patient health records securely, enabling easy access for authorized personnel.
- **Elctronic Medical Records (EMR)**: Digitally manage patient medical records for efficient retrieval and updates.
- **ChatGPT API Integration**: Use ChatGPT API for health-related queries and prescription explanations.
- **Payment Gateway Integration**: Secure payment processing using Razorpay.    // completed
- **Role-Based Access Control**: Differentiate access levels for patients, doctors, and admin.
- **Chat Bot Integration**: Implement chat bot for instant support and information retrieval.
- **Secure Data Handling**: Ensure compliance with healthcare data protection regulations, in our software the data is handling is pdf form and also secure for not download the report file.

## 3. Technology Stack
- **Frontend**: React.js, HTML, CSS, Tailwind CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Frontend Dependencies**: Axios, react-icons && lucide-react, react-router-dom, react-hot-toast, framer-motion
- **Backend Dependencies**: Mongoose, JWT, bcrypt, cors, dotenv, cloudinary, multer, nodemailer, mailgen, short-unique-id, cookie-parser, razorpay, Socket.io.
- **Payment Gateway**: Razorpay.
- **Tools Used**: Git, Github, Docker
- **Api Integreate**: ICD-11 code, NAMASTE code, gpt  
- **Deployment**: Hostinger


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
- Offer a clean dashboard for both Doctor and Admin.


## 5. Roles wise Access
- **Patients**: Individuals seeking medical consultations and health management services.
- **Doctors**: Healthcare professionals providing medical consultations and treatments.
- **Admin**: Personnel managing the healthcare facility's operations and system maintenance.   


## 6. Fetures
### 6.1 Patient Features
- User Registration, Login, Logout.
- Pasword Forget and Reset.
- Origin Authentication using JWT.
- User Profile.
- Search Doctors.
- Doctor Details.
- Book Appointment.
- View Appointments Status.
- Payment Gateway Integration using Razorpay.
- Appointment History.
- See the data shared from one hospital to another hospital but one condition own data status checked.
- Using ChatGPT API for health-related queries and the Prescription explaination.
### 6.2 Doctor Features
- Doctor Registration, Login, Logout.
- Pasword Forget and Reset.
- Origin Authentication using JWT.
- Doctor Profile.
- View Appointment Requests.
- Accept/Reject Appointments.
- View Patient Details.
- ICD-11 Integration for disease classification.
- NAMASTE CODE Integration for easy prescription understanding.
- View Appointment History.
- See the data shared from one hospital to another hospital but one condition own patient data status checked.
- Dashboard to see the total appointments, total patients, total earnings etc.
- Generate a Report(Laboratory in Hospital)
### 6.3 Admin Features
- Admin Login, Logout.
- Origin Authentication using JWT.
- Manage Doctors.
- Manage Patients.
- View All Appointments.
- Shared the data from one hospital to another hospital and also checked the comes data and send data status checked and see the data own hospital.
- Block/unblock Doctors and Patients.
- Dashboard to see total doctors, total patients, total appointments, total earnings, EHR-EMR system etc.


### 7. Functional Requirements
### **http://localhost:4500/api**
#### 7.1 User Authentication 
##### **/auth**                            // auth.route
- POST-  /register : Register a new user (patient/doctor).
- POST-  /login : Authenticate user and provide JWT token.
- POST-  /logout : Logout user and invalidate JWT token.
- POST-  /forgot-password : Initiate password reset process.
- POST-  /reset-password : Reset user password using token.

#### 7.2 User Management
##### **/user**                       // user.route
- GET-  /profile : Retrieve user profile information.
- PUT-  /profile/update : Update user profile information.

#### **/doctor**                 // doctor.route  ------- change to the Patient---------
- POST- /createDoctor : Request to admin for User to Doctor account upgrade.  
- Get- /list : Get the List of all the Doctors at the same Hospital not another hospital.
- GET- /:id : Get the Details for a specific doctor not show another doctor.
- GEt- /appointments/:id : Book the appoinemnt and payment for the Doctor.

#### **/appointments**                                       //  appointment.route 
- POST- /getAppointments : To get the appointment of the particular doctor and also payment 50 rupess.
- GET- /allappointments : GET the appointment which is accepted by the doctor, one condition is own patient.
- PUT- /update-status/:id : Update appointment status (accept/reject) by doctor. // Accepted or Rejected then show in the patient notification. And also show in the doctor dashboard.
- GET- /acceptedappointments : Get accepted appointment is show on the doctor dashboard which is accepted.

#### **chat** // chat.route 




#### 7.3 Doctor Management
##### **/doctor** // doctor.route

#### 7.4 Admin Management
##### **/admin**// admin route


#### 7.5 Laboratory Management
##### **/laboratory** // laboratory.route



#### 7.6 Canteen Facility 
##### **/canteen** // canteen.route

## 8. Data Base
- Link for ER Diagram: https://app.diagrams.net/?src=about#G1gA0g-ikmYzfW7kFU99DZStYVNa07keFf




## 9. Timeline
 - The project End Time line is 05/01/2026 to 15/01/2026.

## 10. Deployment 
- This project is deploy at hostinger.
- The domain name is aarogyalink.(in, online, org, cloud).
- Deployment Date around - 01/01/2026 to 10/01/2026.
