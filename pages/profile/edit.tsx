import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAppSelector } from '@/lib/store/redux';
import AuthLayout from '@/layouts/AuthLayout';
import Container from 'react-bootstrap/Container';
import EditProfileForm from '@/components/forms/auth/EditProfileForm';

const EditProfile = () => {
  const router = useRouter();
  const { user }: any = useAppSelector((state) => state.auth);
  console.log('user', user);
  return (
    <div>
      <Head>
        <title>Edit Profile | Kloser Sales Platform</title>
        <meta name="description" content="Kloser sales platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthLayout>
        <Container>
          <h2>Edit Profile</h2>
          <EditProfileForm user={user?.data} />
        </Container>
      </AuthLayout>
    </div>
  );
};

export default EditProfile;
