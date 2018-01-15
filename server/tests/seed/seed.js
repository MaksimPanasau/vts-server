const { ObjectID } = require('mongodb');
const { Employee } = require('../../models/employee');

const employees = [
  { _id: new ObjectID(), firstName: 'Andrei', lastName: 'Zhaleznichenka'},
  { _id: new ObjectID(), firstName: 'Maxim', lastName: 'Ponasov'}
];

const populateEmployees = done => {
  Employee.remove({}).then(() => Employee.insertMany(employees)).then(done);
};

module.exports = { employees, populateEmployees };
