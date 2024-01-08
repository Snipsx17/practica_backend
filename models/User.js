require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// schema
const userSchema = mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
});

userSchema.statics.hashPassword = async function (plainTextPassword) {
  try {
    return await bcrypt.hash(
      plainTextPassword,
      Number(process.env.SALT_ROUND_HASH)
    );
  } catch (error) {
    console.log('error on password hash', error);
  }
};

userSchema.methods.login = function (password) {
  return bcrypt.compare(password, this.password);
};

// modelo
const User = mongoose.model('user', userSchema);

module.exports = User;
