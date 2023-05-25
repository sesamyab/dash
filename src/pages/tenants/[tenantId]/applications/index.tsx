import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

import { Application } from '@/lib/api';

import Layout from '@/components/layout/Layout';
import PageLoader from '@/components/PageLoader';
import MyTable from '@/components/table/Table';

import getFirstQueryStringValue from '@/utils/querystring';
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
];

export default function Applications() {
  const router = useRouter();
  const { tenantId } = router.query;

  const applications = trpc.listApplications.useQuery({
    tenantId: getFirstQueryStringValue(tenantId) || '',
  });

  if (!applications.data) {
    return PageLoader();
  }

  return (
    <Layout>
      <Box>Applications</Box>
      <MyTable<Application>
        columns={COLUMNS}
        data={applications.data as Application[]}
      />
    </Layout>
  );
}
