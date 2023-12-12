import Head from 'next/head';
import AuthLayout from '@/layouts/AuthLayout';
import Container from 'react-bootstrap/Container';
import NewIntroForm from '@/components/forms/intros/NewIntroForm';

const NewIntroPage = () => {
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
          <h2>Add New Intro</h2>
          <NewIntroForm />
        </Container>
      </AuthLayout>
    </div>
  );
};

export default NewIntroPage;
