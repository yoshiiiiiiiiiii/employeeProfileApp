import { ChangeEvent, FC, memo, useEffect, useState } from "react";
import { HeaderOnly } from "../templates/layout/HeaderOnly";
import {
  Box,
  Divider,
  Flex,
  Heading,
  Input,
  Stack,
  Image,
  ButtonGroup,
  FormLabel,
  VisuallyHiddenInput,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { useEditProfile } from "../../hooks/useEditProfile";
import { useNavigate } from "react-router-dom";
import { useEmployee } from "../../hooks/useEmployee";
import { useSelector } from "react-redux";

export const EditProfile: FC = memo(() => {
  const navigate = useNavigate();
  const { updateProfile, loading } = useEditProfile();
  const { getEmployee, employee, load } = useEmployee();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [employeeName, setEmployeeName] = useState<string | undefined>("");
  const [employeeFullName, setEmployeeFullName] = useState<string | undefined>(
    ""
  );
  const [hobbies, setHobbies] = useState<string | undefined>("");
  const [image, setImage] = useState<string | undefined>("");
  const employeeNumber = useSelector(
    (state: any) => state.employeeStatus.employeeNumber
  );
  const employeeId = useSelector(
    (state: any) => state.employeeStatus.employeeId
  );

  useEffect(() => {
    getEmployee({ employeeNumber });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setEmployeeName(employee?.employeeName);
    setEmployeeFullName(employee?.employeeFullName);
    setHobbies(employee?.hobbies);
    setImage(employee?.image);
  }, [employee]);

  const onChangeEmployeeName = (e: ChangeEvent<HTMLInputElement>) =>
    setEmployeeName(e.target.value);

  const onChangeEmployeeFullName = (e: ChangeEvent<HTMLInputElement>) =>
    setEmployeeFullName(e.target.value);

  const onChangeHobbies = (e: ChangeEvent<HTMLInputElement>) =>
    setHobbies(e.target.value);

  const handleCancelButton = () => {
    navigate("/home/setting");
  };

  //画像のプレビュー表示
  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <HeaderOnly>
      <>
        {load ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <Flex align={"center"} justify={"center"} height={"120vh"}>
            <Box bg={"white"} w={"sm"} p={4} borderRadius={"md"} shadow={"md"}>
              <Heading as={"h1"} size={"lg"} textAlign={"center"}>
                プロフィール編集
              </Heading>
              <Divider my={4} />
              <Stack spacing={6} py={10} px={10}>
                {previewUrl !== "" ? (
                  <Image
                    borderRadius={"full"}
                    boxSize={"160px"}
                    src={previewUrl}
                    alt="画像"
                    m={"auto"}
                    bg={"gray.100"}
                    textAlign={"center"}
                  />
                ) : (
                  <Image
                    borderRadius={"full"}
                    boxSize={"160px"}
                    src={`data:image/jpeg;base64,${image}`}
                    alt="画像"
                    m={"auto"}
                    bg={"gray.100"}
                    textAlign={"center"}
                  />
                )}
                <FormLabel
                  htmlFor="image_uploads"
                  border={"solid"}
                  _hover={{ cursor: "pointer", opacity: 0.8 }}
                  textAlign={"center"}
                >
                  アップロード画像を選択
                </FormLabel>
                <VisuallyHiddenInput
                  type="file"
                  id="image_uploads"
                  padding={"5px"}
                  accept="image/*"
                  onChange={handleFileChange}
                  multiple
                ></VisuallyHiddenInput>
                <Input
                  placeholder="社員番号"
                  type="text"
                  value={employeeNumber}
                  name="employeeNumber"
                  readOnly={true}
                />
                <Input
                  placeholder="社員ID"
                  type="text"
                  value={employeeId}
                  name="employeeId"
                  readOnly={true}
                />
                <Input
                  placeholder="ニックネーム"
                  type="text"
                  value={employeeName}
                  name="employeeName"
                  onChange={onChangeEmployeeName}
                />
                <Input
                  placeholder="フルネーム"
                  type="text"
                  value={employeeFullName}
                  name="employeeFullName"
                  onChange={onChangeEmployeeFullName}
                />
                <Input
                  placeholder="趣味"
                  type="text"
                  value={hobbies}
                  name="hobbies"
                  onChange={onChangeHobbies}
                />
                <Flex>
                  <ButtonGroup gap="2" spacing="20">
                    <PrimaryButton onClick={handleCancelButton}>
                      キャンセル
                    </PrimaryButton>
                    <PrimaryButton
                      loading={loading}
                      onClick={() =>
                        updateProfile({
                          imageFile: selectedFile,
                          employeeNumber: employeeNumber,
                          employeeName: employeeName!,
                          employeeFullName: employeeFullName!,
                          hobbies: hobbies!,
                        })
                      }
                    >
                      更新
                    </PrimaryButton>
                  </ButtonGroup>
                </Flex>
              </Stack>
            </Box>
          </Flex>
        )}
      </>
    </HeaderOnly>
  );
});
