import { Center } from '@chakra-ui/react';

import Layout from '@/components/layout/Layout';

export default function NotFound() {
  return (
    <Layout>
      <main>
        <Center h='100vh' backgroundColor='white'>
          Not found..
        </Center>
      </main>
    </Layout>
  );
}
