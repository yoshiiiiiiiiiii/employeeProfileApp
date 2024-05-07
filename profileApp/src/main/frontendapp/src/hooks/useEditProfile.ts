import axios from "axios";
import { useState } from "react";
import { useMessage } from "./useMessage";
import { useNavigate } from "react-router-dom";

type Props = {
  imageFile: any;
  employeeNumber: number;
  employeeName: string;
  employeeFullName: string;
  hobbies: string;
};

/**
 * 社員情報を更新するカスタムフック
 * @returns updateProfile:社員情報更新処理 loading:処理中判定
 */
export const useEditProfile = () => {
  const navigate = useNavigate();
  const { showMessage } = useMessage();
  const [loading, setLoading] = useState(false);

  const updateProfile = async (props: Props) => {
    setLoading(true);
    const { imageFile, employeeNumber, employeeName, employeeFullName, hobbies } =
      props;
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("employeeNumber", employeeNumber.toString());
    formData.append("employeeName", employeeName);
    formData.append("employeeFullName", employeeFullName);
    formData.append("hobbies", hobbies);

    await axios
      .put("/api/updateProfile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        showMessage({ title: "更新が完了しました", status: "success" });
        navigate("/home/setting");
      })
      .catch(() => {
        showMessage({ title: "更新に失敗しました", status: "error" });
        setLoading(false);
      });
  };

  return { updateProfile, loading };
};
