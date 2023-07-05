import { Box, Button, Flex, Spacer } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { Column } from 'react-table';

import { Connection } from '@/lib/api';

import Layout from '@/components/layout/Layout';
import PageLoader from '@/components/PageLoader';
import MyTable from '@/components/table/Table';

import getFirstQueryStringValue from '@/utils/querystring';
import { trpc } from '@/utils/trpc';

const COLUMNS: Column<Connection>[] = [
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'ID',
    accessor: 'id',
  },
];

export default function Connections() {
  const router = useRouter();
  const { tenantId } = router.query;

  function handleCreate() {
    router.push(`/tenants/${tenantId}/connections/create`);
  }

  const connections = trpc.listConnections.useQuery({
    tenantId: getFirstQueryStringValue(tenantId) || '',
  });

  if (!connections.data) {
    return (
      <Layout>
        <PageLoader />
      </Layout>
    );
  }

  return (
    <Layout>
      <Flex minWidth='max-content' alignItems='center' gap='2'>
        <Box>Connections</Box>
        <Spacer />
        <Button colorScheme='blue' onClick={handleCreate}>
          Create
        </Button>
      </Flex>
      <MyTable<Connection>
        columns={COLUMNS}
        data={connections.data as Connection[]}
      />
    </Layout>
  );
}
