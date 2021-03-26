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
    try {
      let subscription = await service.subscribeToCommunity({
        communityId: req.body.communityId,
        userId: req.session.user!.id,
      });
      res.json(subscription);
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
      res.json(user);
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
