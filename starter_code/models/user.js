const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const brcryptSalt = 10;

const userSchema = new Schema({
  name: {
    type: String,
  }, 
  email: {
    type: String,
    required: true, 
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'], 
    unique: true
  },
  password: {
    type: String,
    required: 'Password is required'
  }, 
  isLaunderer: { 
    type: Boolean, 
    default: false
  },
  fee: { 
    type: Number, 
    default: null 
  }
});

userSchema.pre('save', function(next){
  if (this.isModified('password')) {
    bcrypt.genSalt(brcryptSalt)
      .then(salt => {
        return bcrypt.hash(this.password, salt)
      })
      .then(hash => {
        this.password = hash;
        next();
      })
      .catch(error => next(error));
  } else {
    next();
  }
});

userSchema.set('timestamps', true);

const User = mongoose.model('User', userSchema);

module.exports = User;
