//import  Link  from "next/link";
import Link from '/pages/Components/LinkC'
//import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import useSWR, { SWRConfig } from 'swr';
import { useDashBoard } from "/pages/contexts/dashBoardProvider";
import { motion } from "framer-motion"

import { AiFillHome, AiFillSetting } from "react-icons/ai";
import {
  FcConferenceCall,
  FcCollaboration,
  FcSurvey,
  FcAnswers,
} from "react-icons/fc";




 
export function ElementMenu({ description, setidMenuFather, IdMenu }) {
  const router = useRouter();
  //const { component } = router.query;

  
  const classVar = "text-4xl text-[#30A9ED] group-hover:text-white ";
  let Component;

  Component = () => {
    switch (description) {
      case "iCalidad":
        return <AiFillHome key={description}  className={classVar}  >{description}</AiFillHome>;
        break;
      case "Poder Documental":
        return <FcAnswers key={description} className={classVar} onClick={() => {console.log(IdMenu); /*setidMenuFather(IdMenuPadre);*/ router.push("/DashBoard"); } }  >{description} </FcAnswers>;
        break;
      case "Acciones":
        return <FcCollaboration key={description} className={classVar} />;
        break;
      case "Auditorías":
        return <FcSurvey key={description} className={classVar} />;
        break;
      
      case "Personal Competente":
        return <FcConferenceCall key={description} className={classVar} />;
        break;
      case "Configuración iCalidad":
        return <AiFillSetting key={description} className={classVar} />;
        break;
      default:
        <FcAnswers key={description} className={classVar} />;
        break;
    }
  };
return (
  <>
      <div className="my-2 border-b border-gray-100 w-full">
        <div
          className="flex mb-2 justify-start items-center gap-2 px-2 hover:bg-[#30A9ED] p-1 rounded-md
          module cursor-pointer hover:shadow-lg m-auto" >
          <Component />
          <h3 className="text-sm text-gray-800 group-hover:text-white font-semibold">
            {description}
          </h3>
        </div>
      </div>
      </>
  )
}

//const getDataMenu = ( idUser, idiCalidad, idMenuFather) =>{
  //const { data, error } =  useSWR(`/api/User/dasBoardUser/${idUser}/${23}/{}`)

//}


