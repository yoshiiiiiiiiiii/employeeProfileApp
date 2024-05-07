import { ReactNode } from "react";
import { FC, memo } from "react";
import { Header } from "../../organisms/layout/Header";
import { Footer } from "../../organisms/layout/Footer";

type Props = {
  children: ReactNode;
};

export const HeaderWithFooter: FC<Props> = memo((props) => {
  const { children } = props;
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
});
