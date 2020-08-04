const QueryData = require("./QueryData");
const queryData = new QueryData();


//query functions to generate choice lists for inquirer
const fetchAllDepartments = async () => {
    const departments = await queryData.fetchData('department', '1', '1');
    console.log(departments);
    return departments.map(department => department.NAME).sort();
}
const fetchAllRoleTitles = async () => {
    const roles = await queryData.fetchData('role', '1', '1');
    return roles.map(role => role.TITLE).sort();
}

const getManagerChoiceList = async answers => {
    const sortedEmployees = await getEmployeeChoiceList();
    sortedEmployees.push('None');
    return answers.employeeToUpdate ? sortedEmployees
        .filter(employee => employee != answers.employeeToUpdate) : sortedEmployees;
}
const getEmployeeChoiceList = async () => {
    const employees = await queryData.fetchData('employee', '1', '1');
    const sortedEmployees = employees.map(employee => `${employee.FIRST_NAME} ${employee.LAST_NAME}`).sort();
    return sortedEmployees;
}

module.exports = {
    fetchAllDepartments,
    fetchAllRoleTitles,
    getManagerChoiceList,
    getEmployeeChoiceList
}