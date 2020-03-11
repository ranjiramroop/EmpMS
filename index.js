var express = require("express");
var mysql = require("mysql");
var inquirer = require("inquirer");
var app = express();
const CFonts = require("cfonts");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "employeeMGMT_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

// STARTING TITLE WORDS
CFonts.say("Employee | Manager", {
  font: "huge",
  align: "left",
  colors: ["black"],
  background: "blue",
  letterSpacing: 1,
  lineHeight: 1,
  space: true,
  maxLength: "0"
});

function start() {
  return inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "selectedAnswer",
        choices: ["View All Employees", "Add Employee", "Remove Employee"]
      }
    ])
    .then(function(answer) {
      switch (answer.selectedAnswer) {
        case "View All Employees":
          viewAllEmployees();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Remove Employee":
          removeEmployee();
          break;
      }
    });
}

function viewAllEmployees() {
  connection.query("SELECT * FROM employee;", function(err, data) {
    if (err) {
      throw err;
    }
    console.table(data);
    start();
  });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "Enter the employee's first name."
      },
      {
        name: "lastName",
        type: "input",
        message: "Enter the employee's last name."
      },
      {
        name: "manager",
        type: "list",
        message: "Who is the employee's manager?",
        choices: ["Jeff Bezos"]
      },
      {
        name: "role",
        type: "list",
        message: "What is the employee's title?",
        choices: ["Executive", "Sales", "Human Resources", "Website Manager"]
      }
    ])
    .then(function(answer) {
      var manager_id;
      if (answer.manager === "Jeff Bezos") {
        manager_id = 1;
      } else {
        manager_id = 2;
      }

      var role_id;
      if (answer.role === "Executive") {
        role_id = 1;
      } else if (answer.role === "Sales") {
        role_id = 2;
      } else if (answer.role === "Human Resources") {
        role_id = 3;
      } else if (answer.role === "Website Manager") {
        role_id = 4;
      }
      connection.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
        [answer.firstName, answer.lastName, role_id, manager_id]
      ),
        function(err, res) {
          if (err) {
            throw err;
          }
          console.table(res);
          start();
        };
    });
}

function removeEmployee() {
  inquirer
    .prompt({
      type: "list",
      message: "Which employee would you like to delete?",
      name: "removeEmployee",
      choices: ["Jeff", "Becky", "Joanne", "Duncan", "Child"]
    })
    .then(function(answer) {
      connection.query(
        "DELETE FROM employee WHERE first_name = ?",
        [answer.removeEmployee],
        function(err, res) {
          if (err) {
            throw err;
          }
          start();
        }
      );
    });
}

start();
