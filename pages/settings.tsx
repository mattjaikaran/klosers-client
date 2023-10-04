import Head from 'next/head';
import MainLayout from '@/layouts/MainLayout';
import Container from 'react-bootstrap/Container';

export default function Settings() {
  return (
    <>
      <Head>
        <title>Settings | Kloser Sales Platform</title>
        <meta name="description" content="Kloser sales platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <Container>
          <h1>Settings</h1>
        </Container>
      </MainLayout>
    </>
  );
}
