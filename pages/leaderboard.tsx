import Head from 'next/head';
import MainLayout from '@/layouts/MainLayout';
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
      <MainLayout>
        <Container>
          <h1>Leaderboard</h1>
          <LeaderboardTable />
        </Container>
      </MainLayout>
    </>
  );
}
