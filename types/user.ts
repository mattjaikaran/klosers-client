export interface RegisterFormInputs {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
  // reference1?: string;
  // reference2?: string;
  // references?: string[] | Reference[];
}

export interface Reference {
  user_id?: string;
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

export interface Intro {
  id?: string;
  user_to: string;
  user_from: string;
  message: string;
  accepted?: boolean;
  accepted_date?: string;
  declined?: boolean;
  declined_date?: string;
  datetime_created?: string;
}

// Data from the back end
export interface User {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  about?: string;
  user_status?: string;
  title: string;
  company: string;
  profile_visibility: string;
  linkedin_profile: string;
  user_fit_score?: number;
  img_url?: string;
  is_sales_rep: boolean;
  is_company: boolean;
  leaderboard_access: boolean;
  market_type: string;
  is_active: boolean;
  is_staff: boolean;
  token?: string;
  refresh?: string;
}

// user status types
export const OPEN_TO_OPPORTUNITIES = 'Open to New Opportunities';
export const ACTIVELY_LOOKING = 'Actively Looking for New Role';
export const WILL_TAKE_CALL = 'Will Take the Call';
export const NOT_INTERESTED = 'Not Interested in New Opportunities';

export const statusTypes = [
  {
    id: 1,
    value: OPEN_TO_OPPORTUNITIES,
  },
  {
    id: 2,
    value: ACTIVELY_LOOKING,
  },
  {
    id: 3,
    value: WILL_TAKE_CALL,
  },
  {
    id: 4,
    value: NOT_INTERESTED,
  },
];
