import { ChangeEvent, FC, memo, useState } from "react";
import {
  Box,
  Divider,
  Flex,
  Heading,
  Input,
  Stack,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";
import { z } from "zod";
import { useEmployeeRegister } from "../../hooks/useEmployeeRegister";
import { useValidateCheck } from "../../hooks/useValidateCheck";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { HeaderOnly } from "../templates/layout/HeaderOnly";

export const EmployeeResister: FC = memo(() => {
  const { employeeRegister, loading } = useEmployeeRegister();
  const { validationCheck, errorMessages } = useValidateCheck();
  const [employeeNumber, setEmployeeNumber] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState("0");

  //バリデーションチェック用スキーマ
  const schema = z.object({
    employeeNumber: z
      .string()
      .regex(/^[0-9]+$/, {
        message: "社員番号は半角数字である必要があります",
      })
      .regex(/^\S*$/, {
        message: "社員番号に空白文字を含めることはできません",
      }),
    employeeId: z.string().regex(/^\S*$/, {
      message: "社員IDに空白文字を含めることはできません",
    }),
    password: z
      .string()
      .min(6, "パスワードは6文字以上である必要があります")
      .max(12, "パスワードは12文字以下である必要があります")
      .regex(/^\S*$/, {
        message: "パスワードに空白文字を含めることはできません",
      }),
  });

  //バリデーションチェック用データ
  const data = {
    employeeNumber,
    employeeId,
    password,
  };

  const onChangeEmployeeNumber = (e: ChangeEvent<HTMLInputElement>) =>
    setEmployeeNumber(e.target.value);

  const onChangeEmployeeId = (e: ChangeEvent<HTMLInputElement>) =>
    setEmployeeId(e.target.value);

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  return (
    <HeaderOnly>
      <Flex align={"center"} justify={"center"} height={"100vh"}>
        <Box bg={"white"} w={"sm"} p={4} borderRadius={"md"} shadow={"md"}>
          <Heading as={"h1"} size={"lg"} textAlign={"center"}>
            社員登録
          </Heading>
          <Divider my={4} />
          <Stack spacing={6} py={10} px={10}>
            <Input
              placeholder="社員番号"
              type="text"
              value={employeeNumber}
              name="employeeNumber"
              onChange={onChangeEmployeeNumber}
            />
            <Input
              placeholder="社員ID"
              type="text"
              value={employeeId}
              name="employeeId"
              onChange={onChangeEmployeeId}
            />
            <Input
              placeholder="初期パスワード"
              type="password"
              value={password}
              name="password"
              onChange={onChangePassword}
            />
            {errorMessages.map((errorMessage, index) => (
              <span key={index} style={{ color: "red" }}>
                {errorMessage}
                <br />
              </span>
            ))}
            <RadioGroup onChange={(value) => setIsAdmin(value)} value={isAdmin}>
              <Stack direction="row">
                <Radio value="0">一般</Radio>
                <Radio value="1">管理者</Radio>
              </Stack>
            </RadioGroup>
            <PrimaryButton
              disabled={
                employeeNumber === "" || employeeId === "" || password === ""
              }
              loading={loading}
              onClick={() =>
                validationCheck({ data: data, schema: schema })
                  ? employeeRegister({
                      employeeNumber,
                      employeeId,
                      password,
                      isAdmin,
                    })
                  : null
              }
            >
              登録
            </PrimaryButton>
          </Stack>
        </Box>
      </Flex>
    </HeaderOnly>
  );
});
