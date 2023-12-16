/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/lib/store/redux';
import useAxios from '@/lib/utils/axios';
import AuthLayout from '@/layouts/AuthLayout';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import StatsTable from '@/components/tables/StatsTable';
import AwardsRecognition from '@/components/AwardsRecognition';

import avatar from '@/assets/images/avatar-placeholder.png';
import { getMyUserStats, getMyUserAwards } from '@/lib/store/authSlice';
import References from '@/components/References';

export default function MyProfile() {
  const api = useAxios();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user }: any = useAppSelector((state) => state.auth);

  useMemo(() => {
    const renderMyUserData = async () => {
      try {
        const response = await api.get(`/stats/`);
        console.log('response', response);
        dispatch(
          getMyUserStats(
            response.data.filter((item: any) => item.user === user.data.id)
          )
        );
      } catch (error) {
        console.error('error', error);
      }
    };
    renderMyUserData();
  }, []);

  // get user awards
  useMemo(() => {
    const renderMyUserAwards = async () => {
      try {
        const response = await api.get(`/awards/`);
        console.log('response', response);
        dispatch(
          getMyUserAwards(
            response.data.filter((item: any) => item.user === user.data.id)
          )
        );
      } catch (error) {
        console.error('error', error);
      }
    };
    renderMyUserAwards();
  }, []);

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
          <Row className="mt-3">
            <Col md={6}>
              <Row>
                <Col>
                  <Image
                    // src should img_url or avatar placeholder
                    src={user.data.img_url || avatar.src}
                    className="img-fluid"
                    alt="avatar placeholder"
                  />
                  <p className="mt-5">
                    <Link href="/profile/edit" className="text-muted">
                      Edit Profile
                    </Link>
                  </p>
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
                </Col>
              </Row>
            </Col>
            <Col md={6}>
              <h4>About</h4>
              <p>{user.data.about}</p>
            </Col>
          </Row>
          <h5>Stats</h5>
          <StatsTable data={user.stats} />
          <AwardsRecognition data={user.awards} />
          <References data={user.data.references} />
        </Container>
      </AuthLayout>
    </>
  );
}
