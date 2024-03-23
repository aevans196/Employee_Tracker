const query = require('./queries/queries');
const inquirer = require('inquirer');

function initialize() {
    // Prompt user to select an option
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'action',
                message: 'Please select from the options below.',
                choices: [
                    'View roles',
                    'View departments',
                    'View employees',
                    'Add role',
                    'Add department',
                    'Add employee',
                    'Update a role',
                    'Quit',
                ],
            },
        ])
        .then((choice) => {
            switch (choice.action) {
                // Check which option is selected and call the corresponding query
                case 'View roles' :
                    query.viewRoles()
                    .then(([rows, fields]) => {
                        console.table(rows);
                        initialize();
                    })
                    .catch((err) => {
                        console.error(err);
                        initialize();
                    });
                break;
                
                case 'View departments' :
                    query.viewDepartments()
                    .then(([rows, fields]) => {
                        console.table(rows);
                        initialize();
                    })
                    .catch((err) => {
                        console.error(err);
                        initialize();
                    });
                break;

                case 'View employees' :
                    query.viewEmployees()
                    .then(([rows, fields]) => {
                        console.table(rows);
                        initialize();
                    })
                    .catch((err) => {
                        console.error(err);
                        initialize();
                    });
                break;

                case 'Add role' :
                    // If option to add role is selected, prompt for necessary inputs
                    inquirer
                        .prompt([
                            {
                                type: 'input',
                                name: 'title',
                                message: 'Enter the role title.',
                            },
                            {
                                type: 'input',
                                name: 'salary',
                                message: 'Enter the role salary',
                            },
                            {
                                type: 'input',
                                name: 'department',
                                message: 'Enter the department ID',
                            },
                        ])
                        .then((data) => {
                            // Populate query parameters with input data
                            query.newRole(data.title, data.salary, data.department)
                            .then(([rows, fields]) => {
                                console.log('Role added.');
                                initialize();
                            })
                            .catch((err) => {
                                console.error(err);
                                initialize();
                            });
                        });
                break;

                case 'Add department' :
                    inquirer
                        .prompt([
                            {
                                type: 'input',
                                name: 'title',
                                message: 'Enter the department name',
                            },
                        ])
                        .then((data) => {
                            query.newDepartment(data.title)
                            .then(([rows, fields]) => {
                                console.log('Department added');
                                initialize();
                            })
                            .catch((err) => {
                                console.error(err);
                                initialize();
                            });
                        });
                break;

                case 'Add employee' :
                    inquirer
                        .prompt([
                            {
                                type: 'input',
                                name: 'first',
                                message: 'Enter employee first name',
                            },
                            {
                                type: 'input',
                                name: 'last',
                                message: 'Enter employee last name',
                            },
                            {
                                type: 'input',
                                name: 'role',
                                message: 'Enter role id',
                            },
                            {
                                type: 'input',
                                name: 'manager',
                                message: 'Enter employee manager id',
                            },
                        ])
                        .then((data) => {
                            query.newEmployee(data.first, data.last, data.role, data.manager)
                            .then(([rows, fields]) => {
                                console.log('Employee added');
                                initialize();
                            })
                            .catch((err) => {
                                console.error(err);
                                initialize();
                            });
                        });
                break;

                case 'Update a role' :
                    inquirer
                        .prompt([
                            {
                                type: 'input',
                                name: 'employeeID',
                                message: 'Enter the employee id',
                            },
                            {
                                type: 'input',
                                name: 'roleID',
                                message: 'Enter the new role id',
                            },
                        ])
                        .then((data) => {
                            query.changeRole(data.employeeID, data.roleID)
                            .then(([rows, fields]) => {
                                console.log('Employee updated');
                                initialize();
                            })
                            .catch((err) => {
                                console.error(err);
                                initialize();
                            });
                        });
                break;
                // If user selects quit option, exit process
                case 'Quit' :
                    process.exit(0);
                // If action is invalid, log error and prompt again
                default:
                    console.log('Error');
                    initialize();
            }
        })
}   
// Call initialize function
initialize();