import { FC } from "react";

interface Props {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export const Input: FC<Props> = ({
  label,
  onChange,
  value
}) => {


  return (
    <div className="w-full flex flex-col text-slate-500">
      <div>{label}</div>
      <input
        className="border-1 border-slate-400 outline-none rounded-md p-1"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  )
}