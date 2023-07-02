import { Box, Button, Flex, Spacer } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { CellProps } from 'react-table';

import { Application } from '@/lib/api';

import Layout from '@/components/layout/Layout';
import PageLoader from '@/components/PageLoader';
import MyTable, { DataType } from '@/components/table/Table';

import getFirstQueryStringValue from '@/utils/querystring';
import { trpc } from '@/utils/trpc';

const COLUMNS = [
  {
    Header: 'Name',
    accessor: 'name' as const,
  },
  {
    Header: 'Link',
    accessor: (data: DataType) =>
      `https://auth2.sesamy.dev/authorize?client_id=${data.id}&redirect_uri=https://auth2.sesamy.dev/profile&state=state&response_type=code`,
    Cell: ({ value }: CellProps<DataType, string>) => (
      <a href={value} target='_blank' rel='noopener noreferrer'>
        Open Link
      </a>
    ),
  },
  {
    Header: 'ID',
    accessor: 'id' as const,
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
