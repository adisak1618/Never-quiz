import axios from "axios";
import { getSession, useSession } from "next-auth/react";

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

export default client;
