import {useState} from "react";
import RecoverpassModal from "./RecoverpassModal"


const  RecoverPass = () => {
    
  const [estadoModal1, cambiarEstadoModal1] = useState(false); 

    return (
        <>
        
            <div className=" flex flex-wrapp justify-center gap-5 p-4">
                <button className='block p-2 rounded-xl  border-0  
                font-semibold bg-emerald-600 text-white justify-center '
                onClick={() => cambiarEstadoModal1(!estadoModal1)}>Modal 1</button>
            </div>
            <RecoverpassModal estado={estadoModal1} cambiarEstado={cambiarEstadoModal1}>
              <h1>Ventana Modal</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque, sunt?</p>
              <button className='block p-2 rounded-xl  border-0  
                font-semibold bg-emerald-600 text-white justify-center '
                onClick={() =>cambiarEstadoModal1(!estadoModal1)}>Aceptar</button>
            </RecoverpassModal>
            
        </>

    )



}
/*
const recoverPass = () => {
  return (
    <div>recoverPass</div>
  )
}
*/
export default RecoverPass