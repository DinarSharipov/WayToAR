import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MainLayout } from "./Layouts/MainLayout";
import { DoctorsPage } from "./pages/DoctorsPage";
import { MainPage } from "./pages/MainPage";
import { NursesPage } from "./pages/NursesPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: '', element: <MainPage /> },
      {
        path: 'doctors',
        element: <DoctorsPage />
      },
      {
        path: 'nurses',
        element: <NursesPage />
      },
    ]
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}

