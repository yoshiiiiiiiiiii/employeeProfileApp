import { useCallback, useEffect } from "react";
import { FC, memo } from "react";
import {
  Center,
  Spinner,
  Wrap,
  WrapItem,
  useDisclosure,
} from "@chakra-ui/react";

import { EmployeeCard } from "../organisms/employee/EmployeeCard";
import { useAllEmployees } from "../../hooks/useAllEmployees";
import { useSelectEmployee } from "../../hooks/useSelectEmployee";
import { HeaderOnly } from "../templates/layout/HeaderOnly";
import { EmployeeDetailModal } from "../organisms/employee/EmployeeDetailModal";
import { useSelector } from "react-redux";

export const EmployeeInfoList: FC = memo(() => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { getEmployees, employees, loading } = useAllEmployees();
  const { onSelectEmployee, selectedEmployee } = useSelectEmployee();
  const employeeNumber = useSelector(
    (state: any) => state.employeeStatus.employeeNumber
  );
  const isAdmin = useSelector((state: any) => state.admin.isAdmin);

  useEffect(() => {
    getEmployees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClickEmployee = useCallback(
    (id: number) => {
      onSelectEmployee({ id, employees, onOpen });
    },
    [employees, onOpen, onSelectEmployee]
  );

  return (
    <>
      <HeaderOnly children={""} />
      {loading ? (
        <Center>
          <Spinner />
        </Center>
      ) : (
        <Wrap p={{ base: 4, md: 10 }}>
          {employees.map((employee) => (
            <WrapItem key={employee.employeeNumber} mx={"auto"}>
              <EmployeeCard
                id={employee.employeeNumber}
                image={employee.image}
                employeeName={employee.employeeName}
                fullName={employee.employeeFullName}
                onClick={onClickEmployee}
              />
            </WrapItem>
          ))}
        </Wrap>
      )}
      <EmployeeDetailModal
        employee={selectedEmployee!}
        isOpen={isOpen}
        onClose={onClose}
        id={employeeNumber}
        isAdmin={isAdmin}
      />
    </>
  );
});
