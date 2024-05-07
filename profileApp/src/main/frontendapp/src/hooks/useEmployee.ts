import axios from "axios";
import { useState } from "react";
import { useMessage } from "./useMessage";
import { Employee } from "../types/api/Employee";

type Props = {
  employeeNumber: number;
};

/**
 * 社員情報を取得するカスタムフック
 * @returns getEmployee:社員情報取得処理 employee:取得した社員情報 load:処理中判定
 */
export const useEmployee = () => {
  const { showMessage } = useMessage();
  const [load, setLoad] = useState(false);
  const [employee, setEmployee] = useState<Employee>();

  const getEmployee = async (props: Props) => {
    const { employeeNumber } = props;
    setLoad(true);
    await axios
      .get("/api/getEmployeeInfo", {
        params: {
          employeeNumber,
        },
      })
      .then((res) => {
        setEmployee(res.data);
      })
      .catch(() => {
        showMessage({
          title: "社員情報の取得に失敗しました",
          status: "error",
        });
      })
      .finally(() => {
        setLoad(false);
      });
  };

  return { getEmployee, employee, load };
};
