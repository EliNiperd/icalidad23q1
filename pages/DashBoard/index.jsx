import Head from "next/head";
import Link from "next/link";

//import { useEffect, useState } from "react";
import { useSession, getSession, signOut } from "next-auth/react";
import { LinkC, NavBar, SideNavBar } from "../Components";
//import Search from "pages/Components/Search";
//import GoSignOut from "react-icons/go";
import dynamic from "next/dynamic";
dynamic(require("tw-elements"), { ssr: false });

export default function HomeDashBoard() {
  //console.log(user);
  //console.log(session);
  const { data: session } = useSession();
  const idUser = session.user.id;

  //console.log('data.user', session)
  return (
    <div>
      <Head>
        <title>Dashboard</title>
      </Head>
      <>{session ? autorizeUser({ session }) : guest()}</>
    </div>
  );
}

//Guest
function guest() {
  return (
    <main className="container mx-auto text-center py-20">
      <h3 className="text-4xl font-bold">Guest Homepage</h3>
      <div className="flex justify-center">
        <Link href={"/login"}>
          <a className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50">
            Signing
          </a>
        </Link>
      </div>
    </main>
  );
}

//Autorize User
function autorizeUser({ session }) {
  //console.log(data.user) col-span-10 row-span-3  row-span-2 col-start-1
  const idUser = session.user.id;
  //console.log(session.user.id)
  return (
    <>
      {
        <div className="w-73 fixed sidebar dark:bg-secondary-bg bg-white">
          <SideNavBar idUser={idUser} />
        </div>

        /*<ColorGrid />
    
    <Search />
    <SideNavBar/>
    <div className=" absolute left-14  top-4 ">
       <h3 className="text-4xl font-bold">Dashboard iCalidad</h3>
    </div>
    <div className="flex flex-col  justify-end items-end">
      <h5>{session.user.name}</h5>
      <button className=" mt-0 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50" onClick={()=> signOut()} >
          Salir
      </button>     
    </div>
    
    <main is="mainDB" className="container mx-auto text-center py-20">
      <div className="details hidden ">
        <h5>{session.user.email}</h5>
      </div>
      oigoeugousoiguguo

      <div className=" justify-center hidden">
        <Link href={"/profile"}>
          <a className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50">
            Profile Page
          </a>
        </Link>
      </div>
    </main>*/
      }

      <div>
        <div className="flex justify-center items-center">
          <div
            className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full"
            role="status" >
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-300" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </>
  );
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

//export default Home;
