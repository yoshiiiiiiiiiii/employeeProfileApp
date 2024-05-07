import { FC, memo } from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
} from "@chakra-ui/react";

type Props = {
  onClose: () => void;
  isOpen: boolean;
  onClickHome: () => void;
  onClickEmployeeInfoList: () => void;
  onClickSetting: () => void;
  onClickEmployeeResister: () => void;
  onclickLogout: () => void;
  isAdmin: number;
};

export const MenuDrawer: FC<Props> = memo((props) => {
  const {
    onClose,
    isOpen,
    onClickHome,
    onClickEmployeeInfoList,
    onClickSetting,
    onClickEmployeeResister,
    onclickLogout,
    isAdmin,
  } = props;
  return (
    <Drawer placement="right" size={"xs"} isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerBody padding={0} bg={"gray.100"}>
            <Button w={"100%"} onClick={onClickHome}>
              TOP
            </Button>
            <Button w={"100%"} onClick={onClickEmployeeInfoList}>
              社員一覧
            </Button>
            <Button w={"100%"} onClick={onClickSetting}>
              設定
            </Button>
            {isAdmin === 1 ? (
              <Button w={"100%"} onClick={onClickEmployeeResister}>
                社員登録
              </Button>
            ) : null}
            <Button w={"100%"} onClick={onclickLogout}>
              ログアウト
            </Button>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
});
