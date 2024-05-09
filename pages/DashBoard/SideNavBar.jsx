
import { IoCloseSharp } from 'react-icons/io5';
import { MenuPrincipalAdm } from './MenuPrincipalAdm';

export function SideNavBar({
  activeMenuId,
  onCloseMenu,
  isMenuOpen,
  menuId,
  menuDataMenu,
  setDataMenu,
}) {
  return (
    <div
      className={`fixed top-0 left-0 w-56 h-full shadow-md z-10 bg-secondary  
      overflow-y-auto transition-all duration-600 transform ${isMenuOpen ? '' : '-translate-x-full backdrop-blur-sm'
        }`}
    >
      <div className="flex flex-row-reverse  px-6 py-4">
        <IoCloseSharp
          className="text-3xl text-neutral-900 hover:cursor-pointer"
          onClick={onCloseMenu}
        ></IoCloseSharp>
      </div>
      <div className="flex flex-col content-between  gap-2 pt-4 menu transition-all duration-500">
        <MenuPrincipalAdm
          activeMenuId={activeMenuId}
          menuId={menuId}
          menuDataMenu={menuDataMenu}
          setDataMenu={setDataMenu}
        />
      </div>
    </div>
  );
}

export default SideNavBar;
