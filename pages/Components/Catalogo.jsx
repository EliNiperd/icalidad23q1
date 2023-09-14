import swr, { mutate } from 'swr';
import {
  IoEllipsisVerticalCircle,
  IoArrowBackCircleOutline,
} from 'react-icons/io5';
import { useCallback, useState } from 'react';

import ModalCatalog from '../Components/ModalCatalog';
import CreateManagment from 'pages/AdminIcalidad/Catalogos/CreateManagment';

// return { data, error, status };
// };

// Hook
// Parameter is the boolean, with default "false" value
const useToggle = (initialState = false) => {
  // Initialize the state
  const [state, setState] = useState(initialState);

  // Define and memorize toggler function in case we pass down the component,
  // This function cha00nge the boolean value to it's opposite value
  const toggle = useCallback(() => setState((state) => !state), []);

  return [state, toggle];
};

const Catalogo = () => {
  const [estadomodal, setEstadomodal] = useToggle();
  // const [estadomodalEdit, setEstadomodalEdit] = useToggle();
  const [selectedManagment, setSelectedManagment] = useState(0);
  // const [selectedArea, setSelectedArea] = useState(0);

  const [idRegistro, setIdRegistro] = useState(0); // 0 = Nuevo registro
  const [claveGerencia, setClaveGerencia] = useState('');
  const [nombreGerencia, setNombreGerencia] = useState('');
  const [idEstatusRegistro, setIdEstatusRegistro] = useState(true); // true = Activo, false = Inactivo
  const [title, setTitle] = useState('Crear Registro');

  // const [isOpen, setIsOpen] = useState(false);

  const handleGerenciaClick = async (IdGerencia, statusArea) => {
    try {
      // console.log('IdGerencia: ', IdGerencia, 'statusArea: ', statusArea);
      const response = await fetch(
        `/api/workArea/workArea/?id=${IdGerencia}&param=ALL&status=${statusArea}`,
        { refreshInterval: 1000 }
      );
      if (response.ok) {
        // const data = await response.json();
        // Actualiza la cache de SWR con los datos de los departamentos
        mutate(
          `/api/workArea/workArea/?id=${IdGerencia}&param=ALL&status=${statusArea}`,
          { refreshInterval: 1000 }
        );
      } else {
        // Manejar errores de respuesta de la API
      }
    } catch (error) {
      // Manejar errores de conexión
    }
  };

  // const titleModal = title; // se asigna el valo por defecto o inicial
  console.log('this is the Error? selectedManagment: ', selectedManagment);
  const { data, isLoading, error } = swr(
    '/api/managment/getManagment?GET&id=ALL'
  );
  const { data: dataWorkArea, isLoading: isLoadingArea } = swr(
    selectedManagment
      ? `/api/workArea/workArea/?id=${selectedManagment}&param=ALL&status=1`
      : null
  );

  if (error) console.log('Error: ', error, 'isloading: ', isLoading);
  // console.log('Managments: ', data, 'isLoading: ', isLoading, error);
  return (
    <>
      {!selectedManagment && isLoading === true ? (
        <p className="text-secondary">Cargando datos...</p>
      ) : selectedManagment !== 0 && isLoadingArea === false ? (
        <div className="grid auto-rows-min">
          <div className="flex row-1 pb-2 ">
            <button
              className="btn-outline btn-secondary font-normal rounded-lg flex pb-2 p-2 "
              onClick={() => {
                setSelectedManagment(0);
                handleGerenciaClick(0, 0);
              }}
            >
              <IoArrowBackCircleOutline></IoArrowBackCircleOutline>
              <p className="text-lg">Regresar a Gerencias</p>
            </button>
          </div>
          <div className="grid row-2 grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5 ">
            {dataWorkArea?.recordset.map((workArea, IdDepartamento) => (
              <>
                <div className="grid row-1 pt-2 rounded-lg outline outline-2  outline-slate-200 p-5 pb-10 overflow-hidden shadow-lg hover:bg-base-300 hover:outline-base-content ">
                  <div className="dropdown dropdown-hover  h-fit flex justify-end ">
                    <label tabIndex={0} className=" m-1">
                      <IoEllipsisVerticalCircle className=" hover:bg-neutral hover:rounded-xl  "></IoEllipsisVerticalCircle>
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu  shadow bg-base-100 rounded-box text-sm  "
                    >
                      <li>
                        <a
                          onClick={() => {
                            setEstadomodal(!estadomodal);
                          }}
                        >
                          Crear
                        </a>
                        {
                          // onClick={() => {
                          //  setEstadomodal(!estadomodal);
                          //  setIdRegistro(Managment.IdGerencia);
                          // setClaveGerencia(Managment.ClaveGerencia);
                          // setNombreGerencia(Managment.NombreGerencia);
                          // }}
                        }
                      </li>
                      <li>
                        <a>Editar</a>
                      </li>
                      {/* 
                    <li>
                      <a>Desactivar</a>
                    </li>
                      */}
                    </ul>
                  </div>
                  <div className="z-10 hidden  text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"></div>
                  <header key={IdDepartamento} className=" ">
                    <div className="animate-jump-in animate-once animate-normal">
                      {' '}
                    </div>
                    <h3 className="text-2xl font-semibold border-b border-spacing-2">
                      {workArea.ClaveDepartamento}
                    </h3>
                  </header>
                  <main
                    className="hover:cursor-pointer"
                    onClick={() =>
                      handleGerenciaClick(workArea.IdDepartamento, 1)
                    }
                  >
                    <section>
                      <p className="text-xl text-gray-900 ">
                        {workArea.NombreDepartamento}
                      </p>
                    </section>
                  </main>
                </div>
              </>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5">
          {data?.recordset.map((Managment, IdGerencia) => (
            <>
              <div className="grid row-1 pt-2 rounded-lg outline outline-2  outline-slate-200 p-5 pb-10 overflow-hidden shadow-lg hover:bg-base-300 hover:outline-base-content ">
                <div className="dropdown dropdown-hover  h-fit flex justify-end ">
                  <label tabIndex={0} className=" m-1">
                    <IoEllipsisVerticalCircle className=" hover:bg-neutral hover:rounded-xl  "></IoEllipsisVerticalCircle>
                  </label>
                  <ul
                    key={IdGerencia}
                    tabIndex={0}
                    className="dropdown-content z-[1] menu  shadow bg-base-100 rounded-box text-sm  "
                  >
                    <li>
                      <a
                        onClick={() => {
                          setEstadomodal(!estadomodal);
                          setIdRegistro(0);
                          setSelectedManagment(0);
                          setTitle('Crear Registro');
                        }}
                      >
                        Crear
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() => {
                          setEstadomodal(!estadomodal);
                          setIdRegistro(Managment.IdGerencia);
                          setClaveGerencia(Managment.ClaveGerencia);
                          setNombreGerencia(Managment.NombreGerencia);
                          setIdEstatusRegistro(Managment.IdEstatusGerencia);
                          setTitle('Editar Registro');
                        }}
                      >
                        Editar
                      </a>
                    </li>
                    {/* 
                    <li>
                      <a>Desactivar</a>
                    </li>
                      */}
                  </ul>
                </div>
                <div className="  z-10 hidden  text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"></div>
                <header
                  onClick={() => {
                    setSelectedManagment(Managment.IdGerencia);
                    handleGerenciaClick(Managment.IdGerencia, 1);
                  }}
                  key={IdGerencia}
                  className=" hover:cursor-pointer"
                >
                  <div className="animate-jump-in animate-once animate-normal">
                    {' '}
                  </div>
                  <h3 className="  text-2xl font-semibold border-b border-spacing-2">
                    {Managment.ClaveGerencia}
                  </h3>
                </header>
                <main>
                  <section>
                    <p className="text-xl text-gray-900 ">
                      {Managment.NombreGerencia}
                    </p>
                  </section>
                </main>
              </div>
            </>
          ))}
        </div>
      )}
      <ModalCatalog
        setEstadomodal={setEstadomodal}
        estadomodal={estadomodal}
        title={title}
      >
        <CreateManagment
          setEstadomodal={setEstadomodal}
          estadomodal={estadomodal}
          title={title}
          idRegistro={idRegistro}
          claveRegistro={claveGerencia}
          nombreRegistro={nombreGerencia}
          idEstatusRegistro={idEstatusRegistro}
        />
      </ModalCatalog>
    </>
  );
};

export default Catalogo;
