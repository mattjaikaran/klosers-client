/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
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
import Spinner from 'react-bootstrap/Spinner';

import AwardsRecognition from '@/components/AwardsRecognition';
import UserProfileStatsTable from '@/components/tables/UserProfileStatsTable';
import avatar from '@/assets/images/avatar-placeholder.png';
import Link from 'next/link';
import References from '@/components/References';
import { useGetUserStatsQuery } from '@/lib/store/statApi';
import { useGetUserAwardsQuery } from '@/lib/store/awardApi';
import { useFetchUserQuery } from '@/lib/store/userApi';
import { User } from '@/types/user';
import { Award, Stat } from '@/types/stats';
import { UserProps } from '@/lib/auth';

export default function UserProfile() {
  const router = useRouter();
  const username = router.query.slug;
  const {
    data: userData,
    isFetching: userIsFetching,
    refetch: refetchUser,
    // @ts-ignore
  } = useFetchUserQuery(username);

  // @ts-ignore
  const userDetails = userData?.results.filter(
    (user: User) => user.username === router.query.slug
  )[0];

  console.log('userDetails', userDetails);

  const {
    data: stats,
    isFetching: statsIsFetching,
    refetch: refetchStats,
    // @ts-ignore
  } = useGetUserStatsQuery(userDetails?.username);
  // @ts-ignore
  const {
    data: awards,
    isFetching: awardsIsFetching,
    refetch: refetchAwards,
  } = useGetUserAwardsQuery(userDetails?.username);

  console.log('awards', awards);

  useEffect(() => {
    refetchUser();
    refetchAwards();
    refetchStats();
  }, [refetchUser, refetchAwards, refetchStats, userDetails?.id]);

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
          {userIsFetching || statsIsFetching || awardsIsFetching ? (
            <Spinner />
          ) : null}
          {!userDetails ? (
            <>
              <p>User not found.</p>
              <p>
                <Link href="/profile">Go back to Profile</Link>
              </p>
              {/* {setTimeout(() => {
                router.push('/profile');
              }, 3000)} */}
            </>
          ) : (
            <Row>
              <Col>
                <Image
                  src={userDetails?.img_url ?? avatar.src}
                  className="img-fluid"
                  alt="avatar placeholder"
                />
              </Col>
              <Col>
                <p>
                  <strong>Name: </strong>
                  <span>
                    {userDetails?.first_name} {userDetails?.last_name}
                  </span>
                </p>
                <p>
                  <strong>Title: </strong>
                  <span>{userDetails?.title}</span>
                </p>
                <p>
                  <strong>Company: </strong>
                  <span>{userDetails?.company}</span>
                </p>
                <p>
                  <strong>Market: </strong>
                  <span>{userDetails?.market_type}</span>
                </p>
                <p>
                  <strong>Status: </strong>
                  <span>{userDetails?.user_status}</span>
                </p>
                <p>
                  <a href={userDetails?.linkedin_profile} target="_blank">
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
                <p>{userDetails?.about}</p>
              </Col>
            </Row>
          )}
          <h5>Stats</h5>
          {/* @ts-ignore */}
          <UserProfileStatsTable data={stats?.results || []} />
          {/* @ts-ignore */}
          <AwardsRecognition data={awards?.results || []} />
          {/* @ts-ignore */}
          <References data={userDetails?.references || []} />
        </Container>
      </AuthLayout>
    </>
  );
}
