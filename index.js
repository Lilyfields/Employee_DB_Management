const inquirer = require("inquirer");
const consoleTable = require("console.table");
const connection = require("./config/connection");

//Plan: the user would see questions in regards to employee details.
function initiate() {
  //Questions would be in relation to department, role, id,

  inquirer
    .prompt([
      {
        name: "initiate",
        type: "list",
        message: "What would you like to do?",
        choices: ["View", "Add", "Update", "Exit"],
      },
    ])
    .then(function (results) {
      switch (results.initiate) {
        case "View":
          view();
          break;
        case "Add":
          add();
          break;
        case "Update":
          updateEmployees();
          break;
        case "Exit":
          console.log("Goodbye");
          break;
        default:
          console.log("default");
      }
    });
}
//View function set

function view() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "options",
        message: "Please choose what you would like to view",
        choices: ["Departments", "Roles", "All employees"],
      },
    ])
    .then(function (results) {
      switch (results.options) {
        case "Departments":
          viewDepartments();
          break;
        case "Roles":
          viewRoles();
          break;
        case "All employees":
          viewAllEmployees();
          break;
        default:
          console.log("default");
      }
    });
}

function viewDepartments() {
  connection.query(`SELECT * FROM departments;`, function (err, results) {
    if (err) throw err;
    console.table(results);
    initiate();

    // inquirer
    //   .prompt([
    //     {
    //       name: "choice",
    //       type: "rawlist",
    //       choices: function () {
    //         let choiceArr = [];
    //         for (i = 0; i < results.length; i++) {
    //           choiceArr.push(results[i].name);
    //         }
    //         return choiceArr;
    //       },

    //       message: "Please choose a department?",
    //     },
    //   ])
    //   .then(function (results) {
    //     connection.query(
    //       `SELECT * FROM employees;`, [results.choice],
    //       function (err, results) {
    //         if (err) throw err;
    //         console.table(results);
    //         initiate();
    //       }
    //     );
    //   });
  });
}

function viewRoles() {
  connection.query(`SELECT title, id FROM roles;`, function (err, results) {
    if (err) throw err;
    console.table(results);
    initiate();
  })
}

//     // inquirer
//       .prompt([
//         {
//           name: "choice",
//           type: "rawlist",
//           choices: function () {
//             let choiceArr = [];
//             for (i = 0; i < results.length; i++) {
//               choiceArr.push({
//                 name: results[i].title,
//                 value: results[i].id,
//               });
//             }
//             return choiceArr;
//           },

//           message: "Please choose a role?",
//         },
//       ])
//       .then(function (results) {
//         connection.query(
//           `SELECT * FROM employees WHERE roles_id =?;`,
//           [results.choice],
//           function (err, results) {
//             if (err) throw err;
//             console.table(results);
//             initiate();
//           }
//         );
//       });
//   });
// }

function viewAllEmployees() {
  connection.query(`SELECT * from employees;`, function (err, results) {
    if (err) throw err;
    console.table(results);
    initiate();
  });
}

//ADD function

function add() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "add",
        message: "Please choose what you would like to add?",
        choices: ["Department", "Employee roles", "Employees"],
      },
    ])
    .then(function (results) {
      switch (results.add) {
        case "Department":
          addDepartment();
          break;
        case "Employee roles":
          addEmployeeRoles();
          break;
        case "Employees":
          addEmployees();
          break;
        default:
          console.log("default");
      }
    });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        name: "newDepartment",
        Type: "Input",
        message: "Please name your new Department?",
      },
    ])
    .then(function (results) {
      connection.query(
        "INSERT INTO departments VALUES (DEFAULT,?)",
        [results.newDepartment],
        function (err) {
          if (err) throw err;
          console.log("Departments is updated with" + results.newDepartment);
          initiate();
        }
      );
    });
}

