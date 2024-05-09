// import { unstable_serialize as infinite_unstable_serialize } from 'swr/infinite';
// import useSWR from 'swr';
// import TableDocument from '../Components/TableDocument';
// import PaginatorServer from '../Components/PaginatorServer';
// import HomeDashboard from '../DashBoard';
// import { useEffect } from 'react';
// import PaginatorServer from 'pages/Components/PaginatorServer';
import dayjs from 'dayjs';

// const rowsPerPage = 10;

function DocumentAdminFilter() {
  //    const [pageData, setPageData] = useState({
  // data: data.recordset[0],
  // data: () => {useSWR(`/api/document/documentAdmin/10/0`)},
  //      totalPages: 0,
  //    });

  /*
  const getkey = () => {
    // if (previousPageData && !previousPageData.length)
    //  return `/api/document/documentAdmin/${rowsPerPage}/0`;
    return `/api/document/documentAdmin/${rowsPerPage}/${currentPage}`;
  };
*/
  // console.log(`/api/document/documentAdmin/${rowsPerPage}/${currentPage}`);
  /*
  const { data, error, status } = useSWR(
    `/api/document/documentAdmin/${rowsPerPage}/${currentPage}`
  );
  */

  // let myresults = [];

  // let myresults = [];

  // useEffect(() => {
  // const [currentPage, setCurrentPage] = useState(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // myresults = getResults();

  // console.log('DocumentAdminFilter: Rendered', myresults, currentPage);
  // }, []);

  // async function getResults() {
  //  const data = await fetch(`/api/document/documentAdmin/${rowsPerPage}/0`);
  /*
  const { data, error, status } = useSWR(
    `/api/document/documentAdmin/${rowsPerPage}/${currentPage}`
  );
  */
  // do some other stuff using 'data' and 'error'...
  // console.log('getResults: ', data, error, status);
  // return data;
  // }

  /*
  const { data, error, status } = useSWR(
    `/api/document/documentAdmin/${rowsPerPage}/${currentPage}`
  );
*/

  // console.log('currentPage: ', currentPage);

  /*
  const columns = [
    {
      header: 'Id',
      accessorKey: 'IdDocumento',
      // footer: 'mi Id',
    },
    {
      header: 'Código',
      accessorKey: 'CodigoDocumento',
      // footer: 'mi Código',
    },
    {
      header: 'Rev.',
      accessorKey: 'RevisionDocumento',
      // footer: 'mi Rev.',
    },
    {
      header: 'Nombre Documento',
      accessorKey: 'NombreDocumento',
      // footer: 'mi Nombre Documento',
    },
    {
      header: 'Responsable',
      accessorKey: 'NombreResponsable',
      // footer: 'mi Responsable',
    },
    {
      header: 'Estatus',
      accessorKey: 'EstatusDocumento',
      // footer: 'mi Estatus',
    },
    {
      header: 'Reemisión',
      accessorKey: 'FechaReemision',
      // footer: 'mi Fecha Reemision',
      cell: (info) => dayjs(info.getValue()).format('DD-MMM-YY'),
    },
    {
      header: 'Distribución',
      accessorKey: 'FechaDistribucion',
      // footer: 'mi Fecha Distribucion',
      cell: (info) => dayjs(info.value).format('DD-MMM-YY'),
    },
  ];

  */
  // if (error) return <div>failed to load</div>;
  /*
  if (!myresults) return <div>loading...</div>;
  if (myresults) {
     const [totalRows, setTotalRows] = useState(
      data.recordset[0].CuentaRegistros
    ); 
    const totalRows = myresults.recordset[0].CuentaRegistros;

    const totalPages = Math.ceil(totalRows / rowsPerPage);
    const setCurrentPage = 0;
    console.log('totalPages: ', totalPages, 'setCurrentPage: ', setCurrentPage);
    */
  /// console.log('data: ', JSON.stringify(data.recordset));
  // const documents = JSON.stringify(data.recordset);
  return (
    <>
      {/* <HomeDashboard> */}
      <title>Documentos Administrador</title>
      <div key="DocumentAdminFilter">
        {dayjs(Date.now()).format('DD-MMM-YY')}
        {/* <TableDocument
            columns={columns}
            data={myresults}
            title="Documentos Administrador"
          /> */}
        {/* <PaginatorServer
            pageChangeHandler={setCurrentPage}
            totalPages={totalPages}
          ></PaginatorServer> */}
      </div>
      {/* </HomeDashboard > */}
    </>
  );
}
// }

export default DocumentAdminFilter;
/*
  {"IdDocumento":86,
  "CodigoDocumento":"ACIN-001",
  "RevisionDocumento":7,
  "NombreDocumento":"Instructivo para Elaborar Reportes de 3 Generaciones",
  "NombreResponsable":"Víctor M. Rodríguez G.",
  "EstatusDocumento":"D",
  "CodigoNombreDocumento":"ACIN-001 - Instructivo para Elaborar Reportes de 3 Generaciones",
  "AplicaExamen":0,
  "IdExamen":0,
  "CodigoExtension":"ACIN-001..doc,.docx",
  "RutaAbrir":"\\\\CablesSLPMxFS\\Documentacion$\\Publicado\\",
  "Extension":".doc,.docx",
  "IdEstatusDocumento":3,
  "IdNormativa":3,
  "IdTipoDocumento":11,
  "IdDepartamento":8,
  "NumeroDocumento":1,
  "IdPuesto":26,
  "IdEmpleado":104,
  "IdFormatoArchivo":1,
  "FechaDistribucion":"2012-07-27T00:00:00.000Z",
  "FechaReemision":"2012-07-01T00:00:00.000Z",
  "CuentaRegistros":169,
  "ExisteElectronico":0}
*/
