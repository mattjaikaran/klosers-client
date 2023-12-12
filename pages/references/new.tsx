import Head from 'next/head';
import AuthLayout from '@/layouts/AuthLayout';
import Container from 'react-bootstrap/Container';
import NewReferenceForm from '@/components/forms/references/NewReferenceForm';

const NewReferencePage = () => {
  return (
    <div>
      <Head>
        <title>New Reference | Kloser Sales Platform</title>
        <meta name="description" content="Kloser sales platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthLayout>
        <Container>
          <h2>Add New Reference</h2>
          <NewReferenceForm />
        </Container>
      </AuthLayout>
    </div>
  );
};

export default NewReferencePage;
