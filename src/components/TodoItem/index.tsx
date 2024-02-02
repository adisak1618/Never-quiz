import { TodoItemType, parseTodoItem } from "components/TypeGuard/TodoItemType";
import { format } from "date-fns";
export function TodoItem(todo: TodoItemType) {
  const todoData = parseTodoItem(todo);
  return (
    <div className="px-2">
      <div className="px-3 py-2 border border-gray-200  rounded-md mt-1">
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
      </div>
    </div>
  );
}
