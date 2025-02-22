import { FC } from "react";
import { ProjectLink } from "../ProjectLink/ProjectLink";

export const Header: FC = () => {
  return (
    <div className="bg-amber-600 w-full h-[60px] flex items-center justify-self-start p-4 gap-4 sticky top-0">
      <ProjectLink to="/">Главная</ProjectLink>
      <ProjectLink to='doctors'>Врачи</ProjectLink >
      <ProjectLink to='nurses'>Медсестры</ProjectLink >
    </div>
  )
}