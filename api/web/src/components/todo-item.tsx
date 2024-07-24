import { CheckboxProps } from "@radix-ui/react-checkbox";
import { Checkbox } from "./ui/checkbox";
import clsx from "clsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { MoreVertical } from "lucide-react";

type TodoItemProps = {
  id: number;
  description: string;
  onDelete?: (id: number) => void;
} & Omit<CheckboxProps, "id">;

export function TodoItem({
  id,
  value,
  description,
  checked,
  onDelete,
  onCheckedChange,
}: TodoItemProps) {
  return (
    <div
      className={clsx(
        "flex items-center justify-between hover:bg-neutral-100 space-x-2 group py-1 px-4 rounded-sm select-none",
        {
          "bg-neutral-100": checked,
        }
      )}
    >
      <div className="flex items-center gap-x-2">
        <Checkbox
          id={String(id)}
          className="size-5 border-gray-400 shadow-none"
          value={value}
          checked={checked}
          onCheckedChange={onCheckedChange}
        />
        <label
          htmlFor={String(id)}
          className={clsx(
            "text-sm group-hover:cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            { "line-through text-slate-700": checked }
          )}
        >
          {description}
        </label>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => {
              if (onDelete) {
                onDelete(id);
              }
            }}
            className="text-red-500 focus:text-red-500 cursor-pointer"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
