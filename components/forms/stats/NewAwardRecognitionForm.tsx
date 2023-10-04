import useAxios from '@/lib/utils/axios';
import { useAppSelector } from '@/lib/store/redux';
import { useForm, SubmitHandler } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export interface AwardRecognitionInputs {
  type: string;
  text: string;
}

const NewAwardRecognitionForm = ({ closeModal }: { closeModal: any }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AwardRecognitionInputs>();
  const api = useAxios();
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
      const response = await api.post(
        '/awards-recognition-stats/',
        newAwardStat
      );
      console.log('response', response);
      if (response.status === 201) {
        closeModal();
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
        <Form.Control type="text" placeholder="Q3" {...register('type')} />
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
        <Button variant="light" onClick={closeModal}>
          Cancel
        </Button>
      </div>
    </Form>
  );
};

export default NewAwardRecognitionForm;
