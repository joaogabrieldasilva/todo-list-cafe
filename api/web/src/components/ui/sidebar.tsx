import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useMatch } from "react-router-dom";

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

export function Sidebar({ className, items, ...props }: SidebarProps) {
  const match = useMatch("/dashboard/:filter/*");

  const activeSection =
    match?.params?.filter && match.params.filter !== "all"
      ? match.params.filter
      : "🌎 All";

  return (
    <nav
      className={cn(
        "flex space-x-2 p-4 border-r border-neutral-200 h-screen lg:flex-col lg:space-x-0 lg:space-y-1 w-[30%]",
        className
      )}
      {...props}
    >
      <div className="flex items-center gap-x-2 mb-4 ">
        <div className="size-8 bg-neutral-200 rounded-sm flex items-center justify-center font-bold text-neutral-800">
          J
        </div>
        <span className="text-lg font-bold text-neutral-800">João Gabriel</span>
      </div>
      <span className="text-lg font-bold text-neutral-800 pl-2">
        Categorias
      </span>

      {items.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            activeSection === item.title
              ? "bg-neutral-200 hover:bg-neutral-200"
              : "hover:bg-transparent hover:underline",
            "justify-start hover:no-underline hover:bg-neutral-100 "
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
