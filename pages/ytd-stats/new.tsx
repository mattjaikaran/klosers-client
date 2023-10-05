import Head from 'next/head';
import NewYTDStatForm from '@/components/forms/stats/NewYTDStatForm';
import AuthLayout from '@/layouts/AuthLayout';
import Container from 'react-bootstrap/Container';

const NewYTDStat = () => {
  return (
    <div>
      <Head>
        <title>New YTD Stat | Kloser Sales Platform</title>
        <meta name="description" content="Kloser sales platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthLayout>
        <Container>
          <h2>Add New YTD Stat</h2>
          <NewYTDStatForm />
        </Container>
      </AuthLayout>
    </div>
  );
};

export default NewYTDStat;
