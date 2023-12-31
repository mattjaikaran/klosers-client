import useAxios from '@/lib/utils/axios';
import { useForm, SubmitHandler } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { AwardRecognitionInputs } from '@/types/stats';
import { useRouter } from 'next/router';

const EditAwardRecognitionForm = ({
  item,
}: {
  item: AwardRecognitionInputs;
}) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AwardRecognitionInputs>();
  const api = useAxios();

  console.log('item', item);

  const onSubmit: SubmitHandler<AwardRecognitionInputs> = async (data) => {
    try {
      console.log(data);
      const response = await api.patch(`/awards/${item.id}/`, data);
      console.log('response', response);
      if (response.status === 200) {
        router.push('/profile');
      }
      return response;
    } catch (error) {
      console.error('error', error);
    }
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="formEditAwardStatType">
        <Form.Label>Type</Form.Label>
        <Form.Control
          type="text"
          defaultValue={item.type}
          placeholder="Q3"
          {...register('type')}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEditAwardStatText">
        <Form.Label>Award Text</Form.Label>
        <Form.Control
          type="text"
          defaultValue={item.text}
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

export default EditAwardRecognitionForm;
