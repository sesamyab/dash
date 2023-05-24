// import { useUser } from '@auth0/nextjs-auth0/client';
import { useAuth0 } from '@auth0/auth0-react';
import { Center, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import * as React from 'react';

import { getTenants } from '@/lib/api';

import Layout from '@/components/layout/Layout';

export default function HomePage() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const router = useRouter();

  React.useEffect(() => {
    if (isAuthenticated) {
      getAccessTokenSilently({})
        .then((token) => getTenants(token))
        .then((tenants) => {
          const [tenant] = tenants;
          router.push(`/tenants/${tenant.id}`);
        });
    }
  }, [isAuthenticated, getAccessTokenSilently, router]);

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
