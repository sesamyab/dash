import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

import { User } from '@/lib/api';

import Layout from '@/components/layout/Layout';
import PageLoader from '@/components/PageLoader';
import MyTable from '@/components/table/Table';

import { trpc } from '@/utils/trpc';

const COLUMNS = [
  {
    Header: 'ID',
    accessor: 'id' as const,
  },
  {
    Header: 'Name',
    accessor: 'name' as const,
  },
  {
    Header: 'Email',
    accessor: 'email' as const,
  },
];

export default function Users() {
  const router = useRouter();
  const { tenantId } = router.query;

  if (typeof tenantId !== 'string') {
    return (
      <Layout>
        <PageLoader />
      </Layout>
    );
  }
  const users = trpc.users.useQuery({ tenantId });

  if (!users.data) {
    return (
      <Layout>
        <PageLoader />
      </Layout>
    );
  }

  return (
    <Layout>
      <Box>Users</Box>
      <MyTable<User> columns={COLUMNS} data={users.data as User[]} />
    </Layout>
  );
}
