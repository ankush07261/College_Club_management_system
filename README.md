# 🎓 **COLLEGE CLUB MANAGEMENT SYSTEM**  

> ⚠ **Note:** This project does **not** have secure authentication. It is built primarily to **demonstrate CRUD operations and http request methods** in a web application.  

---

## 🔐 **LOGIN CREDENTIALS**  
Use the following admin credentials to log in:   
loginid = "admin", username = "admin" & password = "admin"

---

## 🚀 **FEATURES**
✔️ Manage Members – Add, edit, or remove club members.  
✔️ Manage Accounts – Track and update financial details.  
✔️ Manage Logistics – Store and retrieve logistical data for clubs.  
✔️ Event Management – Keep track of club events.  
✔️ Basic Authentication – (⚠ Not secure, only for demonstration purposes).  

---

## 🛠 **TECH STACK**
🔹 Frontend: EJS (Embedded JavaScript), CSS3  
🔹 Backend: Node.js, Express.js  
🔹 Database: (mySQL db, make sure u create the db and add valid credentials in database.js)  

---

## 📂 **PROJECT STRUCTURE**
public/                     # Public assets    
│── assets/                 # Images and other static assets    
│   ├── background.jpeg  
│   ├── college.jpg  
│── css/                    # Stylesheets  
│   ├── styles.css  

views/                      # Views (EJS templates)  
│── partials/               # Reusable EJS components  
│   ├── footer.ejs  
│   ├── header.ejs  
│── results/                # Result pages for different queries  
│   ├── accountResult.ejs  
│   ├── clubResult.ejs  
│   ├── club_eventsResult.ejs  
│   ├── club_headsResult.ejs  
│   ├── logisticsResult.ejs  
│   ├── member_clubsResult.ejs  
│   ├── membersResult.ejs  
│   ├── query-result.ejs  
│── error.ejs               # Error page  
│── home.ejs                # Homepage  
│── index.ejs               # Main template  
│── manage.ejs              # Management page  

.gitignore                  # Git ignored files  
database.js                 # Database handling (if used)  
index.js                    # Main server file  
package.json                # Dependencies and scripts  
package-lock.json           # Dependency lock file  

---

## 💻 **HOW TO RUN THE PROJECT**
<ol>
  <li>Open the terminal and clone the repo</li>
  <li>navigate to College_Club_management_system  

  ```sh
    cd College_Club_management_system
 ```
  </li>
  <li>
    configure the database in database.js using .env file of your own
  </li>
  <li>
    Install dependencies and run the server:  
    
    npm i
    node index.js

  </li>
  <li>
    Open your browser and search the following in your browser:  

    http://localhost:3000

  </li>
</ol>
