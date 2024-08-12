# HireHub

**HireHub** is a comprehensive hiring portal built using the MERN stack (MongoDB, Express.js, React, Node.js). It provides a platform for job seekers to browse and apply for jobs, for employers to manage job postings and candidate shortlisting, and for admins to oversee the platform's operations. The platform also includes features like coding tests and interview scheduling using WebRTC.



## Technologies Used

- **Frontend:** React, Redux
- **Backend:** Node.js, Express.js
- **Storage** Firebase
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **Real-Time Communication:** WebRTC (for upcoming interview scheduling feature)
- **Styling:** CSS, Bootstrap, Material UI


## Features

### Client-Side Features
- **Login/Signup with JWT Authentication:** Secure user authentication using JSON Web Tokens.
- **Apply for Jobs:** Browse and apply for jobs easily.
- **Give Coding Tests:** Integrated coding tests for specific job applications.
- **Browse Jobs:** Explore a wide range of job opportunities.

### Owner-Side Features
- **Post Job:** Create and manage job listings.
- **Register Company:** Register and manage company profiles.
- **Shortlist Candidates:** Review applications and shortlist candidates.
- **Schedule Coding Tests:** Set up coding tests for shortlisted candidates.

### Admin-Side Features
- **Manage Owners:** Oversee and manage registered company owners.
- **Manage Users:** Administer platform users, including job seekers and owners.
- **Post External Jobs:** Post job listings that are external to the platform.
ap

## Folder Structure

```plaintext
hiring-portal/
│
├── backend/         # Backend code (Node.js, Express.js)
│
├── public/          # Static files and assets
│
└── src/             # React frontend source code
    ├── components/  # Reusable React components
    ├── pages/       # React pages
    ├── store/       # Redux store and actions
    └── utils/       # Utility functions and helpers
```

## Installation and Setup

To run this project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Yashgabani845/hiring-portal.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd hiring-portal
   ```

3. **Install frontend dependencies and start the React server:**

   ```bash
   npm install
   npm start
   ```

   The React server will start on `http://localhost:3000/`.

4. **Open another terminal and start the backend server:**

   ```bash
   cd backend
   npm install
   node server.js
   ```

   The backend server will start on `http://localhost:5000/`.
## Upcoming Features

- **Interview Scheduling:** Implementing WebRTC for real-time video interviews between candidates and employers.
- **Advanced Search Filters:** Enhanced job search with filters by location, experience, and more.
- **Notifications:** Real-time notifications for job application status, interview schedules, etc.



## Contact

For any inquiries or feedback, please reach out to:

- **Name:** Yash Gabani
- **Email:** [gabaniyash846@gmail.com](mailto:gabaniyash846@gmail.com)
- **GitHub:** [Yashgabani845](https://github.com/Yashgabani845)

---

