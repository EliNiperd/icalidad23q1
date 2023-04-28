import { getSession, useSession } from "next-auth/react";
import { useState } from "react";
//import Image from "next/image";
//import menuIcon_01 from "./public/menuIcon_01.svg";

import SideNavBar from "./SideNavBar";
import Avatar  from "./Avatar";
import NavBar  from "./NavBar";
//import Search from "./Search";
//import { IoMenuSharp } from "react-icons/io5";




const HomeDashBoard = ({ session, children }) => {

  console.log(session);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [contador, setContador] = useState(0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setContador(contador + 1)
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setActiveMenuId(null);
  };

  const handleMenuItemClick = (menuId) => {
    //closeMenu();
    setActiveMenuId(menuId);
  };

  //const { data: session } = useSession();
  //console.log(session?.user?.id);
  //const [isOpen, toggleOpen] = useCycle(false, true);
  //const containerRef = useRef(null);
//  const { height } = useWindowSize();
  return (
    
    <div className="flex flex-col h-screen "  >
      <header className=" text-neutral-900 bg-neutral flex justify-between items-center shadow-lg rounded-br rounded-bl p-3">
        <div className="flex flex-row">
        <div className=" basis-1/4 text-3xl hover:cursor-pointer peer" onClick={toggleMenu}>
          <svg className="hover:scale-125" width="24" height="24" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
          <path d="M4 5L24 5" stroke="#141B34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4 12L24 12" stroke="#141B34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4 19L24 19" stroke="#141B34" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div> 
          <h1 className="ml-4 text-lg font-bold basis-1/4">iCalidad</h1>
        </div>
        <div className="w-max  ">
            <NavBar conta={contador} />
        </div>
        <Avatar userImage={session?.user?.image} />
      </header>
      <div className="flex flex-1 ">
     
        <div className={`fixed top-0 left-0 w-56 h-full bg-white shadow-md z-10 overflow-y-auto 
        transition-all duration-500 transform ${isMenuOpen ? "" : "-translate-x-full"}`}>
        {isMenuOpen && (
          <SideNavBar
            onMenuItemClick={handleMenuItemClick}
            activeMenuId={activeMenuId}
            onCloseMenu={closeMenu}
            IdUser={session?.user?.id}
            isMenuOpen={isMenuOpen}
          />
        )}
        </div>
          <div className="flex-1 ml-6 p-4   " onClick={closeMenu} >
            {children}
          </div>
      </div>
    </div>

  );
}


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

export async function getServerSideProps({ req }) {
    const session = await getSession({ req });
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

export default HomeDashBoard




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



{/* <div className="grid grid-cols-4">
      {isMenuOpen && <SideNavBar onMenuItemClick={handleMenuItemClick} activeMenuId={activeMenuId} onCloseMenu={closeMenu} />}
      <div className="col-span-1">
        {isMenuOpen && <button onClick={closeMenu} className="bg-red-500 text-lg p-2">{'<<<'}Close Menu</button>}
      </div>
      <div className="col-span-3">
        <button className="bg-emerald-600 p-2 text-lg"  onClick={toggleMenu}> {'>>>'}Toggle Menu</button>
        {children} 
      </div>
    </div> 
  
  
  


    <div className="flex flex-col place-self-center">
          <h1 className="text-xl font-semibold self-center">
            Lorem Text
          </h1>
          <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum ipsa maiores debitis magnam, praesentium mollitia?
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates quisquam explicabo cum, deserunt omnis expedita,
           doloribus quas asperiores suscipit animi repellendus aspernatur laboriosam similique amet, porro illum eligendi quia
            quae. Sed eos id quae beatae sit similique facere laboriosam doloremque doloribus eligendi reiciendis nemo perspiciatis 
            commodi, repellat, aut tempora dolorum? Illum molestias obcaecati architecto deleniti unde recusandae et nisi, sit commodi 
            placeat soluta aliquid voluptas dolores ipsa rem, corporis eum animi voluptates numquam in laborum. Qui voluptate expedita
             in dicta totam quasi nesciunt harum exercitationem, beatae saepe voluptatum nobis, quis corrupti aut accusantium sequi veniam 
             ab quisquam sapiente voluptatem enim culpa alias excepturi! Libero deleniti hic soluta ullam. Voluptate magnam dolore reiciendis debitis
              dignissimos. Impedit culpa, nostrum debitis deleniti maiores nesciunt optio velit placeat? Facere fugiat dignissimos repellat praesentium
               minus tenetur! Non, architecto. Aliquid repellendus, soluta doloribus eos aspernatur, voluptatem, minus reprehenderit perspiciatis dolores
                iste facere necessitatibus. Obcaecati odit laborum quod deserunt earum alias fugiat a laudantium repudiandae, rerum officiis omnis architecto
                 harum itaque quaerat numquam accusantium dolores quos aliquam nesciunt sit enim ducimus. Veritatis quod rem culpa magnam eos, expedita beatae explicabo
                  dolores, 
          tempora doloribus est ratione, quam pariatur ipsum. Nisi voluptatum facilis consectetur ullam pariatur? Ducimus, velit rem.
          </p>
          </div>


  
  
  */}