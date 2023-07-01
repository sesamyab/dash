import { useUser } from '@auth0/nextjs-auth0/client';
import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';

function handleLogout() {
  window.location.href = '/api/auth/logout';
}

export default function User() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <Box>
      <Menu>
        <MenuButton as={Button} rounded='full' variant='link' cursor='pointer'>
          <Avatar name={user?.name || ''} src={user?.picture || ''} size='sm' />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={handleLogout}> Logout</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
}
