import { useState, useEffect } from 'react';
import { useAppSelector } from '@/lib/store/redux';
import useAxios from '@/lib/utils/axios';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';

import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { Intro } from '@/types/user';

const NewIntroForm = () => {
  const [salesRep, setSalesRep] = useState<any>({});
  const [error, setError] = useState('');
  const api = useAxios();
  const router = useRouter();
  const { user }: any = useAppSelector((state) => state.auth);
  console.log('user', user);
  console.log('user.data', user.data);

  console.log('router.query.sales_rep', router.query.sales_rep);

  // get user from router.query.sales_rep
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/users/${router.query.sales_rep}/`);
        console.log('response fetchUser NewReferenceForm', response);
        console.log('response.data', response.data);
        if (response.status === 200 && response.data.id) {
          setSalesRep(response.data);
          console.log('salesRep', salesRep);
        }
      } catch (error: any) {
        console.log('error', error);

        if (error.response) {
          console.log('error.response', error.response);
          console.log('error.response.data', error.response.data);
          setError(error.response.data);
        }
      }
    };
    if (router.query.sales_rep?.length) {
      fetchUser();
    } else {
      console.log('router.query.sales_rep is empty');
      // router.push('/leaderboard');
    }
  }, [router.query.sales_rep]);

  console.log('salesRep', salesRep);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Intro>();

  const onSubmit: SubmitHandler<Intro> = async (data) => {
    console.log('data SubmitHandler NewIntroForm', data);
    try {
      const newIntro = {
        user_from: user.data.id,
        user_to: salesRep.id,
        message: data.message,
      };
      console.log('newIntro', newIntro);
      const response = await api.post('/intros/', newIntro);
      console.log('response', response);
      if (response.status === 201) {
        router.push('/leaderboard');
      }
      if (response.status === 500) {
        setError('Something went wrong. Redirecting you to the leaderboard');
        setTimeout(() => {
          router.push('/leaderboard');
        }, 3000);
      }
    } catch (error: any) {
      console.log('error', error);
      if (error.response) {
        console.log('error.response', error.response);
        console.log('error.response.data', error.response.data);
      }
    }
  };

  console.log('errors from react hook form', errors);

  if (!router.query.sales_rep && !salesRep.id) {
    return <Spinner />;
  } else {
    return (
      <>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="formIntroMessage">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              {...register('message', { required: true })}
            />
            {errors.message && (
              <Form.Text className="text-danger">
                {errors.message.message}
              </Form.Text>
            )}
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        {error.length ? (
          <Alert variant="danger" className="mt-3">
            {error}
          </Alert>
        ) : null}
      </>
    );
  }
};

export default NewIntroForm;
