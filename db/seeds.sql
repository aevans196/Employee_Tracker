-- Seeds for departments with id and names
INSERT INTO department (id, name) VALUES
(1, 'Marketing'),
(2, 'Information Technology'),
(3, 'Human Resources'),
(4, 'Operations');

-- Seeds for roles with id, title, salary, and department
INSERT INTO role (id, title, salary, department_id) VALUES
(1, 'Marketing Manager', 110000, 1),
(2, 'Software Developer', 105000, 2),
(3, 'HR Specialist', 90000, 3),
(4, 'Operations Manager', 115000, 4),
(5, 'IT Director', 130000, 2),
(6, 'Recruiter', 95000, 3);

-- Seeds for employees with id, name, roleID, and managerID
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES
(1, 'Emily', 'Johnson', 1, NULL),
(2, 'Alex', 'Thompson', 5, NULL),
(3, 'Jessica', 'Williams', 3, 1),
(4, 'David', 'Brown', 2, 2),
(5, 'Michelle', 'Davis', 4, NULL),
(6, 'Kevin', 'Martinez', 4, 5);