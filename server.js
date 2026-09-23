require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// API: Get Portfolio Projects
app.get('/api/projects', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'projects.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve project data' });
    }
    res.json(JSON.parse(data));
  });
});

// API: Contact Form Handler
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ status: 'error', message: 'All fields are required.' });
  }

  console.log(`[Contact Form] From: ${name} (${email}) | Message: ${message}`);

  return res.status(200).json({
    status: 'success',
    message: 'Message delivered successfully! I will get back to you shortly.'
  });
});

// Catch-all fallback to serve the frontend (Express 5 safe)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Portfolio server running at http://localhost:${PORT}`);
});