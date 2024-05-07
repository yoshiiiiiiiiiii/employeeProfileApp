import { useCallback, useRef } from "react";
import { Box, Flex, Heading, Link, useDisclosure } from "@chakra-ui/react";
import { FC, memo } from "react";

import { MenuIconButton } from "../../atoms/button/MenuIconButton";
import { MenuDrawer } from "../../molecules/MenuDrawer";
import { useNavigate } from "react-router";
import { ConfigDialog } from "../../molecules/ConfigDialog";
import { useSelector } from "react-redux";

export const Header: FC = memo(() => {
  const isAdmin = useSelector((state: any) => state.admin.isAdmin);
  const menuDrawerDisclosure = useDisclosure();
  const logoutDisclosure = useDisclosure();
  const cancelRef = useRef();

  const navigation = useNavigate();

  const onClickHome = useCallback(() => navigation("/home/"), [navigation]);
  const onClickEmployeeInfoList = useCallback(
    () => navigation("/home/employeeInfoList"),
    [navigation]
  );
  const onClickSetting = useCallback(
    () => navigation("/home/setting"),
    [navigation]
  );
  const onClickEmployeeResister = useCallback(
    () => navigation("/home/resister"),
    [navigation]
  );

  return (
    <>
      <Flex
        as="nav"
        bg="teal.500"
        color="gray.50"
        align="center"
        justify="space-between"
        padding={{ base: 3, md: 5 }}
      >
        <Flex
          align="center"
          as="a"
          mr={8}
          _hover={{ cursor: "pointer" }}
          onClick={onClickHome}
        >
          <Heading as="h1" fontSize={{ base: "md", md: "lg" }}>
            社員プロフィール閲覧アプリ
          </Heading>
        </Flex>
        <Flex
          align="center"
          fontSize="sm"
          flexGrow={2}
          display={{ base: "none", md: "flex" }}
        >
          <Box pr={4}>
            <Link onClick={onClickEmployeeInfoList}>社員一覧</Link>
          </Box>
          <Box pr={4}>
            <Link onClick={onClickSetting}>設定</Link>
          </Box>
          {isAdmin === 1 ? (
            <Box pr={4}>
              <Link onClick={onClickEmployeeResister}>社員登録</Link>
            </Box>
          ) : null}
          <Link onClick={logoutDisclosure.onOpen}>ログアウト</Link>
          <ConfigDialog
            isOpen={logoutDisclosure.isOpen}
            onClose={logoutDisclosure.onClose}
            cancelRef={cancelRef}
            onClick={() => navigation("/")}
            headerChild={"ログアウト"}
            bodyChild={"ログアウトしますか？"}
            oncloseButtonChild={"いいえ"}
            onclickButtonChild={"はい"}
          />
        </Flex>
        <MenuIconButton onOpen={menuDrawerDisclosure.onOpen} />
      </Flex>
      <MenuDrawer
        onClose={menuDrawerDisclosure.onClose}
        isOpen={menuDrawerDisclosure.isOpen}
        onClickHome={onClickHome}
        onClickEmployeeInfoList={onClickEmployeeInfoList}
        onClickSetting={onClickSetting}
        onClickEmployeeResister={onClickEmployeeResister}
        onclickLogout={logoutDisclosure.onOpen}
        isAdmin={isAdmin}
      />
    </>
  );
});
