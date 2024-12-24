const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Data file to store analytics
const dataFile = path.join(__dirname, "../data/analytics.json");

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

// Load existing analytics data
let analyticsData = [];
if (fs.existsSync(dataFile)) {
    analyticsData = JSON.parse(fs.readFileSync(dataFile, "utf-8"));
}

// Endpoint to record analytics
app.post("/analytics", (req, res) => {
    const { action, timestamp } = req.body;
    analyticsData.push({ action, timestamp });
    fs.writeFileSync(dataFile, JSON.stringify(analyticsData, null, 2));
    res.status(200).send("Event recorded");
});

// Endpoint to retrieve analytics
app.get("/analytics", (req, res) => {
    res.json(analyticsData);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
