// models/User.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: false,
  },
  lastname: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
    
  },
  password: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
export default User;
