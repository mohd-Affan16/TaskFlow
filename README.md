# TaskFlow - Task Management App

A full-stack task management application built with Node.js, Express, MongoDB, EJS, and Tailwind CSS.

Live Demo: [view demo](https://taskflow-1vri.onrender.com)

## Features

- User authentication (Signup + Login)
- Create, Read, Update, and Delete (CRUD) tasks
- Clean and modern UI with **glassmorphism** design using Tailwind CSS
- Responsive layout (works well on mobile and desktop)
- Dynamic rendering with EJS templating
- Data persistence using MongoDB Atlas
- Deployed on Render

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas + Mongoose
- **Frontend**: EJS (templating), Tailwind CSS
- **Deployment**: Render

## Project Structure

```
TaskFlow/ 
├── views/              # EJS templates
│   ├── login.ejs
│   ├── signup.ejs
│   └── tasks.ejs
├── public/             # Static files
│   └── css/
│       └── output.css  # Tailwind output
├── models/             # Mongoose schemas
│   ├── User.js
│   └── Task.js
├── routes/             # Express routes (if separated)
├── app.js              # Main server file
├── package.json
└── tailwind.config.js
```

---

#  Project Preview
<p align="center">
  <table width="100%">
    <tr>
      <td width="25%" align="center">
        <details>
          <summary>Welcome Page</summary>
          <img src="https://github.com/user-attachments/assets/f94f072f-c251-41e6-92b4-07e49fec55ca" alt="Workshop Setup" width="100%">
        </details>
      </td>
      <td width="25%" align="center">
        <details>
          <summary> Login Page</summary>
          <img src="https://github.com/user-attachments/assets/6780156f-bbe7-4943-930a-dd46b04abff9" alt="LCD Display" width="100%">
        </details>
      </td>
      <td width="25%" align="center">
        <details>
          <summary>Signup Page</summary>
          <img src="https://github.com/user-attachments/assets/2daa52fa-7d41-4a33-9eef-2f0edfd0b7d1" alt="Sensor Setup" width="100%">
        </details>
      </td>
      <td width="25%" align="center">
        <details>
          <summary>Home Page</summary>
          <img src="https://github.com/user-attachments/assets/96367189-77ae-4259-aa72-ae1c977fa223" alt="Cooling Fan Setup" width="100%">
        </details>
    </tr>
  </table>
</p>

---

## Key Learnings

This was my **second full-stack project** (after a simple "Hello World" Express + EJS intro page).

What improved from the previous project:
- Proper MongoDB connection and Mongoose models
- Full CRUD functionality with real database
- Better Tailwind configuration for EJS files
- Form handling, redirects, and async/await database operations
- Deployment on Render

Biggest challenge was debugging MongoDB connection issues and understanding how frontend talks to backend properly.

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/mohd-Affan16/TaskFlow.git
   cd TaskFlow
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file and add your MongoDB connection string.

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and go to `http://localhost:3000`


## Future Improvements

- Better authentication (password hashing, sessions/JWT)
- Due dates and task categories
- Dark/Light mode toggle
- Task search and filtering
- User profile page

