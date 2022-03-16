SELECT *
FROM employees.id AS ID,
employees.first_name AS First,
employees.last_name AS Last,
employees.role_id As Role,
role.salary AS Salary,
managers.last_name AS Manager,
departments.name AS Department

--JOIN employee to employee table
SELECT *
FROM employees
LEFT JOIN employee ON employees.managers_id = m.id;

--JOIN employee to role table
SELECT*
FROM employees
LEFT JOIN role ON employees.roles_id =role.title;

--JOIN employee to department table
SELECT*
FROM employees
LEFT JOIN department ON employees.departments_id =d.id;
