const sqlConnection = require('../config/connection');

// Retrieves all employee data from the table and returns it
function viewEmployees() {
    const query = `
    SELECT
        employee.id AS \`Employee Id\`,
        employee.first_name AS \`First Name\`,
        employee.last_name AS \`Last Name\`,
        role.title AS \`Employee Role\`,
        department.name AS \`Department\`,
        role.salary AS \`Salary\`,
        employee.manager_id AS \`Manager Id\`
    FROM
        employee
    INNER JOIN
        role ON employee.role_id = role.id
    INNER JOIN
        department ON role.department_id = department.id
        `;
    return sqlConnection.promise().query(query);
};
// Retrieves all role data from the table and returns it
function viewRoles() {
    const query = `
    SELECT
        role.id AS \`Role Id\`,
        role.salary AS \`Salary\`,
        role.title AS \`Title\`,
        department.name AS \`Department\`
    FROM
        role
    INNER JOIN
        department ON role.department_id = department.id
        `;
    return sqlConnection.promise().query(query);
};
// Retrieves all department data from the table and returns it
function viewDepartments() {
    const query = `
    SELECT
        department.id AS \`Department Id\`,
        department.name AS \`Department\`
    FROM
        department
        `;
    return sqlConnection.promise().query(query);
};

// Sets parameters for new employees and inserts data into the table
function newEmployee(firstName, lastName, roleId, managerId) {
    const manager = managerId === '' ? null : managerId;
    const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
    return sqlConnection.promise().query(query, [firstName, lastName, roleId, manager]);
};
// Takes employee id and new role id and updates the employee
function changeRole(employeeId, newRole) {
    const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
    return sqlConnection.promise().query(query, [newRole, employeeId]);
};
// Accepts data to create a new role and adds it to the roles table
function newRole(title, salary, department) {
    const query = 'INSERT INTO role(title, salary, department_id) VALUES (?, ?, ?)';
    return sqlConnection.promise().query(query, [title, salary, department]);
};
// Accepts department title and adds it to the department table
function newDepartment(department) {
    const query = 'INSERT INTO department (name) VALUES (?)';
    return sqlConnection.promise().query(query, [department]);
};
// Exports all queries
module.exports = {
    viewEmployees,
    viewRoles,
    viewDepartments,
    newEmployee,
    changeRole,
    newRole,
    newDepartment,
};