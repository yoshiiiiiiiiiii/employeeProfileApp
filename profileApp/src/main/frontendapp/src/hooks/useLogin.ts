import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMessage } from "./useMessage";
import { useDispatch } from "react-redux";
import { loginAction } from "../contexts/actions/LoginAction";
import { adminAction, notAdminAction } from "../contexts/actions/AdminAction";
import { employeeNumberAction } from "../contexts/actions/EmployeeNumberAction";
import { employeeIdAction } from "../contexts/actions/EmployeeIdAction";

type Props = {
  employeeId: string;
  password: string;
};

/**
 * ログイン情報を受け取り、ログイン判定結果を返すカスタムフック
 * @returns login:ログイン処理 loading:処理中判定
 */
export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);

  const login = async (props: Props) => {
    const { employeeId, password } = props;
    setLoading(true);
    await axios
      .post("/api/login", {
        employeeId,
        password,
      })
      .then((res) => {
        //ログイン
        dispatch(employeeNumberAction(res.data.employeeNumber)); //社員番号を保持しておく
        dispatch(employeeIdAction(res.data.employeeId)); //社員IDを保持しておく
        res.data.isAdmin === "ADMIN"
          ? dispatch(adminAction())
          : dispatch(notAdminAction()); //管理者判定結果を保持しておく
        dispatch(loginAction()); //ログイン判定結果を保持しておく
        showMessage({ title: "ログインしました", status: "success" });
        navigate("/home");
      })
      .catch((e) => {
        showMessage({ title: "ユーザーが見つかりません", status: "error" });
        setLoading(false);
      });
  };

  return { login, loading };
};
