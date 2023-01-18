
const registroUser = () => {
  return (
    <>
      
            <div className='place-items-center' >
                <div className="z-10 grid h-96 w-1/2   bg-slate-50 border-2">
                    <form className=' rounded-xl  pt-28  px-8 border-4 ' >
                        <h2 className='text-4xl font-bold text-left pb-9'>Iniciar sesión en iCalidad</h2>
                        <div className='flex flex-col font-bold py-2'>
                            <label >Correo Electrónico</label>
                            <input type="text" className='mt-0 block w-full px-0.5 border-0 border-b-2
                            border-gray-200 focus:ring-0 focus:border-black' placeholder="john@example.com" name="correoElectrocnico" id="correoElectronico" />

                        </div>
                    </form>

                </div>
            </div>
    </>
  )
}

export default registroUser