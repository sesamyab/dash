import { Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';

import Layout from '@/components/layout/Layout';
import PageLoader from '@/components/PageLoader';

import getFirstQueryStringValue from '@/utils/querystring';
import { trpc } from '@/utils/trpc';

export default function Application() {
  const router = useRouter();
  const { tenantId, applicationId } = router.query;

  const applicationResult = trpc.getApplication.useQuery({
    tenantId: getFirstQueryStringValue(tenantId) || '',
    applicationId: getFirstQueryStringValue(applicationId) || '',
  });

  if (applicationResult.isLoading) {
    return (
      <Layout>
        <PageLoader />
      </Layout>
    );
  }

  const application = applicationResult.data;
  if (!application) {
    return 'Not found';
  }

  return (
    <Layout>
      <main>
        <Box>User: {application.name}</Box>
      </main>
    </Layout>
  );
}
