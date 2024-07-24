import { api } from ".";

type Params = {
  id: number;
};

export const deleteTodo = async ({ id }: Params) => {
  await api.delete(`/v1/todos/${id}`);

  return { id };
};
