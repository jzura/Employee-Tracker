const QueryData = require('./QueryData');
const chalk = require('chalk');

class QueryDepartment extends QueryData {

    async deleteDepartment(department) {
        await this.deleteData("department", "NAME", department.departmentName);
        console.log(chalk.yellow(`${department.departmentName} removed succesfully`));
    }

    async addDepartment(department) {
        const connection = await this.getConnection();
        await connection.query(
            "INSERT INTO department (NAME) VALUES ?", [[[department.newDepartment]]]);
        connection.end();
        console.log(
            chalk.yellow(`department added successfully`)
        );
    }

    async viewDepartment() {
        const departments = await this.fetchData("department", "1", "1");
        return departments;
    }
}
module.exports = QueryDepartment;