INSERT INTO departments(name)
VALUES 
("Management"), 
("Tech-Specialist"), 
("Accounts"), 
("Customer-Relations");

INSERT INTO roles (title,salary,departments_id)
VALUES 
("Manager", 130000, 1), 
("Engineer", 120000,2),
("Accountant", 100000, 3),
("Consultant", 90000,4);

INSERT INTO employees (first_name, last_name, roles_id, managers_id)
VALUES 
("Carla","Monte", 1,null), 
("Nick","Smith",2, 1),
("Charlene","Mai",3,1), 
("Betty","Spencer",4,1);


