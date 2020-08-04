const QueryData = require('./QueryData');
const chalk = require('chalk');

class QueryDepartment extends QueryData {

    async getRoleId(roleTitle) {
        const role = await this.fetchData("role", "TITLE", roleTitle);
        return role[0].ID;
    }

    async addRole(roleDetail) {
        const department = await this.fetchData("department", "NAME", roleDetail.selectedDepartment);
        const role = [[roleDetail.newRoleTitle, roleDetail.newRoleSalary, department[0].ID]];
        const connection = await this.getConnection();
        const queryResponse = await connection.query(
            "INSERT INTO role (TITLE, SALARY, DEPARTMENT_ID) VALUES ?", [role]);
        connection.end();
        console.log(
            chalk.yellow(`role added successfully`)
        );
    }

    async fetchRoleDetails() {
        const connection = await this.getConnection();
        const queryResponse = await connection.query(
            `SELECT role.ID,role.TITLE,role.SALARY,department.NAME AS DEPARTMENT
         FROM role
         INNER JOIN department
         ON role.DEPARTMENT_ID=department.ID`);
        connection.end();
        return queryResponse;
    }

    async viewRoles() {
        const roles = await this.fetchRoleDetails();
        return roles;
    }
}
module.exports = QueryDepartment;