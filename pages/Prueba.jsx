import { useState } from 'react'
import Link from 'next/link'

const Prueba = ({ children }) => {
    const [contador, setContador] = useState(0);

  return (
    <div>
        <div className='bg-base-200'>
            <ul>
                <li><Link href="/AdminDocument" >AdminDocument</Link></li>
                <li><Link href="/AdminAction" ><a>AdminAction</a></Link></li>
                <li><Link href="/AdminAudit" ><a>AdminAudit</a></Link></li>
                <li><Link href="/AdminIcalidad" ><a>AdminIcalidad</a></Link></li>
            </ul>
            <button onClick={() => {setContador(contador + 1)}} className='btn' >Contador</button>
        <h1 className='font-bold items-center' >Prueba</h1>
        <h2>{contador}</h2>
        </div>
        
        {children}
    </div>
  )
}

export default Prueba