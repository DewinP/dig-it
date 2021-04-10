import React from "react";
import {
  useLikePostMutation,
  useUnlikePostMutation,
} from "../app/services/api";
import { BsFillHeartFill, BsHeart } from "react-icons/bs";
import { IconButton } from "@chakra-ui/button";
import { Tooltip } from "@chakra-ui/react";

interface LikeButtonProps {
  postId: string;
  isLiked: boolean;
  communityId: string;
  likes?: number;
}

export const LikeButton: React.FC<LikeButtonProps> = ({
  postId,
  isLiked,
  communityId,
  likes,
}) => {
  let [likePost, { isLoading, isError }] = useLikePostMutation();
  let [unlikePost] = useUnlikePostMutation();
  if (isLiked) {
    return (
      <Tooltip hasArrow size="sm" label="unlike">
        <IconButton
          variant="ghost"
          colorScheme="teal"
          aria-label="Call Sage"
          fontSize="20px"
          icon={<BsFillHeartFill />}
          onClick={() => unlikePost(postId)}
        />
      </Tooltip>
    );
  }
  return (
    <Tooltip hasArrow size="sm" label="like">
      <IconButton
        variant="ghost"
        colorScheme="teal"
        aria-label="Call Sage"
        fontSize="20px"
        icon={<BsHeart />}
        onClick={() => likePost({ postId, communityId })}
      />
    </Tooltip>
  );
};
