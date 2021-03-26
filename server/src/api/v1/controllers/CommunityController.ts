import { Request, Response, NextFunction } from "express";
import { httpCode } from "../common/http-code.enum";
import HttpExeception from "../common/http-exception";
import duplicationErrToFieldError from "../helpers/duplicationErrToFieldError";
import { CommunityService } from "../services/communities/community.service";

const service = new CommunityService();
class CommunityController {
  public static SubscribeToCommunity = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let subscription = await service.subscribeToCommunity(req.body);
      res.json(subscription);
    } catch (error) {
      next();
    }
  };

  public static CreateCommunity = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let input = {
        name: req.body.name,
        description: req.body.description,
        hero_img: req.body.hero_img,
        founderId: req.session.user!.id,
      };
      let community = await service.createCommunity(input);
      res.json(community);
    } catch (error) {
      if (error.code === "23505") {
        next(
          new HttpExeception({
            statusCode: httpCode.BAD_REQUEST,
            errors: duplicationErrToFieldError(error.detail),
          })
        );
      }
      next();
    }
  };
  public static GetCommunity = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    let community = await service.getCommunity(req.params.name);
    if (community) {
      res.json(community);
    } else {
      next(
        new HttpExeception({
          statusCode: httpCode.NOT_FOUND,
          customErrMsg: "community does not exist",
        })
      );
    }
  };
  public static GetAllCommunities = async (_: Request, res: Response) => {
    let communities = await service.getAllCommunities();
    res.json(communities);
  };
}

export default CommunityController;
