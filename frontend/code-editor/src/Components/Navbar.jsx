import {
  Box,
  Flex,
  Avatar,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Heading,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import "@fontsource/titillium-web/400.css";
const NavLink = (props) => {
  const { children } = props;

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={"#"}
    >
      {children}
    </Box>
  );
};

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box
        bg={useColorModeValue("gray.100", "gray.900")}
        px={4}
        style={{ fontFamily: "Titillium Web" }}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <img
              src="download.jpg"
              width={"25%"}
              alt=""
              style={{ borderRadius: "20px" }}
            />
          </Box>
          <Box>
            <Heading>
              <span style={{ color: "teal" }}>C</span>ode{" "}
              <span style={{ color: "teal" }}>B</span>uddy
            </Heading>
            <Text>Your coding AI dost</Text>
          </Box>
          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
