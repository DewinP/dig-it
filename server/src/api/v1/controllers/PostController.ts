import { NextFunction, Request, Response } from "express";
import { PostService } from "../services/posts/post.service";
import { httpCode } from "../common/http-code.enum";
import HttpExeception from "../common/http-exception";
import duplicationErrToFieldError from "../helpers/duplicationErrToFieldError";

const service = new PostService();
class PostController {
  public static GetPostByTitle = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    let post = await service.getPostByTitle(req.params.title);
    if (post) {
      res.json({ post });
    } else {
      next(
        new HttpExeception({
          statusCode: httpCode.NOT_FOUND,
          customErrMsg: "post not found",
        })
      );
    }
  };

  public static GetCommunityPosts = async (req: Request, res: Response) => {
    let posts = await service.getCommunityPosts(req.params.communityId);
    res.json({ posts });
  };

  public static GetAllPosts = async (_: Request, res: Response) => {
    let posts = await service.getAllPosts();
    res.json({ posts });
  };

  public static GetPostByUser = async (req: Request, res: Response) => {
    let posts = await service.getPostsByUser(req.params.username);
    res.json({ posts });
  };

  public static CreatePost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await service.createPost(req.body);
      res.sendStatus(httpCode.SUCCESS_NO_CONTENT);
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
}

export default PostController;
