import { changeTodoState } from "@/api/change-todo-state";
import { deleteTodo } from "@/api/delete-todo";
import { getTodos } from "@/api/get-todos";
import { TodoItem } from "@/components/todo-item";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useEffect, useMemo } from "react";
import { Link, useMatch } from "react-router-dom";

type Todo = {
  description: string;
  id: number;
  checked: boolean;
  category: string;
};

export function Todos() {
  const match = useMatch("/dashboard/:filter/*");

  const queryClient = useQueryClient();

  const activeSection =
    match?.params?.filter && match.params.filter !== "all"
      ? match.params.filter
      : null;

  const changeTodoStateMutation = useMutation({
    mutationFn: ({ id, checked }: { id: number; checked: boolean }) => {
      return changeTodoState({ id, completed: checked });
    },

    onError: (_, __, context) => {
      queryClient.setQueryData(["todos"], context.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: async ({ id }: { id: number }) => deleteTodo({ id }),

    onError: (_, __, context) => {
      queryClient.setQueryData(["todos"], context.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const { data: todos = [] } = useQuery<Todo[]>({
    queryKey: ["todos", activeSection],
    queryFn: async () => getTodos({ category: activeSection || undefined }),
  });

  const todosCategories = useMemo(
    () => [...new Set(todos)].map((item) => item.category),
    [todos]
  );

  const todosByCategory = useMemo(() => {
    return Object.entries(
      Object.groupBy(todos, ({ category }) => category)
    ) as [[string, typeof todos]];
  }, [todos]);

  return (
    <div className="w-screen h-screen overflow-y-scroll">
      <div className="flex items-center justify-between px-4 mt-4">
        <div className="">
          <h2 className="scroll-m-20  text-3xl font-semibold tracking-tight">
            Olá, João
          </h2>
          <p className="leading-7">It's tuesday, 25 September 2024</p>
        </div>
        <Link to="create-todo">
          <Plus size={30} />
        </Link>
      </div>

      <div className="p-4 flex flex-col gap-y-2 w-full ">
        {todos ? (
          <Accordion
            key={todos.length}
            type="multiple"
            defaultValue={todosCategories}
          >
            {todosByCategory.map(([category, todos]) => {
              return (
                <AccordionItem
                  key={todos.length + category}
                  value={category}
                  className="border-b-0"
                >
                  <AccordionTrigger className="hover:no-underline hover:bg-neutral-100 rounded-md py-2">
                    <div className="flex items-center gap-x-2">
                      <span>{category}</span>
                      <span className="size-6 text-sm flex items-center justify-center bg-neutral-200 rounded-md">
                        {todos.length}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pl-8">
                    {todos.map((todo) => (
                      <TodoItem
                        key={todo.id}
                        description={todo.description}
                        id={todo.id}
                        value={todo.id}
                        checked={todo.checked}
                        onCheckedChange={(checked) => {
                          changeTodoStateMutation.mutate({
                            id: todo.id,
                            checked: Boolean(checked),
                          });
                        }}
                        onDelete={() => {
                          deleteTodoMutation.mutate({ id: todo.id });
                        }}
                      />
                    ))}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        ) : null}
      </div>
    </div>
  );
}
