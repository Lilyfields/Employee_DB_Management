const mysql = require ("mysql2");
const inquirer = require ("inquirer");
const consoleTable = require("console.table");
const sequelize =require('../Assets/config/connection')
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});


const connection= mysql.createConnection(
    {
      host: "localhost",
      // MySQL username,
      user: "root",
      // MySQL password
      password: "",
      database: "employee_db"
    },
    console.log(`Connected to the employee_db database.`)
  );

  connection.connect(function(err){
    if(err) throw err;
    console.log("SQL connected");
    initiate();
  });

  //Plan: the user would see questions in regards to employee details.
 function initiate() {
  //Questions would be in relation to department, role, id, 

  inquirer.prompt([
      {
          name: "main",
          type: "list",
          message: "What would you like to do?",
          choices: ["View", "Add","Update","Exit"]
        }
        
    ]).then(function(answer) {
        switch(answer.initiate){
          case"View":
          view();
          break;
          case"Add":
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

          inquirer.prompt([

            {
              type:"list",
              name:"View options",
              message:"Please choose what you would like to view",
              choices:["Departments","Roles", "All employees"]

            }
          ]).then (function(answer){
            switch(answer.view){
              case "All employees":
                viewAllEmployees();
                break;
                case "Department":
                  viewDepartments();
                  break;
                  case "Roles":
                    viewRoles();
                    break;
                    default:
                      console.log("default");
            }
          
        });

  }

        function viewAllEmployees(){
          connection.query(" SELECT employee.id AS ID,employee.first_name AS First,employee.last_name AS Last,employee.role_id As Role, role.salary AS Salary,manager.last_name AS Manager, department.name AS Department FROM employee LEFT JOIN employee ON employee.manager_id = m.id ROM employee LEFT JOIN role ON employee.role_id =role.title FROM employe LEFT JOIN department ON employee.department_id =d.id",
          function (err, results){
            if(err) throw err;
            console.table(results);
            initiate();
          });
        }

       
        function viewDepartments () {
          connection.query("SELECT * FROM department", function (err, results) {
            if(err) throw err;

          inquirer.prompt([

            {
              
              name: "choice",
              type:"rawlist",
              choices: function () {
                let choiceArr =[];
                for (i=0; i< results.length; i ++) {
                  choiceArr.push(results[i].name);
                }
                return choiceArr;
              },

              message: "Please choose a department?"

            }

          ]).then (function(answer){
            connection.query(
              "SELECT employee.id AS ID,employee.first_name AS First,employee.last_name AS Last,employee.role_id As Role, role.salary AS Salary, manager.last_name AS Manager, department.name AS Department FROM employee LEFT JOIN employee ON employee.manager_id = m.id ROM employee LEFT JOIN role ON employee.role_id =role.title FROM employe LEFT JOIN department ON employee.department_id =d.id WHERE d.name=?", 
              [answer.choice], function(err, results) {
                
                if(err) throw err;
                console.table(results);
                initiate();
              })

            })

          })

        }

          

            function viewRoles (){
            connection.query("SELECT title FROM role", function (err, results) {
              if(err) throw err;
  
            inquirer.prompt([
  
              {
                
                name: "choice",
                type:"rawlist",
                choices: function () {
                  let choiceArr =[];
                  for (i=0; i< results.length; i ++) {
                    choiceArr.push(results[i].title);
                  }
                  return choiceArr;
                },
  
                message: "Please choose a role?",
  
              }
  
            ]).then (function(answer){
              connection.query(
                "SELECT employee.id AS ID,employee.first_name AS First,employee.last_name AS Last,employee.role_id As Role, role.salary AS Salary, manager.last_name AS Manager, department.name AS Department FROM employee LEFT JOIN employee ON employee.manager_id = m.id ROM employee LEFT JOIN role ON employee.role_id =role.title FROM employe LEFT JOIN department ON employee.department_id =d.id WHERE employee.role_id=?", 
                [answer.choice], function(err, results) {
                  
                  if(err) throw err;
                  console.table(results);
                  initiate();
                })
  
              })

            })

          }

            //ADD function

            function add() {

          inquirer.prompt([

            {
              type:"list",
              name:"add options",
              message:"Please choose what you would like to add?",
              choices:["Department","Employee roles", " Employees"]

            }
          ]).then (function(answer){
            switch(answer.add){
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
          })
        }

        function addDepartment(){

          inquirer.prompt ([

            {
              name:"New Department",
              Type:"Input",
              message: "Please name your new Department?",
            }

          ]).then(function(answer){
            connection.query(
              "INSERT INTO department VALUES (DEFAULT,?)",
              [answer.department],
              function(err) {
                if(err) throw err;
                console.log ("Department is updated with"+ answer.department);
                initiate();
              })
          })
        }
        
        function addEmployeeRoles(){
          inquirer.prompt([
            {
              name:"role",
              type:"input",
              message:"Please provide the name of new role?",

            },
            {
              name:"salary",
              type:"number",
              message:"Enter salary?",
              validate: function(value){
                if(isNaN(value)=== false){
                  return true;
                }
                return false;
              }
            },
          {
            name:"department_id",
            type: "number",
            message:"Enter department id?",
            validate:function(value){
              if(isNaN(value)===false){
                return true;
              }
              return false;
            }
          }

          ]).then(function(answer) {
            connection.query(
              "INSERT INTO role SET ?",
              {
                title: answer.role,
                salary:answer.salary,
                department_id: answer.department_id
              },
              function(err){
                if(err) throw err;
                console.log("Employee Roles updated with"+ answer.role);
                initiate();
              }

          )}
          )}
  
      function addEmployee(){
        connection.query("SELECT *FROM role", function(err, results){
          if(err) throw err;
          inquirer.prompt([
            {
              name:"First_Name",
              type:"input",
              message:"Enter Employee First Name?",
            },
            {
              name:"Last_Name",
              type:"input",
              message:"Enter Employee Last Name?",
            },
            {
              name:"role",
              type:"rawlist",
              choices: function (){
                var choiceArr =[];
                for(i=0;i<results.length;i++){
                  choiceArr.push(result[i].title)

                }
                return choiceArr;
              },
              message: "What is the title of the role?",
            },
          {
            name: "manager",
            type:"number",
            validate: function(value){
              if(isNaN(value) === false){
                return true;
              }
              return false;
            },
            message:"Enter manager Id?",
            default:"1234"
          }
          ]). then(function(answer){
            connect.query("INSERT INTO employee SET ?",
            {
              first_name:answer.First_Name,
              last_name:answer.Last_Name,
              role_id: answer.role,
              manager_id: answer.manager
            }

            )
            console.log("Employee has been added successfully");
            initiate ();
          });
        });
      }
    
      //update fxn
      function updateEmployee () {
        connect.query("SELECT * FROM employee",
        function(err, results){
          if(err) throw err;
      
      inquirer.prompt([

        {
          name:"choices",
          type:"rawlist",
          choices:function(){
            let choiceArr=[];
            for(i=0; i< results.length;i++)
            {
            choiceArr.push(results[i].last_name);
          }
          return choiceArr;
        },
        message:"Please select employee to update?",
      }
      ]).then (function(answer){
        const saveName =answer.choice;
         
        connection.query("SELECT employee to update",
        function(err, results){
          if(err) throw err;
          inquirer. prompt([

            {
              name:"role",
              type:"rawlist",
              choices: function(){
                var choiceArr=[];
                for(i=0; i<results.length; i++){
                  choiceArr.push(results[i].role_id)
                }
                return choiceArr;
              },
              message: "Please select a role?",
            },
            {
              name: "manager",
              type:"number",
              validate: function(value){
                if(isNaN(value) === false){
                  return true;
                }
                return false;
              },
              message:"Enter a new Manger Id",
              default: "1234"
            }
          ]).then(function(answer){
            console.log(answer);
            console.log(saveName);
            connection.query("UPDATE employee SET ? WHERE last_name=?",
            [
              {
                role_id:answer.role,
                manager_id: answer.manager
              }, saveName
            ],
            ),
          console.log ("Employee has been successfully updated");
          initiate();

           });
          })
        })
      })
    }
         





          