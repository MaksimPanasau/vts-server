const _ = require('lodash');

const { User } = require('../models/user');
const { authenticate, roleAdmin } = require('../middleware/authenticate');
const { ok, notFound, error } = require('../util/response');

module.exports = function(app) {
  app.get('/users', authenticate, roleAdmin, (req, res) => {
    User.find()
    .then(users => !users ? notFound(res) : res.send({ users }))
    .catch(err => error(res, err));
  });

  app.post('/users', (req, res) => {
    const body = _.pick(req.body, ['email', 'password', 'roles']);
    const user = new User(body);
    user.save()
    .then(() => user.generateAuthToken())
    .then(({ user, token}) => res.header('x-auth', token).send({ user }))
    .catch(err => error(res, err));
  });

  // app.delete('/users', )

  app.post('/users/login', (req, res) => {
    const { email, password } = req.body;
    User.findByEmailAndPassw(email, password)
    .then(user => user.generateAuthToken())
    .then(({ user, token }) => res.header('x-auth', token).send({ user, token }))
    .catch(err => error(res, err));
  });

  app.get('/users/me', authenticate, (req, res) => {
    res.send({ user: req.user });
  });

  app.delete('/users/me/token', authenticate, (req, res) => {
    req.user.removeToken(req.token)
    .then(() => res.send({ ok: 'ok' }))
    .catch(err => error(res, err));
  });
}
