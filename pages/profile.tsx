/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import Head from 'next/head';
import AuthLayout from '@/layouts/AuthLayout';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import YTDStatsTable from '@/components/tables/YTDStatsTable';
import CareerStatsTable from '@/components/tables/CareerStatsTable';
import AwardsRecognition from '@/components/AwardsRecognition';
import useAxios from '@/lib/utils/axios';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/lib/store/redux';
import avatar from '@/assets/images/avatar-placeholder.png';

export default function Profile() {
  const api = useAxios();
  const router = useRouter();
  const { user }: any = useAppSelector((state) => state.auth);
  const [userYtdStats, setUserYtdStats] = useState<any>([]);
  const [userCareerStats, setUserCareerStats] = useState<any>([]);
  const [userAwards, setUserAwards] = useState<any>([]);
  useEffect(() => {
    const renderUserData = async () => {
      try {
        const ytdResponse = await api.get('/ytd-stats/');
        const careerResponse = await api.get('/career-stats/');
        const awardResponse = await api.get('/awards-recognition-stats/');
        setUserYtdStats(ytdResponse.data);
        setUserCareerStats(careerResponse.data);
        setUserAwards(awardResponse.data);
      } catch (error) {
        console.error('error', error);
      }
    };
    renderUserData();
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
          <h2>Profile</h2>
          <Row className="mt-3">
            <Col md={6}>
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
                    <strong>All Time Revenue: </strong>
                    <span>
                      $
                      {parseInt(user.data.all_time_revenue).toLocaleString(
                        'en-US'
                      )}
                    </span>
                  </p>
                  <p>
                    <a href={user.data.linkedin_profile} target="_blank">
                      LinkedIn
                    </a>
                  </p>
                </Col>
              </Row>
            </Col>
            <Col md={6} className="text-center">
              <h2 className="d-inline">
                <span className="with-marker">Klosers</span>{' '}
              </h2>
              <h4 className="d-inline">
                <span>fit score.</span>
              </h4>
              <h2 className="text-primary">{user.data.user_fit_score}%</h2>
              <p className="px-md-5">
                Weighted score based on high value categories to fit your
                company profile and parameters.
              </p>
              <Button
                className="pill-btn"
                onClick={() => router.push('/leaderboard')}
              >
                Kloser Leaderboard {'>'}
              </Button>
            </Col>
          </Row>
          <h5>YTD Stats</h5>
          <YTDStatsTable data={userYtdStats} />
          <h5>Career Stats</h5>
          <CareerStatsTable data={userCareerStats} />

          <AwardsRecognition data={userAwards} />
        </Container>
      </AuthLayout>
    </>
  );
}
