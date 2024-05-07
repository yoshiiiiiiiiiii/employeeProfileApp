import { useState } from "react";

import { Employee } from "../types/api/Employee";

type Props = {
  id: number;
  employees: Array<Employee>;
  onOpen: () => void;
};

/**
 * 選択した従業員情報を特定し、モーダルを表示するカスタムフック
 * @returns onSelectEmployee:モーダル表示処理 selectedEmployee:選択対象社員情報
 */
export const useSelectEmployee = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee>();

  const onSelectEmployee = (props: Props) => {
    const { id, employees, onOpen } = props;
    const targetEmployee = employees.find(
      (employee) => employee.employeeNumber === id
    );
    setSelectedEmployee(targetEmployee);
    onOpen();
  };

  return { onSelectEmployee, selectedEmployee };
};
