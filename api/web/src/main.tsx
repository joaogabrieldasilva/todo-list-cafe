import React from "react";
import ReactDOM from "react-dom/client";
import {
  Navigate,
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./globals.css";
import { Todos } from "./pages/todos.tsx";
import { Sidebar } from "./components/ui/sidebar.tsx";
import { CreateTodo } from "./pages/create-todo.tsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Toaster } from "./components/ui/sonner.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        <>
          <Outlet />
        </>
      }
    >
      <Route
        path="dashboard"
        element={
          <div className="flex">
            <Sidebar
              items={[
                {
                  title: "🌎 All",
                  href: "/dashboard/all",
                },
                {
                  title: "📅 Today",
                  href: "/dashboard/📅 Today",
                },
                {
                  title: "👤 Personal",
                  href: "/dashboard/👤 Personal",
                },
              ]}
            />
            <Outlet />
          </div>
        }
      >
        <Route
          path=":filter"
          element={
            <>
              <Todos />
              <Outlet />
            </>
          }
        >
          <Route
            path="create-todo"
            element={
              <>
                <Outlet />
                <CreateTodo />
              </>
            }
          />
        </Route>
      </Route>
      <Route path="" element={<Navigate to="/dashboard/all" />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster />
    </QueryClientProvider>
  </React.StrictMode>
);
