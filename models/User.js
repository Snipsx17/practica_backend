const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// schema
const userSchema = mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
});

userSchema.statics.hashPassword = async (plainTextPassword) => {
  const saltRounds = 5;
  try {
    return await bcrypt.hash(plainTextPassword, saltRounds);
  } catch (error) {
    console.log('error on password hash', error);
  }
};

// modelo
const User = mongoose.model('user', userSchema);

module.exports = User;
