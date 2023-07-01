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

import Layout from '@/components/layout/Layout';

import { trpc } from '@/utils/trpc';

type FormValues = {
  name: string;
};

export default function CreateApplication() {
  const router = useRouter();
  const { tenantId } = router.query;

  const createApplication = trpc.createApplication.useMutation();

  function validateName(value: string) {
    let error;
    if (!value) {
      error = 'Name is required';
    }
    return error;
  }

  async function handleSubmit(name: string) {
    await createApplication.mutate({
      tenantId: tenantId as string,
      name,
    });
  }

  return (
    <Layout>
      <Box margin={3}>Create Application</Box>
      <Formik
        initialValues={{ name: '' }}
        onSubmit={async (values, actions) => {
          await handleSubmit(values.name);

          actions.setSubmitting(false);
        }}
      >
        {(props) => (
          <Form>
            <Field name='name' validate={validateName}>
              {({
                field,
                form,
              }: {
                field: FieldInputProps<string>;
                form: FormikProps<FormValues>;
              }) => (
                <FormControl
                  isInvalid={Boolean(form.errors.name && form.touched.name)}
                >
                  <FormLabel>Name</FormLabel>
                  <Input {...field} placeholder='name' />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button
              mt={4}
              colorScheme='teal'
              isLoading={props.isSubmitting}
              type='submit'
            >
              Create
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
}
