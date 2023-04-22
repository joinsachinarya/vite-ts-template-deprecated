import React, { FC, useMemo } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const columnHelper = createColumnHelper<any>();
interface InputDataTableProps {
  // setIsToggle: () => void;
  data: any[];
  // onDataChange: (newData: InputDataTableProps['data']) =>void
}

const InputDataTable: FC<InputDataTableProps> = ({
  /* setIsToggle, */ data,
}) => {
  const arrayData = useMemo(
    () => (Array.isArray(data) ? data : [data]),
    [data]
  );
  const columns = Object.keys(arrayData[0]).map((key) => {
    return columnHelper.accessor(key, {
      cell: (info) => {
        const value = info.getValue();
        if (typeof value !== "string") return JSON.stringify(value);
        return value;
      },
      footer: (info) => info.column.id,
      header: () => <span>{key}</span>,
    });
  });

  const table = useReactTable({
    data: arrayData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex justify-start mx-a w-full overflow-x-auto">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InputDataTable;
