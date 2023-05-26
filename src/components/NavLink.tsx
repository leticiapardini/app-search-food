import { Link, useColorModeValue } from "@chakra-ui/react";
import { ReactNode } from "react";

export const NavLink = ({ children, href}: { children: ReactNode, href: string }) => {
  console.log(children)
  return (
    <Link
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      href={href}>
      {children}
    </Link>
  );
}