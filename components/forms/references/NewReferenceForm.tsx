import { useAppSelector } from '@/lib/store/redux';
import useAxios from '@/lib/utils/axios';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Reference } from '@/types/user';

// yup validation
const schema = yup.object().shape({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
});

const NewReferenceForm = () => {
  const api = useAxios();
  const router = useRouter();
  const { user }: any = useAppSelector((state) => state.auth);
  console.log('user', user);
  console.log('user.data', user.data);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Reference>({
    resolver: yupResolver(schema),
  });

  console.log('errors from react hook form', errors);

  const onSubmit: SubmitHandler<Reference> = async (data) => {
    try {
      console.log(data);
      const newReference = {
        user_id: user.data.id,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
      };
      console.log('newReference', newReference);
      const response = await api.post('/references/', newReference);
      console.log('response', response);
      if (response.status === 201) {
        router.push('/profile');
      }
      return response;
    } catch (error) {
      console.error('error', error);
    }
  };
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formReferenceFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter first name"
            {...register('first_name', { required: true })}
          />
          {errors.first_name && (
            <Form.Text className="text-danger">
              Please enter your first name.
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formReferenceLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last name"
            {...register('last_name', { required: true })}
          />
          {errors.last_name && (
            <Form.Text className="text-danger">
              Please enter your last name.
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formReferenceEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            {...register('email', { required: true })}
          />
          {errors.email && (
            <Form.Text className="text-danger">
              Please enter your email.
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formReferencePhoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter phone number"
            {...register('phone', { required: true })}
          />
          {errors.phone && (
            <Form.Text className="text-danger">
              Please enter your phone number.
            </Form.Text>
          )}
        </Form.Group>
        <Button type="submit" className="btn btn-primary">
          Submit
        </Button>
      </Form>
      {/* loop thru validation errors */}
      {Object.keys(errors).length > 0 && (
        <ul>
          {Object.keys(errors).map((keyName, i) => (
            // @ts-ignore
            <li key={i}>{errors[keyName].message}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default NewReferenceForm;
