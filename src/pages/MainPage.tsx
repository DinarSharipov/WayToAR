import { FC } from "react";
import { ProjectLink } from "../components/ProjectLink/ProjectLink";

export const MainPage: FC = () => (
  <div className="flex flex-col items-center gap-4 w-full mt-4">
    <h1 className="text-4xl">Выберите раздел</h1>
    <ProjectLink to='doctors'>Врачи</ProjectLink >
    <ProjectLink to='nurses'>Медсестры</ProjectLink >
  </div>
)