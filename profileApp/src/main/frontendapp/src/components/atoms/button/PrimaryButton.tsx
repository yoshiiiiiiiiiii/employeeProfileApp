import { ReactNode } from "react";
import { FC, memo } from "react";
import { Button } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  onClick: any;
  onKeydown?: any;
};

export const PrimaryButton: FC<Props> = memo((props) => {
  const {
    children,
    disabled = false,
    loading = false,
    onClick,
    onKeydown,
  } = props;
  return (
    <Button
      bg={"teal.400"}
      color={"white"}
      _hover={{ opacity: 0.8 }}
      isDisabled={disabled || loading}
      isLoading={loading}
      onClick={onClick}
      onKeyDown={onKeydown}
    >
      {children}
    </Button>
  );
});
