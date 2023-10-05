import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/lib/store/redux';
import AuthLayout from '@/layouts/AuthLayout';
import Container from 'react-bootstrap/Container';
import EditYTDStatForm from '@/components/forms/stats/EditYTDStatForm';

const EditYTDStat = () => {
  const router = useRouter();
  const { user }: any = useAppSelector((state) => state.auth);
  console.log('user', user);
  return (
    <div>
      <Head>
        <title>Edit YTD Stat | Kloser Sales Platform</title>
        <meta name="description" content="Kloser sales platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthLayout>
        <Container>
          <EditYTDStatForm
            item={
              user.ytdStats.filter(
                (stat: any) => stat.id === router.query.id
              )[0]
            }
          />
        </Container>
      </AuthLayout>
    </div>
  );
};

export default EditYTDStat;
