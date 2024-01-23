import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { Award } from '@/types/stats';
import { useRouter } from 'next/router';
import { useUpdateAwardMutation } from '@/lib/store/awardApi';

const EditAwardForm = ({ item }: { item: Award }) => {
  const router = useRouter();
  const [error, setError] = useState('');
  const { register, handleSubmit } = useForm<Award>();
  const [updateAward, { isLoading }] = useUpdateAwardMutation();

  console.log('item Award in EditAwardForm', item);
  console.log('isLoading', isLoading);

  const onSubmit: SubmitHandler<Award> = async (data) => {
    try {
      const updatedAward = {
        id: item?.id,
        ...data,
      };
      const response = await updateAward(updatedAward);
      console.log('response onSubmit EditAwardForm', response);
      // @ts-ignore
      if (response.data) {
        router.push('/profile');
      }
    } catch (error: any) {
      console.error('error', error);
      if (error.response) {
        setError(error.response.data.detail);
      }
    }
  };

  return (
    <>
      {isLoading || !item?.type ? <p>Loading...</p> : null}
      {error ? <p>{error}</p> : null}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formEditAwardStatType">
          <Form.Label>Type</Form.Label>
          <Form.Control
            type="text"
            defaultValue={item?.type}
            placeholder="Enter Award Type"
            {...register('type')}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEditAwardStatText">
          <Form.Label>Award Text</Form.Label>
          <Form.Control
            type="text"
            defaultValue={item?.text}
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
      {error ? (
        <Alert className="mt-3" variant="danger">
          {error}
        </Alert>
      ) : null}
    </>
  );
};

export default EditAwardForm;
