import { model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ['male', 'female'], default: 'female' },
    avatarUrl: { type: String, default: null },
  },
  { timestamps: true, versionKey: false },
);

userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
  };

export const User = model('User', userSchema);
