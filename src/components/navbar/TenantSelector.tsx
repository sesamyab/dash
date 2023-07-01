import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';

import { trpc } from '@/utils/trpc';

export default function TenantSelector() {
  const router = useRouter();
  const { tenantId } = router.query;

  if (!tenantId) {
    return <></>;
  }

  const tenantResults = trpc.listTenants.useQuery();
  if (tenantResults.isLoading || !tenantResults.data) {
    return <></>;
  }

  const tenants = tenantResults.data;

  function handleTenantClick(id: string) {
    router.push(`/tenants/${id}`);
  }

  const currentTenant = tenants.find((t) => t.id === tenantId);

  return (
    <Box>
      <Menu>
        <MenuButton as={Button} variant='link' cursor='pointer'>
          {currentTenant?.name}
        </MenuButton>
        <MenuList>
          {tenants.map((t) => {
            return (
              <MenuItem key={t.id} onClick={() => handleTenantClick(t.id)}>
                {t.name}
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    </Box>
  );
}
