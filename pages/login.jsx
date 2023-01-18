import { getSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

export default function Signin({ session }) {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false,
    });

    console.log(res);
  };

  return (
    <div>
      {session ? (
       <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
       <div className="flex flex-col px-8">
         <div className="flex items-stretch">
           <div
             className="text-2xl text-[102,102,102] 
                           tracking-wide ml-2 
                           font-semibold  
                           self-center "
           >
             NIPERD
           </div>
           <button
             className="button bg-orange-500 p-2"
             onClick={() => signOut('credentials')}
           >
             Sign Out
           </button>
         </div>
       </div>
     </div>
      ) : (
<div>
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <input
            value={userInfo.email}
            onChange={({ target }) =>
              setUserInfo({ ...userInfo, email: target.value })
            }
            type="text"
            placeholder="username"
            name="username"
          />
          <input
            value={userInfo.password}
            onChange={({ target }) =>
              setUserInfo({ ...userInfo, password: target.value })
            }
            type="password"
            placeholder="password"
            name="password"
          />
          <span>
            <button
              className="button bg-orange-500 p-2"
              onSubmit={handleSubmit}
            >
              Sign In
            </button>
          </span>
        </form>
      </div>

     
      )
    }
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/DashBoard/index",
        permanent: false,
      }
    }
  }
  return {
    props: {
      session
    }
  }

/*
  if (session)
    return {
      props: { session },
      redirect: {
        destination: "/DashBoard/index",
        permanent: false,
      },
    };*/
/*
  return {
    props: { session },
  };*/
};
