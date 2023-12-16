/* eslint-disable react-hooks/rules-of-hooks */
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

// yup validation schema user/password
const schema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

const LoginForm = () => {
  const router = useRouter();
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
      const response = await useLogin(userInfo);

      if (response.status === 403) {
        setError(response.data.errors.detail);
      }
      if (response.status === 400) {
        setError(response.data.non_field_errors[0]);
      }
      if (response.status === 200) {
        try {
          let user = {
            about: '',
            all_time_revenue: '',
            company: '',
            date_joined: '',
            email: '',
            first_name: '',
            id: '',
            img_url: '',
            is_active: false,
            is_sales_rep: true,
            is_staff: false,
            is_superuser: false,
            last_login: '',
            last_name: '',
            leaderboard_access: false,
            linkedin_profile: '',
            market_type: '',
            profile_visibility: '',
            references: [],
            title: '',
            user_fit_score: 0,
            user_status: '',
            username: '',
            token: '',
            refresh: '',
          };
          user = response.data.user;
          user.token = response.data.access;
          user.refresh = response.data.refresh;
          localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user));
          localStorage.setItem('AUTHTOKEN', JSON.stringify(user.token));
          localStorage.setItem('REFRESH_TOKEN', JSON.stringify(user.refresh));
          // set user data in global state
          dispatch(userLogin(user));
          // if user.first_name is null, redirect to /profile/edit to complete profile
          // otherwise, redirect to /profile
          if (!user.first_name && !user.last_name) {
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
