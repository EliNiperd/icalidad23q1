
import Link from "next/link";
import { SignOut } from "next-auth/react";

import { useContext} from "react";

import { IcalidadContext } from "../contexts/IcalidadContext";

import { AiFillHome, AiFillSetting,  } from "react-icons/ai";
import { FcAnswers, FcCollaboration, FcConferenceCall, FcSurvey }  from "react-icons/fc";
import { MdOutlineExitToApp } from "react-icons/md";
//import { MdAdminPanelSet, MdAppRegistratio, MdTask } from "react-icons/md";

export const MenuPrincipalAdm = ({activeMenuId, menuId}) => {

  const classDivMenu = "flex flex-col text-4xl text-accent hover:bg-neutral-200 rounded-lg pr-2";
  const classH1Menu = "text-base inline-block ";
  const classIconMenu = "inline-block text-5xl p-2";
  const classSelected = "bg-neutral-200 rounded-lg pr-2"

  const { menuDataMenu, setDataMenu } = useContext(IcalidadContext);

  const handleMenuItemIClick = (menuId) => {
    setDataMenu({
      ...menuDataMenu,
      idMenu: menuId,
      idMenuFather: menuId,
    });
  };

  return (
    <div>
      
      <div className="flex flex-col content-between gap-2 pt-4 menu transition-all duration-500" >
    <h1 className="hidden">{menuDataMenu.idMenu? menuDataMenu.idMenu : 0}</h1>
    
        <div className={classDivMenu} >
        <Link key="1" href="/DashBoard" passHref>
          <a onClick={(event) => { event.stopPropagation(); handleMenuItemIClick(149) }} className={menuDataMenu.idMenu === 149 ? classSelected : ""}>
            <AiFillHome className={classIconMenu} />
            <h1 className={classH1Menu}>iCalidad</h1>
          </a>
        </Link>
        </div>
        <div className={classDivMenu}  >
        <Link key="2" href="/AdminDocument" passHref>
          <a  onClick={(event) => {event.stopPropagation(); handleMenuItemIClick(150)}} className={menuDataMenu.idMenu === 150 ? classSelected : "" } >
          <FcAnswers className={classIconMenu} >
          </FcAnswers>
          <h1 className={classH1Menu}  >Poder Documental</h1>
          </a>
        </Link>
        </div>
        <div className={classDivMenu} >
        <Link key="3" href="/AdminAction">
          <a  onClick={() => handleMenuItemIClick(151)} className={menuDataMenu.idMenu === 151 ? classSelected : ""}>
          <FcCollaboration className={classIconMenu} >
          </FcCollaboration>
          <h1 className={classH1Menu}>Acciones</h1>
          </a>
        </Link >
        </div>
        <div className={classDivMenu} >
        <Link key="4" href="/Todo">
          <a  onClick={() => handleMenuItemIClick(152)} className={menuDataMenu.idMenu === 152 ? classSelected : ""}>
          <FcSurvey className={classIconMenu} >
          </FcSurvey>
          <h1 className={classH1Menu}>Auditorías</h1>
          </a>
        </Link>
        </div>
        <div className={classDivMenu} >
          <Link key="5" href="/Todo">
            <a  onClick={() => handleMenuItemIClick(4)} className={menuDataMenu.idMenu === 153 ? classSelected : ""}>
            <FcConferenceCall className={classIconMenu} >
            </FcConferenceCall>
            <h1 className={classH1Menu}>Personal Competente</h1>
            </a>
          </Link>
        </div>
        <div className={`${classDivMenu} mb-2`} >
          <Link key="6" href="/Todo">
            <a  onClick={() => handleMenuItemIClick(4)} className={menuDataMenu.idMenu === 154 ? classSelected : ""}>
            <AiFillSetting className={classIconMenu} >
            </AiFillSetting>
            <h1 className={classH1Menu}>Configuración iCalidad</h1>
            </a>
          </Link>
        </div>
        <div className="divider"></div> 
        <div className={`${classDivMenu} mb-3` }  >
       
          <Link key="6" href="/">
            <a  onClick={() => SignOut} className={menuDataMenu.idMenu === 154 ? classSelected : ""}>
            <MdOutlineExitToApp className={classIconMenu} >
            </MdOutlineExitToApp>
            <h1 className={classH1Menu}>Salir</h1>
            </a>
          </Link>
        </div>
    </div></div>
  )
}

export default MenuPrincipalAdm