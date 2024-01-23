/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAppDispatch } from '@/lib/store/redux';
import { userLogin } from '@/lib/store/authSlice';
import { LoginFormInputs, useLogin } from '@/lib/auth';

import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// yup validation schema email/password
const schema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const USER_LOCAL_STORAGE_KEY = 'USER_KEY';
  let apiUser: any = {};
  const { register, handleSubmit } = useForm<LoginFormInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (
    data: LoginFormInputs
  ) => {
    setError('');
    try {
      const response = await useLogin(data);
      console.log('response', response);

      if (response.status === 403) {
        setError(response.data.errors.detail);
      }
      if (response.status === 400) {
        console.log('response', response);
        setError(response.data.message);
      }
      if (response.status === 401) {
        console.log('response', response);
        setError(response.data.detail);
      }
      if (response.status === 200 || response.status === 202) {
        setSuccessMessage(
          response.data.message || 'Login successful. Redirecting...'
        );
        apiUser = response.data;
        // userRefetch();
        apiUser.access = response.data.access;
        apiUser.refresh = response.data.refresh;

        // set user data in local storage
        localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(apiUser));
        localStorage.setItem('AUTHTOKEN', JSON.stringify(apiUser.access));
        localStorage.setItem('REFRESH_TOKEN', JSON.stringify(apiUser.refresh));

        // set user data in global state
        dispatch(userLogin(apiUser));

        setTimeout(() => {
          if (!apiUser.first_name && !apiUser.last_name) {
            router.push('/profile/edit');
          } else {
            router.push('/profile');
          }
        }, 1000);
      }
    } catch (error: any) {
      console.log('error', error);
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="loginFormEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            defaultValue={router.query.email}
            placeholder="Enter email"
            {...register('email')}
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
      {error ? (
        <Alert className="mt-3" variant="danger">
          {error}
        </Alert>
      ) : successMessage ? (
        <Alert className="mt-3" variant="success">
          {successMessage}
        </Alert>
      ) : null}
    </>
  );
};

export default LoginForm;
