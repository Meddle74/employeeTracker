const mysql = require('mysql');
const inquirer = require('inquirer');
const table = require('console.table');
const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'patrick74',
  database: 'employee_db',
});

connection.connect(function (err) {
  if (err) throw err;
  askQuestions();
});

clear();

console.log(
  chalk.green(
    figlet.textSync('Employee Database', { horizontalLayout: 'full' })
  )
);

function askQuestions() {
  inquirer
    .prompt({
      type: 'list',
      name: 'option',
      message: 'What would you like to do?',
      choices: [
        'View employees',
        'View roles',
        'View departments',
        'View department budgets',
        'Add employee',
        'Add role',
        'Add department',
        'Update employee',
        'Exit',
      ],
    })
    .then((answer) => {
      switch (answer.option) {
        case 'Add department':
          addDept();
          break;
        case 'Add role':
          addRole();
          break;
        case 'Add employee':
          addEmployee();
          break;
        case 'View departments':
          viewDept();
          break;
        case 'View roles':
          viewRoles();
          break;
        case 'View employees':
          viewEmp();
          break;
        case 'Update employee':
          updateEmployee();
          break;
        case 'View department budgets':
          viewBudget();
          break;
        case 'Exit':
          connectionEnd();
          break;
      }
    });
}

function addDept() {
  inquirer
    .prompt({
      type: 'input',
      name: 'departmentName',
      message: 'Enter the name of the department you want to add: ',
    })

    .then((answer) => {
      connection.query(
        'INSERT INTO department SET ?',
        { department_name: answer.departmentName },
        function (err) {
          if (err) throw err;
          console.log('Department added successfully');
          askQuestions();
        }
      );
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'roleName',
        message: 'Enter the role you want to add: ',
      },
      {
        type: 'input',
        name: 'salary',
        message: 'What is the salary for the role you added? ',
      },
      {
        type: 'input',
        name: 'depID',
        message: 'What department is this role apart of?',
      },
    ])

    .then((answer) => {
      connection.query(
        'INSERT INTO roles SET ?',
        {
          title: answer.roleName,
          salary: answer.salary,
          department_id: answer.depID,
        },
        function (err) {
          if (err) throw err;
          console.log('Role added successfully');
          askQuestions();
        }
      );
    });
}

var roleList = [];
function selectRole() {
  connection.query('SELECT * FROM roles', function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      roleList.push(res[i].title);
    }
  });
  return roleList;
}

function getRoleID(data) {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT id FROM roles where title = ?',
      data,
      function (err, res) {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(res[0].id);
        }
      }
    );
  });
}

var managerList = [];
function selectManager() {
  connection.query(
    'select e.id, concat(e.first_name, " ", e.last_name, " -  " , r.title) manager from employees e join roles r on r.id = e.role_id where e.manager_id is null',
    function (err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        managerList.push(res[i].manager);
      }
    }
  );
  return managerList;
}

function getManagerID(data) {
  return new Promise((resolve, reject) => {
    connection.query(
      'select e.id from employees e join roles r on r.id = e.role_id where concat(e.first_name, " ", e.last_name, " -  " , r.title) = ?',
      data,
      function (err, res) {
        if (err) {
          reject(new Error(err));
        } else {
          resolve(res[0].id);
        }
      }
    );
  });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'firstName',
        message: "Enter the employee's first name: ",
      },
      {
        type: 'input',
        name: 'lastName',
        message: "Enter the employee's last name: ",
      },
      {
        type: 'list',
        name: 'roleName',
        message: 'What is their role? ',
        choices: selectRole(),
      },
      {
        type: 'list',
        name: 'managerID',
        message: 'Who do they report to? ',
        choices: selectManager(),
      },
    ])

    .then((answer) => {
      getRoleID(answer.roleName).then((roleID) =>
        getManagerID(answer.managerID)
          .then((managerID) =>
            connection.query(
              'INSERT INTO employees SET ?',
              {
                first_name: answer.firstName,
                last_name: answer.lastName,
                role_id: roleID,
                manager_id: managerID,
              },
              function (err) {
                if (err) throw err;
                console.log('Employee added successfully');
                askQuestions();
              }
            )
          )
          .catch(function (err) {
            console.log(err);
          })
      );
    });
}

function viewDept() {
  connection.query(
    'select id ID, department_name Department from department',
    function (err, res) {
      if (err) throw err;
      console.table(res);
      askQuestions();
    }
  );
}

function viewRoles() {
  connection.query(
    'select r.id ID, r.title Title, concat("$", format(r.salary, 0)) Salary,d.department_name "Department Name"from roles r join department d on d.id = r.department_id',
    function (err, res) {
      if (err) throw err;
      console.table(res);
      askQuestions();
    }
  );
}

function viewEmp() {
  connection.query(
    'select e.id ID,concat(e.first_name, " ", e.last_name) Employee,r.title "Employee Title",concat("$", format(r.salary, 0)) Salary,case  when m.first_name is not null then concat(m.first_name, " ", m.last_name)  else " " end as "Manager",case  when m.first_name is not null then r2.title   else " " end as "Manager Title" from employees e left join employees m on m.id = e.manager_id left join roles r on r.id = e.role_id left join roles r2 on r2.id = m.role_id',
    function (err, res) {
      if (err) throw err;
      console.table(res);

      askQuestions();
    }
  );
}

function viewBudget() {
  connection.query(
    'select d.department_name "Department",concat("$", format(sum(r.salary), 0)) "Budget" from department d join roles r on r.department_id = d.id group by d.id',
    function (err, res) {
      if (err) throw err;
      console.table(res);

      askQuestions();
    }
  );
}

function updateEmployee() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'employeeID',
        message: "Enter the employee's id number: ",
      },
      {
        type: 'input',
        name: 'roleID',
        message: 'Enter the employees new role id: ',
      },
    ])

    .then((answer) => {
      let employeeID = answer.employeeID;
      let roleID = answer.roleID;

      connection.query(
        'UPDATE employees SET ? WHERE ?',
        [
          {
            role_id: roleID,
          },
          {
            id: employeeID,
          },
        ],
        function (err) {
          if (err) throw err;
          console.log('Employee name updated successfully');

          askQuestions();
        }
      );
    });
}

function connectionEnd() {
  clear();
  console.log(
    chalk.red(figlet.textSync('Exiting....', { horizontalLayout: 'full' }))
  );
  setTimeout(function () {
    clear();
  }, 750);
  connection.end();
}
