import { FC, memo } from "react";
import { HeaderOnly } from "../templates/layout/HeaderOnly";
import { Box, Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router";

export const Setting: FC = memo(() => {
  const navigation = useNavigate();
  const handleEditProfile = () => navigation("/home/setting/editProfile");
  const handleEditPassword = () => navigation("/home/setting/editPassword");
  return (
    <HeaderOnly>
      <Flex align="center" fontSize="sm" flexGrow={2}>
        <Box pr={4} paddingTop={4}>
          <Button
            bg={"blue.200"}
            _hover={{ opacity: 0.8 }}
            onClick={handleEditProfile}
          >
            社員情報編集
          </Button>
        </Box>
        <Box pr={4} paddingTop={4}>
          <Button
            bg={"blue.200"}
            _hover={{ opacity: 0.8 }}
            onClick={handleEditPassword}
          >
            パスワード再設定
          </Button>
        </Box>
      </Flex>
    </HeaderOnly>
  );
});
