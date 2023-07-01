import { useUser } from '@auth0/nextjs-auth0/client';
import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import * as React from 'react';

import LeftMenu from '@/components/leftMenu/LeftMenu';
import Navbar from '@/components/navbar/Navbar';
import PageLoader from '@/components/PageLoader';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { tenantId } = router.query;

  const { isLoading } = useUser();

  if (isLoading) {
    return (
      <div className='page-layout'>
        <PageLoader />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <Box className='flex'>
        {tenantId ? <LeftMenu /> : ''}
        <Box className='w-full p-6' backgroundColor='white' color='black'>
          {children}
        </Box>
      </Box>
    </>
  );
}
