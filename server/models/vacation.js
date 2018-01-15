const mongoose = require('mongoose');

const Vacation = mongoose.model('Vacation', {
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  duration: [{
    start: {
      type: Number,
      required: true
    },
    end: {
      type: Number,
      required: true
    }
  }],
  approvals: [{
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    comment: {
      type: String,
      default: ''
    }
  }],
  rejections: [{
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    comment: {
      type: String,
      default: ''
    }
  }],
  status: {
    type: String,
    required: true,
    default: 'OPEN'
  }
});

module.exports = { Vacation };
