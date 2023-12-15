import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { User, statusTypes } from '@/types/user';
import { useAppDispatch } from '@/lib/store/redux';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import useAxios from '@/lib/utils/axios';
import { updateMyUserDetails } from '@/lib/store/authSlice';

const EditProfileForm = ({ user }: { user: User }) => {
  const api = useAxios();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [error, setError] = useState('');
  const { register, handleSubmit } = useForm<User>({
    defaultValues: user,
  });

  const onSubmit: SubmitHandler<User> = async (data) => {
    setError('');
    try {
      console.log('data in onsubmit EditProfileForm', data);
      const updatedUserData = {
        username: data.username,
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        title: data.title,
        company: data.company,
        market_type: data.market_type,
        linkedin_profile: data.linkedin_profile,
        about: data.about,
        img_url: data.img_url,
        user_status: data.user_status ?? user.user_status,
      };
      const response = await api.patch(`/users/${user.id}/`, updatedUserData);
      console.log('response', response);

      if (response.status === 200) {
        dispatch(updateMyUserDetails(data));
        router.push('/profile');
      }
      return response;
    } catch (error: any) {
      console.log('error in onSubmit - EditProfileForm', error);
      if (error.response) {
        console.log(error.response.data);
      }
    }
  };

  return (
    <>
      {error ? <Alert variant="danger">{error}</Alert> : null}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="editProfileFormUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            defaultValue={user.username}
            {...register('username')}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="editProfileFormEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Email"
            defaultValue={user.email}
            {...register('email')}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="editProfileFormFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter First Name"
            defaultValue={user.first_name}
            {...register('first_name')}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="editProfileFormLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Last Name"
            defaultValue={user.last_name}
            {...register('last_name')}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="editProfileFormImgUrl">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Image URL"
            defaultValue={user.img_url}
            {...register('img_url')}
          />
          <Form.Text className="text-muted">
            How to add URL link{' '}
            <a
              href="https://support.google.com/websearch/answer/118238"
              target="_blank"
            >
              here
            </a>
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="editProfileFormTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            defaultValue={user.title}
            {...register('title')}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="editProfileFormCompany">
          <Form.Label>Company</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Company"
            defaultValue={user.company}
            {...register('company')}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="editProfileFormMarketType">
          <Form.Label>Market Type</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Market Type"
            defaultValue={user.market_type}
            {...register('market_type')}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="editProfileFormAbout">
          <Form.Label>About</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="About"
            defaultValue={user.about}
            {...register('about')}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="editProfileFormLinkedIn">
          <Form.Label>LinkedIn</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Linkedin"
            defaultValue={user.linkedin_profile}
            {...register('linkedin_profile')}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="editProfileFormUserStatus">
          <Form.Label>Status</Form.Label>
          <Form.Select
            aria-label="Default select example"
            {...register('user_status')}
          >
            {statusTypes.map((type: any) => (
              <option key={type.id} value={type.value}>
                {type.value}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default EditProfileForm;
