import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Link from 'next/link';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useSignup } from '@/lib/auth';
import { RegisterFormInputs } from '@/types/user';

import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const schema = yup
  .object({
    username: yup.string().required(),
    email: yup.string().required('Email is required').email('Email is invalid'),
    password1: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    password2: yup
      .string()
      .oneOf([yup.ref('password1')], 'Passwords must match')
      .required('Confirm Password is required'),
  })
  .required();

const RegisterForm = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<any>('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    try {
      console.log('data in onSubmit', data);
      const userInfo = {
        email: data.email,
        username: data.username,
        password1: data.password1,
        password2: data.password2,
      };

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const registerResponse = await useSignup(userInfo);
      console.log('registerResponse', registerResponse);
      if (registerResponse.status === 400) {
        if (registerResponse.data?.email) {
          setErrorMessage(registerResponse.data?.email);
        }
      }
      if (registerResponse.status === 201) {
        return router.push('/signin');
      }
      return registerResponse;
    } catch (error: any) {
      console.error('error', error);
      const signupError = error.response.data.detail
        ? error.response.data.detail
        : error.response.data;
      setErrorMessage(signupError);
      return error;
    }
  };

  return (
    <>
      <Form validated={!errors} onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="registerFormEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            {...register('email')}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="registerFormUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            {...register('username')}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="registerFormPassword1">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register('password1')}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="registerFormPassword2">
          <Form.Label>Password Confirmation</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register('password2')}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      {Object.values(errors).length ? (
        <Alert className="mt-3" variant="danger">
          {errors.username
            ? errors.username.message
            : errors.email
            ? errors.email.message
            : errors.password1
            ? errors.password1.message
            : errors.password2
            ? errors.password2.message
            : ''}
        </Alert>
      ) : null}
      {errorMessage ? (
        <Alert className="mt-3" variant="danger">
          {errorMessage}
        </Alert>
      ) : null}

      <div className="mt-5">
        <Link href="/signin">Already have an account?</Link>
      </div>
    </>
  );
};

export default RegisterForm;
