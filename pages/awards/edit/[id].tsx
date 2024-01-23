import Head from 'next/head';
import { useRouter } from 'next/router';
import AuthLayout from '@/layouts/AuthLayout';
import Container from 'react-bootstrap/Container';
import EditAwardForm from '@/components/forms/stats/EditAwardForm';
import { useGetAwardQuery } from '@/lib/store/awardApi';

const EditAward = () => {
  const router = useRouter();
  const awardId: any = router.query.id;

  const { data: awardData, error: awardError } = useGetAwardQuery(awardId);

  console.log('awardData', awardData);
  console.log('awardError', awardError);

  return (
    <div>
      <Head>
        <title>Edit Award | Kloser Sales Platform</title>
        <meta name="description" content="Kloser sales platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthLayout>
        <Container>
          <h2>Add Edit Award</h2>
          {awardError ? (
            <p>There was an error getting the award</p>
          ) : (
            // @ts-ignore
            <EditAwardForm item={awardData} />
          )}
        </Container>
      </AuthLayout>
    </div>
  );
};

export default EditAward;
