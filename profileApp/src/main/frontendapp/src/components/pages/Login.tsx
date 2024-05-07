import { ChangeEvent, FC, memo, useState } from "react";
import { Box, Divider, Flex, Heading, Input, Stack } from "@chakra-ui/react";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { useLogin } from "../../hooks/useLogin";

export const Login: FC = memo(() => {
  const { login, loading } = useLogin();
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmployeeId = (e: ChangeEvent<HTMLInputElement>) =>
    setEmployeeId(e.target.value);

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.nativeEvent.isComposing ||
      e.key !== "Enter" ||
      employeeId === "" ||
      password === ""
    )
      return;
    login({ employeeId: employeeId, password: password });
  };

  return (
    <Flex align={"center"} justify={"center"} height={"100vh"}>
      <Box bg={"white"} w={"sm"} p={4} borderRadius={"md"} shadow={"md"}>
        <Heading as={"h1"} size={"lg"} textAlign={"center"}>
          社員プロフィール閲覧アプリ
        </Heading>
        <Divider my={4} />
        <Stack spacing={6} py={10} px={10}>
          <Input
            placeholder="社員ID"
            type="text"
            value={employeeId}
            name="employeeId"
            onChange={onChangeEmployeeId}
            onKeyDown={handleKeyDown}
          />
          <Input
            placeholder="パスワード"
            type="password"
            value={password}
            name="password"
            onChange={onChangePassword}
            onKeyDown={handleKeyDown}
          />
          <PrimaryButton
            disabled={employeeId === "" || password === ""}
            loading={loading}
            onClick={() =>
              login({ employeeId: employeeId, password: password })
            }
          >
            ログイン
          </PrimaryButton>
        </Stack>
      </Box>
    </Flex>
  );
});
