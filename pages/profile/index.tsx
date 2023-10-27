/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/lib/store/redux';
import useAxios from '@/lib/utils/axios';
import AuthLayout from '@/layouts/AuthLayout';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

import YTDStatsTable from '@/components/tables/YTDStatsTable';
import CareerStatsTable from '@/components/tables/CareerStatsTable';
import AwardsRecognition from '@/components/AwardsRecognition';

import avatar from '@/assets/images/avatar-placeholder.png';
import {
  getUserCareerStats,
  getUserYTDStats,
  getUserAwards,
} from '@/lib/store/authSlice';
import Link from 'next/link';

export default function MyProfile() {
  const api = useAxios();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user }: any = useAppSelector((state) => state.auth);

  useEffect(() => {
    const renderMyUserData = async () => {
      try {
        const ytdResponse = await api.get('/ytd-stats/');
        const careerResponse = await api.get('/career-stats/');
        const awardResponse = await api.get('/awards-recognition-stats/');
        console.log('ytdResponse.data', ytdResponse.data);
        console.log('careerResponse.data', careerResponse.data);
        console.log('awardResponse.data', awardResponse.data);
        dispatch(getUserCareerStats(careerResponse.data));
        dispatch(getUserYTDStats(ytdResponse.data));
        dispatch(getUserAwards(awardResponse.data));
      } catch (error) {
        console.error('error', error);
      }
    };
    renderMyUserData();
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
                    src={avatar.src}
                    alt="avatar placeholder"
                    roundedCircle
                  />
                  <p className="mt-5">
                    <Link href="/profile/edit">Edit Profile</Link>
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
                  <Button className="pill-btn">Share Profile</Button>
                  <Button variant="outline-primary" className="pill-btn mx-2">
                    Message
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col md={6}>
              <h4>About</h4>
              <p>{user.data.about}</p>
            </Col>
          </Row>
          <h5>YTD Stats</h5>
          <YTDStatsTable data={user.ytdStats} />
          <h5>Career Stats</h5>
          <CareerStatsTable data={user.careerStats} />

          <AwardsRecognition data={user.awards} />
        </Container>
      </AuthLayout>
    </>
  );
}