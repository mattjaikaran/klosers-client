import { useAppSelector } from '@/lib/store/redux';
import useAxios from '@/lib/utils/axios';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Reference } from '@/types/user';
import { useEffect, useState } from 'react';

const EditReferenceForm = ({ reference }: { reference: string }) => {
  const [referenceData, setReferenceData] = useState<Reference>(
    {} as Reference
  );
  const api = useAxios();
  const router = useRouter();
  const { user }: any = useAppSelector((state) => state.auth);

  useEffect(() => {
    const renderReferenceData = async () => {
      try {
        const response = await api.get(`/references/${reference}/`);
        console.log('response renderReferenceData', response);
        console.log('response.data', response.data);
        setReferenceData(response.data);
      } catch (error) {
        console.error('error', error);
      }
    };
    if (reference) renderReferenceData();
  }, [reference]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Reference>({
    // @ts-ignore
    defaultValues: referenceData,
  });

  console.log('errors from react hook form', errors);

  const onSubmit: SubmitHandler<Reference> = async (data) => {
    try {
      console.log(data);
      const newReference = {
        first_name: data.first_name || referenceData.first_name,
        last_name: data.last_name || referenceData.last_name,
        email: data.email || referenceData.email,
        phone: data.phone || referenceData.phone,
      };
      console.log('newReference', newReference);
      const response = await api.patch(
        `/references/${reference}/`,
        newReference
      );
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
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formReferenceFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            defaultValue={referenceData.first_name}
            placeholder="Enter first name"
            {...register('first_name')}
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
            defaultValue={referenceData.last_name}
            placeholder="Enter last name"
            {...register('last_name')}
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
            defaultValue={referenceData.email}
            placeholder="Enter email"
            {...register('email')}
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
            defaultValue={referenceData.phone}
            placeholder="Enter phone number"
            {...register('phone')}
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

export default EditReferenceForm;
