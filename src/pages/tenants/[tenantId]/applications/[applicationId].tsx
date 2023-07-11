import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { Field, FieldInputProps, Form, Formik, FormikProps } from 'formik';
import { useRouter } from 'next/router';
import React from 'react';

import { Application } from '@/lib/api';

import Layout from '@/components/layout/Layout';
import PageLoader from '@/components/PageLoader';

import getFirstQueryStringValue from '@/utils/querystring';
import { trpc } from '@/utils/trpc';

interface InputFieldProps {
  name: keyof Application;
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
        form: FormikProps<Application>;
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

export default function Application() {
  const router = useRouter();
  const { tenantId, applicationId } = router.query;

  const applicationResult = trpc.getApplication.useQuery({
    tenantId: getFirstQueryStringValue(tenantId) || '',
    applicationId: getFirstQueryStringValue(applicationId) || '',
  });
  const updateApplication = trpc.updateApplication.useMutation();

  if (applicationResult.isLoading) {
    return <PageLoader />;
  }

  const application = applicationResult.data;
  if (!application) {
    return 'Not found';
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
        <Box>Application: {application.name}</Box>
        <Formik
          initialValues={{
            name: application.name as string,
            clientSecret: application.clientSecret as string,
            clientId: application.id as string,
          }}
          onSubmit={async (values, actions) => {
            await updateApplication.mutate({
              tenantId: tenantId as string,
              applicationId: applicationId as string,
              name: values.name,
              clientSecret: values.clientSecret,
            });

            router.push(`/tenants/${tenantId}/applications`);

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
              <InputField name='clientId' placeholder='clientId' isReadOnly />
              <InputField
                name='clientSecret'
                validate={validateSecret}
                placeholder='client secret'
              />
              <Button
                mt={4}
                colorScheme='teal'
                isLoading={props.isSubmitting}
                type='submit'
              >
                Save
              </Button>
            </Form>
          )}
        </Formik>
      </main>
    </Layout>
  );
}
