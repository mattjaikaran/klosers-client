import Head from 'next/head';
import Container from 'react-bootstrap/Container';
import LoginForm from '@/components/forms/auth/LoginForm';
import MainLayout from '@/layouts/MainLayout';

export default function Signin() {
  return (
    <>
      <Head>
        <title>Login | Kloser Sales Platform</title>
        <meta name="description" content="Kloser sales platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <Container>
          <h3>Sign In</h3>
          <LoginForm />
        </Container>
      </MainLayout>
    </>
  );
}
