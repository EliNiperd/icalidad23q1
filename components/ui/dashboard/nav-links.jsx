'use client';
import Link from "next/link";
import clsx from "clsx";

import * as FcAll from "react-icons/fc";
import * as AiAll from "react-icons/ai";
import * as MdAll from "react-icons/md";
import * as RiAll from "react-icons/ri";
import * as FaAll from "react-icons/fa";

import { useState, useContext, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { IcalidadContext } from "@/contexts/IcalidadContext";

import { getElementsMenu } from "@/app/dashboard/action";


const groupIcons = [
  {
    name: 'AiFillHome',
    icon: AiAll.AiFillHome,
  },
  {
    name: 'FcAnswers',
    icon: FcAll.FcAnswers,
  },
  {
    name: 'FcSurvey',
    icon: FcAll.FcSurvey,
  },
  {
    name: 'FcCollaboration',
    icon: FcAll.FcCollaboration,
  },
  {
    name: 'FcConferenceCall',
    icon: FcAll.FcConferenceCall,
  },
  {
    name: 'AiFillSetting',
    icon: AiAll.AiFillSetting,
  },
  {
    name: 'FcAnswers',
    icon: FcAll.FcAnswers,
  },
  {
    name: 'FcCollaboration',
    icon: FcAll.FcCollaboration,
  },
  {
    name: 'FcConferenceCall',
    icon: FcAll.FcConferenceCall,
  },
  {
    name: 'MdOutlineExitToApp',
    icon: MdAll.MdOutlineExitToApp,
  },
  {
    name: 'RiArchiveDrawerFill',
    icon: RiAll.RiArchiveDrawerFill,
  },
  {
    name: 'RiAdminFill',
    icon: RiAll.RiAdminFill,
  },
  {
    name: 'FaRuler',
    icon: FaAll.FaRuler,
  },
  {
    name: 'MdNote',
    icon: MdAll.MdNote,
  },
  {
    name: 'MdCurtainsClosed',
    icon: MdAll.MdCurtainsClosed,
  },
  {
    name: 'MdAdminPanelSettings',
    icon: MdAll.MdAdminPanelSettings,
  },
  {
    name: 'MdTask',
    icon: MdAll.MdTask,
  },
  {
    name: 'MdSnippetFolder',
    icon: MdAll.MdSnippetFolder,
  },
  {
    name: 'MdAppRegistration',
    icon: MdAll.MdAppRegistration,
  },
  {
    name: 'FaRegFileAlt',
    icon: FaAll.FaRegFileAlt,
  },

];

// Función para manejar el evento de click en un menú
async function handleMenuItemIClick(idEmpleado, idMenu, setMenuData, setDataMenu, menuDataMenu, setLoading) {
  setDataMenu({
    ...menuDataMenu,
    idMenu,
    idMenuFather: idMenu,
  });
  const data = await getElementsMenu(idEmpleado, 23, idMenu);
  // console.log('data', data);
  setMenuData(data);
  setLoading(false);

}


export default function NavLinks({ idEmpleado }) {
  const { menuDataMenu, setDataMenu } = useContext(IcalidadContext);
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Cargar el menú inicial basado en el contexto
    const loadInitialMenu = async () => {
      const data = await getElementsMenu(idEmpleado, 23, menuDataMenu.idMenu || 149);
      setMenuData(data);
      setLoading(false);
    };
    loadInitialMenu();
  }, [idEmpleado, menuDataMenu]);

  const handleClick = async (e, link) => {
    e.preventDefault();
    await handleMenuItemIClick(idEmpleado, link.IdMenu, setMenuData, setDataMenu, menuDataMenu, setLoading);
    router.push(link.URL);
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        menuData.map((link) => {
          const nameIcon = link.LeftLogo.toString();
          const LinkIcon = groupIcons.find(element => element.name === nameIcon).icon;// groupIcons.name[link.LeftLogo.toString()];

          if (!LinkIcon) {
            console.warn(`Icono no encontrado para: ${nameIcon}`);
            return null;
          }

          return (
            <Link
              key={link.Menu}
              href={link.URL}
              className={clsx(
                "flex items-center gap-5 p-2 rounded-lg hover:bg-neutral group",
                {
                  "flex items-center gap-5 p-2 rounded-lg hover:bg-neutral group": pathname === link.URL,
                }
              )}
              onClick={(e) => handleClick(e, link)}
            >
              <LinkIcon className="w-6 h-6" />
              <span className="hidden text-black group-hover:block">{link.Menu}</span>
            </Link>
          );
        })
      )}
    </>
  );
}