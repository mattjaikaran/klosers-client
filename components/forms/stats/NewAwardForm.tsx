import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '@/lib/store/redux';
import { useRouter } from 'next/router';
import { Award } from '@/types/stats';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getMyUserAwards } from '@/lib/store/authSlice';
import { useCreateAwardMutation } from '@/lib/store/awardApi';

const NewAwardForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Award>();
  const [createAward, { isLoading }] = useCreateAwardMutation();
  const router = useRouter();
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  const { user }: any = useAppSelector((state) => state.auth);

  const onSubmit: SubmitHandler<Award> = async (data) => {
    setError('');
    try {
      const newAward = {
        user: user.data.id,
        type: data.type,
        text: data.text,
      };
      const response = await createAward(newAward);
      console.log('response onSubmit NewAwardForm', response);
      // @ts-ignore
      if (response.data) {
        dispatch(getMyUserAwards(''));
        router.push('/profile');
      }
    } catch (error) {
      console.error('error', error);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="formAwardStatType">
        <Form.Label>Type</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Award Type"
          {...register('type')}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formAwardStatText">
        <Form.Label>Award Text</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Award Text"
          {...register('text')}
        />
      </Form.Group>
      <div className="mt-4">
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Button variant="light" onClick={() => router.push('/profile')}>
          Cancel
        </Button>
      </div>
    </Form>
  );
};

export default NewAwardForm;
