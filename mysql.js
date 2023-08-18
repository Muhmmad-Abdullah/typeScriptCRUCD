"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var mysql2_1 = require("mysql2");
var app = (0, express_1.default)();
var connection = mysql2_1.default.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'abdullah@123',
    database: 'student',
    authPlugins: {
        mysql_clear_password: function () { return function () { return Buffer.from('abdullah@123'); }; }
    }
});
connection.connect(function (err) {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database!');
});
app.use(express_1.default.json()); // Parse JSON requests
app.get("/", function (_req, res) {
    res.send("Hello This is my First Express JS API program");
});
// GET all students
app.get('/students', function (_req, res) {
    var sql = 'SELECT * FROM student_data';
    connection.query(sql, function (err, result) {
        if (err) {
            console.error('Error executing the query:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json(result);
    });
});
// GET a specific student by ID
app.get('/students/:Roll_no', function (req, res) {
    var studentRollNo = req.params.Roll_no;
    var sql = 'SELECT * FROM student_data WHERE Roll_no = ?';
    connection.query(sql, [studentRollNo], function (err, result) {
        if (err) {
            console.error('Error executing the query:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        // res.json(result[0]);
    });
});
// POST a new student
app.post('/students', function (req, res) {
    var _a = req.body, name = _a.name, age = _a.age, Email = _a.Email, Class = _a.Class, Student_name = _a.Student_name, Father_name = _a.Father_name, Address = _a.Address;
    var sql = 'INSERT INTO student_data (name, Age, Email, Class, Student_name, Father_name, Address) VALUES (?, ?, ?, ?, ?, ?, ?)';
    connection.query(sql, [name, age, Email, Class, Student_name, Father_name, Address], function (err) {
        if (err) {
            console.error('Error executing the query:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json({ message: 'Student added successfully' });
    });
});
// PUT (Update) a student's information
app.put('/students/:Roll_no', function (req, res) {
    var studentRollNo = req.params.Roll_no;
    var _a = req.body, name = _a.name, age = _a.age;
    var sql = 'UPDATE student_data SET Student_name = ?, Age = ? WHERE Roll_no = ?';
    connection.query(sql, [name, age, studentRollNo], function (err) {
        if (err) {
            console.error('Error executing the query:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json({ message: 'Student updated successfully' });
    });
});
// DELETE a student
app.delete('/students/:Roll_no', function (req, res) {
    var studentRollNo = req.params.Roll_no;
    var sql = 'DELETE FROM student_data WHERE Roll_no = ?';
    connection.query(sql, [studentRollNo], function (err) {
        if (err) {
            console.error('Error executing the query:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        res.json({ message: 'Student deleted successfully' });
    });
});
var port = 3000;
app.listen(port, function () {
    console.log("Server is running on http://localhost:".concat(port));
});
