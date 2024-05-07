import { ReactNode } from "react";
import { FC, memo } from "react";
import { Header } from "../../organisms/layout/Header";

type Props = {
  children: ReactNode;
};

export const HeaderOnly: FC<Props> = memo((props) => {
  const { children } = props;
  return (
    <>
      <Header />
      {children}
    </>
  );
});
