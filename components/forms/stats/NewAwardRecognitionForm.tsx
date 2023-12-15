import useAxios from '@/lib/utils/axios';
import { useAppDispatch, useAppSelector } from '@/lib/store/redux';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AwardRecognitionInputs } from '@/types/stats';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';
import { getMyUserAwards } from '@/lib/store/authSlice';

const NewAwardRecognitionForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AwardRecognitionInputs>();
  const api = useAxios();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const data: any = useAppSelector((state) => state.auth);
  const user: any = data.user.data;

  const onSubmit: SubmitHandler<AwardRecognitionInputs> = async (data) => {
    try {
      console.log(data);
      const newAwardStat = {
        user: user.id,
        type: data.type,
        text: data.text,
      };
      console.log('newAwardStat', newAwardStat);
      const response = await api.post('/awards/', newAwardStat);
      console.log('response', response);
      if (response.status === 201) {
        const updatedAwards = await api.get(`/awards/?user=${user.id}`);
        console.log('updatedAwards', updatedAwards);
        dispatch(getMyUserAwards(updatedAwards.data));
        router.push('/profile');
      }
      return response;
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

export default NewAwardRecognitionForm;
