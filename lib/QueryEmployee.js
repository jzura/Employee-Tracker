//required imports
const QueryData = require('./QueryData');
const QueryRole = require('./QueryRole');
const chalk = require('chalk');

const queryRole = new QueryRole();

class QueryEmployee extends QueryData {

    async addEmployee(employeeDetail) {
        const roleId = await queryRole.getRoleId(employeeDetail.employeeRoleTitle);
        const managerId = await this.getEmployeeId(employeeDetail.employeeManager);
        const employee = [[employeeDetail.employeeFirstName, employeeDetail.employeeLastName, roleId, managerId]];
        const connection = await this.getConnection();
        await connection.query(
            "INSERT INTO employee (FIRST_NAME, LAST_NAME, ROLE_ID, MANAGER_ID) VALUES ?", [employee]);
        connection.end();
        console.log(
            chalk.yellow(`employee added successfully`)
        );
    }

    async getEmployeeId(employeeName) {
        let employeeId = null;
        if ('None' != employeeName) {
            employeeName = employeeName.split(" ");
            const employee = await this.fetchEmployeeByName(employeeName[0], employeeName[1]);
            employeeId = employee[0].ID;
        }
        return employeeId;
    }

    async updateEmployeeRole(employeeRoleDetail) {
        const roleId = await queryRole.getRoleId(employeeRoleDetail.newRole);
        const employeeId = await this.getEmployeeId(employeeRoleDetail.employeeToUpdate);
        await this.updateData("employee", employeeId, "ROLE_ID", roleId);
        console.log(
            chalk.yellow(`${employeeRoleDetail.employeeToUpdate}'s role updated successfully`)
        );
    }

    async updateEmployeeManager(employeeDetail) {
        const managerId = await this.getEmployeeId(employeeDetail.newManager);
        const employeeId = await this.getEmployeeId(employeeDetail.employeeToUpdate);
        await this.updateData("employee", employeeId, "MANAGER_ID", managerId);
        console.log(
            chalk.yellow(`${employeeDetail.employeeToUpdate}'s manager updated successfully`)
        );
    }

    async viewEmployees() {
        let employees = await this.fetchEmployeeDetails();
        return employees.map(employee => {
            employee.MANAGER = `${employee.MANAGER_FIRST_NAME} ${employee.MANAGER_LAST_NAME}`;
            delete employee.MANAGER_FIRST_NAME;
            delete employee.MANAGER_LAST_NAME;
            return employee;
        });
    }

    async viewEmployeesByManager(managerDetail) {
        const employees = await this.viewEmployees();
        const filteredEmployees =
            employees.filter(employee => employee.MANAGER == managerDetail.managerName);
        if (filteredEmployees.length)
            console.table(`Employees Reporting To ${managerDetail.managerName}`, filteredEmployees);
        else
            console.log(chalk.yellow(`Sorry. No one currently reports to ${managerDetail.managerName}`));
    }

    async fetchEmployeeByName(fName, lName) {
        const connection = await this.getConnection();
        const queryResponse = await connection.query(
            'SELECT * FROM employee WHERE FIRST_NAME = ? AND LAST_NAME = ?', [fName, lName]);
        connection.end();
        return queryResponse;
    }

    async fetchEmployeeDetails() {
        const connection = await this.getConnection();
        const queryResponse = await connection.query(
            `SELECT employee.ID, employee.FIRST_NAME, employee.LAST_NAME,role.TITLE AS TITLE,
        department.NAME AS DEPARTMENT,role.SALARY AS SALARY, emp2.FIRST_NAME AS MANAGER_FIRST_NAME,
        emp2.LAST_NAME AS MANAGER_LAST_NAME
        FROM employee
        JOIN role
        ON employee.ROLE_ID = role.ID
        JOIN department
        ON role.DEPARTMENT_ID = department.ID
        LEFT OUTER JOIN employee emp2
        ON employee.MANAGER_ID = emp2.ID`);
        connection.end();
        return queryResponse;
    }

}

module.exports = QueryEmployee;