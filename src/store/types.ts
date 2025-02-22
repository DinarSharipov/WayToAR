export interface BaseListResponse<T extends { id: string }> {
  items: T[];
  count: number;
}

export const Department = {
  cardiology: "Кардиология",
  surgery: "Хирургия",
}

export interface IPerson {
  id: string;
  name: string;
  secondName: string;
  patronymic?: string;
  department: keyof typeof Department;
}

export interface IDoctor extends IPerson {
  isManager?: boolean;
}

export interface INurse extends IPerson {}

export type GetPersonsListItem = Array<INurse | IDoctor>;

