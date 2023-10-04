import { useState } from 'react';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useAppDispatch } from '@/lib/store/redux';
import { userLogin } from '@/lib/store/authSlice';
import { useLogin } from '@/lib/auth';
import axios from 'axios';

interface LoginFormInputs {
  username: string;
  password: string;
}
const API_URL = process.env.NEXT_PUBLIC_API_URL;

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [error, setError] = useState('');
  const USER_LOCAL_STORAGE_KEY = 'USER_KEY';
  const { register, handleSubmit } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setError('');
    try {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const response = await useLogin(data);
      const user = response.data.user;

      if (response.status === 403) {
        setError(response.data.errors.detail);
      }
      if (response.status === 400) {
        setError(response.data.non_field_errors[0]);
      }
      if (response.status === 200) {
        try {
          const userResponse = await axios.get(
            `${API_URL}/users/${response.data?.user?.pk}/`
          );
          const apiUser = userResponse.data;
          apiUser.token = response.data.access;
          apiUser.refresh = response.data.refresh;
          localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(apiUser));
          localStorage.setItem('AUTHTOKEN', JSON.stringify(await user.access));
          localStorage.setItem(
            'REFRESH_TOKEN',
            JSON.stringify(await user.refresh)
          );
          dispatch(userLogin(apiUser));
          router.push('/profile');
        } catch (error: any) {
          console.log('error', error);
          console.log('error.response', error.response);
        }
      }
    } catch (error: any) {
      console.error('error', error);
      console.log('error.response.data', error.response.data);
      setError(error.response.data.non_field_errors[0]);
    }
  };
  return (
    <>
      {error ? <Alert variant="danger">{error}</Alert> : null}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="loginFormUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            {...register('username')}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="loginFormPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register('password')}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
