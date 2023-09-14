import { IoCloseSharp } from 'react-icons/io5';
const RecoverpassModal = ({ children, estado, cambiarEstado, titulo }) => {
  return (
    <>
      {estado && (
        <div
          className="animate-jump-in animate-once animate-normal w-full h-full fixed top-0 left-0 bg-blue-900 bg-opacity-50 
          flex items-center justify-center"
        >
          <div
            className="w-80 min-h-fit  bg-white
            relative rounded-lg p-4 "
          >
            <div
              className="flex items-center justify-center 
             font-semibold pb-2"
            >
              <h1>{titulo}</h1>
            </div>

            <button
              type="button"
              className="absolute top-4 right-4 w-6 h-6 bg-none rounded-sm cursor-pointer"
              onClick={() => cambiarEstado(!estado)}
            >
              <IoCloseSharp className="text-3xl text-accent hover:cursor-pointer"></IoCloseSharp>
            </button>

            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default RecoverpassModal;
