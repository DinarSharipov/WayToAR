import { IPerson } from "./store/types";

const mockNames = ["Иван", "Петр", "Александр"];

function getPersonName(): IPerson {
  return {
    id: (Math.random() * 100)?.toString(),
    name: mockNames[Math.round(Math.random() * 2)],
    secondName: mockNames[Math.round(Math.random() * 2)] + "ов",
    patronymic: mockNames[Math.round(Math.random() * 2)] + "ович",
    department: Math.round(Math.random() * 2)
      ? 'cardiology'
      : 'surgery',
  };
}

export function getPersons(length: number): ReturnType<typeof getPersonName>[] {
  return Array.from({ length }, () => getPersonName());
}

