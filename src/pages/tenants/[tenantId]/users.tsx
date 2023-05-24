import { Box } from '@chakra-ui/react';
import React from 'react';

import Layout from '@/components/layout/Layout';
import MyTable from '@/components/table/Table';

interface Data {
  [key: string]: number | string;
  id: number;
  name: string;
  email: string;
}

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

const DATA: Data[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
];

export default function Tenant() {
  return (
    <Layout>
      <Box>Applications</Box>
      <MyTable<Data> columns={COLUMNS} data={DATA} />
    </Layout>
  );
}
