import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store/redux';
import useAxios from '@/lib/utils/axios';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Reference } from '@/types/user';
import { updateMyUserDetails } from '@/lib/store/authSlice';
import {
  useGetReferencesQuery,
  useCreateReferenceMutation,
} from '@/lib/store/referenceApi';

// yup validation
const schema = yup.object().shape({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.string().required(),
});

const descriptionText = `To get your quota verification checkmark, please add references who will back your performance`;

const NewReferenceForm = () => {
  const [serverError, setServerError] = useState('');

  const api = useAxios();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user }: any = useAppSelector((state) => state.auth);
  console.log('user', user);
  console.log('user.data', user.data);
  const { data, error: referencesError, isLoading } = useGetReferencesQuery();
  const [createReference, { error: createReferenceError }] =
    useCreateReferenceMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Reference>({
    resolver: yupResolver(schema),
  });

  console.log('errors from react hook form', errors);

  const onSubmit: SubmitHandler<Reference> = async (
    data: Partial<Reference>
  ) => {
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

      // rtk query
      const response = await createReference(newReference);
      console.log('response', response);

      // @ts-ignore
      if (response?.data) {
        // update the user state via updateMyUserDetails and api.get(users/userid)
        const updatedReferences = await api.get(`/users/${user.data.id}/`);
        console.log('updatedReferences', updatedReferences);
        dispatch(updateMyUserDetails(updatedReferences.data));
        router.push('/profile');
      }

      // @ts-ignore
      if (response?.error) {
        setServerError(
          'Something went wrong. Redirecting you to your profile.'
        );
        setTimeout(() => {
          setServerError('');
          router.push('/profile');
        }, 3000);
      }
      return response;
    } catch (error: any) {
      console.error('error', error);
      console.log('error.response', error.response);
      if (error.response) {
        setServerError(error.response.data.message);
      }
    }
  };
  return (
    <>
      <p>{descriptionText}</p>
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
