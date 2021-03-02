import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  //   email: {
  //     type: String,
  //     lowercase: true,
  //     trim: true,
  //     unique: true,
  //     required: true,
  //   },
});

export const User = model('users', UserSchema);
