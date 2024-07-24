import { api } from ".";

type Params = {
  description: string;
  category: string;
};

export const createTodo = async ({ description, category }: Params) => {
  const response = await api.post("/v1/todos", {
    description,
    category,
  });

  return response.data;
};
