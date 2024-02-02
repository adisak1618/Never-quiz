"use client";

import { useQuery } from "@tanstack/react-query";
import axiosClient from "components/AxiosClient";
import { AddTodoButton } from "components/MainNavigation";
import { TodoItem } from "components/TodoItem";
import { parseTodosItem } from "components/TypeGuard/TodoItemType";
import { useEffect } from "react";

export default function Home() {
  const { isPending, error, data } = useQuery({
    queryKey: ["todos"],
    queryFn: () =>
      axiosClient.get("/todos").then((res) => {
        console.log("res", res);
        return res.data;
      }),
  });

  return (
    <div className="container max-w-screen-sm w-full mx-auto min-h-screen flex flex-col overflow-x-hidden">
      <div className="border-b border-gray-200">
        <h1 className="text-2xl font-bold p-4 text-center">
          To(Never) Do List
        </h1>
      </div>
      <div className="flex-1 py-4">
        {parseTodosItem(data)
          ?.reverse()
          ?.map((todo) => (
            <TodoItem key={todo._id} {...todo} />
          ))}
      </div>
      <AddTodoButton />
    </div>
  );
}
