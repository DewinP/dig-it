import { Request, Response, NextFunction } from "express";
import { httpCode } from "../common/http-code.enum";
import HttpExeception from "../common/http-exception";
import { UserService } from "../services/users/users.service";

const service = new UserService();
class UserController {
  public static SubscribeToCommunity = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.session.user) {
      next(new HttpExeception({ statusCode: httpCode.NOT_AUTHORIZED }));
    }
    try {
      let subscription = await service.subscribeToCommunity(req.body);
      res.json({ subscription });
    } catch (error) {
      next();
    }
  };
  public static GetUserByUsername = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    let user = await service.getUserByUsername(req.params.username);
    if (user) {
      res.json({ user });
    } else {
      next(
        new HttpExeception({
          statusCode: httpCode.NOT_FOUND,
          customErrMsg: "User doesnt not exist",
        })
      );
    }
  };
}

export default UserController;