let datosMenu;

 function SideNavBar({ idUser}) {

  const { activeMenu, setActiveMenu, idMenuFather, setidMenuFather } = useDashBoard();
  console.log('IdMenuFather: ', idMenuFather);


  //const activeMenu = true;
  const idiCalidad = 23;

  const { data, error } =  useSWR(`/api/User/dasBoardUser/${idUser}/${idiCalidad}/${idMenuFather}`)
  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>
  return (
    <>
      <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
        <Link
          href="/DashBoard" onClick={() => setActiveMenu(false)}
          alt="Dashboard"
          className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
        >
          <div className="flex justify-between items-center">
            <ElementMenu description={"iCalidad"} />
          </div>
        </Link>

        <div className="mt-10">
          {data.recordset.map((item) => (
            <div key={item.IdMenu} className="text-gray-400 m-3 mt-4 ">
              <ElementMenu description={item.Menu} IdMenu={item.IdMenu} setidMenuFather />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
 



/*export async function getServerSideProps(context) {
  const session = await getSession({ context });


  const slug = sessiom.id;
  const res = await fetch(`http://lnsw10-ers:3000/api/User/dasBoardUser/92`)
  console.log(res);
  const data = await res.json();

    return {
      props: { data },
    }
}
*/

export default SideNavBar;



/*
//import { NavLink } from 'react-router-dom';
import  Link  from "next/link";
import Image from "next/image";
import useSWR from 'swr';
import { useSession } from "next-auth/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Disclosure } from "@headlessui/react";
import { AiFillHome, AiFillSetting } from "react-icons/ai";
import { useRouter } from "next/router";
import { LogoutIcon } from '/public/exit-sign-64.png';
//import { BsFillDiagram3Fill, BsFillPeopleFill } from "react-icons/bs"
import {
  FcConferenceCall,
  FcCollaboration,
  FcSurvey,
  FcAnswers,
} from "react-icons/fc";
//FcReading
//import SideNavBar from "./styles/SideNavBar.module.css";
//import stylesSNB from './styles/SideNavBar/SideNavBar.module.css'


async function SideNavBar() {
  const activeMenu = true;
 
  const { data: session } = useSession();
  const idUser = session.user.id;
console.log(session, 'inicio api');
  const {data: recordsets, error, isloading } = await useSWR(`/api/User/dashBoardUser/${idUser}`, fetcher);
  //console.log('fin api', isloading);
  //console.log('inicio Console.log', isloading);
  //console.log('datos: ',recordsets , isloading);
  //console.log('fin api', isloading);
  if (error) return <div className='text-red-400' > No se pudo recuperar información del Menú para este usuario {error.message} </div>
  if (isloading) return <div className="text-2xl">loading...</div>
  
  return (
    <>
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
    {
      activeMenu && ( <>
      <div className="flex justify-between items-center">
        <Link href='/DashBoard' onClick={() => {}} alt='Dashboard' 
          className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900">
          <ElementMenu description={'iCalidad'} />
        </Link>
      </div>
      <div className="mt-10">
        {
         // /*dataM.dataR.map((item) => (
         // <div key={item.IdMenu} className="text-gray-400 m-3 mt-4 ">{item.Menu}</div>
        //))*/
      //}
      ///</div>
      //</>)}
    //</div>
  //</>
 // )
//}
 


//export default SideNavBar;
//*/
/*
 
 tsc ActiveLink.tsx -t  esnext --jsx react-jsxdev --types --esModuleInterop --outFile ActiveLink.jsx


<div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
        <div className="flex justify-between items-center">
          <ElementMenu description={"Inicio"} /> <span>iCalidad</span>
          
        </div>
      </div>
      <hi className="text-4xl">Side Nav Bar</hi>

className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-toght dark:text-white text-slate-900"
<details>
        <summary>Desplegar elemento</summary>
        <div >
          <h1>
            <div className=" flex items-center relative origin-center  
            aria-pressed:true:origin-bottom aria-pressed:true:rotate-45  w-16 h-16 bg-amber-500 z-0">
              <div
                id="saveChanges"
                role="button"
                aria-pressed="false"
                className="absolute cursor-pointer inset-y-1/4 right-0 w-3 h-8 bg-gray-400 rounded-lg 
                transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 "
              ></div>
            </div>
          </h1>
        </div>
      </details>

      <div className="grid place-items-center mt-10">
        <ul className="flex space-x-2">
          <li className="relative">
            <input
              className="sr-only peer"
              type="radio"
              value="no"
              name="answer"
              id="answer_no"
            />
            <label
              className="flex p-5 bg-white border border-gray-300 rounded-lg cursor-pointer 
                focus:outline-none hover:bg-gray-50 peer-checked:ring-gray-500 peer-checked:ring-2 
                peer-checked:border-transparent"
              htmlFor="answer_no"
            >
              Cancel
            </label>
          </li>
          <li className="relative">
            <input
              className="sr-only peer"
              type="radio"
              value="yes"
              name="answer"
              id="answer_yes"
            />
            <label
              className="flex p-5 bg-white border border-gray-300 rounded-lg cursor-pointer 
                focus:outline-none hover:bg-gray-50 peer-checked:ring-red-500 peer-checked:ring-2 
                peer-checked:border-transparent"
              htmlFor="answer_yes"
            >
              Yes
            </label>
          </li>
        </ul>
      </div>

      <Disclosure as="nav">
        <Disclosure.Button
          className="peer absolute top-4 right-4 inline-flex items-center justify-center rounded-md p-2
           text-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group
           hover:bg-gray-600" >
          <GiHamburgerMenu className="block  h-6 w-6"  />
        </Disclosure.Button>
        <div className="p-1 h-3/4 fixed top-20 -bottom-1/2 rounded-tr-lg rounded-br-lg bg-[#DEF0FA] z-2  lg:-left-48 
          lg:w-50 peer-focus:left-1 peer:transition ease-out delay-150 duration-200">
          <div className="flex flex-col justify-start items-start">
            <hi className="text-3xl text-center font-bold text-Black items-center border-b-2 border-gray-200 pb-2 w-3/4">
              Menú
          </hi>
           
            <ElementMenu description={'Inicio'}  />
            <ElementMenu description={'Poder Documental'}  />
            <ElementMenu description={'Auditorías'}  />
            <ElementMenu description={'Acciones'}  />
            <ElementMenu description={'Personal Competente'} />
            <ElementMenu description={'Configuración'}  />
            
            
           
          </div>
        </div>
      </Disclosure>



*/
