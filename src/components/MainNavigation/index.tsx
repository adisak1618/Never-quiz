import { PlusIcon } from "lucide-react";

export function AddTodoButton() {
  return (
    <div className="fixed w-20 h-20 bg-teal-700 rounded-full bottom-4 left-1/2 -ml-10 shadow-xl flex items-center justify-center">
      <PlusIcon className="w-10 h-10 text-white" />
    </div>
  );
}
