import Head from "next/head";
import Link from "next/link";
//import { useEffect, useState } from "react";
import { useSession, getSession } from "next-auth/react";
//import styles from "../styles/Home.module.css";

const DashBoard_old = () => {
  /*const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("/api/User", {
        params: {
          email: "bmoreno@ccmsa.com.mx",
          password: "CBMA",
        },
      })
      .then(function (response) {
        //console.log(response.data[0]);
        setUser(response.data[0]);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        //always execute
      });
  }, []);
*/
  //console.log(user);
  const {session} = useSession();

  //console.log(data);

  return (
    <div className='container'>
      <Head>
        <title>Home Page</title>
      </Head>
      {session ? user({ session }) : guest()}
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
function user({ data }) {
  return (
    <main className="container mx-auto text-center py-20">
      <h3 className="text-4xl font-bold">Autorize User Homepage</h3>

      <div className="details">
        <h5>{data.user.name}</h5>
        <h5>{data.user.email}</h5>
      </div>
      <div className="flex justify-center">
        <button className=" mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50">
          Sign Out
        </button>
      </div>

      <div className="flex justify-center">
        <Link href={"/profile"}>
          <a className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50">
            Profile Page
          </a>
        </Link>
      </div>
    </main>
  );
}


/*
  if (!user)
    return (
      <div>
       
      </div>
    );

  return (
    <div className=" w-full ">
      <h1
        className="text-2xl tracking-wide ml-2 font-semibold text-center  " >
        dashBoard
      </h1>
      <div className=" p-4 m-4 card rounded-b-lg shadow-md">
      <div>
        <h1 className=" font-semibold ">{user.NombreEmpleado}</h1>
      </div>
      <div>
        <h2 className=" font-semibold ">{user.Correo}</h2>
      </div>
      <div>
        <p>{user.FechaAlta}</p>
      </div>
      </div>
    </div>
  );
};
*/
export async function getServerSideProps({ req }){
  const session = await getSession({ req });
  console.log('session', session);
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


export default DashBoard_old;
