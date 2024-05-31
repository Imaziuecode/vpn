const express = require('express');
const { VPN } = require('node-vpn-server');

const app = express();
const port = process.env.PORT || 3000;

// Initialize VPN server
const vpnServer = new VPN({
  logger: {
    level: 'info' // Adjust log level as needed
  }
});

// Implement user authentication
vpnServer.authenticate((username, password, callback) => {
  // Here, you would implement your own authentication logic.
  // For demonstration purposes, let's assume a hardcoded username/password.
  const validUsername = 'user';
  const validPassword = 'password';

  if (username === validUsername && password === validPassword) {
    callback(null, true);
  } else {
    callback(new Error('Authentication failed'));
  }
});

// Middleware to log IP address of incoming requests
app.use((req, res, next) => {
  console.log(`Incoming request from IP: ${req.ip}`);
  next();
});

// Start Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Handle VPN connections
vpnServer.on('clientConnected', (client) => {
  console.log(`Client connected: ${client.id}`);
});

vpnServer.on('clientDisconnected', (client) => {
  console.log(`Client disconnected: ${client.id}`);
});

// Listen for VPN connections
vpnServer.listen(port);
