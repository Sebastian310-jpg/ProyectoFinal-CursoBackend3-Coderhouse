import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true
    },
    last_name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /^\S+@\S+\.\S+$/
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user'
    },
    pets: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pet'
    }]
  },
  {
    timestamps: true,
    versionKey: false
  }
)

const UserModel = mongoose.model('User', userSchema);

export default UserModel;