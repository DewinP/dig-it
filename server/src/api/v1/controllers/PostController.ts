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
    let post = await service.getPostByTitle(
      req.params.title,
      req.session.user?.id
    );
    if (post) {
      res.json(post);
    } else {
      next(
        new HttpExeception({
          statusCode: httpCode.NOT_FOUND,
          customErrMsg: "post not found",
        })
      );
    }
  };

  public static LikePost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await service.likePost({
        userId: req.session.user!.id,
        postId: req.body.postId,
        communityId: req.body.communityId,
      });
      res.sendStatus(httpCode.SUCCESS_NO_CONTENT);
    } catch (error) {
      next();
    }
  };

  public static UnlikePost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await service.unlikePost(req.body.postId, req.session.user!.id);
      res.sendStatus(httpCode.SUCCESS_NO_CONTENT);
    } catch (error) {
      next();
    }
  };

  public static GetCommunityPosts = async (req: Request, res: Response) => {
    let posts = await service.getCommunityPosts(
      req.params.communityId,
      req.session.user?.id
    );
    res.json(posts);
  };

  public static GetAllPosts = async (req: Request, res: Response) => {
    let posts = await service.getAllPosts(req.session.user?.id);
    res.json(posts);
  };

  public static GetPostByUser = async (req: Request, res: Response) => {
    let posts = await service.getPostsByUser(
      req.params.username,
      req.session.user?.id
    );
    res.json(posts);
  };

  public static CreatePost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      let createdPostTitle = await service.createPost({
        authorId: req.session.user!.id,
        communityId: req.body.communityId,
        title: req.body.title,
        body: req.body.body,
      });
      let post = await service.getPostByTitle(createdPostTitle);
      console.log(post);
      res.json(post);
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
