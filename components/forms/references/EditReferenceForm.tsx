import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';

import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import { Reference } from '@/types/user';
import {
  useUpdateReferenceMutation,
  useGetReferenceQuery,
} from '@/lib/store/referenceApi';

const EditReferenceForm = ({ reference }: { reference: string }) => {
  const router = useRouter();
  const {
    data: referenceData,
    error: referencesError,
    isLoading,
  } = useGetReferenceQuery(reference);

  const [updateReference] = useUpdateReferenceMutation();

  console.log('referenceData', referenceData);
  console.log('referencesError', referencesError);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Reference>({
    defaultValues: referenceData,
  });

  const onSubmit: SubmitHandler<Reference> = async (data) => {
    try {
      console.log(data);
      const newReference = {
        id: referenceData?.id,
        first_name:
          !data.first_name.length ||
          data.first_name === referenceData?.first_name
            ? referenceData?.first_name
            : data.first_name,
        last_name:
          !data.last_name.length || data.last_name === referenceData?.last_name
            ? referenceData?.last_name
            : data.last_name,
        email:
          !data.email.length || data.email === referenceData?.email
            ? referenceData?.email
            : data.email,
        phone:
          !data.phone.length || data.phone === referenceData?.phone
            ? referenceData?.phone
            : data.phone,
      };
      console.log('newReference onSubmit', newReference);
      const updateReferenceResponse = await updateReference(newReference);
      console.log('updateReferenceResponse', updateReferenceResponse);

      // if updateReferenceResponse.data is true, redirect to profile page
      // @ts-ignore
      if (updateReferenceResponse.data) {
        router.push('/profile');
      }
    } catch (error: any) {
      console.log('error onSubmit', error);
      if (error.response) {
        console.log('error.response', error.response);
      }
    }
  };
  return (
    <>
      {isLoading ? <Spinner /> : null}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formReferenceFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            defaultValue={referenceData?.first_name}
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
            defaultValue={referenceData?.last_name}
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
            defaultValue={referenceData?.email}
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
            defaultValue={referenceData?.phone}
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
        <Alert className="mt-3" variant="danger">
          <ul>
            {Object.keys(errors).map((keyName, i) => (
              // @ts-ignore
              <li key={i}>{errors[keyName].message}</li>
            ))}
          </ul>
        </Alert>
      )}
      {/* @ts-ignore */}
      {referencesError ? <p>{referencesError}</p> : null}
    </>
  );
};

export default EditReferenceForm;
