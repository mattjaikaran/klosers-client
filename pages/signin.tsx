import Head from 'next/head';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import LoginForm from '@/components/forms/auth/LoginForm';
import MainLayout from '@/layouts/MainLayout';
import { signIn, signOut, useSession } from 'next-auth/react';
export default function Signin() {
  const { data: session } = useSession();
  // console.log('session', session);
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
