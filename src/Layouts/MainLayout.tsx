import { Outlet } from "react-router-dom";
import { Header } from "../components/Header/Header";

export const MainLayout = () => (
  <div className="flex flex-col w-full text-slate-500">
    <Header />
    <div className="px-4 w-full h-full flex-1">
      <Outlet />
    </div>
  </div>
)