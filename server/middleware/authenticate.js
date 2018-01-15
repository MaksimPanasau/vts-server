const { User }  = require('../models/user');

const authenticate = (req, res, next) => {
  const token = req.header('x-auth');
  User.findByToken(token).then(user => {
    if (!user) {
      return Promise.reject();
    }
    req.user = user;
    req.token = token;
    next();
  })
  .catch(err => res.status(401).send());
};

const roleManager = (req, res, next) => {
  if (!req.user.isManager()) {
    return res.status(403).send();
  }
  next();
};

const roleAdmin = (req, res, next) => {
  if (!req.user.isAdmin()) {
    return res.status(403).send();
  }
  next();
};

const roleManagerOrAdmin = (req, res, next) => {
  if (!req.user.isManager() && !req.user.isAdmin()) {
    return res.status(403).send();
  }
  next();
};

module.exports = { authenticate, roleManager, roleAdmin, roleManagerOrAdmin };
