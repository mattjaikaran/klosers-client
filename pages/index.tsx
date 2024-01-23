import Head from 'next/head';
import { useRouter } from 'next/router';
import MainLayout from '@/layouts/MainLayout';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

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
                Create FREE Rep Account
              </Button>
              <Button
                variant="outline-primary"
                className="mx-md-3 pill-btn"
                onClick={() => router.push('/signin')}
              >
                Already have an Account?
              </Button>
              <a
                href="https://checkout.stripe.com/c/pay/cs_live_a1ozLf1vfwc56YS8AK4bM5lHCZSKBbefIDb8fzQlwNcMQn1pNTcs0X6uN2#fidkdWxOYHwnPyd1blppbHNgWjA0SDRNU0FMS01BdUBPY291fWdMZnBpaFVycjJCRHM1TGhdY01vcGc8T3xiM1JTMmZqV3ZRNkxqVjN3cXd%2FR21LZ2BMUWg0b0hES1drUnw8aERBd3JLY0hxNTVKQVN8PDFhSicpJ3VpbGtuQH11anZgYUxhJz8nYFNkYVZMYExCMkRgYjU1NmZmJ3gl"
                target="_blank"
              >
                <Button className="pill-btn">Create Company Account</Button>
              </a>
            </div>
          </div>
        </Container>
      </MainLayout>
    </>
  );
}
