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

import { Migration } from '@/lib/api';

import Layout from '@/components/layout/Layout';
import PageLoader from '@/components/PageLoader';

import getFirstQueryStringValue from '@/utils/querystring';
import { trpc } from '@/utils/trpc';

interface InputFieldProps {
  name: keyof Migration;
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
        form: FormikProps<Migration>;
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

export default function Migration() {
  const router = useRouter();
  const { tenantId, migrationId } = router.query;

  const applicationResult = trpc.getMigration.useQuery({
    tenantId: getFirstQueryStringValue(tenantId) || '',
    migrationId: getFirstQueryStringValue(migrationId) || '',
  });
  const updateMigration = trpc.updateMigration.useMutation();
  const deleteMigration = trpc.deleteMigration.useMutation();

  if (applicationResult.isLoading) {
    return <PageLoader />;
  }

  const migration = applicationResult.data;
  if (!migration) {
    return 'Not found';
  }

  async function handleDelete() {
    await deleteMigration.mutateAsync({
      tenantId: getFirstQueryStringValue(tenantId) || '',
      migrationId: getFirstQueryStringValue(migrationId) || '',
    });

    router.push(`/tenants/${tenantId}/migrations`);
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
        <Box>Migration: {migration.name}</Box>
        <Formik
          initialValues={{
            provider: migration.provider as string,
            clientId: migration.clientId as string,
            domain: migration.domain as string,
            origin: migration.origin as string,
          }}
          onSubmit={async (values, actions) => {
            await updateMigration.mutate({
              tenantId: tenantId as string,
              migrationId: migrationId as string,
              clientId: values.clientId,
              domain: values.domain,
              origin: values.origin,
              provider: values.provider,
            });

            router.push(`/tenants/${tenantId}/migrations`);

            actions.setSubmitting(false);
          }}
        >
          {(props) => (
            <Form>
              <InputField
                name='provider'
                validate={validateName}
                placeholder='provider'
              />
              <InputField
                name='clientId'
                validate={validateSecret}
                placeholder='client id'
              />
              <InputField
                name='domain'
                validate={validateSecret}
                placeholder='domain'
              />
              <InputField
                name='origin'
                validate={validateSecret}
                placeholder='origin'
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
