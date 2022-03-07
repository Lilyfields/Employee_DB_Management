SELECT *
FROM employee.id AS ID,
employee.first_name AS First,
employee.last_name AS Last,
employee.role_id As Role,
role.salary AS Salary,
manager.last_name AS Manager,
department.name AS Department

--JOIN employee to employee table
SELECT *
FROM employee
LEFT JOIN employee ON employee.manager_id = m.id;

--JOIN employee to role table
SELECT*
FROM employee
LEFT JOIN role ON employee.role_id =role.title;

--JOIN employee to department table
SELECT*
FROM employee
LEFT JOIN department ON employee.department_id =d.id;
