import { Collapse, IconButton, useDisclosure } from '@chakra-ui/react';
import Link from 'next/link';
import { useContext } from 'react';
import {
  FcAnswers,
  FcCollaboration,
  FcConferenceCall,
  FcNext,
  FcPrevious,
  FcSurvey,
} from 'react-icons/fc';
import useSWR from 'swr';
import { IcalidadContext } from '../contexts/IcalidadContext';

import { AiFillHome, AiFillSetting } from 'react-icons/ai';

import { MdTask } from 'react-icons/md';
//   MdAdminPanelSet, , MdAppRegistratio/// importante
// let contador = 0;
/*
function modifyMenuDataMenu(e,idMenuSelected, idMenuFather) {
  //e.preventDefault();

  //alert(urlMenu);
  //const idiCalidad = 23;
   setDataMenu({
     ...menuDataMenu,
     idMenu: idMenuSelected,
     idMenuFather: idMenuFather !== idMenuSelected ? idMenuSelected : idMenuFather,
   });
  //if(idMenuFather !== idMenuSelected){
    //const { data, error } = mutate(`/api/User/dasBoardUser/${IdUser}/${idiCalidad}/${idMenuSelected}`);

    //router.push(urlMenu);
  }
  */

export function ElementMenu1(key) {
  const classVar =
    ' inline-block text-4xl text-[#30A9ED] group-hover:text-white ';
  // console.log('idMenuSelected:', key.idMenuSelected, 'idMenuFather:', key.idMenuFather)
  // console.log('key:', key, 'description:', key.description, 'Fin')
  // () => {
  //  setCurrentUser({
  //  name: firstName + ' ' + lastName
  // });
  switch (key.description) {
    case 'iCalidad':
      return (
        <Link key={key.urlMenu} href={key.urlMenu}>
          <a>
            <AiFillHome key={key.idMenu} className={classVar}></AiFillHome>
            {key.description}
          </a>
        </Link>
      );
    case 'Poder Documental':
      return (
        <Link key={key.urlMenu} href={key.urlMenu}>
          <a>
            <FcAnswers key={key.idMenu} className={classVar}></FcAnswers>
            {key.description}
          </a>
        </Link>
      );
    case 'Acciones':
      return (
        <Link key={key.urlMenu} href={key.urlMenu}>
          <a>
            <FcCollaboration
              key={key.idMenu}
              className={classVar}
            ></FcCollaboration>
            {key.description}
          </a>
        </Link>
      );
    case 'Auditorías':
      return (
        <Link key={key.urlMenu} href={key.urlMenu}>
          <a>
            <FcSurvey key={key.idMenu} className={classVar}></FcSurvey>
            {key.description}
          </a>
        </Link>
      );
    case 'Personal Competente':
      return (
        <Link key={key.urlMenu} href={key.urlMenu}>
          <a>
            <FcConferenceCall
              key={key.idMenu}
              className={classVar}
            ></FcConferenceCall>
            {key.description}
          </a>
        </Link>
      );
    case 'Configuración iCalidad':
      return (
        <Link key={key.urlMenu} href={key.urlMenu}>
          <a>
            <AiFillSetting
              key={key.idMenu}
              className={classVar}
            ></AiFillSetting>
            {key.description}
          </a>
        </Link>
      );
    case 'Catálogos':
      return (
        <Link key={key.urlMenu} href={key.urlMenu}>
          <a>
            <MdTask key={key.idMenu} className={classVar}></MdTask>
            {key.description}
          </a>
        </Link>
      );
    case 'Solicitudes':
      return (
        <Link key={key.urlMenu} href={key.urlMenu}>
          <a>
            <MdTask key={key.idMenu} className={classVar}></MdTask>
            {key.description}
          </a>
        </Link>
      );
    case 'Registros':
      return (
        <Link key={key.urlMenu} href={key.urlMenu}>
          <a>
            <FcAnswers key={key.idMenu} className={classVar}></FcAnswers>
            {key.description}
          </a>
        </Link>
      );
    default:
      return (
        <Link key={key.urlMenu} href={key.urlMenu}>
          <a>
            <FcAnswers key={key.idMenu} className={classVar}></FcAnswers>
            {key.description}
          </a>
        </Link>
      );
  }
  // console.log('description: ', idMenu, ' :FInal')
}

