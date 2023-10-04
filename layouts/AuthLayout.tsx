import AuthHeader from '@/components/nav/AuthHeader';
import { userLogout } from '@/lib/store/authSlice';
import { useAppDispatch, useAppSelector } from '@/lib/store/redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

// @ts-ignore
const AuthLayout = ({ children }) => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth?.isLoggedIn);
  const router = useRouter();
  const data: any = useAppSelector((state) => state.auth);
  const user: any = data.user.data;

  useEffect(() => {
    if (!user || !isLoggedIn) {
      router.push('/');
      // dispatch(userLogout(user));
    }
  }, [user, isLoggedIn]);

  return (
    <div>
      <AuthHeader user={user} isLoggedIn={isLoggedIn} />
      <main className="py-3">{children}</main>
    </div>
  );
};

export default AuthLayout;
