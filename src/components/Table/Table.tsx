import { TableComponentProps, TableData } from "./types";

const Table = <T extends TableData>({
  columns,
  data,
  rowSelectCallback,
  header
}: TableComponentProps<T>) => {
  return (
    <div className="flex flex-col w-full">
      {header && <div className="h=[30px] max-h-[30px] sticky top-[60px] bg-white z-10 font-bold text-2xl w-full">{header}</div>}
      <table className="w-full h-full text-slate-500 overflow-auto">
        <thead className="border-x-1 border-slate-400">
          <tr>
            {columns?.map((column, i) => (
              <td
                key={column.key?.toString() ?? i?.toString()}
                className="sticky top-[90px] z-10 border-x-1 border-slate-400"
                style={{
                  width: column.width
                }}
              >
                <div className="border-y-1 font-semibold text-accent border-slate-400 p-2 bg-slate-200">
                  {column.header}
                </div>
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((row, i) => (
            <tr onDoubleClick={() => rowSelectCallback?.(row)} key={row.id ?? i?.toString()} className={(rowSelectCallback ? 'hover:bg-slate-200 cursor-pointer' : '')}>
              {columns?.map((col, i) => {
                const cellValue = col.key ? row[col.key] : undefined;
                return (
                  <td
                    className="border-1 border-t-0 border-slate-400 p-2"
                    key={col.key?.toString() ?? i?.toString()}
                  >
                    {col.cell?.(row) ?? cellValue}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { Table };

