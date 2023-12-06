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
import StatsTable from '@/components/tables/StatsTable';
import avatar from '@/assets/images/avatar-placeholder.png';
import { AwardRecognitionInputs, Stat } from '@/types/stats';

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
        const response = await api.get(`/users/?username=${router.query.slug}`);
        console.log('response', response);
        console.log('response.data', response.data);
        if (response.status === 200) {
          const filteredUser = response.data.filter((results: any) => {
            return results.username === username;
          });
          if (filteredUser[0]) {
            console.log('userData.id', user.data.id);
            filteredUser[0].password = '';
            console.log('filteredUser[0]', filteredUser[0]);
            dispatch(userDetails(filteredUser[0]));
            console.log('user.data', user.data);
            const statsResponse = await api.get(
              `/stats/?username=${router.query.slug}`
            );
            const awardResponse = await api.get(
              `/awards-recognition-stats/?username=${router.query.slug}`
            );
            console.log('statsResponse.data', statsResponse.data);
            dispatch(
              getUserStats(
                statsResponse.data.filter(
                  (stat: Stat) => stat.user === user.data.id
                )
              )
            );
            dispatch(
              getUserAwards(
                awardResponse.data.filter(
                  (stat: AwardRecognitionInputs) => stat.user === user.data.id
                )
              )
            );
          }
        }
        return response;
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
              <p>
                Searching for <strong>{router.query.slug}</strong>
              </p>
              <Spinner />
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
                <Button className="pill-btn">Share Profile</Button>
                <Button variant="outline-primary" className="pill-btn mx-2">
                  Message
                </Button>
              </Col>
              <Col md={6}>
                <h4>About</h4>
                <p>{user.data.about}</p>
              </Col>
            </Row>
          )}

          <h5>Stats</h5>
          <StatsTable data={user.stats} />
          <AwardsRecognition data={user.awards} />
        </Container>
      </AuthLayout>
    </>
  );
}
