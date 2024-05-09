import { useEffect, useState, memo } from 'react';

const PaginatorServer = memo(({ pageChangeHandler, totalPages }) => {
  // console.log('totalRows: ', totalRows, 'rowsPerPage: ', rowsPerPage);
  // Calculate total pages
  // const totalPages = Math.ceil(totalRows / rowsPerPage);

  // state current page
  const [currentPage, setCurrentPage] = useState(0);

  // onClick page change handler
  const onNextPage = () =>
    setCurrentPage(
      currentPage + 1 <= totalPages ? currentPage + 1 : totalPages
    );
  const onPreviousPage = () =>
    setCurrentPage(currentPage - 1 >= 0 ? currentPage - 1 : 0);
  const onPageChange = (page) => setCurrentPage(page);

  // To set the starting index of the page
  useEffect(() => {
    console.log('Paginator Rendered: ', currentPage);
    // const skipFactor = (currentPage - 1) * rowsPerPage;
    // Some APIs require skip for paginaiton. If needed use that instead
    // pageChangeHandler(skipFactor);
    pageChangeHandler(currentPage);
  }, [pageChangeHandler, currentPage]);

  return (
    <div className="flex">
      <button className="bg-primary           " onClick={() => onPageChange(0)}>
        Inicio
      </button>
      <button
        className="btn-primary p-2 border border-secondary-focus mr-2"
        onClick={() => onPreviousPage()}
      >
        Anterior
      </button>
      <button
        className="btn-accent p-2 border border-secondary-focus mr-2"
        onClick={() => onNextPage()}
      >
        Siguiente
      </button>
      <button
        className="btn-accent p-2 border border-secondary-focus"
        onClick={() => onPageChange(totalPages - 1)}
      >
        Fin
      </button>
      <span className="flex items-center gap-1">
        <div>Page</div>
        <strong>
          {currentPage + 1} of {totalPages === 0 ? 1 : totalPages}
        </strong>
      </span>
    </div>
  );
});

PaginatorServer.displayName = 'PaginatorServer';

export default PaginatorServer;
