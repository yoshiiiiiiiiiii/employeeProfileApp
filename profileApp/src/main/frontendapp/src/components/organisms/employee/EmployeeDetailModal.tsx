import { FC, memo, useRef } from "react";
import {
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { Employee } from "../../../types/api/Employee";
import { PrimaryButton } from "../../atoms/button/PrimaryButton";
import { useEmployeeDelete } from "../../../hooks/useEmployeeDelete";
import { ConfigDialog } from "../../molecules/ConfigDialog";

type Props = {
  employee: Employee;
  isOpen: boolean;
  onClose: () => void;
  id: number;
  isAdmin: number;
};

export const EmployeeDetailModal: FC<Props> = memo((props) => {
  const { employee, isOpen, onClose, id, isAdmin } = props;
  const { employeeDelete, loading } = useEmployeeDelete();
  const disclosure = useDisclosure();
  const cancelRef = useRef();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      autoFocus={false}
      motionPreset="slideInBottom"
    >
      <ModalOverlay>
        <ModalContent padding={6}>
          <ModalHeader>社員詳細</ModalHeader>
          <ModalCloseButton />
          <ModalBody mx={4}>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>社員番号</FormLabel>
                <Input value={employee?.employeeNumber} isReadOnly />
                <FormLabel>社員ID</FormLabel>
                <Input value={employee?.employeeId} isReadOnly />
                <FormLabel>ニックネーム</FormLabel>
                <Input value={employee?.employeeName} isReadOnly />
                <FormControl>
                  <FormLabel>フルネーム</FormLabel>
                  <Input value={employee?.employeeFullName} isReadOnly />
                </FormControl>
                <FormControl>
                  <FormLabel>趣味</FormLabel>
                  <Input value={employee?.hobbies} isReadOnly />
                </FormControl>
              </FormControl>
            </Stack>
            {isAdmin === 1 && id !== employee?.employeeNumber ? (
              <PrimaryButton
                children={"削除"}
                loading={loading}
                onClick={disclosure.onOpen}
              />
            ) : null}
            <ConfigDialog
              isOpen={disclosure.isOpen}
              onClose={disclosure.onClose}
              cancelRef={cancelRef}
              onClick={() => {
                employeeDelete({ employeeNumber: employee.employeeNumber });
              }}
              headerChild={"社員情報削除"}
              bodyChild={"社員情報を削除しますか？"}
              oncloseButtonChild={"いいえ"}
              onclickButtonChild={"はい"}
            />
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
});
