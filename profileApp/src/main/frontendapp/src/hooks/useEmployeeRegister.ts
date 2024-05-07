import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMessage } from "./useMessage";

type Props = {
  employeeNumber: string;
  employeeId: string;
  password: string;
  isAdmin: string;
};

/**
 * 社員情報を登録するカスタムフック
 * @returns employeeRegister:社員登録処理 loading:処理中判定
 */
export const useEmployeeRegister = () => {
  const navigate = useNavigate();
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);

  const employeeRegister = async (props: Props) => {
    const { employeeNumber, employeeId, password, isAdmin } = props;
    setLoading(true);
    await axios
      .post("/api/register", {
        employeeNumber,
        employeeId,
        password,
        isAdmin: parseInt(isAdmin),
      })
      .then(() => {
        showMessage({ title: "社員登録が完了しました", status: "success" });
        navigate("/home");
      })
      .catch(() => {
        showMessage({ title: "社員登録が出来ませんでした", status: "error" });
        setLoading(false);
      });
  };

  return { employeeRegister, loading };
};
