"use client";

import { z } from "zod";
import axiosClient from "components/AxiosClient";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HFInput } from "components/HookFormInput/HFInput";
import { Button } from "components/ui/button";
import { SaveIcon } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const TodoFormValidation = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

type TodoFormProps = {
  title: number;
  description: number;
};

const createTodoasync = async ({ description, title }: TodoFormProps) => {
  const response = await axiosClient.post("/todos", { description, title });

  if (response.status !== 200) {
    throw new Error("Failed to update user");
  }

  return "success";
};

type AddTodoFormType = {
  onSuccess?: () => void;
};

export function AddTodoForm({ onSuccess }: AddTodoFormType) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: createTodoasync,
    onSuccess: () => {
      queryClient.invalidateQueries();
      onSuccess?.();
    },
  });
  const methods = useForm<TodoFormProps>({
    mode: "all",
    resolver: zodResolver(TodoFormValidation),
  });

  const onSubmit: SubmitHandler<TodoFormProps> = ({ title, description }) => {
    mutate({
      title,
      description,
    });
  };
  return (
    <div className="container max-w-screen-sm w-full mx-auto min-h-screen flex flex-col overflow-x-hidden">
      <div className="border-b border-gray-200">
        <h1 className="text-2xl font-bold p-4 text-center">Add New Todo</h1>
      </div>
      <div className="flex-1 py-4">
        <FormProvider {...methods}>
          <form
            className="space-y-3 px-3"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <div>
              <HFInput name="title" placeholder="title" />
            </div>
            <HFInput name="description" placeholder="description" />
            <div className="text-center">
              <Button size="lg" className="gap-2 text-lg pl-5">
                <SaveIcon className="w-4 h-4" />
                เพิ่ม
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
      <div></div>
    </div>
  );
}
