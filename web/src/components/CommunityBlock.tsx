import {
  Flex,
  Stack,
  Text,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { ICommunity } from "../interfaces/interfaces";

import { useAppSelector } from "../app/hooks";
import { selectCurrentUser } from "../app/services/auth.slice";
import { Link, NavLink } from "react-router-dom";
import {
  useSubscribeMutation,
  useUnsubscribeMutation,
} from "../app/services/api";

interface CommunityBlockProps {
  community: ICommunity;
  userId?: string;
}
export const CommunityBlock: React.FC<CommunityBlockProps> = ({
  community,
}) => {
  const { user } = useAppSelector(selectCurrentUser);

  const [
    subscribe,
    { isLoading: subscribeIsLoading, isSuccess },
  ] = useSubscribeMutation();
  const [
    unsubscribe,
    { isLoading: unsubscribeIsLoading },
  ] = useUnsubscribeMutation();
  const toast = useToast();
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef(null);
  const SubscribeButton = () => {
    let isSubscribed = user.subscriptions?.find(
      (subscription) => subscription.communityId === community.id
    );
    if (isSubscribed) {
      return (
        <>
          <Button
            size="sm"
            isLoading={unsubscribeIsLoading}
            variant="ghost"
            onClick={() => setIsOpen(true)}
          >
            subscribed
          </Button>
          <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  unsubscribe
                </AlertDialogHeader>
                <AlertDialogBody>
                  Unsubscribe from {community.name}?
                </AlertDialogBody>
                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button
                    colorScheme="red"
                    type="submit"
                    onClick={() =>
                      unsubscribe(community.id)
                        .unwrap()
                        .then(() => {
                          toast({
                            title: `left ${community.name.toUpperCase()}`,
                            status: "info",
                            isClosable: true,
                            duration: 3000,
                          });
                          onClose();
                        })
                    }
                    ml={3}
                  >
                    Unsubscribe
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </>
      );
    } else {
      return (
        <Button
          size="sm"
          colorScheme="pink"
          isLoading={subscribeIsLoading}
          onClick={() => {
            subscribe(community.id)
              .unwrap()
              .then(() =>
                toast({
                  title: `Subscribed to ${community.name.toUpperCase()}`,
                  status: "success",
                  isClosable: true,
                  duration: 2000,
                })
              );
          }}
        >
          subscribe
        </Button>
      );
    }
  };

  return (
    <Flex
      boxShadow="0px 0px 8px -6px black"
      h="100px"
      justify="space-between"
      p="10px"
    >
      <Stack>
        <Text
          fontSize="18px"
          as={Link}
          to={`/c/${community.name}`}
          fontWeight="semibold"
        >
          c/{community.name}
        </Text>

        <Text fontSize="15px">{community.description}</Text>
      </Stack>
      <Flex>
        <Flex justify="center" align="center">
          <Stack spacing={0} maxW="100px" justify="center" align="center">
            {user && <SubscribeButton />}
          </Stack>
        </Flex>
      </Flex>
    </Flex>
  );
};
