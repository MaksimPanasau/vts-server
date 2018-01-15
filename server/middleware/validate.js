
const { ObjectID } = require('mongodb');

const validateId = (req, res, next) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(404).send();
  }
  next();
};

module.exports = { validateId };