function addEmployeeRoles() {
  inquirer
    .prompt([
      {
        name: "roles",
        type: "input",
        message: "Please provide the name of new roles?",
      },
      {
        name: "salary",
        type: "number",
        message: "Enter salary?",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        },
      },
      {
        name: "departments_id",
        type: "number",
        message: "Enter departments id?",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        },
      },
    ])
    .then(function (results) {
      connection.query(
        "INSERT INTO roles SET ?",
        {
          title: results.roles,
          salary: results.salary,
          departments_id: results.departments_id,
        },
        function (err) {
          if (err) throw err;
          console.log("Employees Roles updated with" + results.roles);
          initiate();
        }
      );
    });
}

async function addEmployees() {
  const employees = (await connection.promise().query('SELECT * from employees'))[0];
  const roles = (await connection.promise().query('SELECT * from roles'))[0];
    
  inquirer
    .prompt([
      {
        name: "First_Name",
        type: "input",
        message: "Enter Employees First Name?",
      },
      {
        name: "Last_Name",
        type: "input",
        message: "Enter Employees Last Name?",
      },
      {
        name: "choice",
        type: "list",
        choices: function () {
          let choiceArr = [];
          
          for (let i = 0; i < roles.length; i++) {
            choiceArr.push({
              name: roles[i].title,
              value: roles[i].id,
            });
          }
          

          return choiceArr;
        },

        message: "Please choose a role?",
      },
      {
        name: "manager",
        type: "list",
        choices: function(){
          let choiceArr = [];

          for (let i=0; i< employees.length; i ++) {
            choiceArr.push({
              name: employees [i].first_name + employees[i].last_name,
              value: employees [i].id,

            });
          }

            return choiceArr;
        },
        message: "Who will be the employees manager?",
        default: 1,
      },
    ]).then (function (results) {
      const saveName = results.choice;
      console.log(results);
      console.log(saveName);
      connection.query("INSERT INTO employees SET ? WHERE last_name=?", [
      {
       first_name: results.first_name,
       last_name:results.last_name,
       roles_id: results.role,
       managers_id: results.manager,
        },
       saveName,
      ]);
       console.log("Employee has been successfully added");
       initiate();
    });
  }
  

//update fxn
async function updateEmployees() {
  const employees = (await connection.promise().query('SELECT * FROM employees'))[0];
  const roles= (await connection.promise().query('SELECT * FROM roles'))[0];

    inquirer
      .prompt([
        {
          name: "choices",
          type: "rawlist",
          choices: function () {
            let choiceArr = [];
            for ( let i = 0; i < employees.length; i++) {
              choiceArr.push({
                name: employees[i].first_name + employees[i].last_name,
                value: employees[i].id,
            });
          }
            return choiceArr;
          },
          message: "Please select employee to update?",
        },

        {
          name: "role",
          type: "rawlist",
          choices: function () {
            var choiceArr = [];
            for (i = 0; i < roles.length; i++) {
              choiceArr.push({
                name: roles[i].title,
                value: roles[i].id,
              });
            }
            return choiceArr;
          },
          message: "Please select a role?",
        },

        {
          name: "manager",
          type: "list",
          choices: function(){
            let choiceArr = [];
  
            for ( i=0; i< employees.length; i ++) {
              choiceArr.push({
                name: employees [i].first_name + employees[i].last_name,
                value: employees [i].id,
  
              });
            }
  
              return choiceArr;
          },
          message: "Who will be the employees manager?",
          default: 1,
        },
      ]).then(function (results) {
           const saveName= results.choices;
          console.log(results);
          console.log(saveName);
          connection.query("UPDATE employees SET ? WHERE last_name=?", [
           {
               first_name: results.first_name,
                last_name:results.last_name,
                 roles_id: results.role,
                 managers_id: results.manager,
                    
                 },
                 saveName,
               ]);
               console.log("Employee has been successfully updated");
                initiate();
              });
         }


// invoke / run the initiate function
initiate();
