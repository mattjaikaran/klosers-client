import axios from 'axios';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET;

const BACKEND_ACCESS_TOKEN_LIFETIME = 45 * 60; // 45 minutes
const BACKEND_REFRESH_TOKEN_LIFETIME = 6 * 24 * 60 * 60; // 6 days

const getCurrentEpochTime = () => {
  return Math.floor(new Date().getTime() / 1000);
};

const SIGN_IN_HANDLERS: any = {
  credentials: async (
    user: any,
    account: any,
    profile: any,
    email: any,
    credentials: any
  ) => {
    return true;
  },
};
const SIGN_IN_PROVIDERS = Object.keys(SIGN_IN_HANDLERS);

const providers = [
  GoogleProvider({
    // @ts-ignore
    clientId: CLIENT_ID,
    // @ts-ignore
    clientSecret: CLIENT_SECRET,
  }),
  CredentialsProvider({
    // The name to display on the sign in form (e.g. 'Sign in with...')
    name: 'Credentials',
    // The credentials is used to generate a suitable form on the sign in page.
    // You can specify whatever fields you are expecting to be submitted.
    // e.g. domain, username, password, 2FA token, etc.
    credentials: {
      username: { label: 'Username', type: 'text' },
      password: { label: 'Password', type: 'password' },
    },
    // @ts-ignore
    authorize: async (credentials) => {
      // Add logic here to look up the user from the credentials supplied
      const user = { id: 1, name: 'J Smith', email: 'jsmith@example.com' };

      if (user) {
        // call your DRF sign in endpoint here
        // Any object returned will be saved in `user` property of the JWT
        return Promise.resolve(user);
      } else {
        // If you return null or false then the credentials will be rejected
        return Promise.resolve(null);
        // You can also Reject this callback with an Error or with a URL:
        // return Promise.reject(new Error('error message')) // Redirect to error page
        // return Promise.reject('/path/to/redirect')        // Redirect to a URL
      }
    },
  }),
];

interface Callbacks {
  signIn?: Function;
  jwt?: Function;
  session?: Function;
}

const callbacks: Callbacks = {};

async function getTokenFromAPI(type: string, user: any) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/token/verify`
    );
    console.log('response', response);
    return response;
  } catch (error) {
    console.error('error', error);
  }
}

callbacks.signIn = async function signIn({
  user,
  account,
  profile,
  email,
  credentials,
  metadata,
}: {
  user: any;
  account: any;
  profile: any;
  email: any;
  credentials: any;
  metadata: any;
}) {
  // if (account.provider === 'google') {
  //   const googleUser = {
  //     id: metadata.id,
  //     login: metadata.login,
  //     name: metadata.name,
  //     avatar: user.image,
  //   };

  //   user.accessToken = await getTokenFromAPI('google', googleUser);
  //   return true;
  // }

  // return false;
  if (!SIGN_IN_PROVIDERS.includes(account.provider)) return false;
  return SIGN_IN_HANDLERS[account.provider](
    user,
    account,
    profile,
    email,
    credentials
  );
};

callbacks.jwt = async function jwt({
  user,
  token,
  account,
}: {
  user: any;
  token: any;
  account: any;
}) {
  // if (user) {
  //   token = { accessToken: user.accessToken };
  // }

  // return token;
  // If `user` and `account` are set that means it is a login event
  if (user && account) {
    let backendResponse =
      account.provider === 'credentials' ? user : account.meta;
    token['user'] = backendResponse.user;
    token['access_token'] = backendResponse.access;
    token['refresh_token'] = backendResponse.refresh;
    token['ref'] = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
    return token;
  }
  // Refresh the backend token if necessary
  if (getCurrentEpochTime() > token['ref']) {
    const response = await axios({
      method: 'post',
      url: process.env.NEXTAUTH_BACKEND_URL + 'auth/token/refresh/',
      data: {
        refresh: token['refresh_token'],
      },
    });
    token['access_token'] = response.data.access;
    token['refresh_token'] = response.data.refresh;
    token['ref'] = getCurrentEpochTime() + BACKEND_ACCESS_TOKEN_LIFETIME;
  }
  return token;
};

callbacks.session = async function session({ token }: any) {
  return token;
};

const options = {
  providers,
  callbacks,
};

// @ts-ignore
// export default NextAuth(options);
