import { createTodo } from "@/api/create-todo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const lists = [
  {
    id: "📅 Today",
    label: "📅 Today",
  },
  {
    id: "👤 Personal",
    label: "👤 Personal",
  },
];

export function CreateTodo() {
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(lists[0].id);

  const queryClient = useQueryClient();

  const createTodoMutation = useMutation({
    mutationFn: ({
      category,
      description,
    }: {
      category: string;
      description: string;
    }) => {
      return createTodo({ category, description });
    },

    onError: (_, __, context) => {
      toast("Erro ao criar Todo");

      queryClient.setQueryData(["todos"], context.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast("Todo criado com sucesso");
      navigate(-1);
    },
  });

  const handleCreateTodo = () => {
    createTodoMutation.mutate({
      category,
      description,
    });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[#00000060] backdrop-blur-[1.5px] flex justify-center">
      <div className="w-[50%] h-[40%] mt-20 bg-white rounded-md p-4">
        <X onClick={() => navigate(-1)} className="cursor-pointer" />
        <div className="py-4 flex flex-col items-center mt-6">
          <div className="w-[80%]">
            <div className="flex flex-col gap-y-2">
              <Label htmlFor="task">Tarefa</Label>
              <Input
                id="task"
                placeholder="Ir ao mercado..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-y-2 mt-8">
              <Label htmlFor="task">Lista</Label>
              <Select
                defaultValue={lists[0].id}
                value={category}
                onValueChange={setCategory}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecionar lista" />
                </SelectTrigger>
                <SelectContent>
                  {lists.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button className="mt-10 w-full" onClick={handleCreateTodo}>
              Adicionar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
