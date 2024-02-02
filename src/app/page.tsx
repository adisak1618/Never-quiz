"use client";

import { useQuery } from "@tanstack/react-query";
import axiosClient from "components/AxiosClient";
import { useEffect } from "react";

export default function Home() {
  const { isPending, error, data } = useQuery({
    queryKey: ["todos"],
    queryFn: () =>
      axiosClient.get("/todos").then((res) => {
        console.log("res", res);
        return res.data;
      }),
    // queryFn: () =>
    //   fetch("https://api.github.com/repos/TanStack/query").then((res) =>
    //     res.json()
    //   ),
  });
  useEffect(() => {
    axiosClient.get("/todos").then((res) => {
      console.log("res", res);
      return res.data;
    });
  }, []);
  return (
    <div>
      <h1>TODOS</h1>
      <div>{JSON.stringify(data)}</div>
    </div>
  );
}
