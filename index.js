const chalk = require('chalk');
const cTable = require('console.table');
const inquirer = require('inquirer');
const display = require("./lib/display")
const { questions, continueQuestion } = require('./lib/questions');
const QueryDepartment = require('./lib/QueryDepartment');
const QueryRole = require('./lib/QueryRole');
const QueryEmployee = require('./lib/QueryEmployee');

const queryDepartment = new QueryDepartment();
const queryRole = new QueryRole();
const queryEmployee = new QueryEmployee();



const askQuestions = async () => {
    const answers = await inquirer.prompt(questions);
    switch (answers.action) {
        case 'Add Department':
            await queryDepartment.addDepartment({ newDepartment: answers.newDepartment });
            break;
        case 'Add Role':
            await queryRole.addRole({
                newRoleTitle: answers.newRoleTitle,
                newRoleSalary: answers.newRoleSalary,
                selectedDepartment : answers.selectedDepartment
            });
            break;
        case 'Add Employee':
            await queryEmployee.addEmployee({
                employeeRoleTitle: answers.employeeRoleTitle,
                employeeManager: answers.employeeManager,
                employeeFirstName: answers.employeeFirstName,
                employeeLastName: answers.employeeLastName
            });
            break;
        case 'View Departments':
            const departments = await queryDepartment.viewDepartment();
            console.table("Departments Summary", departments);
            break;
        case 'View Roles':
            const roles = await queryRole.viewRoles();
            console.table("Roles Summary", roles);
            break;
        case 'View Employees':
            console.table("Employees Summary", await queryEmployee.viewEmployees());
            break;
        case 'View Employees By Manager':
            await queryEmployee.viewEmployeesByManager({
                managerName: answers.viewByManager
            });
            break;

        case 'Update Employee Role':
            await queryEmployee.updateEmployeeRole({
                newRole: answers.newRole,
                employeeToUpdate: answers.employeeToUpdate
            });
            break;
        case 'Update Employee Manager':
            await queryEmployee.updateEmployeeManager({
                newManager: answers.newManager,
                employeeToUpdate: answers.employeeToUpdate
            });
            break;
        case 'Delete Department':
            await queryDepartment.deleteDepartment({ departmentName: answers.selectedDepartment });
            break;
    }
    inquirer.prompt(continueQuestion).then(async answers => {
        answers.continue ? await askQuestions() :
            console.log(chalk.yellow("Thanks for your time. Have a great day!"));
    });
}
display.initializeDisplay();
askQuestions();