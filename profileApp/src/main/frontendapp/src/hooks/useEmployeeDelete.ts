import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMessage } from "./useMessage";

type Props = {
  employeeNumber: number;
};

/**
 * 社員情報を削除するカスタムフック
 * @returns employeeDelete:社員情報削除処理 loading:処理中判定
 */
export const useEmployeeDelete = () => {
  const navigate = useNavigate();
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);

  const employeeDelete = async (props: Props) => {
    const { employeeNumber } = props;
    setLoading(true);
    await axios
      .delete(`/api/delete/${employeeNumber}`)
      .then(() => {
        showMessage({ title: "削除が完了しました", status: "success" });
        navigate("/home");
      })
      .catch(() => {
        showMessage({ title: "削除が出来ませんでした", status: "error" });
        setLoading(false);
      });
  };

  return { employeeDelete, loading };
};
