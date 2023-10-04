import Head from 'next/head';
import AuthLayout from '@/layouts/AuthLayout';
import Container from 'react-bootstrap/Container';

export default function Dashboard() {
  return (
    <div>
      <Head>
        <title>Dashboard | Kloser Sales Platform</title>
        <meta name="description" content="Kloser sales platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthLayout>
        <Container>
          <h2>Dashboard</h2>
        </Container>
      </AuthLayout>
    </div>
  );
}
