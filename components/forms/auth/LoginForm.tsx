import { useState } from 'react';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAppDispatch } from '@/lib/store/redux';
import { userLogin } from '@/lib/store/authSlice';
import { useLogin } from '@/lib/auth';
import { LoginFormInputs } from '@/types/user';

import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import useAxios from '@/lib/utils/axios';
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// yup validation schema user/password
const schema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

const LoginForm = () => {
  const router = useRouter();
  const api = useAxios();
  const dispatch = useAppDispatch();
  const [error, setError] = useState('');
  const USER_LOCAL_STORAGE_KEY = 'USER_KEY';
  const { register, handleSubmit } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      // @ts-ignore
      username: router.query.username,
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setError('');
    try {
      const userInfo = {
        username: data.username,
        password: data.password,
      };
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const response = await useLogin(userInfo);
      const user = response.data.user;

      if (response.status === 403) {
        setError(response.data.errors.detail);
      }
      if (response.status === 400) {
        setError(response.data.non_field_errors[0]);
      }
      if (response.status === 200) {
        try {
          const userResponse = await api.get(
            `${API_URL}/users/${response.data?.user.id}/`
          );
          const apiUser = userResponse.data;
          apiUser.token = response.data.access;
          apiUser.refresh = response.data.refresh;
          localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(apiUser));
          localStorage.setItem('AUTHTOKEN', JSON.stringify(user.access));
          localStorage.setItem('REFRESH_TOKEN', JSON.stringify(user.refresh));
          // set user data in global state
          dispatch(userLogin(apiUser));
          // if user.first_name is null, redirect to /profile/edit to complete profile
          // otherwise, redirect to /profile
          if (!apiUser.first_name) {
            router.push('/profile/edit');
          } else {
            router.push('/profile');
          }
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
            // default value router.query.username
            defaultValue={router.query.username}
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
