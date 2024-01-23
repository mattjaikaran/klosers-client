import Head from 'next/head';
import AuthLayout from '@/layouts/AuthLayout';
import Container from 'react-bootstrap/Container';
import NewAwardForm from '@/components/forms/stats/NewAwardForm';

const NewAward = () => {
  return (
    <div>
      <Head>
        <title>New Award | Kloser Sales Platform</title>
        <meta name="description" content="Kloser sales platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthLayout>
        <Container>
          <h2>Add New Award</h2>
          <NewAwardForm />
        </Container>
      </AuthLayout>
    </div>
  );
};

export default NewAward;
