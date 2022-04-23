import UserController from "controllers/User/UserController";
import { NextApiRequest, NextApiResponse } from "next";

const users = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  let result: any;

  switch (method) {
    case "GET":
      result = await UserController.readUsers();
      return res.status(200).json(result);
      break;

    case "POST":
      result = await UserController.createUser(req.body);
      if (!result.ok) return res.status(400).json(result);
      return res.status(200).json(result);

      break;

    default:
      res.status(400).end(`${method} not found!`);
      break;
  }
};

export default users;