function SideNavBar({ idUser }) {
  const { isOpen, onToggle } = useDisclosure();
  const { menuDataMenu, setDataMenu } = useContext(IcalidadContext);

  const { idMenuFather, idMenu } = menuDataMenu;
  console.log('idMenuFather:', idMenuFather, 'idMenu:', idMenu);

  const idiCalidad = 23; // Se utiliza fijo para el menú del iCalidad ver. 2023 Q1
  const {
    data: menu,
    error,
    isLoading,
  } = useSWR(
    `/api/User/dasBoardUser/${idUser}/${idiCalidad}/${menuDataMenu.idMenuFather}`
  );
  // const { data, error } = useSWR('/api/User/dasBoardUser/92/23/0');
  // const recordset =  data?.recordset;
  // contador += contador;
  // const { mutate } = useSWRConfig()
  // const {datam, errorm} = mutate(`/api/User/dasBoardUser/${idUser}/${idiCalidad}/${menuDataMenu.idMenu}`)
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load</div>;
  else {
    const menuArray = menu.recordsets[0];
    return (
      <>
        <IconButton
          onClick={onToggle}
          icon={!isOpen ? <FcNext /> : <FcPrevious />}
          outline="solid 2px"
          outlineColor="#30a9ed"
          rounded="xl"
          className=" flex flex-grow-1 cursor-pointer  left-16 top-4 w-1  "
        ></IconButton>

        <Collapse
          in={isOpen}
          animateOpacity
          className={` h-screen ${!isOpen ? 'block' : 'hidden'} bg-slate-700  `}
        >
          <div
            className={
              'menu w-70 p-0 rounded-tr-box rounded-br-box  outline-2 outline-black bg-red-400 '
            }
          >
            {menuArray?.map((item) => (
              <li
                key={item.IdMenu}
                onClick={() =>
                  setDataMenu({ idMenuFather: item.IdMenu, idMenu: 0 })
                }
              >
                <ElementMenu1
                  idMenu={item.IdMenu}
                  description={item.Menu}
                  urlMenu={item.URL}
                  idMenuFather={item.IdMenuPadre}
                />
              </li>
            ))}
          </div>
        </Collapse>
      </>
    );
  }
}

export default SideNavBar;
// <button className="btn " onClick={() => setDataMenu({idMenuFather: 150})} >Cambiar  </button>
// <div className="w-auto inline-block outline-1 outline-green-800" onClick={() => setDataMenu({idMenuFather: item.idMenu})}>

// <ElementMenu key={item.IdMenu} idMenu={item.IdMenu} description={item.Menu} idMenuSelected={item.IdMenu} idMenuFather={item.IdMenuPadre} urlMenu={item.URL} IdUser={idUser} />

// <ElementMenu key={item.IdMenu} description={item.Menu} idMenuSelected={item.IdMenu} idMenuFather={item.IdMenuPadre} urlMenu={item.URL} IdUser={idUser} />

