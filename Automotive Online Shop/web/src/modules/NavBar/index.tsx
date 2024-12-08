import { Box, Flex, HStack, useColorModeValue } from '@chakra-ui/react';
import ReportsMenu from 'src/modules/ReportsMenu';
import Link from 'src/modules/Link';

type NavLink = {
  to: string;
  label: string;
};

type MenuItems = {
  to: string;
  label: string;
};

type NavBarProps = {
  logo: string;
  action: React.ReactNode;
  menuItems: MenuItems[];
  links: NavLink[];
};

const NavBar = ({ logo, links, action, menuItems }: NavBarProps) => {
  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <HStack spacing={8} alignItems={'center'}>
          <Box>{logo}</Box>
          <HStack as={'nav'} spacing={4} display="flex">
            {links.map((link) => (
              <Link {...link} />
            ))}
            <ReportsMenu items={menuItems} />
          </HStack>
        </HStack>
        <Flex alignItems={'center'}>{action}</Flex>
      </Flex>
    </Box>
  );
};

export default NavBar;
