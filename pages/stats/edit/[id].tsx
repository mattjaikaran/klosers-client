import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/lib/store/redux';
import AuthLayout from '@/layouts/AuthLayout';
import Container from 'react-bootstrap/Container';
import EditStatForm from '@/components/forms/stats/EditStatForm';
import { useGetStatQuery } from '@/lib/store/statApi';
import { Stat } from '@/types/stats';

const EditStatPage = ({ id }: { id?: string }) => {
  const router = useRouter();

  const statId: any = router.query.id;

  const { data: statData, error: statError } = useGetStatQuery(statId);

  console.log('statData', statData);
  console.log('statError', statError);
  return (
    <div>
      <Head>
        <title>Edit Stat | Kloser Sales Platform</title>
        <meta name="description" content="Kloser sales platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthLayout>
        <Container>
          {statError ? <p>Error fetching stat</p> : null}
          <EditStatForm
            item={
              // @ts-ignore
              statData?.results?.filter((stat: Stat) => stat.id === statId)[0]
            }
          />
        </Container>
      </AuthLayout>
    </div>
  );
};

export default EditStatPage;
