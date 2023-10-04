import Head from 'next/head';
import Container from 'react-bootstrap/Container';
import RegisterForm from '@/components/forms/auth/RegisterForm';
import MainLayout from '@/layouts/MainLayout';

export default function Signup() {
  return (
    <>
      <Head>
        <title>Signup | Kloser Sales Platform</title>
        <meta name="description" content="Kloser sales platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <Container>
          <h3>Sign Up</h3>
          <RegisterForm />
        </Container>
      </MainLayout>
    </>
  );
}
