const _ = require('lodash');
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  roles: {
    type: Array,
    required: true,
    default: ['EMPLOYEE']
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

UserSchema.statics.findByEmailAndPassw = function(email, password) {
  const User = this;
  return User.findOne({ email }).then(user =>
    user
      ? new Promise((resolve, reject) =>
          bcrypt.compare(password, user.password, (err, res) => res ? resolve(user) : reject()))
      : Promise.reject()
  );
}

UserSchema.statics.findByToken = function(token) {
  const User = this;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return User.findOne({
      '_id': decoded._id,
      'tokens.token': token,
      'tokens.access': 'auth'
    });
  } catch (e) {
    return Promise.reject();
  }
}

UserSchema.pre('save', function (next) {
  const user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.methods.toJSON = function() {
  const user = this;
  const userObj = user.toObject();
  return _.pick(userObj, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function() {
  const user = this;
  const access = 'auth';
  const token = jwt.sign({ _id: user._id.toHexString(), access }, process.env.JWT_SECRET).toString();
  user.tokens.push({ access, token });
  return user.save().then(() => ({ user, token }));
};

UserSchema.methods.removeToken = function(token) {
  const user = this;
  return user.update({
    $pull: {
      tokens: { token }
    }
  });
}

UserSchema.methods.isManager = function() {
  const user = this;
  return user.roles.includes('MANAGER');
}

UserSchema.methods.isAdmin = function() {
  const user = this;
  return user.roles.includes('ADMIN');
}

const User = mongoose.model('User', UserSchema);

module.exports = { User };
