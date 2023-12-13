import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import useAxios from '@/lib/utils/axios';
import { useAppDispatch, useAppSelector } from '@/lib/store/redux';
import {
  userDetails,
  getUserStats,
  getUserAwards,
} from '@/lib/store/userSlice';

import AuthLayout from '@/layouts/AuthLayout';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import AwardsRecognition from '@/components/AwardsRecognition';
import UserProfileStatsTable from '@/components/tables/UserProfileStatsTable';
import avatar from '@/assets/images/avatar-placeholder.png';
import { AwardRecognitionInputs, Stat } from '@/types/stats';
import Link from 'next/link';

export default function MyProfile() {
  const api = useAxios();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user }: any = useAppSelector((state) => state.user);
  console.log('user', user);

  // @ts-ignore
  const username = router.query.slug;
  console.log('router', router);
  console.log('username', username);
  useEffect(() => {
    const renderUserData = async () => {
      try {
        const userResponse = await api.get(`/users/`);
        console.log('userResponse', userResponse);
        console.log('userResponse.data', userResponse.data);
        if (userResponse.status === 200) {
          const filteredUser = userResponse.data.filter((results: any) => {
            return results.username === username;
          });
          if (filteredUser[0]) {
            console.log('userData.id', user.data.id);
            console.log('filteredUser[0]', filteredUser[0]);
            // add user data to redux store
            dispatch(userDetails(filteredUser[0]));
            console.log('user.data', user.data);
            const statsResponse = await api.get(`/stats/`);
            const awardResponse = await api.get(`/awards/`);
            console.log('statsResponse.data', statsResponse.data);
            console.log('awardResponse.data', awardResponse.data);
            console.log(
              'awardResponse.data.filter',
              awardResponse.data.filter(
                (stat: AwardRecognitionInputs) => stat.user === username
              )
            );
            dispatch(
              getUserStats(
                statsResponse.data.filter((stat: Stat) => {
                  console.log('stat', stat);
                  console.log('stat.user_data', stat.user_data);
                  console.log(
                    'stat.user_data.username',
                    stat.user_data.username
                  );
                  return stat.user_data.username === username;
                })
              )
            );
            dispatch(
              getUserAwards(
                awardResponse.data.filter(
                  (stat: AwardRecognitionInputs) => stat.user === username
                )
              )
            );
          }
        }
        return userResponse;
      } catch (error: any) {
        console.log('error', error);
        if (error.response) {
          console.log('error.response.data', error.response.data);
        }
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
          {/* @ts-ignore */}
          {!user.data.first_name ? (
            <>
              <p>User not found.</p>
              <Spinner />
              <p>
                <Link href="/profile">Go back to Profile</Link>
              </p>
              {setTimeout(() => {
                router.push('/profile');
              }, 3000)}
            </>
          ) : (
            <Row>
              <Col>
                <Image
                  src={avatar.src}
                  alt="avatar placeholder"
                  roundedCircle
                />
              </Col>
              <Col>
                <p>
                  <strong>Name: </strong>
                  <span>
                    {user.data.first_name} {user.data.last_name}
                  </span>
                </p>
                <p>
                  <strong>Title: </strong>
                  <span>{user.data.title}</span>
                </p>
                <p>
                  <strong>Company: </strong>
                  <span>{user.data.company}</span>
                </p>
                <p>
                  <strong>Market: </strong>
                  <span>{user.data.market_type}</span>
                </p>
                <p>
                  <strong>Status: </strong>
                  <span>{user.data.user_status}</span>
                </p>
                <p>
                  <a href={user.data.linkedin_profile} target="_blank">
                    LinkedIn
                  </a>
                </p>
                {/* will bring back when messaging implemented */}
                {/* <Button className="pill-btn">Share Profile</Button>
                <Button
                  variant="outline-primary"
                  className="pill-btn mx-2"
                  disabled
                >
                  Message
                </Button> */}
              </Col>
              <Col md={6}>
                <h4>About</h4>
                <p>{user.data.about}</p>

                {/* references */}
                <h5>References</h5>
                {user.data.references.map((reference: any) => (
                  <p key={reference.id}>
                    <strong>
                      {reference.first_name} {reference.last_name}
                    </strong>
                    {reference.company}
                    <br />
                    {reference.email}
                    <br />
                    {reference.phone}
                  </p>
                ))}
              </Col>
            </Row>
          )}

          <h5>Stats</h5>
          <UserProfileStatsTable data={user.stats} />
          <AwardsRecognition data={user.awards} />
        </Container>
      </AuthLayout>
    </>
  );
}
