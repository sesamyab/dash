import { Box, Link, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export default function LeftMenu() {
  const router = useRouter();
  const { tenantId } = router.query;

  return (
    <Box
      as='nav'
      aria-label='Main Navigation'
      width='200px'
      height='100vh'
      bg='gray.800'
      color='white'
      p={4}
    >
      <Stack spacing={3}>
        <Link href='/'>Dashboard</Link>
        <Link href={`/tenants/${tenantId}/applications`}>Applications</Link>
        <Link href={`/tenants/${tenantId}/connections`}>Connections</Link>
        <Link href={`/tenants/${tenantId}/users`}>Users</Link>
      </Stack>
    </Box>
  );
}
