"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cors_1 = require("cors");
var app = (0, express_1.default)();
var port = 8080;
var users = [
    { id: 1, name: "Abdullah", address: "Lahore", email: "joni@gmail.com", education: "Mphil", number: "03224407061" },
    { id: 2, name: "Moazzma", address: "Karachi", email: "naao@gmail.com", education: "Phd", number: "03224407661" },
    { id: 3, name: "Asim", address: "Islamabad", email: "faoif@gmail.com", education: "BSCS", number: "03224407761" },
    { id: 4, name: "Shahri", address: "Chili", email: "joni@gmail.com", education: "Mphil", number: "03224407861" },
    { id: 5, name: "Aniya", address: "UK", email: "naao@gmail.com", education: "Phd", number: "03224407961" },
    { id: 6, name: "Alia", address: "USA", email: "faoif@gmail.com", education: "BSCS", number: "03224407361" },
    { id: 7, name: "Shazia", address: "Sindh", email: "joni@gmail.com", education: "Mphil", number: "03224407261" },
    { id: 8, name: "Uamir", address: "Kohat", email: "naao@gmail.com", education: "Phd", number: "03224407161" },
    { id: 9, name: "Ibrahim", address: "Kashmir", email: "faoif@gmail.com", education: "BSCS", number: "03224407561" },
    { id: 10, name: "Afzal", address: "KPK", email: "faoif@gmail.com", education: "BSCS", number: "03224407361" },
];
// Enable CORS
app.use((0, cors_1.default)());
// Home Page
app.get("/", function (_req, res) {
    res.send("Hello This is my First Express js api program");
});
// Route to get all users
app.get("/api/users", function (_req, res) {
    res.json(users);
});
// Route to get a specific user by ID
app.get("/api/users/:id", function (req, res) {
    var userId = parseInt(req.params.id);
    if (isNaN(userId)) {
        res.status(400).json({ error: "Invalid user ID" });
    }
    else {
        var user = users.find(function (user) { return user.id === userId; });
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({ error: "User not found" });
        }
    }
});
// Start the server
app.listen(port, function () {
    console.log("Server is running at http://localhost:".concat(port));
});
