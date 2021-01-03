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
        'Add employee',
        'Add role',
        'Add department',
        'Update roles',
        'Exit',
      ],
    })
    .then((answer) => {
      console.log(answer.option);
      switch (answer.option) {
        case 'Add department':
          addDept();
          break;
        case 'Add role':
          addRole();
          break;
        case 'Add employee':
          addEmp();
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
        case 'Update roles':
          updateEmp();
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
      name: 'deptName',
      message: 'Enter the name of the department you want to add: ',
    })

    .then((answer) => {
      connection.query(
        'INSERT INTO department SET ?',
        { department_name: answer.deptName },
        function (err) {
          if (err) throw err;
          console.log('Dept added successfully');
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
        message: 'Enter the salary for the role you added: ',
      },
      {
        type: 'input',
        name: 'depID',
        message: 'Enter the department ID for the role you added: ',
      },
    ])

    .then((answer) => {
      connection.query(
        'INSERT INTO roles SET ?',
        { title: answer.roleName, salary: answer.salary, dep_id: answer.depID },
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
  connection.query(
    'SELECT id FROM roles where title = ?',
    data,
    function (err, res) {
      if (err) throw err;
      console.log(res[0].id);
    }
  );
}

function addEmp() {
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
        name: 'roleName',
        type: 'list',
        message: 'What is their role? ',
        choices: selectRole(),
      },
      {
        type: 'input',
        name: 'managID',
        message: "Enter the employee's manager's id: ",
      },
    ])

    .then((answer) => {
      var roleID = getRoleID(answer.roleName);
      console.log(roleID);
      connection.query(
        'INSERT INTO employees SET ?',
        {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: roleID,
          manager_id: answer.managID,
        },
        function (err) {
          if (err) throw err;
          console.log('Employee added successfully');
          askQuestions();
        }
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
      console.log('SQL ran successfully');
      console.table(res);

      askQuestions();
    }
  );
}

function updateEmp() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'idNum',
        message: "Enter the employee's id number: ",
      },
      {
        type: 'input',
        name: 'roleID',
        message: 'Enter the employees new role id: ',
      },
    ])

    .then((answer) => {
      let idNum = answer.idNum;
      let roleIDnum = answer.roleID;

      connection.query(
        'UPDATE employees SET ? WHERE ?',
        [
          {
            role_id: roleIDnum,
          },
          {
            id: idNum,
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
