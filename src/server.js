const express = require("express");
const cors = require("cors");
const { getAuthCodeUrl, acquireTokenByCode } = require("./auth"); // Import auth.js methods

const app = express();
const port = 3000;

// Middleware to allow cross-origin requests
app.use(cors());

// Login route - This will call the `getAuthCodeUrl` method from auth.js
app.get("/login", async (req, res) => {
    try {
        const authCodeUrl = await getAuthCodeUrl();
        res.json({ url: authCodeUrl });  // Send the URL to the client
    } catch (error) {
        res.status(500).send(error);
    }
});

// Callback route to handle the Azure login callback
app.get("/", async (req, res) => {
    const authCode = req.query.code; // Get the auth code from the URL query string

    try {
        const accessToken = await acquireTokenByCode(authCode);  // Get the access token
        res.send(`Access Token: ${accessToken}`);  // Send the token back (for testing purposes)
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});