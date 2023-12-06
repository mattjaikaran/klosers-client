import Head from 'next/head';
import AuthLayout from '@/layouts/AuthLayout';
import Container from 'react-bootstrap/Container';
import NewStatForm from '@/components/forms/stats/NewStatForm';

const NewStatsPage = () => {
  return (
    <div>
      <Head>
        <title>New Stat | Kloser Sales Platform</title>
        <meta name="description" content="Kloser sales platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthLayout>
        <Container>
          <h2>Add New Stat</h2>
          <NewStatForm />
        </Container>
      </AuthLayout>
    </div>
  );
};

export default NewStatsPage;
