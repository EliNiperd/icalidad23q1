import { useSession, SignOut } from 'next-auth/react';
import useSWR from 'swr';
import Link from 'next/link';
//import { useContext } from 'react';

//import { IcalidadContext } from '../contexts/IcalidadContext';
// import GetIcon from '../Components/GetIcon';

import * as aiIcons from 'react-icons/ai';
import * as fcIcons from 'react-icons/fc';
import * as mdIcons from 'react-icons/md';
import * as riIcons from 'react-icons/ri';
import * as bsIcons from 'react-icons/bs';
import * as hiIcons from 'react-icons/hi';
import PropTypes from 'prop-types';

const classH1Menu = 'text-base inline-block ';
const classDivMenu =
  'flex flex-col text-4xl text-accent first:border-b last:border-t hover:bg-neutral-200 rounded-lg pr-2  ';
const classIconMenu = 'inline-block text-5xl p-2';
const classSelected = 'bg-neutral-200 rounded-lg pr-2  ';
const classDisplay = ' inline-block text-xs p-1  ';

const GetIcon = ({ icon, className }) => {
  const getNIcon = (iconName) => {
    const iconsMap = new Map();
    iconsMap.set('Ai', aiIcons);
    iconsMap.set('Fc', fcIcons);
    iconsMap.set('Md', mdIcons);
    iconsMap.set('Ri', riIcons);
    iconsMap.set('Bs', bsIcons);
    iconsMap.set('Hi', hiIcons);

    return iconsMap.get(iconName.substring(0, 2));
  };
  const icons = getNIcon(icon || 'Ai');
  const TheIcon = icons[icon];

  return <TheIcon className={className} />;
};

GetIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};

function DataElement(props) {
  const { menuDataMenu, setDataMenu, idUser } = props;

  /*
  console.log(
    'idMenuFather: ',
    menuDataMenu.idMenuFather,
    'idMenu: ',
    menuDataMenu.idMenu
  );
*/
  /*
  if (
    (menuDataMenu.idMenuFather === 0 || menuDataMenu.idMenuFather === null) &&
    (props.IdMenuFather === 0 || props.idMenuFather === null)
  ) {
    
    setDataMenu({
      ...menuDataMenu,
      idMenuFather: 149,
      idMenu: 0,
    });
  }
  */
  /*
  console.log(
    'idMenu: ',
    menuDataMenu.idMenu,
    'idMenuFather: ',
    menuDataMenu.idMenuFather
  );
*/
  console.log(`/api/User/dasBoardUser/${idUser}/23/${menuDataMenu.idMenu}`);
  const { data, error, status } = useSWR(
    // `/api/User/dasBoardUser/92/23/149`
    `/api/User/dasBoardUser/${idUser}/23/${menuDataMenu.idMenu}`
  );

  const handleMenuItemIClick = (menuId, menuIdFather) => {
    setDataMenu({
      ...menuDataMenu,
      idMenu: menuId,
      idMenuFather: menuIdFather,
    });
  };

  if (error) return <div>failed to load</div>;
  if (!data && status === 'loading') return <div>loading...</div>;
  if (data) {
    const recordset = data.recordset;
    console.log('recordset: ', recordset);
    const urlNextAuth = process.env.NEXTAUTH_URL;
    return (
      <>
        {recordset.map((item) => (
          <>
            <li key={item.IdMenu} className={classDivMenu}>
              <Link key={item.IdMenu} href={item.URL} passHref>
                <a
                  onClick={(event) => {
                    event.stopPropagation();
                    setDataMenu({
                      ...menuDataMenu,
                      idMenuFather: item.IdMenu,
                      idMenu: item.IdMenu,
                    });
                    if (item.Menu === 'Salir') {
                      // console.log(urlNextAuth);
                      SignOut({ callbackUrl: urlNextAuth });
                    }
                    handleMenuItemIClick(item.IdMenu, props.IdMenuFather);
                  }}
                  className={
                    menuDataMenu.idMenu === item.IdMenu ? classSelected : ''
                  }
                >
                  {item.LeftLogo && (
                    <GetIcon icon={item.LeftLogo} className={classIconMenu} />
                  )}
                  <h1 className={classH1Menu}>{item.Menu}</h1>
                  <h4
                    className={
                      menuDataMenu.idMenu === item.IdMenu &&
                      item.Menu === 'Salir'
                        ? classDisplay
                        : ' hidden '
                    }
                  >
                    {menuDataMenu.idMenu}
                  </h4>
                </a>
              </Link>
            </li>
          </>
        ))}
      </>
    );
  }
}

export const MenuPrincipalAdm = ({
  activeMenuId,
  menuId,
  menuDataMenu,
  setDataMenu,
}) => {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  // <DataElement IdMenuFather={menuDataMenu.idMenuFather} />
  //  <p>
  //  {session.user.id} ' ' {menuDataMenu.idMenu}
  // </p>
  return (
    <>
      {!session && status === 'loading' && (
        <>
          <span>{loading}</span>
        </>
      )}
      {session?.user && (
        <>
          <ul>
            <DataElement
              IdMenuFather={menuDataMenu.idMenuFather}
              menuDataMenu={menuDataMenu}
              setDataMenu={setDataMenu}
              idUser={session.user.id}
              activeMenuId={activeMenuId}
              menuId={menuId}
            />
          </ul>
        </>
      )}
      <div className="flex flex-col content-between  gap-2 pt-4 menu transition-all duration-500"></div>
    </>
  );
};

export default MenuPrincipalAdm;
