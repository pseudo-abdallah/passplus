const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/health', (req, res) => {
  res.send('OK');
});

// The catchall handler for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Use PORT from environment (DigitalOcean expects 8080)
const PORT = process.env.PORT || 8080;
app.listen(PORT, '0.0.0.0', () => {
  console.log(\Server running on port \\);
});
