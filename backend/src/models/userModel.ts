import { timeStamp } from 'console'

export {}

const mongoose = require('mongoose')
const validator = require('validator')

const { Schema } = mongoose

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'Please enter username!'],
      minlength: [3, ' Username should greater than 2 characters'],
      maxlength: [15, ' Username should have max 15 characters'],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Please enter email address!'],
      validate: [validator.isEmail, 'Invalid email address'],
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Please enter password'],
      select: false,
      minlength: [8, 'Password should have more than 8 characters'],
      validate: [validator.isStrongPassword, 'To weak password'],
    },
    age: {
      type: Number,
      required: [true, 'Please enter an age!'],
      min: [18, 'You have to be 18 to sign up.'],
      max: [99, 'You are too old :/'],
    },
    gender: {
      type: String,
      enum: ['Male', 'Female'],
      required: [true, 'You have to set up gender'],
    },
    searchFor: {
      type: String,
      enum: ['Male', 'Female', 'Both'],
      required: [true, 'You have to set up yuur prferences!'],
    },
    images: {
      type: Array,
    },
    hobbies: {
      type: Array, ///tu bedzie enum
    },
    desc: {
      type: String,
      ///required: [true, 'Please tell us somethink about you!'],
    },
    city: {
      type: String,
      required: [true, 'Please enter a city!'],
    },
    account_status: {
      type: Boolean,
      default: false,
    },
    activation_code: {
      type: String,
    },
    activation_code_exp: {
      type: Date,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
