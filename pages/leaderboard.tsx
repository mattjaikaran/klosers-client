import Head from 'next/head';
import AuthLayout from '@/layouts/AuthLayout';
import Container from 'react-bootstrap/Container';
import LeaderboardTable from '@/components/tables/LeaderboardTable';
import { useAppSelector } from '@/lib/store/redux';

export default function Leaderboard() {
  // get user from redux store
  const data: any = useAppSelector((state) => state.auth);
  const user: any = data.user.data;
  console.log('user', user);
  // if !user.leaderboard_access then redirect to dashboard
  if (!user.leaderboard_access) {
    return (
      <>
        <Head>
          <title>Leaderboard | Kloser Sales Platform</title>
          <meta name="description" content="Kloser sales platform" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <AuthLayout>
          <Container fluid="xl">
            <h3>Leaderboard</h3>
            <p>You do not have access to the leaderboard</p>
            <p>
              Contact{' '}
              <a href="mailto:info@joinklosers.com">info@joinklosers.com</a> for
              access
            </p>
          </Container>
        </AuthLayout>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Leaderboard | Kloser Sales Platform</title>
        <meta name="description" content="Kloser sales platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthLayout>
        <Container fluid="xl">
          <LeaderboardTable />
        </Container>
      </AuthLayout>
    </>
  );
}
