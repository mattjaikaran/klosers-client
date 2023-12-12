import Head from 'next/head';
import AuthLayout from '@/layouts/AuthLayout';
import Container from 'react-bootstrap/Container';
import EditReferenceForm from '@/components/forms/references/EditReferenceForm';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const EditReferencePage: NextPage = () => {
  const router = useRouter();
  console.log('router', router);
  return (
    <div>
      <Head>
        <title>Edit Reference | Kloser Sales Platform</title>
        <meta name="description" content="Kloser sales platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthLayout>
        <Container>
          <h2>Edit Reference</h2>
          {/* @ts-ignore */}
          <EditReferenceForm reference={router.query.id} />
        </Container>
      </AuthLayout>
    </div>
  );
};

export default EditReferencePage;
