import { FC, useEffect, useRef, useState } from "react";

interface Option {
  label: string;
  value: string;
}

interface Props {
  value: Option;
  onSelect: (option: Option) => void;
  options: Option[];
  label?: string;
}

export const Select: FC<Props> = ({
  onSelect,
  options,
  value,
  label
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={selectRef} className="flex flex-col box-border">
      {label && <div>{label}</div>}
      <input
        onFocus={() => setIsMenuOpen(true)}
        value={value.label}
        readOnly
        className="outline-none border-1 rounded-md border-slate-400 p-1 caret-white cursor-pointer"
      />
      <div className="relative">
        {isMenuOpen && <div className="absolute top-[5px] bg-slate-50 w-full left-0 flex flex-col gap-2 rounded-md shadow-md shadow-slate-400">
          {options?.map((option) => (
            <div
              key={option.value}
              className="p-2 cursor-pointer hover:outline-1 outline-slate-400 outline-offset-[-3px] rounded-md"
              onClick={() => {
                onSelect?.(option)
                setIsMenuOpen(false)
              }}
            >
              {option.label}
            </div>
          ))}
        </div>}
      </div>
    </div>
  )
}