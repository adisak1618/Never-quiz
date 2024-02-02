import { z } from 'zod';

const TodoItemTypeSchema = z.object({
  _id: z.string(),
  title: z.string(),
  description: z.string(),
  user_id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// Type inference
export type TodoItemType = z.infer<typeof TodoItemTypeSchema>;

export const parseTodoItem = (data: any): TodoItemType | null => {
  try {
    const result = TodoItemTypeSchema.parse(data); // This will throw an error if the data does not match the schema
  return result;
  } catch (error) {
    return null;
  }
};

export const parseTodosItem = (data: any): TodoItemType[] | null => {
  try {
    const result = z.array(TodoItemTypeSchema).parse(data); // This will throw an error if the data does not match the schema
  return result;
  } catch (error) {
    return null;
  }
};