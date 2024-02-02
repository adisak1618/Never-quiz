import NextAuth, { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";
import axios from "axios";

export const authOptions: AuthOptions = {
  
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24 * 356,
  },
  providers: [
    Credentials({
      name: "Email",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          const { data, status } = await axios.request({
            method: "post",
            url: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/auth`,
            headers: { 
              'Content-Type': 'application/json'
            },
            data: {
              username: credentials.email,
              password: credentials?.password
            }
          });

          if(status !== 200)  throw new Error("unauthorized")
            console.log("data", data)
          return {
            id: "",
            accessToken: data.token,
            email: "",
            firstName: "",
            lastName: "",
          };
          
        } catch (error) {
          throw new Error("password incorrect!");
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user, trigger, session }: any) {
      // console.log("JWT user", user);
      if (trigger === "update" && session?.accessToken) {
        token.accessToken = session.accessToken;
      }
      if (typeof user !== "undefined") {
        return user as unknown as JWT;
      }
      return token;
    },
    session(props: any) {
      // console.log("props", props)
      const { session, token, trigger, newSession } = props;

      if (trigger === "update" && newSession?.newAccessToken) {
        session.accessToken = newSession.newAccessToken;
      }
      return {
        ...session,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        authTokenExpiration: token.authTokenExpiration,
        refreshTokenExpiration: token.refreshTokenExpiration,
      };
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
