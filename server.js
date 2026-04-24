const User = require('./models/User');
const Task = require('./models/Task');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

console.log("MONGODB_URI value:", process.env.MONGODB_URI ? "Loaded" : "Still undefined");

const server = express();

// Middleware
server.use(express.urlencoded({ extended: true }));

// View engine
server.set('view engine', 'ejs');
server.set('views', path.join(__dirname, 'views'));

// Static files
server.use(express.static(path.join(__dirname, 'public')));

const session = require('express-session'); // Install this: npm install express-session

server.use(session({
  secret: 'taskflow-secret',
  resave: false,
  saveUninitialized: false
}));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB successfully!');
  })
  .catch((err) => {
    console.log('❌ MongoDB connection failed!');
    console.error('Error details:', err.message);
  });

// ==================== ROUTES ====================

server.get('/', (req, res) => {
  res.render('home');
});

server.get('/login', (req, res) => {
  res.render('login');
});

server.get('/signup', (req, res) => {
  res.render('signup');
});

server.get('/testpage',(req,res)=>{
  res.render('testpage');
})
// Login
server.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.send("No account found with this email. Please sign up first.");
    }

    if (user.password !== password) {
      return res.send("Incorrect password. Please try again.");
    }

    console.log("✅ User logged in successfully:", email);
        // Add this line inside the logic after finding/saving the user
    req.session.userId = user._id; 
    res.redirect('/Task');

    // res.redirect('/Task');

  } catch (error) {
    console.log("❌ Login error:", error.message);
    res.send("Something went wrong. Please try again later.");
  }
});

// Signup
server.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.send("User with this email already exists!");
    }

    const newUser = new User({
      name: name,
      email: email,
      password: password
    });

    await newUser.save();

    console.log("✅ New user saved successfully:", email);
        // Add this line inside the logic after finding/saving the user
    req.session.userId = user._id; 
    res.redirect('/Task');

    // res.redirect('/Task');

  } catch (error) {
    console.log("❌ Signup error:", error.message);
    res.send("Error creating account. Maybe this email is already used?");
  }
});

// ==================== TASK ROUTES ====================

// server.get('/Task', async (req, res) => {
//   try {
//     const tasks = await Task.find({}).sort({ createdAt: -1 });
//     res.render('Task', { tasks });     // Passing tasks data
//   } catch (error) {
//     console.log("Error fetching tasks:", error.message);
//     res.send("Error loading tasks");
//   }
// });
// Get tasks for the logged-in user

// server.get('/Task', async (req, res) => {
//   try {
//     // For now, show all tasks (we'll filter by user later)
//     const tasks = await Task.find({}).sort({ createdAt: -1 });
//     res.render('Task', { tasks });
//   } catch (error) {
//     console.log("Error fetching tasks:", error.message);
//     res.send("Error loading tasks");
//   }
// });

// server.post('/Task', async (req, res) => {
//   try {
//     const { title, description } = req.body;

//     const newTask = new Task({
//       title: title,
//       description: description || ""
//     });

//     await newTask.save();
//     res.redirect('/Task');
//   } catch (error) {
//     console.log("Error creating task:", error.message);
//     res.send("Error creating task");
//   }
// });
// Create new task (now tied to logged-in user)
// For now we use a simple way - we'll improve session later
// server.post('/Task', async (req, res) => {
//   try {
//     const { title, description } = req.body;

//     // Temporary: Using a fixed user ID for testing
//     // Later we'll get the actual logged-in user
//     const newTask = new Task({
//       user: "67f8c8d8a8b9c8d8e8f8a8b9",   // Replace with real user ID later
//       title: title,
//       description: description || ""
//     });

//     await newTask.save();
//     console.log("✅ Task created successfully:", title);
//     res.redirect('/Task');
//   } catch (error) {
//     console.log("Error creating task:", error.message);
//     res.send("Error creating task");
//   }
// });
// GET /Task
server.get('/Task', async (req, res) => {
  if (!req.session.userId) return res.redirect('/login'); // Shield the page

  const tasks = await Task.find({ user: req.session.userId }).sort({ createdAt: -1 });
  res.render('Task', { tasks });
});

// POST /Task
server.post('/Task', async (req, res) => {
  const newTask = new Task({
    user: req.session.userId, // <--- NO MORE FAKE ID!
    title: req.body.title,
    description: req.body.description || ""
  });
  await newTask.save();
  res.redirect('/Task');
});


server.post('/Task/:id/complete', async (req, res) => {
  try {
    await Task.findByIdAndUpdate(req.params.id, { status: 'completed' });
    res.redirect('/Task');
  } catch (error) {
    res.send("Error updating task");
  }
});

server.post('/Task/:id/delete', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.redirect('/Task');
  } catch (error) {
    res.send("Error deleting task");
  }
});
// Logout
server.post('/logout', (req, res) => {
  console.log("User logged out");
  res.redirect('/');
});
// Start server
const port = 3000;
server.listen(port, () => {
  console.log(`✅ Taskflow is running at http://localhost:${port}`);
});