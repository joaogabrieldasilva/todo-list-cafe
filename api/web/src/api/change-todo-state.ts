import { api } from ".";

type Params = {
  id: number;
  completed: boolean;
};

export const changeTodoState = async ({ id, completed }: Params) => {
  await api.patch(`/v1/todos/${id}/state`, {
    completed,
  });
};
