import Head from 'next/head';
import { useRouter } from 'next/router';
import MainLayout from '@/layouts/MainLayout';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Kloser Sales Platform</title>
        <meta name="description" content="Kloser sales platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MainLayout>
        <Container className="text-center">
          <h1 className="mt-5 with-marker">Klosers</h1>
          <h2>welcome.</h2>
          <h3 className="mt-5">Sign-up for FREE</h3>
          <p className="text-muted">
            An exclusive network where top sale talent share stats,
            <br /> and leverage past performance to match with future job
            prospects.
          </p>
          <p className="text-muted">Be on Every CEO & VPs 🔥 list.</p>
          <div className="mx-5">
            <div className="d-grid d-md-inline gap-2">
              <Button
                className="pill-btn"
                onClick={() => router.push('/signup')}
              >
                Create an Account
              </Button>
              <Button
                variant="outline-primary"
                className="mx-md-3 pill-btn"
                onClick={() => router.push('/signin')}
              >
                Already have an Account?
              </Button>
            </div>
          </div>
        </Container>
      </MainLayout>
    </>
  );
}
