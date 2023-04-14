import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";
import { IcalidadProvider } from "./contexts/IcalidadContext";
import { ChakraProvider } from "@chakra-ui/react";
import { StrictMode } from "react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  //  mutate(key, data, options)
  // refreshInterval: 3000,
  return (


<SessionProvider session={ session }>
<IcalidadProvider>
  <SWRConfig 
      value={{
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      }}
    >
      <ChakraProvider>
        <StrictMode>
            <Component {...pageProps} />
        </StrictMode>
      </ChakraProvider>
  </SWRConfig>
  </IcalidadProvider> 
        </SessionProvider>
     
  )
}

export default MyApp;

//import { getSession, SessionProvider } from "next-auth/react";
//import useSWR, { SWRConfig } from "swr";

/*
export async function getStaticProps () {
  // `getStaticProps` is executed on the server side.
  const article = await getCompanyFromAPI()
  return {
    props: {
      fallback: {
        '/api/company': companyname
      }
    }
  }
}*/

//const fetcher = (url) => fetch(url).then((res) => res.json())
/*const url = '/api/company'
function Company() {
  // `data` will always be available as it's in `fallback`.
  const { data } = useSWR(url)
  return <h1>Nada  {data.NombreEmpresa}</h1>
}*/

/*
export const getSetverSideProps = async (context) => {
  
  const session = await getSession(context)

  if(!session) return {
    redirect: {
      destination: '/',
      permanent: false
    }
    }
  
    return{
      props:{
        session
      }
    }
  }
*/

//export default MyApp
