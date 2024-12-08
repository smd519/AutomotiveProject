// Always use this Link component since it correctly uses the router
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink, LinkProps as ChakraLinkProps } from '@chakra-ui/react';

type LinkProps = ChakraLinkProps & {
  to: string;
  label: string;
};

const Link = ({ to, label, ...rest }: LinkProps) => (
  <ChakraLink as={ReactRouterLink} to={to} {...rest}>
    {label}
  </ChakraLink>
);

export default Link;
