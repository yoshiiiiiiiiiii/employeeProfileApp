import { ChangeEvent, FC, memo, useState } from "react";
import { HeaderOnly } from "../templates/layout/HeaderOnly";
import { Box, Divider, Flex, Heading, Input, Stack } from "@chakra-ui/react";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { useEditPassword } from "../../hooks/useEditPassword";
import { useValidateCheck } from "../../hooks/useValidateCheck";
import { z } from "zod";
import { useSelector } from "react-redux";

export const EditPassword: FC = memo(() => {
  const { editPassword, loading } = useEditPassword();
  const { validationCheck, errorMessages } = useValidateCheck();
  const employeeNumber = useSelector(
    (state: any) => state.employeeStatus.employeeNumber
  );
  const employeeId = useSelector(
    (state: any) => state.employeeStatus.employeeId
  );
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  //バリデーションチェック用スキーマ
  const schema = z.object({
    newPassword: z
      .string()
      .min(6, "パスワードは6文字以上である必要があります")
      .max(12, "パスワードは12文字以下である必要があります")
      .regex(/^\S*$/, {
        message: "パスワードに空白文字を含めることはできません",
      }),
  });

  //バリデーションチェック用データ
  const data = {
    newPassword,
  };

  const onChangeOldPassword = (e: ChangeEvent<HTMLInputElement>) =>
    setOldPassword(e.target.value);

  const onChangeNewPassword = (e: ChangeEvent<HTMLInputElement>) =>
    setNewPassword(e.target.value);

  return (
    <HeaderOnly>
      <Flex align={"center"} justify={"center"} height={"100vh"}>
        <Box bg={"white"} w={"sm"} p={4} borderRadius={"md"} shadow={"md"}>
          <Heading as={"h1"} size={"lg"} textAlign={"center"}>
            パスワード再設定
          </Heading>
          <Divider my={4} />
          <Stack spacing={6} py={10} px={10}>
            <Input
              placeholder="社員番号"
              type="text"
              value={employeeNumber}
              name="employeeNumber"
              readOnly={true}
            />
            <Input
              placeholder="社員ID"
              type="text"
              value={employeeId}
              name="employeeId"
              readOnly={true}
            />
            <Input
              placeholder="旧パスワード"
              type="password"
              value={oldPassword}
              name="oldPassword"
              onChange={onChangeOldPassword}
            />
            <Input
              placeholder="新規パスワード"
              type="password"
              value={newPassword}
              name="newPassword"
              onChange={onChangeNewPassword}
            />
            {errorMessages.map((errorMessage, index) => (
              <span key={index} style={{ color: "red" }}>
                {errorMessage}
                <br />
              </span>
            ))}
            <PrimaryButton
              disabled={oldPassword === "" || newPassword === ""}
              loading={loading}
              onClick={() =>
                validationCheck({ data, schema })
                  ? editPassword({
                      employeeNumber,
                      employeeId,
                      oldPassword,
                      newPassword,
                    })
                  : null
              }
            >
              再設定
            </PrimaryButton>
          </Stack>
        </Box>
      </Flex>
    </HeaderOnly>
  );
});
