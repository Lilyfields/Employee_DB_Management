INSERT INTO department(name)
VALUES ("Management"), ("Tech-Specialist"), ("Accounts"), ("Customer-Relations");

INSERT INTO role (title,salary,department_id)
VALUES ("Manager", 130000, 1), ("Engineer", 120000,2),("Accountant", 100000, 3)("Consultant", 90000,4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Carla","Monte", "Manager",null), ("Nick","Smith","Engineer", 2),("Charlene","Mai","Accountant",3), ("Betty","Spencer","Consultant",4);


