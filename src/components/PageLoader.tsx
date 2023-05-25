import { Center, Spinner } from '@chakra-ui/react';

import Layout from '@/components/layout/Layout';

export default function PageLoader() {
  return (
    <Layout>
      <main>
        <Center h='100vh' backgroundColor='white'>
          <Spinner size='xl' color='black' speed='1s' />
        </Center>
      </main>
    </Layout>
  );
}
