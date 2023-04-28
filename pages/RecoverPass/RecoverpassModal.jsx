import { IoCloseSharp } from "react-icons/io5";
const RecoverpassModal = ({ children, estado, cambiarEstado, titulo }) => {

  return (
    <>
      {estado &&
          <div className='w-full h-full fixed top-0 left-0 bg-blue-900 bg-opacity-50 
          flex items-center justify-center' >
            <div className="w-80 min-h-fit border-2 bg-white border-sky-100
            relative rounded-lg p-4 ">
              <div className="flex items-center justify-between  border-b-2 
            border-b-slate-200 font-semibold">
                <h1>{titulo}</h1>
              </div>
              <div className="absolute top-4 right-4 w-6 h-6 border-none bg-none rounded-sm cursor-pointer">
                <button type="button" className='' onClick={() => cambiarEstado(!estado)}>
                <IoCloseSharp className="text-3xl text-accent hover:cursor-pointer"   ></IoCloseSharp>
                </button>
              </div>
              {children}
            </div>
          </div>
      }
    </>
  )
}

export default RecoverpassModal