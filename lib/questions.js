//required module imports
const QueryData = require("./QueryData");
const choiceList = require("./ChoiceList.js");
const queryData = new QueryData();

//Main questions
const questions = [
    {
        type: 'list',
        name: 'action',
        message: `Please choose what you want to do:`,
        choices: ['Delete Department', 'Add Department', 'Add Role', 'Add Employee',
            'View Departments', 'View Roles', 'View Employees', 'View Employees By Manager',
            'Update Employee Role', 'Update Employee Manager']
    },
    {
        type: 'input',
        name: 'newDepartment',
        message: 'Enter the name of department:',
        when: answers => answers.action == 'Add Department',
        validate: (value) => {
            return value.trim() ? true : 'Please enter a valid department name'
        }
    },
    {
        type: 'input',
        name: 'newRoleTitle',
        message: 'Enter the title for role:',
        when: answers => answers.action == 'Add Role',
        validate: (value) => {
            return value.trim() ? true : 'Please enter a valid role title'
        }
    },
    {
        type: 'input',
        name: 'newRoleSalary',
        message: answers => `Enter the salary for ${answers.newRoleTitle} role:`,
        when: answers => answers.action == 'Add Role',
        validate: (value) => {
            return value.trim() ? true : 'Please enter a valid salary value'
        }
    },
    {
        type: 'list',
        name: 'selectedDepartment',
        message: answers => {
            switch (answers.action) {
                case 'Add Role':
                    return `Please select a department for ${answers.newRoleTitle} role:`;
                case 'Delete Department':
                    return 'Please select a department which you want to remove';
            }
        },
        choices: choiceList.fetchAllDepartments,
        when: answers => answers.action == 'Add Role' || answers.action == 'Delete Department',
    },
    {
        type: 'input',
        name: 'employeeFirstName',
        message: 'Enter the first name of employee:',
        when: answers => answers.action == 'Add Employee',
        validate: (value) => {
            return value.trim() ? true : 'Please enter a valid first name'
        }
    },
    {
        type: 'input',
        name: 'employeeLastName',
        message: 'Enter the last name of employee:',
        when: answers => answers.action == 'Add Employee',
        validate: (value) => {
            return value.trim() ? true : 'Please enter a valid last name'
        }
    },
    {
        type: 'list',
        name: 'employeeRoleTitle',
        message: answers => `Please select a role title for ${answers.employeeFirstName}:`,
        choices: choiceList.fetchAllRoleTitles,
        when: answers => answers.action == 'Add Employee',
    },
    {
        type: 'list',
        name: 'employeeManager',
        message: answers => `Please select ${answers.employeeFirstName}'s manager:`,
        choices: choiceList.getManagerChoiceList,
        default: 'None',
        when: answers => answers.action == 'Add Employee',
    },
    {
        type: 'list',
        name: 'employeeToUpdate',
        message: answers => {
            let whatToUpdate;
            switch (answers.action) {
                case 'Update Employee Role':
                    whatToUpdate = 'role';
                    break;
                case 'Update Employee Manager':
                    whatToUpdate = 'manager';
                    break;
            }
            return `Please select employee whose ${whatToUpdate} you want to update:`;

        },
        choices: choiceList.getEmployeeChoiceList,
        when: answers => answers.action == 'Update Employee Role' || answers.action == 'Update Employee Manager',
    },
    {
        type: 'list',
        name: 'newRole',
        message: answers => `Please select ${answers.employeeToUpdate}'s new role:`,
        choices: choiceList.fetchAllRoleTitles,
        when: answers => answers.action == 'Update Employee Role',
    },
    {
        type: 'list',
        name: 'newManager',
        message: answers => `Please select ${answers.employeeToUpdate}'s new manager:`,
        choices: choiceList.getManagerChoiceList,
        when: answers => answers.action == 'Update Employee Manager',
    },
    {
        type: 'list',
        name: 'viewByManager',
        message: answers => `Please select the manager of the employee you want to view:`,
        choices: choiceList.getEmployeeChoiceList,
        when: answers => answers.action == 'View Employees By Manager',
    },
];

const continueQuestion = [
    {
        type: 'confirm',
        name: 'continue',
        message: 'Do you want to continue?',
    }
]

module.exports = {
    questions,
    continueQuestion
}