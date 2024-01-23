/* eslint-disable react-hooks/rules-of-hooks */

import { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAppSelector } from '@/lib/store/redux';
import AuthLayout from '@/layouts/AuthLayout';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';
import avatar from '@/assets/images/avatar-placeholder.png';

import StatsTable from '@/components/tables/StatsTable';
import AwardsRecognition from '@/components/AwardsRecognition';
import References from '@/components/References';

import { useGetUserStatsQuery } from '@/lib/store/statApi';
import { useFetchUserQuery } from '@/lib/store/userApi';
import { useGetUserAwardsQuery } from '@/lib/store/awardApi';
import { Award, Stat } from '@/types/stats';
import { User } from '@/types/user';

export default function MyProfile() {
  const { user }: any = useAppSelector((state) => state.auth);
  const { data: userData, refetch: userRefetch } = useFetchUserQuery(
    user?.data?.id
  );
  // @ts-ignore
  const { data: stats, refetch: statRefetch } = useGetUserStatsQuery(
    user?.data?.id
  );
  const { data: awards, refetch: awardRefetch } = useGetUserAwardsQuery(
    user?.data?.id
  );

  console.log('userData', userData);
  console.log('stats', stats);
  console.log('awards', awards);

  // @ts-ignore
  const myUser = userData?.results.filter(
    (item: User) => item.id === user?.data?.id
  )[0];
  console.log('myUser', myUser);
  console.log('myUser?.references', myUser?.references);

  useEffect(() => {
    userRefetch();
    statRefetch();
    awardRefetch();
  }, [userData, stats, awards, userRefetch, statRefetch, awardRefetch]);

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
          {user.data.id ? (
            <>
              <Row className="mt-3">
                <Col md={6}>
                  <Row>
                    <Col>
                      <Image
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
              <StatsTable
                data={
                  // @ts-ignore
                  stats?.results.filter(
                    (stat: Stat) => stat.user === user.data.id
                  ) || []
                }
              />
              <AwardsRecognition
                data={
                  // @ts-ignore
                  awards?.results.filter(
                    (award: Award) => award.user === user?.data?.id
                  ) || []
                }
              />
              <References
                data={
                  myUser?.references.length
                    ? myUser?.references
                    : user.data.references
                }
              />
            </>
          ) : (
            <Spinner />
          )}
        </Container>
      </AuthLayout>
    </>
  );
}
