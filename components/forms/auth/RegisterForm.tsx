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

const newUserSchema = yup
  .object({
    first_name: yup
      .string()
      .min(2, 'First name must be at least 2 characters')
      .required('First name is required'),
    last_name: yup
      .string()
      .min(2, 'Last name must be at least 2 characters')
      .required('Last name is required'),
    username: yup.string().required(),
    email: yup
      .string()
      .email('Please enter a valid email address')
      .required('Email is required'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    password_confirmation: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Password confirmation is required'),
  })
  .required();

const RegisterForm = () => {
  const router = useRouter();
  const [alert, setAlert] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>({
    resolver: yupResolver(newUserSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    console.log('data onSubmit', data);
    setAlert('');
    const updatedData = {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      username: data.username,
      password: data.password,
    };
    console.log('updatedData', updatedData);
    try {
      if (data.password === data.password_confirmation) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const response = await useSignup(updatedData);
        console.log('response useSignup', response);
        console.log('response.status', response.status);
        if (response.status === 400) {
          console.log('response.status', response.status);
          response.data.error
            ? setAlert(response.data.error)
            : setAlert('Error. Try Again.');
        }
        if (response.status === 401 || response.status === 500) {
          response.data.detail
            ? setAlert(response.data.detail)
            : setAlert('Error creating new user. Please try again');
        }
        if (response.status === 201) {
          console.log('response 201', response);
          router.push('/signin');
        }
      } else {
        setAlert('Passwords do not match');
      }
    } catch (error) {
      console.error('errors', errors); // error from react hook form
      console.error('error', error);
      setAlert('Error creating new user. Please try again');
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="registerFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="First Name"
            {...register('first_name')}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="registerLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Last Name"
            {...register('last_name')}
          />
        </Form.Group>
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

        <Form.Group className="mb-3" controlId="registerFormPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register('password')}
          />
        </Form.Group>

        <Form.Group
          className="mb-3"
          controlId="registerFormPasswordConfirmation"
        >
          <Form.Label>Password Confirmation</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            {...register('password_confirmation')}
          />
        </Form.Group>

        {Object.keys(errors).length > 0 && (
          <div className="alert alert-danger m-1">
            Please fix the following:
            <ul>
              {Object.keys(errors).map((field) => (
                <li key={field}>
                  {/* @ts-ignore */}
                  {errors[field as keyof RegisterFormInputs]?.message}
                </li>
              ))}
            </ul>
          </div>
        )}
        <Button variant="primary" type="submit">
          Sign Up
        </Button>
      </Form>
      {alert ? (
        <Alert className="mt-3" variant="danger" dismissible>
          {alert}
        </Alert>
      ) : null}

      <div className="mt-3">
        <Link href="/signin">Already have an account?</Link>
      </div>
    </>
  );
};

export default RegisterForm;
