import { Box, Button, Flex, Spacer } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { Column } from 'react-table';

import { Migration } from '@/lib/api';

import Layout from '@/components/layout/Layout';
import PageLoader from '@/components/PageLoader';
import MyTable from '@/components/table/Table';

import getFirstQueryStringValue from '@/utils/querystring';
import { trpc } from '@/utils/trpc';

const COLUMNS: Column<Migration>[] = [
  {
    Header: 'Provider',
    accessor: 'provider',
  },
  {
    Header: 'ID',
    accessor: 'id',
  },
];

export default function Migrations() {
  const router = useRouter();
  const { tenantId } = router.query;

  function handleCreate() {
    router.push(`/tenants/${tenantId}/migrations/create`);
  }

  const migrations = trpc.listMigrations.useQuery({
    tenantId: getFirstQueryStringValue(tenantId) || '',
  });

  if (!migrations.data) {
    return (
      <Layout>
        <PageLoader />
      </Layout>
    );
  }

  return (
    <Layout>
      <Flex minWidth='max-content' alignItems='center' gap='2'>
        <Box>Migrations</Box>
        <Spacer />
        <Button colorScheme='blue' onClick={handleCreate}>
          Create
        </Button>
      </Flex>
      <MyTable<Migration>
        columns={COLUMNS}
        data={migrations.data as Migration[]}
      />
    </Layout>
  );
}
