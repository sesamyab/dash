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

import { User } from '@/lib/api';

import Layout from '@/components/layout/Layout';
import PageLoader from '@/components/PageLoader';

import getFirstQueryStringValue from '@/utils/querystring';
import { trpc } from '@/utils/trpc';

interface InputFieldProps {
  name: keyof User;
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
        form: FormikProps<User>;
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

export default function User() {
  const router = useRouter();
  const { tenantId, userId } = router.query;

  const applicationResult = trpc.getUser.useQuery({
    tenantId: getFirstQueryStringValue(tenantId) || '',
    userId: getFirstQueryStringValue(userId) || '',
  });

  if (applicationResult.isLoading) {
    return <PageLoader />;
  }

  const user = applicationResult.data;
  if (!user) {
    return 'Not found';
  }

  async function handleDelete() {
    // TODO: add delete

    router.push(`/tenants/${tenantId}/users`);
  }

  function validateName(value: string) {
    if (!value) {
      return 'Name is required';
    }
  }

  return (
    <Layout>
      <main>
        <Box>User: {user.name}</Box>
        <Formik
          initialValues={{
            name: user.name as string,
            email: user.email as string,
          }}
          onSubmit={async (values, actions) => {
            // TODO: add update

            router.push(`/tenants/${tenantId}/users`);

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
              <InputField name='email' placeholder='email' />
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
