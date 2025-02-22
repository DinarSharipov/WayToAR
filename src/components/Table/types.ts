import { ReactNode } from "react";

export interface Column<T extends TableData> {
  key?: keyof T;
  header: string;
  headerCell?: (row: T) => ReactNode;
  cell?: (row: T)=> ReactNode;
  width?: string;
}

export interface TableData {
  id: string;
  [key: string]: any
}

export interface TableComponentProps<T extends TableData> {
  data: T[];
  columns: Column<T>[];
  sortable?: boolean;
  rowSelectCallback?: (row: T)=> void;
  header?: ReactNode;
}

