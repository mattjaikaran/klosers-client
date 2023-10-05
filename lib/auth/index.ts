import axios from 'axios';
import Cookies from 'js-cookie';

export interface UserProps {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  title?: string;
  company?: string;
  profile_visibility?: string;
  market_type?: string;
  all_time_revenue?: string;
  linkedin_profile?: string;
  role?: string;
  access?: string;
  token?: string;
}

export interface LoginFormInputs {
  username: string;
  password: string;
}

export interface SignupFormInputs {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password1: string;
  password2: string;
}
export interface PasswordResetInputs {
  newPassword: string;
  newPassword2: string;
  uid: string;
  token: string;
}

export interface SignupResponseData {
  first_name: string;
  last_name: string;
  email: string;
}
import { useAppSelector } from '../store/redux';

export const tokenHeaders = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { user }: any = useAppSelector((state) => state.auth);
  const headers = {
    'Content-Type': 'application/json',
    'X-CSRFToken': Cookies.get('csrftoken'),
    Authorization: `Bearer ${user?.data?.token}`,
  };
  return headers;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function useSignup(data: SignupFormInputs) {
  try {
    const response = await axios.post(`${API_URL}/auth/register/`, data);
    console.log('response', response);
    return response;
  } catch (error: any) {
    console.log('error in useSignup', error);
    return error.response;
  }
}
export async function useLogin(data: LoginFormInputs): Promise<any> {
  try {
    const response = await axios.post(`${API_URL}/auth/login/`, data);
    return response;
  } catch (error: any) {
    console.log('error in useLogin', error);
    return error.response;
  }
}

export async function useLogout(user: UserProps): Promise<any> {
  try {
    const response = await axios.post(`${API_URL}/auth/logout/`, user.token);
    console.log('response', response);
    if (response.status === 200) {
      localStorage.clear();
      return response;
    }
  } catch (error: any) {
    console.log('error in useLogout', error);
    return error.response;
  }
}

export async function useForgotPassword(email: string) {
  try {
    const data = { email: email.toLowerCase() };
    const response = await axios.post(`${API_URL}/password/reset/`, data);
    console.log('response', response);
    return response.data;
  } catch (error: any) {
    console.log('error in useForgotPassword', error);
    return error.response;
  }
}

export async function usePasswordReset(data: PasswordResetInputs) {
  try {
    const response = await axios.post(
      `${API_URL}/password/reset/confirm/`,
      data
    );
    console.log('response', response);
    return response.data;
  } catch (error: any) {
    console.log('error in useForgotPassword', error);
    return error.response;
  }
}
