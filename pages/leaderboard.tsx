import Head from 'next/head';
import AuthLayout from '@/layouts/AuthLayout';
import Container from 'react-bootstrap/Container';
import LeaderboardTable from '@/components/tables/LeaderboardTable';

export default function Leaderboard() {
  return (
    <>
      <Head>
        <title>Leaderboard | Kloser Sales Platform</title>
        <meta name="description" content="Kloser sales platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthLayout>
        <Container>
          <h2>Leaderboard</h2>
          <LeaderboardTable />
        </Container>
      </AuthLayout>
    </>
  );
}
