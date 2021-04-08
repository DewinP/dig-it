import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import {
  useSubscribeMutation,
  useUnsubscribeMutation,
} from "../app/services/api";
import { ICommunity } from "../interfaces/interfaces";

interface SubscriptionButtonProps {
  community: ICommunity;
}

export const SubscriptionButton: React.FC<SubscriptionButtonProps> = ({
  community,
}) => {
  const [subscribe, { isLoading: subscribeIsLoading }] = useSubscribeMutation();
  const [
    unsubscribe,
    { isLoading: unsubscribeIsLoading },
  ] = useUnsubscribeMutation();
  const toast = useToast();
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef(null);

  if (community.isSubscribed) {
    return (
      <>
        <Button
          size="sm"
          isLoading={unsubscribeIsLoading}
          variant="ghost"
          onClick={() => setIsOpen(true)}
        >
          unsubscribe
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
  }
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
};
