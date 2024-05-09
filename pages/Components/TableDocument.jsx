/* import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table'; */
import { /* useEffect, useState, */ memo } from 'react';
// import PaginatorServer from './PaginatorServer';

const TableDocument = memo(({ columns, data, title }) => {
  // console.log('columns: ', columns, 'data: ', data);
  /*
    useEffect(() => {
      console.log('TableDocument: Rendered');
    });
  
    const [sorting, setSorting] = useState([]);
    const [filtering, setFiltering] = useState('');
  
    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      manualPagination: true,
  
      state: {
        sorting,
        globalFilter: filtering,
      },
      onSortingChange: setSorting,
      onGlobalFilterChange: setFiltering,
    });
  */
  // console.log('pageCount: ', pageCount);
  // Render the UI for your table
  return (
    <>
      <input
        className="input input-bordered w-96"
        type="text"
      // value={filtering}
      // onChange={(e) => setFiltering(e.target.value)}
      />

      <table className="table-auto border-collapse border border-slate-500 ">
        <caption className="caption-top">{title}</caption>
        <thead>
          {/* table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.IdDocumento}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  colSpan={header.colSpan}
                  className="border border-slate-600 p-4 bg-accent text-white hover:cursor-pointer"
                  onClick={header.column.getToggleSortingHandler()} // Add a click handler to header
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {
                    // Add a sort direction indicator
                    { asc: '⬆️', desc: '⬇️', null: '' }[
                    header.column.getIsSorted() ?? null
                    ]
                  }
                </th>
              ))}
            </tr>
          )) */}
        </thead>
        <tbody>
          {/* table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="odd:bg-slate-100 even:bg-slate-200 hover:bg-secondary-focus hover:text-white"
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  colSpan={cell.colSpan}
                  className="border border-slate-700 pl-4 pr-2 py-2 last-child:border-r-0 "
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          )) */}
        </tbody>
        <tfoot>
          {/* table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((footer) => (
                <th key={footer.id} colSpan={footer.colSpan}>
                  {flexRender(
                    footer.column.columnDef.footer,
                    footer.getContext()
                  )}
                </th>
              ))}
            </tr>
          )) */}
        </tfoot>
      </table>
    </>
  );
});

TableDocument.displayName = 'TableDocument';

export default TableDocument;
