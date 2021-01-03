/*departments*/

INSERT INTO department (department_name) VALUES ('Sales');
INSERT INTO department (department_name) VALUES ('Operations');
INSERT INTO department (department_name) VALUES ('Department of Anger');
INSERT INTO department (department_name) VALUES ('Human Resources');
INSERT INTO department (department_name) VALUES ('Information Technology');
INSERT INTO department (department_name) VALUES ('Accounting');

/*roles*/

INSERT INTO roles (title, salary, department_id) VALUES ('Sales Account Manager', 48000, 1);
INSERT INTO roles (title, salary, department_id) VALUES ('Sales Director', 75000, 1);
INSERT INTO roles (title, salary, department_id) VALUES ('Head of Sales', 110000, 1);

INSERT INTO roles (title, salary, department_id) VALUES ('Project Manager', 50000, 2);
INSERT INTO roles (title, salary, department_id) VALUES ('Warehouse Manager', 100000, 2);
INSERT INTO roles (title, salary, department_id) VALUES ('Operations Manager', 100000, 2);

INSERT INTO roles (title, salary, department_id) VALUES ('Slighty Annoyed Person', 27500, 3);
INSERT INTO roles (title, salary, department_id) VALUES ('Angry Person To Be', 55000, 3);
INSERT INTO roles (title, salary, department_id) VALUES ('Head Angry Person', 100000, 3);

INSERT INTO roles (title, salary, department_id) VALUES ('HR Intern', 27000, 4);
INSERT INTO roles (title, salary, department_id) VALUES ('HR Manager', 75000, 4);

INSERT INTO roles (title, salary, department_id) VALUES ('Network Admin', 75000, 5);
INSERT INTO roles (title, salary, department_id) VALUES ('Help Desk', 50000, 5);
INSERT INTO roles (title, salary, department_id) VALUES ('Chief Technology Officer', 120000, 5);

INSERT INTO roles (title, salary, department_id) VALUES ('Accounting Intern', 50000, 6);
INSERT INTO roles (title, salary, department_id) VALUES ('Purchasing Agent', 50000, 6);
INSERT INTO roles (title, salary, department_id) VALUES ('Head of Accounting', 100000, 6);

/*manager inserts*/

INSERT INTO `employee_db`.`employees` (`first_name`, `last_name`, `role_id`) VALUES ('Don', 'Draper', '3');
INSERT INTO `employee_db`.`employees` (`first_name`, `last_name`, `role_id`) VALUES ('Bob', 'Smith', '6');
INSERT INTO `employee_db`.`employees` (`first_name`, `last_name`, `role_id`) VALUES ('Patrick', 'Lloyd', '9');
INSERT INTO `employee_db`.`employees` (`first_name`, `last_name`, `role_id`) VALUES ('Will', 'Ferrel', '11');
INSERT INTO `employee_db`.`employees` (`first_name`, `last_name`, `role_id`) VALUES ('Bill', 'Gates', '14');
INSERT INTO `employee_db`.`employees` (`first_name`, `last_name`, `role_id`) VALUES ('Craig', 'Smith', '17');


/*employee inserts*/

INSERT INTO `employee_db`.`employees` (`first_name`, `last_name`, `role_id`, `manager_id`) VALUES ('Frank', 'Thomas', '1', '1');
INSERT INTO `employee_db`.`employees` (`first_name`, `last_name`, `role_id`, `manager_id`) VALUES ('John', 'Bills', '2', '1');
INSERT INTO `employee_db`.`employees` (`first_name`, `last_name`, `role_id`, `manager_id`) VALUES ('Blake', 'North', '4', '2');
INSERT INTO `employee_db`.`employees` (`first_name`, `last_name`, `role_id`, `manager_id`) VALUES ('Tim', 'Neil', '5', '2');
INSERT INTO `employee_db`.`employees` (`first_name`, `last_name`, `role_id`, `manager_id`) VALUES ('Lewis', 'Black', '8', '3');
INSERT INTO `employee_db`.`employees` (`first_name`, `last_name`, `role_id`, `manager_id`) VALUES ('Thomas', 'Torts', '7', '3');
INSERT INTO `employee_db`.`employees` (`first_name`, `last_name`, `role_id`, `manager_id`) VALUES ('Kristin ', 'Wigg', '10', '4');
INSERT INTO `employee_db`.`employees` (`first_name`, `last_name`, `role_id`, `manager_id`) VALUES ('Steve', 'Jobs', '12', '5');
INSERT INTO `employee_db`.`employees` (`first_name`, `last_name`, `role_id`, `manager_id`) VALUES ('Stan', 'Fritz', '13', '5');
INSERT INTO `employee_db`.`employees` (`first_name`, `last_name`, `role_id`, `manager_id`) VALUES ('David', 'Gilmour', '15', '6');
INSERT INTO `employee_db`.`employees` (`first_name`, `last_name`, `role_id`, `manager_id`) VALUES ('Bruce', 'Campbell', '16', '6');

