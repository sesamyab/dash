import { Box } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import Layout from '@/components/layout/Layout';

export default function Tenant() {
  const router = useRouter();
  const { tenantId } = router.query;

  return (
    <Layout>
      <main>
        <Box>Dashboard</Box>
        <Link href={`/tenants/${tenantId}/applications`}>Applications</Link>
        <Link href={`/tenants/${tenantId}/users`}>Users</Link>
      </main>
    </Layout>
  );
}
