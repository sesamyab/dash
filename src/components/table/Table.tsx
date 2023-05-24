import { Box, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { Column, Row, useTable } from 'react-table';

interface TableProps<T extends Record<string, unknown>> {
  columns: Column<T>[];
  data: T[];
}

function MyTable<T extends Record<string, unknown>>({
  columns,
  data,
}: TableProps<T>) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  const router = useRouter();

  // Handle row click
  const handleRowClick = (row: Row<T>) => {
    router.push(`${router.pathname}/${row.id}`);
  };

  return (
    <Box overflowX='auto'>
      <Table {...getTableProps()} w='full'>
        <Thead>
          {headerGroups.map((headerGroup, i) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={i}>
              {headerGroup.headers.map((column, j) => (
                <Th {...column.getHeaderProps()} key={j} color='black'>
                  {column.render('Header')}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <Tr
                {...row.getRowProps()}
                onClick={() => handleRowClick(row)}
                key={i}
              >
                {row.cells.map((cell, j) => (
                  <Td {...cell.getCellProps()} key={j} color='black'>
                    {cell.render('Cell')}
                  </Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
}

export default MyTable;
