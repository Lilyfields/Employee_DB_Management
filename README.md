# 12 SQL: Employee_DB_Management

## My Journey and development

Developers frequently have to create interfaces that allow non-developers to easily view and interact with information stored in databases. These interfaces are called **content management systems (CMS)**. My assignment this week is to build a command-line application from scratch to manage a company's employee database, using Node.js, Inquirer, and MySQL.


## User Story

```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Concept of Design and function

```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```

**********************************************
## Walk Through for the application

The following video shows an example of the application being used from the command line:

https://drive.google.com/file/d/1Gna7ekNe3Xq1NIG01Rz26sCM2vIchFdq/view?usp=sharing

**********************************************

## Technical Features. 

For this project I used the [MySQL2 package](https://www.npmjs.com/package/mysql2) to connect MySQL database and perform queries, the [Inquirer package](https://www.npmjs.com/package/inquirer) to interact with the user via the command line, and the [console.table package](https://www.npmjs.com/package/console.table) to print MySQL rows to the console.


I've attempted to make my queries asynchronous. MySQL2 exposes a `.promise()` function on Connections to upgrade an existing non-Promise connection to use Promises. To learn more and make your queries asynchronous, refer to the [npm documentation on MySQL2](https://www.npmjs.com/package/mysql2).

I have created a separate file that contains functions for performing specific SQL queries and seeds. 


Design of the database schema as shown in the following image:

![Database schema includes tables labeled “employee,” role,” and “department.”](./Assets/12-sql-homework-demo-01.png)

As the image illustrates, my schema contain the following three tables:

* `department`

    * `id`: `INT PRIMARY KEY`

    * `name`: `VARCHAR(30)` to hold department name

* `role`

    * `id`: `INT PRIMARY KEY`

    * `title`: `VARCHAR(30)` to hold role title

    * `salary`: `DECIMAL` to hold role salary

    * `department_id`: `INT` to hold reference to department role belongs to

* `employee`

    * `id`: `INT PRIMARY KEY`

    * `first_name`: `VARCHAR(30)` to hold employee first name

    * `last_name`: `VARCHAR(30)` to hold employee last name

    * `role_id`: `INT` to hold reference to employee role

    * `manager_id`: `INT` to hold reference to another employee that is the manager of the current employee (`null` if the employee has no manager)

  


### Other Features:

    * Uses the [Inquirer package](https://www.npmjs.com/package/inquirer).

    * Uses the [MySQL2 package](https://www.npmjs.com/package/mysql2) to connect to a MySQL database.

    * Uses the [console.table package](https://www.npmjs.com/package/console.table) to print MySQL rows to the console.

    * Table schema outlined as above

  

### Challanges:

   * Due to the timeframe constraint, I could only work on limited features and functionality.
   * Updating employees details database.


### Future Development


* Application allows users to update employee managers .

* Application allows users to view employees by manager.

* Application allows users to view employees by department.

* Application allows users to delete departments, roles, and employees.

* Application allows users to view the total utilized budget of a department&mdash;in other words, the combined salaries of all employees in that department.



- - -
© 2022 Trilogy Education Services, LLC, a 2U, Inc. brand. Confidential and Proprietary. All Rights Reserved.
