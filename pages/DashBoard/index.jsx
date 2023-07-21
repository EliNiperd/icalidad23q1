import { useState } from 'react';

import { IoMenuSharp } from 'react-icons/io5';
import SideNavBar from './SideNavBar';
import Avatar from './Avatar';
import Search from './Search';
import { useContext, useEffect } from 'react';
import { IcalidadContext } from '../contexts/IcalidadContext';

const HomeDashBoard = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [contador, setContador] = useState(0);

  const { menuDataMenu, setDataMenu } = useContext(IcalidadContext);
  /*useEffect(() => {
    if (menuDataMenu.idMenu === null || menuDataMenu.idMenu === 0) {
      setDataMenu({
        ...menuDataMenu,
        idMenuFather: 149,
        idMenu: 149,
      });
    }
  }, []);
*/
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setContador(contador + 1);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setActiveMenuId(null);
  };

  return (
    <div className="flex flex-col h-screen ">
      <header className=" text-neutral-900 bg-neutral flex justify-between items-center shadow-lg rounded-br rounded-bl p-3">
        <container className="flex flex-row">
          <IoMenuSharp
            className="hover:scale-125 basis-1/4 text-3xl hover:cursor-pointer peer"
            onClick={toggleMenu}
          />
          <h1 className="pl-1 font-semibold text-xl">iCalidad</h1>
        </container>
        <container className="flex flex-row">
          {' '}
          <Search></Search>
        </container>
        <container className="w-max ">
          <Avatar></Avatar>
        </container>
      </header>
      <div className="flex flex-1 ">
        <div
          className={`fixed top-0 left-0 w-56 h-full bg-white shadow-md z-10 overflow-y-auto 
        transition-all duration-500 transform ${
          isMenuOpen ? '' : '-translate-x-full'
        }`}
        >
          <SideNavBar
            activeMenuId={activeMenuId}
            isMenuOpen={isMenuOpen}
            menuId={activeMenuId}
            onCloseMenu={closeMenu}
            menuDataMenu={menuDataMenu}
            setDataMenu={setDataMenu}
          />
        </div>
        <div className="flex-1 ml-6 p-4 " onClick={closeMenu}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default HomeDashBoard;

/*



export async function getServerSideProps({ context }) {
  const session = await getSession({ context });
  //console.log('session - : ', session);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
}
*/

/*

  // const { data: session } = useSession();
  // console.log('session: ', session);
  // const userId = session?.user?.id;
  // const userImage = session?.user?.image;

/*

  /*
  const handleMenuItemClick = (menuId) => {
    // closeMenu();
    setActiveMenuId(menuId);
  };
*/
// const { data: session } = useSession();
// console.log(session?.user?.id);
// const [isOpen, toggleOpen] = useCycle(false, true);
// const containerRef = useRef(null);
//  const { height } = useWindowSize();

// import { useSession } from 'next-auth/react';

// import { getServerSession } from "next-auth/next"
// import { authOptions } from "../api/auth/[...nextauth]";
// import Image from "next/image";
// import menuIcon_01 from "./public/menuIcon_01.svg";
// import Avatar from './Avatar';
// import NavBar from './NavBar';
// import SideNavBar from './SideNavBar';
// import Search from "./Search";

/*
// Hook
function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    //const dimensions = useRef({ width: 0, height: 0 });
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });
    useEffect(() => {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      // Add event listener
      window.addEventListener("resize", handleResize);
      // Call handler right away so state gets updated with initial window size
      handleResize();
      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
  }
*/

/*
import { useCycle } from "framer-motion";

const sidebar = {
  open: (height = 1000 ) => ({
    gridColumn: "3",
    clipPath: `circle(${height * 2 + 200}px at 48px 48px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 44px 44px)",
    gridColumn: "1",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

*/

//  {/** 2. Header */}
//  <div id='nav-bar-header' className="flex row-star-1 col-start-2 col-span-12 w-full justify-between self-end  text-black outline-1 outline-double outline-fuchsia-700">
//  {/** 2.1 Logo y Side Bar */}
//  <div className=" h-full bg-yellow-400 text-black  outline-1 outline-double outline-yellow-700">
//      <h1 className="text-lx4 ">Logo y Side Bar</h1>
//  </div>
//  {/** 2.2 Search and NavBar */}
//  <div className="flex flex-row justify-between  p-2 gap-4  w-2/4 h-full self-end text-black  outline-1 outline-double outline-blue-700">
//      <NavBar />
//      <Search />
//  </div>
//  {/** 2.3 Avatar   bg-green-400 text-white  */}
//  <div className=" w-24 h-full pr-3  outline-1 outline-double outline-green-50-700">
//      <Avatar />
//  </div>
// </div>
