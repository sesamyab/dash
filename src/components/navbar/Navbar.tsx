import { Box, Divider, Flex, Input, Spacer, Text } from '@chakra-ui/react';

import TenantSelector from '@/components/navbar/TenantSelector';
import User from '@/components/navbar/User';

export default function Navbar() {
  return (
    <Flex height='50px' alignItems='center' gap='3' ml={5} mr={5} mt={2} mb={2}>
      <Box>
        <Text>Auth2</Text>
      </Box>
      <Divider orientation='vertical' />
      <Box>
        <TenantSelector />
      </Box>
      <Spacer />
      <Box>
        <Input placeholder='Search...' backgroundColor='white' color='black' />
      </Box>
      <Box>
        <User />
      </Box>
    </Flex>
  );
}
