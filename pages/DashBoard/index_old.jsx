import React from 'react'

const index_old = () => {
  return (
    <div>index_old</div>
  )
}

export default index_old



/*
import Head from "next/head";
import Link from "next/link";


//import { useRef, useState, useEffect } from "react";
//import { useSession, getSession } from "next-auth/react";

import { motion, useCycle } from "framer-motion";

import { MenuToggle } from "../Components/MenuToggle";
//import { SideNavBar } from "../Components";

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



export default function HomeDashBoard_Old({ children}) {
//  const { data: session } = useSession();
  //const idUser = session.user.id;//
  //Este es tu número de reporte: 25136037. Consérvalo en caso de futuras aclaraciones.
// https://www.youtube.com/watch?v=He1_AH6kC8Y&list=TLPQMTgwMTIwMjNOYiqEqkyi1g&index=2
// https://www.youtube.com/watch?v=4HnLIAX0EoM
  return (
    <div>
      <Head>
        <title>Dashboard</title>
      </Head>
      <main>
        {session ? autorizeUser({ session, children }) : guest()}
      </main>
    </div>
  );
}

//Guest
function guest() {
  return (
    <main className="container mx-auto text-center py-20">
      <h3 className="text-4xl font-bold">Guest Homepage</h3>
      <div className="flex justify-center">
        <Link href={"/"}>
          <a className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50">
            Signing
          </a>
        </Link>
      </div>
    </main>
  );
}

//Autorize User
function autorizeUser({children}) {
  //console.log(data.user) col-span-10 row-span-3  row-span-2 col-start-1
  //const { data: session } = useSession();
  //console.log('session', session);
  //const [isOpen, toggleOpen] = useCycle(false, true);
  //const containerRef = useRef(null);
  //const { height } = useWindowSize();
 
  return (
    <>
    <div className="grid grid-cols-8 grid-rows-12 gap-4">
      <div className="col-start-4 col-span-full row-start-1 row-span-1 h-2/12 w-full bg-slate-600 text-white align border-2 border-fuchsia-700">
        <h1 className="text-lx4 ">Nav Bar & User</h1>
        <h1 className="text-lx4 ">Nav Bar & User</h1>
        <h1 className="text-lx4 ">Nav Bar & User</h1>
      </div>
      {
        <motion.nav className="flex col-start-1 col-span-3 row-start-1 border-2 border-green-600 "
          initial={false}
          animate={isOpen ? "open" : "closed"}
          custom={height}
          ref={containerRef}>
            <motion.div
              className="flex top-0 left-0 bottom-0 bg-white border-2 border-yellow-600 " variants={sidebar} >
              {SideNavBar  idUser={session.user.id />}
            </motion.div>
            <MenuToggle toggle={() => toggleOpen()} />
        </motion.nav>
      }
      <div className="row-start-3 col-start-1 col-span-8 w-auto max-h-screen bg-blue-300 border-2 border-blue-500">
            {children}
      </div>
     
     </div>
    </>
  );
}


*/

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

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });
  //console.log('session', session);
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