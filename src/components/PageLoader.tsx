import { Center, Spinner } from '@chakra-ui/react';

export default function PageLoader() {
  return (
    <Center h='100vh' backgroundColor='white'>
      <Spinner size='xl' color='black' speed='1s' />
    </Center>
  );
}
