import { useState } from "react";
import { z } from "zod";

type Props = {
  data: any;
  schema: z.ZodObject<any>;
};

/**
 * バリデーションチェック処理を行うカスタムフック
 * @returns validationCheck:バリデーションチェック処理 errorMessages:エラーメッセージ
 */
export const useValidateCheck = () => {
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const validationCheck = (props: Props) => {
    const { data, schema } = props;
    const result = schema.safeParse(data);
    if (result.success) {
      return true;
    } else {
      setErrorMessages(result.error.errors.map((error) => error.message));
    }
    return false;
  };

  return { validationCheck, errorMessages };
};
