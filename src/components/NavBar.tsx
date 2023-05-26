import {
  Box,
  Flex,
  useColorModeValue,
  HStack,
  useDisclosure,
  IconButton,
  Stack,
} from "@chakra-ui/react";
import { NavLink } from "./NavLink";
import { Hrefs, Links } from "../constants/Links";
import img from "../assets/logo.png";
import "../styles/NavBar.css";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            background={"#D44B26"}
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              <NavLink href={Hrefs.Home}>{Links.Home}</NavLink>
              <NavLink href={Hrefs.Clientes}>{Links.Clientes}</NavLink>
              <NavLink href={Hrefs.Restaurantes}>{Links.Restaurantes}</NavLink>
            </HStack>
          </HStack>
        </Flex>
        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <NavLink href={Hrefs.Home}>{Links.Home}</NavLink>
              <NavLink href={Hrefs.Clientes}>{Links.Clientes}</NavLink>
              <NavLink href={Hrefs.Restaurantes}>{Links.Restaurantes}</NavLink>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
