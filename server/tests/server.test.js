const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { Employee } = require('./../models/employee');

// const employees = [
//   { _id: new ObjectID(), firstName: 'Andrei', lastName: 'Zhaleznichenka'},
//   { _id: new ObjectID(), firstName: 'Maxim', lastName: 'Ponasov'}
// ];
//
// beforeEach((done) => {
//   Employee.remove({}).then(() => {
//     return Employee.insertMany(employees);
//   }).then(() => done());
// });
//
// describe('POST /employees', () => {
//   it('should create a new employee', done => {
//     const firstName = 'Leonid';
//     const lastName = 'Novikov';
//     request(app)
//       .post('/employees')
//       .send({ firstName, lastName })
//       .expect(200)
//       .expect(res => {
//         expect(res.body.firstName).toBe(firstName);
//         expect(res.body.lastName).toBe(lastName);
//       })
//       .end((err, res) => {
//         if (err) {
//           return done(err);
//         }
//         Employee.find({ firstName: 'Leonid' }).then(employees => {
//           expect(employees.length).toBe(1);
//           expect(employees[0].firstName).toBe(firstName);
//           expect(employees[0].lastName).toBe(lastName);
//           done();
//         });
//       });
//   });
//
//   it('should not create employee with invalid body data', done => {
//     const firstName = 'Leonid';
//     request(app)
//       .post('/employees')
//       .send({ firstName })
//       .expect(400)
//       .end((err, res) => {
//         if (err) {
//           return done(err);
//         }
//         Employee.find().then(employees => {
//           expect(employees.length).toBe(2);
//           done();
//         })
//       });
//   });
// });
//
// describe('GET /employees', () => {
//   it('should get all employees', done => {
//     request(app)
//       .get('/employees')
//       .expect(200)
//       .expect(res => {
//         expect(res.body.employees.length).toBe(2);
//       })
//       .end(done);
//   });
// });
//
// describe('GET /employees/:id', () => {
//   it('should return employee', done => {
//     request(app)
//       .get(`/employees/${employees[0]._id.toHexString()}`)
//       .expect(200)
//       .expect(res => {
//         expect(res.body.employee.firstName).toBe('Andrei');
//         expect(res.body.employee.lastName).toBe('Zhaleznichenka');
//       })
//       .end(done);
//   });
//
//   it('should return 404 if employee not found', done => {
//     request(app)
//       .get(`/employees/${new ObjectID().toHexString()}`)
//       .expect(404)
//       .end(done);
//   });
//
//   it('should return 404 if id is invalid', done => {
//     request(app)
//       .get(`/employees/123`)
//       .expect(404)
//       .end(done);
//   });
// });
//
// describe('DELETE /employees/:id', () => {
//   it('should remove an employee', done => {
//     const hexId = employees[0]._id.toHexString();
//     request(app)
//       .delete(`/employees/${hexId}`)
//       .expect(200)
//       .expect(res => {
//         expect(res.body.employee.firstName).toBe('Andrei');
//         expect(res.body.employee.lastName).toBe('Zhaleznichenka');
//       })
//       .end((err, res) => {
//         if (err) {
//           return done(err);
//         }
//         Employee.findById(hexId).then(employee => {
//           expect(employee).toBeFalsy();
//           done();
//         });
//       });
//   });
//
//   it('should return 404 if employee not found', done => {
//     request(app)
//       .delete(`/employees/${new ObjectID().toHexString()}`)
//       .expect(404)
//       .end(done);
//   });
//
//   it('should return 404 if id is invalid', done => {
//     request(app)
//       .delete(`/employees/123`)
//       .expect(404)
//       .end(done);
//   });
// });
//
// describe('PUT /employees/:id', () => {
//   const hexId = employees[0]._id.toHexString();
//   it('should update employee name', done => {
//     request(app)
//       .put(`/employees/${hexId}`)
//       .send({
//         firstName: 'ANDREI',
//         lastName: 'ZHALEZNICHENKA'
//       })
//       .expect(200)
//       .expect(res => {
//         expect(res.body.employee.firstName).toBe('ANDREI');
//         expect(res.body.employee.lastName).toBe('ZHALEZNICHENKA');
//       })
//       .end((err, res) => {
//         if (err) {
//           return done(err);
//         }
//         Employee.findById(hexId).then(employee => {
//           expect(employee.firstName).toBe('ANDREI');
//           done();
//         });
//       });
//   });
//
//   it('should return 404 if employee not found', done => {
//     request(app)
//       .put(`/employees/${new ObjectID().toHexString()}`)
//       .send({
//         firstName: 'ANDREI',
//         lastName: 'ZHALEZNICHENKA'
//       })
//       .expect(404)
//       .end(done);
//   });
// });
