import { Box, Button, Flex, Spacer } from '@chakra-ui/react';
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

  function handleCreate() {
    router.push(`/tenants/${tenantId}/applications/create`);
  }

  const applications = trpc.listApplications.useQuery({
    tenantId: getFirstQueryStringValue(tenantId) || '',
  });

  if (!applications.data) {
    return PageLoader();
  }

  return (
    <Layout>
      <Flex minWidth='max-content' alignItems='center' gap='2'>
        <Box>Applications</Box>
        <Spacer />
        <Button colorScheme='blue' onClick={handleCreate}>
          Create
        </Button>
      </Flex>
      <MyTable<Application>
        columns={COLUMNS}
        data={applications.data as Application[]}
      />
    </Layout>
  );
}
