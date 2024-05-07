import { FC, memo } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  cancelRef: any;
  onClick: any;
  headerChild: string;
  bodyChild: string;
  oncloseButtonChild: string;
  onclickButtonChild: string;
};

export const ConfigDialog: FC<Props> = memo((props) => {
  const {
    isOpen,
    onClose,
    cancelRef,
    onClick,
    headerChild,
    bodyChild,
    oncloseButtonChild,
    onclickButtonChild,
  } = props;

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {headerChild}
          </AlertDialogHeader>
          <AlertDialogBody>{bodyChild}</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              {oncloseButtonChild}
            </Button>
            <Button colorScheme="red" onClick={onClick} ml={3}>
              {onclickButtonChild}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
});
