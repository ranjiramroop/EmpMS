DROP DATABASE IF EXISTS employeeMGMT_db;
CREATE database employeeMGMT_db;

USE employeeMGMT_db;

CREATE TABLE employee
(
    id INT NOT NULL
    AUTO_INCREMENT,
  first_name VARCHAR
    (30) NULL,
  last_name VARCHAR
    (30) NULL,
  role_id INT NULL,
  manager_id INT NULL,
  PRIMARY KEY
    (id)
);

    CREATE TABLE department
    (
        id INT NOT NULL,
        name VARCHAR(30) NULL,
        PRIMARY KEY (id)
    );

    CREATE TABLE role
    (
        id INT NOT NULL,
        title VARCHAR(30) NULL,
        salary DECIMAL(15,4) NULL,
        department_id INT NULL,
        PRIMARY KEY (id)
    );
    insert into employee
        (id,first_name,last_name, role_id, manager_id)
    values
        (1, "Jeff", "Bezos", 1, 1);
    insert into employee
        (id,first_name,last_name, role_id, manager_id)
    values
        (2, "Becky", "Darcy", 2, 1);
    insert into employee
        (id,first_name,last_name, role_id, manager_id)
    values
        (3, "Joanne", "Fabrics", 3, 1);
    insert into employee
        (id,first_name,last_name, role_id, manager_id)
    values
        (4, "Duncan", "Donuts", 4, 1);
    insert into employee
        (id,first_name,last_name, role_id, manager_id)
    values
        (5, "Child", "Forgood", 3, 1);

    insert into role
        (id,title,salary, department_id)
    values
        (1, "Executive", 9999999, 1);

    insert into role
        (id,title,salary, department_id)
    values
        (2, "Sales", 500000, 2);
    insert into role
        (id,title,salary, department_id)
    values
        (3, "Human Resources", 400000, 3);

    insert into role
        (id,title,salary, department_id)
    values
        (4, "Website Manager", 8000000, 4);


    insert into department
        (id, name)
    values
        (1, "Executive");
    insert into department
        (id, name)
    values
        (2, "Sales");
    insert into department
        (id, name)
    values
        (3, "Human Resources");
    insert into department
        (id, name)
    values
        (4, "Website Management");
