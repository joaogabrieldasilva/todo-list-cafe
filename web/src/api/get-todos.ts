import { api } from ".";

type Params = {
  category?: string;
};

export const getTodos = async ({ category }: Params) => {
  const response = await api.get("/v1/todos", {
    params: {
      ...(category ? { category } : {}),
    },
  });

  return response.data;
};
