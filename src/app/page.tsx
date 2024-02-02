"use client";

import { useQuery } from "@tanstack/react-query";
import axiosClient from "components/AxiosClient";
import { AddTodoButton } from "components/MainNavigation";
import { TodoItem } from "components/TodoItem";
import { TodosSkeleton } from "components/TodosSkeleton";
import { parseTodosItem } from "components/TypeGuard/TodoItemType";
import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";

export default function Home() {
  const { isPending, error, data } = useQuery({
    queryKey: ["todos"],
    queryFn: () =>
      axiosClient.get("/todos").then((res) => {
        console.log("res", res);
        return res.data;
      }),
  });

  const todosData = parseTodosItem(data);

  return (
    <div className="container bg-gradient-to-t from-gray-300 to-gray-100 max-w-screen-sm w-full mx-auto h-screen flex flex-col overflow-x-hidden">
      <div className="relative border-b border-gray-200 bg-white drop-shadow-md">
        <h1 className="text-2xl font-bold p-4 text-center">
          To(Never) Do List
        </h1>
        <div
          onClick={() => signOut()}
          className="p-3 bg-gray-100 hover:bg-gray-200 rounded-md absolute right-2 top-2"
        >
          <LogOutIcon />
        </div>
      </div>
      <div className="flex-1 py-4 space-y-3 overflow-y-auto">
        {isPending && <TodosSkeleton />}
        {todosData?.length === 0 && (
          <div className="py-20 px-4 text-center">
            <p className="text-2xl text-gray-700">
              Click + Button to create your new todo
            </p>
            <p className="text-lg text-gray-400">
              Swipe Todo to Left or Right to see more action
            </p>
          </div>
        )}
        {todosData?.reverse()?.map((todo) => (
          <TodoItem key={todo._id} {...todo} />
        ))}
      </div>
      <AddTodoButton />
    </div>
  );
}
