import dbConnect from "lib/dbConnect";
import User from "models/User";
import IUser from "types/IUser";

const UserController = class UserController {
  //   constructor(parameters) {}

  static async readUsers() {
    await dbConnect();
    const users: IUser[] = await User.find({});
    return { ok: true, users };
  }

  static async createUser(data: IUser) {
    try {
      await dbConnect();
      const user: IUser | any = await User.create(data);
      await user.save();
      return { ok: true, user };
    } catch (error: any) {
      if (error.name === "ValidationError") {
        return {
          ok: false,
          msg: Object.values(error.errors).map((val: any) => val.message),
        };
      }
    }
  }
};

export default UserController;
