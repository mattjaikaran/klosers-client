import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useAxios from '@/lib/utils/axios';
import AuthLayout from '@/layouts/AuthLayout';
import Container from 'react-bootstrap/Container';
import AwardsRecognition from '@/components/AwardsRecognition';
import CareerStatsTable from '@/components/tables/CareerStatsTable';
import YTDStatsTable from '@/components/tables/YTDStatsTable';
import Spinner from 'react-bootstrap/Spinner';

export default function MyProfile() {
  const api = useAxios();
  const router = useRouter();
  const [userData, setUserData] = useState<any>({});
  // @ts-ignore
  const username = router.query.slug;
  console.log('router', router);
  console.log('username', username);
  useEffect(() => {
    const renderUserData = async () => {
      try {
        const response = await api.get(`/users/?username=${router.query.slug}`);
        console.log('response', response);
        if (response.status === 200) {
          setUserData(
            response.data.filter((results: any) => results.username == username)
          );
          console.log('userData', userData);
        }
        return response;
      } catch (error: any) {
        console.log('error', error);
        if (error.response)
          console.log('error.response.data', error.response.data);
      }
    };
    if (router.query.slug) renderUserData();
  }, [router.query.slug]);
  return (
    <>
      <Head>
        <title>Profile | Kloser Sales Platform</title>
        <meta name="description" content="Kloser sales platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthLayout>
        <Container>
          <h2>User</h2>
          {/* @ts-ignore */}
          {!userData.first_name ? (
            <>
              <p>{router.query.slug}</p>
              <Spinner />
            </>
          ) : (
            <div>
              <p>{userData.username}</p>
              <p>{userData.full_name}</p>
              <h5>YTD Stats</h5>
              {/* <YTDStatsTable data={user.ytdStats} /> */}
              <h5>Career Stats</h5>
              {/* <CareerStatsTable data={user.careerStats} /> */}

              {/* <AwardsRecognition data={user.awards} /> */}
            </div>
          )}
        </Container>
      </AuthLayout>
    </>
  );
}
