const _ = require('lodash');

const { Employee } = require('../models/employee');
const { authenticate, roleAdmin, roleManagerOrAdmin } = require('../middleware/authenticate');
const { validateId } = require('../middleware/validate');
const { notFound, error } = require('../util/response');

module.exports = function(app) {
  app.get('/employees', authenticate, roleManagerOrAdmin, (req, res) => {
    Employee.find()
    .then(employees => res.send({ employees }))
    .catch(err => error(res, err));
  });

  app.get('/employees/me', authenticate , (req, res) => {
    Employee.findOne({ email: req.user.email })
    .then(employee => !employee ? notFound(res) : res.send({ employee }))
    .catch(err => error(res, err));
  });

  app.get('/employees/:id', authenticate, roleManagerOrAdmin, validateId, (req, res) => {
    Employee.findById(req.params.id)
    .then(employee => !employee ? notFound(res) : res.send({ employee }))
    .catch(err => error(res, err));
  });

  app.post('/employees', authenticate, roleAdmin, (req, res) => {
    const body = _.pick(req.body, [ '_id', 'email', 'firstName', 'lastName', 'workingSince', 'groups', 'balance' ]);
    const employee = new Employee(body);
    employee.save()
    .then(doc => res.send(doc))
    .catch(err => error(res, err));
  });

  app.delete('/employees/:id', authenticate, roleAdmin, validateId, (req, res) => {
    Employee.findByIdAndRemove(req.params.id)
    .then(employee => !employee ? notFound(res) : res.send({ employee }))
    .catch(err => error(res, err));
  });

  app.put('/employees/:id', authenticate, roleAdmin, validateId, (req, res) => {
    const body = _.pick(req.body, [ 'email', 'firstName', 'lastName', 'workingSince', 'groups', 'balance' ]);
    Employee.findByIdAndUpdate(req.params.id, { $set: { ...body } }, { new: true })
      .then(employee => !employee ? notFound(res) : res.send({ employee }))
      .catch(err => error(res, err));
  });
}
