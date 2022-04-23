import * as mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "لطفا نام را وارد کنید"],
  },
  username: {
    type: String,
    trim: true,
    required: [true, "لطفا نام کاربری را وارد کنید"],
    lowercase: true,
    unique: true,
  },
  email: {
    type: String,
    trim: true,
    required: [true, "لطفا ایمیل را وارد کنید"],
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    trim: true,
    required: [true, "لطفا رمز عبور را وارد کنید"],
    minlength: [5, "رمز عبور حداقل 5"],
  },
  age: {
    type: Number,
    required: [true, "لطفا سن خود را وارد کنید"],
    min: [15, "حداقل سن ورود 15"],
    validate: {
      validator: (v: any) => v % 2 === 0,
      message: (props: any) => `${props.value} is not an even number`,
    },
  },
  createdAt: {
    type: String,
    immutable: true,
    default: () => Date.now(),
  },
  updatedAt: {
    type: String,
    default: () => Date.now(),
  },
});

UserSchema.pre("save", function (next: any) {
  this.updatedAt = Date.now();
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