// Path: pages\DashBoard\SideNavBar.jsx
/*
{ console.log(Repeat(menuDataMenu.idMenu, menuDataMenu.idMenuFather, idUser, idiCalidad)) }
{<Repeat idMenu={menuDataMenu.idMenu} idMenuFather={menuDataMenu.idMenuFather} idUser={idUser} idiCalidad={idiCalidad} />}
{ console.log(Repeat(menuDataMenu.idMenu, menuDataMenu.idMenuFather, idUser, idiCalidad).lenght) }
switch (item.IdMenu) {
                    case 'iCalidad':
                          <div>
                              <a>
                                  <AiFillHome key={item.idMenu} className={classVar}>
                                      {item.Menu}
                                  </AiFillHome>
                              </a>
                          </div>
                      break;
                    case 'Poder Documental':
                          <div>
                              <a>
                                  <FcAnswers key={item.idMenu} className={classVar}>
                                      {item.Menu}{' '}
                                  </FcAnswers>
                              </a>
                          </div>
                      break;
                    case 'Acciones':
                          <div>
                              <a>
                                  <FcCollaboration key={item.idMenu} className={classVar} >
                                    {item.Menu}
                                  </FcCollaboration>
                              </a>
                          </div>
                          break;
                    case 'Auditorías':
                          <div>
                              <a>
                                  <FcSurvey key={item.idMenu} className={classVar} >
                                    {item.Menu}
                                  </FcSurvey>
                              </a>
                          </div>
                          break;
                    case 'Personal Competente':
                          <div>
                              <a>
                                  <FcConferenceCall key={item.idMenu} className={classVar} >
                                    {item.Menu}
                                  </FcConferenceCall>
                              </a>
                          </div>
                          break;
                    case "Configuración iCalidad":
                          <div>
                              <a>
                                  <AiFillSetting key={item.idMenu} className={classVar} >
                                    {item.Menu}
                                  </AiFillSetting>
                              </a>
                          </div>
                          break;
                    default:
                          <div>
                              <a>
                                <FcAnswers key={item.idMenu} className={classVar} >
                                    {item.Menu}
                                </FcAnswers>
                              </a>
                          </div>
                            break;
                        })

async function Repeat(idMenu, idMenuFather, idUser, idiCalidad) {
        const { data, error, isLoading } =  useSWR(`/api/User/dasBoardUser/${idUser}/${idiCalidad}/${menuDataMenu.idMenuFather}`);
        console.log('isloading', isLoading, 'error', error)
        if(isLoading) return <div>Loading...</div>
        if(error) return <div>Error...</div>
        const recordSet = await data.recordset;
        const classVar = "text-4xl text-[#30A9ED] group-hover:text-white ";
        let items = [];
        recordSet.forEach(element => {
            console.log('element', element)
            items.push(<div key={element.IdMenu}>{element.Menu}</div>)
            switch (element.IdMenu) {
                case 'iCalidad':
                      items.push(<div>
                          <a>
                              <AiFillHome key={element.idMenu} className={classVar}>
                                  {element.Menu}
                              </AiFillHome>
                          </a>
                      </div>)
                  break;
                case 'Poder Documental':
                    items.push(<div>
                          <a>
                              <FcAnswers key={element.idMenu} className={classVar}>
                                  {element.Menu}
                              </FcAnswers>
                          </a>
                      </div>)
                  break;
                case 'Acciones':
                    items.push(<div>
                          <a>
                              <FcCollaboration key={element.idMenu} className={classVar} >
                                {element.Menu}
                              </FcCollaboration>
                          </a>
                      </div>)
                      break;
                case 'Auditorías':
                    items.push(<div>
                          <a>
                              <FcSurvey key={element.idMenu} className={classVar} >
                                {element.Menu}
                              </FcSurvey>
                          </a>
                      </div>)
                      break;
                case 'Personal Competente':
                    items.push(<div>
                          <a>
                              <FcConferenceCall key={element.idMenu} className={classVar} >
                                {element.Menu}
                              </FcConferenceCall>
                          </a>
                      </div>)
                      break;
                case "Configuración iCalidad":
                    items.push(<div>
                          <a>
                              <AiFillSetting key={element.idMenu} className={classVar} >
                                {element.Menu}
                              </AiFillSetting>
                          </a>
                      </div>)
                      break;
                default:
                    items.push(<div>
                          <a>
                            <FcAnswers key={element.idMenu} className={classVar} >
                                {element.Menu}
                            </FcAnswers>
                          </a>
                      </div>)
                        break;
                    }
                }
            );
        return items;
    }

*/
