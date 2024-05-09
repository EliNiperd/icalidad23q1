// import { useState } from 'react';
import HomeDashBoard from '@/pages/DashBoard/index';
// import { faker } from '@faker-js/faker';

/* import {
  // ColumnDef,
  // ColumnOrderState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'; */
// import { makeData } from 'lib/makeData';
/*
const defaultColumns = [
  {
    header: 'Name',
    footer: (props) => props.column.id,
    columns: [
      {
        accessorKey: 'firstName',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        accessorFn: (row) => row.lastName,
        id: 'lastName',
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
        footer: (props) => props.column.id,
      },
    ],
  },
  {
    header: 'Info',
    footer: (props) => props.column.id,
    columns: [
      {
        accessorKey: 'age',
        header: () => 'Age',
        footer: (props) => props.column.id,
      },
      {
        header: 'More Info',
        columns: [
          {
            accessorKey: 'visits',
            header: () => <span>Visits</span>,
            footer: (props) => props.column.id,
          },
          {
            accessorKey: 'status',
            header: 'Status',
            footer: (props) => props.column.id,
          },
          {
            accessorKey: 'progress',
            header: 'Profile Progress',
            footer: (props) => props.column.id,
          },
        ],
      },
    ],
  },
];
*/
function TableGlobal() {
  // const [data, setData] = useState(() => makeData(5));
  // const [columns] = useState(() => [...defaultColumns]);

  // const isServer = typeof window === 'undefined';

  // if (isServer) {
  // console.log('isServer', isServer);
  // setData(() => makeData(5));
  // Renderizado en el servidor
  // } else {
  // console.log('isServer', isServer);
  // Renderizado en el cliente
  // }

  // console.log('columns', columns);

  // const [columnVisibility, setColumnVisibility] = useState(defaultColumns);
  // const [columnOrder, setColumnOrder] = useState(() => ColumnOrderState);

  // const rerender = () => setData(() => makeData(20));

  // const table = useReactTable({
  //  data,
  //  columns,
  // SelectColumnFilter,
  // StatusPill,
  // LocateCell,
  /* state: {
    columnVisibility,
    columnOrder,
  }, */
  // onColumnVisibilityChange: setColumnVisibility,
  // onColumnOrderChange: setColumnOrder,
  // getCoreRowModel: getCoreRowModel(),
  // debugTable: true,
  // debugHeaders: true,
  // debugColumns: true,
  // });

  /*
  const randomizeColumns = () => {
    table.setColumnOrder(
      faker.helpers.shuffle(table.getAllLeafColumns().map((d) => d.id))
    );
  };
*/

  return (
    <>
      <HomeDashBoard>
        <table className="border-2 border-solid border-gray-400">
          <thead>
            {/* table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="border-b-2 border-r-2 border-gray-400 pr-2 pt-2 "
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </th>
                ))}
              </tr>
            )) */}
          </thead>
          <tbody className="border-b-2 border-gray-400">
            {/* table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="border-r-2 border-gray-400 p-2 last-child:border-r-0"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            )) */}
          </tbody>
        </table>
      </HomeDashBoard>
    </>
  );
}

export default TableGlobal;
