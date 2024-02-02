import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosClient from "components/AxiosClient";
import { useToast } from "components/ui/use-toast";
import { TodoItemType, parseTodoItem } from "components/TypeGuard/TodoItemType";
import { format } from "date-fns";
import {
  PanInfo,
  motion,
  useDragControls,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { Trash2Icon, CheckCheckIcon } from "lucide-react";

const deleteTodoasync = async ({ id }: { id: string }) => {
  const response = await axiosClient.delete(`/todos/${id}`);

  if (response.status !== 200) {
    throw new Error("Failed to update user");
  }

  return "success";
};

export function TodoItem(todo: TodoItemType) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation({
    mutationFn: deleteTodoasync,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
  const todoData = parseTodoItem(todo);
  const controls = useDragControls();
  const x = useMotionValue(0);
  const doneX = useTransform(x, [0, 100], [0, 1], {
    clamp: true,
  });
  const deleteX = useTransform(x, [0, -100], [0, 1], {
    clamp: true,
  });

  const handleDragEnd = async (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.x >= 200) {
      await mutateAsync({
        id: todoData?._id!,
      });
      toast({
        title: `Todo: ${todoData?.title} has been delete!`,
      });
    }
    if (info.offset.x <= -200) {
      toast({
        title: "Todo one action is not exist",
        description: "there is no api for this feature yet!",
      });
    }
  };

  return (
    <div className="px-2">
      {/* <motion.div style={{ x: x }}>HI</motion.div> */}
      <motion.div
        initial={{
          x: "-100%",
          opacity: 0,
        }}
        whileInView={{
          x: "0%",
          opacity: 1,
        }}
        exit={{
          x: "-100%",
          opacity: 0,
        }}
        viewport={{
          once: true,
        }}
        transition={{ duration: 0.2 }}
        className="rounded-md relative"
      >
        <motion.div
          className="px-3 py-2 border border-gray-200 bg-white rounded-md mt-1 relative z-10 cursor-pointer"
          style={{ x }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragDirectionLock
          dragControls={controls}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-3">
            <p className="flex-1 font-bold">Adisakchaiyakul</p>
            <div className="flex gap-2 text-gray-400">
              <p>{format(new Date(todoData?.createdAt || ""), "dd MMM")}</p>
              <p>{format(new Date(todoData?.createdAt || ""), "hh:mm")}</p>
            </div>
          </div>
          <p className="line-clamp-1 pt-1">{todoData?.title}</p>
          <p className="line-clamp-1 text-gray-400 font-light">
            {todoData?.description}
          </p>
        </motion.div>
        <motion.div
          style={{ opacity: doneX }}
          className="absolute flex items-center w-1/2 h-full bg-red-500 left-0 top-0 rounded-md"
        >
          <Trash2Icon className="w-10 h-10 text-white ml-4" />
        </motion.div>
        <motion.div
          style={{ opacity: deleteX }}
          className="absolute w-1/2 h-full bg-green-500 right-0 top-0 rounded-md flex items-center justify-end"
        >
          <CheckCheckIcon className="w-10 h-10 text-white mr-4" />
        </motion.div>
      </motion.div>
    </div>
  );
}
