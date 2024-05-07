import { Center } from "@chakra-ui/react";
import { FC, memo } from "react";

export const Footer: FC = memo(() => {
  return (
    <>
      <Center
        as="nav"
        bg="teal.500"
        color="gray.50"
        padding={{ base: 3, md: 5 }}
        position={"fixed"}
        bottom={0}
        width={"100%"}
      >
        &copy; 2024 yoshinari INC.
      </Center>
    </>
  );
});
