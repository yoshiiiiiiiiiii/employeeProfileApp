import { FC, memo } from "react";
import { Box, Stack, Text, Image } from "@chakra-ui/react";

type Props = {
  id: number;
  image: string;
  employeeName: string;
  fullName: string;
  onClick: (id: number) => void;
};

export const EmployeeCard: FC<Props> = memo((props) => {
  const { id, image, employeeName, fullName, onClick } = props;
  return (
    <Box
      w={"260px"}
      h={"260px"}
      bg={"white"}
      borderRadius={"10px"}
      shadow={"md"}
      p={4}
      _hover={{ cursor: "pointer", opacity: 0.8 }}
      onClick={() => onClick(id)}
    >
      <Stack textAlign={"center"}>
        <Image
          borderRadius={"full"}
          boxSize={"160px"}
          src={`data:image/jpeg;base64,${image}`}
          alt="画像"
          m={"auto"}
          bg={"gray.100"}
        />
        <Text fontSize={"lg"} fontWeight={"bold"}>
          {employeeName}
        </Text>
        <Text fontSize={"sm"} color={"gray"}>
          {fullName}
        </Text>
      </Stack>
    </Box>
  );
});
