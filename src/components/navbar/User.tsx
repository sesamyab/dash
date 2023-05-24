import { useAuth0 } from '@auth0/auth0-react';
import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export default function User() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const [name, setName] = useState('');
  const [picture, setPicture] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      setName(user?.name || '');
      setPicture(user?.picture || '');
    }
  }, [isAuthenticated, isLoading, user]);

  return (
    <Box>
      <Menu>
        <MenuButton as={Button} rounded='full' variant='link' cursor='pointer'>
          <Avatar name={name} src={picture} size='sm' />
        </MenuButton>
        <MenuList>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Settings</MenuItem>
          <MenuItem>Logout</MenuItem>
        </MenuList>
      </Menu>
    </Box>
  );
}
