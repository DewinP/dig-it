import { NextFunction, Request, Response } from "express";
import { httpCode } from "../common/http-code.enum";
import HttpExeception from "../common/http-exception";
import duplicationErrToFieldError from "../helpers/duplicationErrToFieldError";
import { UserService } from "../services/users/users.service";
import { loginValidation } from "../validations/";
import { IUserMe } from "../interfaces/interfaces";
import argon2 from "argon2";

const service = new UserService();
class AuthController {
  public static Register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      req.body.password = await argon2.hash(req.body.password);
      let user = await service.addUser(req.body);
      req.session.user = {
        id: user.id,
        username: user.username,
        isAdmin: user.isAdmin,
      };

      res.json({ user });
    } catch (error) {
      if (error.code === "23505") {
        next(
          new HttpExeception({
            statusCode: httpCode.BAD_REQUEST,
            errors: duplicationErrToFieldError(error.detail),
          })
        );
      } else next(new HttpExeception({ statusCode: httpCode.SERVER_ERROR }));
    }
  };

  public static Login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    let errors = await loginValidation(req.body);
    if (errors) {
      next(
        new HttpExeception({
          statusCode: httpCode.BAD_REQUEST,
          errors,
        })
      );
    } else {
      let modelUser = await service.getMe(req.body.username);
      if (modelUser) {
        let isPasswordCorrect = await argon2.verify(
          modelUser.password,
          req.body.password
        );

        if (!isPasswordCorrect) {
          next(
            new HttpExeception({
              statusCode: httpCode.BAD_REQUEST,
              errors: [{ field: "password", message: "password is incorrect" }],
            })
          );
        }
        let user: IUserMe = {
          id: modelUser.id,
          email: modelUser.email,
          username: modelUser.username,
          isAdmin: modelUser.isAdmin,
          posts: modelUser.posts,
          comments: modelUser.comments,
          subscriptions: modelUser.subscriptions,
          communities: modelUser.communities,
          created_at: modelUser.created_at,
        };
        req.session.user = {
          id: user.id,
          username: user.username,
          isAdmin: user.isAdmin,
        };
        res.json(user);
      } else {
        next(
          new HttpExeception({
            statusCode: httpCode.BAD_REQUEST,
            errors: [{ field: "username", message: "username doesn't exist" }],
          })
        );
      }
    }
  };

  public static Me = async (req: Request, res: Response) => {
    if (!req.session.user) {
      res.sendStatus(httpCode.SUCCESS);
    } else {
      let user = await service.getMe(req.session.user.username);
      res.json(user);
    }
  };
}

export default AuthController;
