# Visitor Management System 🚪

![GitHub repo size](https://img.shields.io/github/repo-size/ParthBhosale123/visitor-management-system)
![GitHub last commit](https://img.shields.io/github/last-commit/ParthBhosale123/visitor-management-system)
![GitHub issues](https://img.shields.io/github/issues/ParthBhosale123/visitor-management-system)
![GitHub stars](https://img.shields.io/github/stars/ParthBhosale123/visitor-management-system)
![GitHub forks](https://img.shields.io/github/forks/ParthBhosale123/visitor-management-system)

A **full-stack Visitor Management System** to handle visitor requests and approvals efficiently. Built with **React**, **Node.js**, **Express**, and **MongoDB**.

---

## ✨ Features
- ✅ Add, update, and delete visitor entries  
- 🔑 Role-based access control (Admin & HR)  
- 📊 Approval/rejection workflow for requests  
- 🔒 Secure API with JWT authentication  
- 📱 Fully responsive UI design  

---

## 🛠 Tech Stack
**Frontend:** React, Axios, Bootstrap / Tailwind CSS  
**Backend:** Node.js, Express.js  
**Database:** MongoDB (Mongoose)  
**Authentication:** JSON Web Tokens (JWT)  

---

## 📂 Project Structure
visitor-management-system/
│── backend/ # Node.js + Express backend
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── server.js
│ └── .env # Environment variables (ignored in git)
│
│── frontend/ # React frontend
│ ├── src/
│ ├── public/
│ └── package.json
│
└── package.json # Root config for both frontend & backend


---

## 🚀 Installation & Setup
### 1️⃣ Clone the Repository
```bash
git clone https://github.com/ParthBhosale123/visitor-management-system.git
cd visitor-management-system

2️⃣ Backend Setup
cd backend
npm install

Create a .env file inside backend/:
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Start the backend server: npm start

3️⃣ Frontend Setup
cd ../frontend
npm install
npm start

4️⃣ Run Both Frontend & Backend Together (Optional)
If you set up concurrently in the root package.json: npm start

📷 Screenshots
Dashboard
<img width="1909" height="955" alt="Screenshot 2025-08-12 123651" src="https://github.com/user-attachments/assets/30922f7d-0e35-472f-9895-ede75119d8ca" />
<img width="1910" height="957" alt="Screenshot 2025-08-12 123715" src="https://github.com/user-attachments/assets/e5ff8e29-001f-408f-b9ce-314cfccc8115" />

Admin Login Page
<img width="1906" height="957" alt="Screenshot 2025-08-12 123621" src="https://github.com/user-attachments/assets/3b868744-36ae-45bf-9172-056a2ecf32a7" />

Add Visitor Form
<img width="1911" height="961" alt="Screenshot 2025-08-12 123549" src="https://github.com/user-attachments/assets/a667e19f-20ab-4423-824b-a431d636c13a" />


⚠️ Environment Variables
The following environment variables must be set in your .env file inside backend/:
| Variable     | Description                          |
| ------------ | ------------------------------------ |
| `PORT`       | Port number for backend (e.g., 5000) |
| `MONGO_URI`  | MongoDB connection string            |
| `JWT_SECRET` | Secret key for JWT authentication    |
Important: Never commit .env files — they are already ignored using .gitignore.

📜 License
This project is licensed under the MIT License — you are free to use, modify, and distribute it.

💡 Author
Parth Bhosale
📧 Email: parthb00009@gmail.com
🔗 LinkedIn: https://www.linkedin.com/in/parthbhosale09/
🔗 GitHub: [ParthBhosale123](https://github.com/ParthBhosale123)
