import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  to: string;
  target?: '_blank',
  children: ReactNode,
}

export const ProjectLink: FC<Props> = ({ to, target, children }) => (
  <Link
    className="text-white p-2 bg-amber-700 rounded-sm w-min hover:scale-[1.05] hover:shadow-stone-950 shadow-md transition"
    to={to}
    target={target}
    children={children}
  />
)