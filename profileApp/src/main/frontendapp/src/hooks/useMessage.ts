import { useToast } from "@chakra-ui/toast";

type Props = {
  title: string;
  status: "info" | "warning" | "success" | "error";
};

/**
 * メッセージを表示するカスタムフック
 * @returns showMessage:表示メッセージ
 */
export const useMessage = () => {
  const toast = useToast();

  const showMessage = (props: Props) => {
    const { title, status } = props;
    toast({
      position: "top",
      duration: 2000,
      isClosable: true,
      title,
      status,
    });
  };

  return { showMessage };
};
