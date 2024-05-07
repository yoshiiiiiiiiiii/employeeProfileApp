import axios from "axios";
import { useState } from "react";
import { Employee } from "../types/api/Employee";
import { useMessage } from "./useMessage";

/**
 * 全社員情報をリストで取得するカスタムフック
 * @returns getEmployees:社員情報取得処理 employees:社員情報リスト loading:処理中判定
 */
export const useAllEmployees = () => {
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState<Array<Employee>>([]);

  const getEmployees = async () => {
    setLoading(true);
    await axios
      .get("/api/getEmployeeInfoList")
      .then((res) => {
        setEmployees(res.data);
      })
      .catch(() => {
        showMessage({ title: "社員詳細情報の取得に失敗しました", status: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { getEmployees, employees, loading };
};
