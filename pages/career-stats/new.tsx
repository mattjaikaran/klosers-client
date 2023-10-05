import Head from 'next/head';
import AuthLayout from '@/layouts/AuthLayout';
import Container from 'react-bootstrap/Container';
import NewCareerStatForm from '@/components/forms/stats/NewCareerStatForm';

const NewCareerStat = () => {
  return (
    <div>
      <Head>
        <title>New Career Stat | Kloser Sales Platform</title>
        <meta name="description" content="Kloser sales platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthLayout>
        <Container>
          <h2>Add New Career Stat</h2>
          <NewCareerStatForm />
        </Container>
      </AuthLayout>
    </div>
  );
};

export default NewCareerStat;
