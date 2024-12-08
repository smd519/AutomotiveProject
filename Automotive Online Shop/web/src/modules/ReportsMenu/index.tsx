import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import Link from 'src/modules/Link';
import { viewReportsLabel } from 'src/content.json';

const linkStyleProps = {
  display: 'block',
  width: '100%',
  height: '100%',
};

type MenuItems = {
  to: string;
  label: string;
};

type ReportsMenuProps = {
  items: MenuItems[];
};
const ReportsMenu = ({ items }: ReportsMenuProps) => {
  return (
    <Menu>
      <MenuButton>{viewReportsLabel}</MenuButton>
      <MenuList>
        {items.map((item, idx) => (
          <MenuItem key={idx}>
            <Link {...linkStyleProps} {...item} />
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
export default ReportsMenu;
