import { FC, memo } from "react";
import { HeaderWithFooter } from "../templates/layout/HeaderWithFooter";

export const Home: FC = memo(() => {
  return (
    <HeaderWithFooter>
      <h1>HOME</h1>
    </HeaderWithFooter>
  );
});
