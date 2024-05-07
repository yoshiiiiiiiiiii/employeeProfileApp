import { useMessage } from "./useMessage";
import { useState } from "react";
import axios from "axios";

type Props = {
  employeeNumber: number;
  employeeId: string;
  oldPassword: string;
  newPassword: string;
};

/**
 * パスワード再設定処理関数
 * @returns editPassword:パスワード再設定処理 loading:処理中判定
 */
export const useEditPassword = () => {
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);

  const editPassword = async (props: Props) => {
    const { employeeNumber, employeeId, oldPassword, newPassword } = props;
    setLoading(true);
    await axios
      .put("/api/updatePassword", {
        employeeNumber,
        employeeId,
        oldPassword,
        newPassword,
      })
      .then(() => {
        showMessage({
          title: "パスワードの再設定が完了しました",
          status: "success",
        });
        setLoading(false);
      })
      .catch(() => {
        showMessage({
          title:
            "パスワードの再設定が出来ませんでした。旧パスワードが間違っています",
          status: "error",
        });
        setLoading(false);
      });
  };

  return { editPassword, loading };
};
