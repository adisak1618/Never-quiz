import axios from "axios";
import { getSession, signOut, useSession } from "next-auth/react";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT,
});
client.interceptors.request.use(async function (config) {
  const session = await getSession();
  console.log("session", (session as any)?.accessToken);
  if (session) {
    config.headers.Authorization = `Bearer ${(session as any)?.accessToken}`;
  }
  return config;
});

client.interceptors.response.use(
  (config) => config,
  async (error) => {
    if (axios.isAxiosError(error)) {
      const { response } = error;

      if (response && response.status === 401) {
        signOut({
          callbackUrl: "/",
          redirect: true,
        });
      }
    }

    return Promise.reject(error);
  }
);

export default client;
