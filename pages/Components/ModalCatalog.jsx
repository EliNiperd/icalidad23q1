import { IoCloseCircleOutline } from 'react-icons/io5';
// import swr from 'swr';

const ModalCatalog = ({
  children,
  estadomodal,
  setEstadomodal,
  title,
  idRegistro,
}) => {
  console.log('title: ', title);
  // const idRegistro = 5;
  /*
  const { data, error, status } = swr(
    `/api/managment/getManagment?GET&id=${idRegistro}`
  );
  if (status === 'loading')
    return <p className="text-secondary">Cargando datos...</p>;
  if (error) console.log('Error: ', error);
  //  console.log('Managments: ', data, status, error);
  if (data) console.log('Managments: ', data.recordset);
*/
  return (
    <>
      {estadomodal &&
        ((
          <title>
            {title} {idRegistro}
          </title>
        ),
        (
          <div
            className="animate-jump-in animate-once animate-normal w-full h-full fixed top-0 left-0 
          bg-blue-900 bg-opacity-50 flex items-center justify-center"
          >
            <div className="w-80 min-h-fit bg-white relative rounded-lg p-4  ">
              <div className="flex content-start  pb-2">
                <h2 className="text-xs">{title}</h2>
                <p className="text-white text-xs">{idRegistro}</p>
              </div>
              <button
                type="button"
                className="absolute top-2 right-2 bg-none rounded-lg cursor-pointer hover:bg-neutral hover:rounded-full "
                onClick={() => setEstadomodal(!estadomodal)}
              >
                <IoCloseCircleOutline className="text-3xl  hover:cursor-pointer"></IoCloseCircleOutline>
              </button>
              {children}
            </div>
          </div>
        ))}
    </>
  );
};

export default ModalCatalog;
