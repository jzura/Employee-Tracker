USE employee_db;

INSERT INTO department(name) 
VALUES 
("ICP"),
("XRF"),
("FIRE ASSAY"),
("HR");

INSERT INTO role (title, salary, department_id) 
VALUES 
("Chemist", 70000, 3),
("Laboratory Manager", 100000, 2),
("Director", 200000, 1),

INSERT INTO employee (first_name, last_name, role_id) 
VALUES 
("John", "Smith", 2),
("Bill", "Shed", 1),
("Ben", "Porter", 3),