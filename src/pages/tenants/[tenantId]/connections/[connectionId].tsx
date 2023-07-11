import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react';
import { Field, FieldInputProps, Form, Formik, FormikProps } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';

import { Connection } from '@/lib/api';

import Layout from '@/components/layout/Layout';
import PageLoader from '@/components/PageLoader';

import getFirstQueryStringValue from '@/utils/querystring';
import { trpc } from '@/utils/trpc';

interface InputFieldProps {
  name: keyof Connection;
  validate?: (value: string) => string | undefined;
  placeholder: string;
  isReadOnly?: boolean;
}

function InputField({
  name,
  validate,
  placeholder,
  isReadOnly,
}: InputFieldProps) {
  return (
    <Field name={name} validate={validate}>
      {({
        field,
        form,
      }: {
        field: FieldInputProps<string>;
        form: FormikProps<Connection>;
      }) => (
        <FormControl
          isInvalid={Boolean(form.errors[name] && form.touched[name])}
        >
          <FormLabel>{name}</FormLabel>
          <Input {...field} placeholder={placeholder} isReadOnly={isReadOnly} />
          <FormErrorMessage>{form.errors[name]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
}

export default function Connection() {
  const router = useRouter();
  const { tenantId, connectionId } = router.query;

  const applicationResult = trpc.getConnection.useQuery({
    tenantId: getFirstQueryStringValue(tenantId) || '',
    connectionId: getFirstQueryStringValue(connectionId) || '',
  });
  const updateConnection = trpc.updateConnection.useMutation();
  const deleteConnection = trpc.deleteConnection.useMutation();

  if (applicationResult.isLoading) {
    return <PageLoader />;
  }

  const connection = applicationResult.data;
  if (!connection) {
    return 'Not found';
  }

  async function handleDelete() {
    await deleteConnection.mutateAsync({
      tenantId: getFirstQueryStringValue(tenantId) || '',
      connectionId: getFirstQueryStringValue(connectionId) || '',
    });

    router.push(`/tenants/${tenantId}/connections`);
  }

  function validateName(value: string) {
    if (!value) {
      return 'Name is required';
    }
  }

  function validateSecret(value: string) {
    if (!value) {
      return 'Secret is required';
    }
  }

  return (
    <Layout>
      <main>
        <Box>Connection: {connection.name}</Box>
        <Formik
          initialValues={{
            name: connection.name as string,
            clientSecret: connection.clientSecret as string,
            clientId: connection.clientId as string,
            authorizationEndpoint: connection.authorizationEndpoint as string,
          }}
          onSubmit={async (values, actions) => {
            await updateConnection.mutate({
              tenantId: tenantId as string,
              connectionId: connectionId as string,
              name: values.name,
              clientSecret: values.clientSecret,
              clientId: values.clientId,
              authorizationEndpoint: values.authorizationEndpoint,
            });

            router.push(`/tenants/${tenantId}/connections`);

            actions.setSubmitting(false);
          }}
        >
          {(props) => (
            <Form>
              <InputField
                name='name'
                validate={validateName}
                placeholder='name'
              />
              <InputField
                name='clientId'
                validate={validateSecret}
                placeholder='client id'
              />
              <InputField
                name='clientSecret'
                validate={validateSecret}
                placeholder='client secret'
              />
              <InputField
                name='authorizationEndpoint'
                placeholder='authorization endpoint'
              />
              <Stack direction='row' align='center' margin={4}>
                <Button mt={4} colorScheme='red' onClick={handleDelete}>
                  Delete
                </Button>
                <Button
                  mt={4}
                  colorScheme='teal'
                  isLoading={props.isSubmitting}
                  type='submit'
                >
                  Save
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </main>
    </Layout>
  );
}
