import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const options = {
  debug: true,
  providers: [
    GoogleProvider({
      name: "google",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "test@test.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/auth/local`,
            {
              identifier: credentials.email,
              password: credentials.password,
            }
          );
          if (data) {
            return data;
          } else {
            return null;
          }
        } catch (e) {
          // const errorMessage = e.response.data.message
          // Redirecting to the login page with error message          in the URL
          // throw new Error(errorMessage + '&email=' + credentials.email)
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    jwt: true,
  },

  callbacks: {
    // The JWT callback is executed after a sign-in attempt or when a session is used
    jwt: async (obj) => {
      const { user, token, account } = obj;
      const isSignIn = user ? true : false;

      if (obj.account?.provider === "google") {
        if (isSignIn) {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/auth/${account.provider}/callback?access_token=${account?.access_token}`
          );

          console.log(
            "DEBUG: link: ",
            `${process.env.NEXT_PUBLIC_STRAPI_BASE_URL}/api/auth/${account.provider}/callback?access_token=${account?.access_token}`
          );
          const data = await response.json();

          token.jwt = data.jwt;
          token.id = data.user.id;
        }
      }
      if (obj.account?.provider === "credentials") {
        if (isSignIn) {
          token.jwt = user.jwt;
          token.id = user.user.id;
          token.name = user.user.username;
          token.email = user.user.email;
        }
      }
      return Promise.resolve(token);
    },

    session: async (obj) => {
      const { session, token } = obj;
      session.jwt = token.jwt;
      session.id = token.id;
      return Promise.resolve(session);
    },
  },
};

export default (req, res) => {
  return NextAuth(req, res, options);
};
