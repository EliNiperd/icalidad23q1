import useSWR from 'swr'
//import fetchData from '../api/functions/fetchData';
import { Suspense } from 'react'; 


const HomeDashBoardOk = () => {

    const idiCalidad = 23; // Se utiliza fijo para el menú del iCalidad ver. 2023 Q1
    const idUser = 92;
    const idMenuFather = 149;
    //const fetcher = SWRConfig.fetcher;
    //console.log('menuDataMenu.idMenuFather: ', menuDataMenu.idMenuFather, `/api/User/dasBoardUser/${idUser}/${idiCalidad}/${idMenuFather}`);
    //const data = fetchData(`/api/User/dasBoardUser/${idUser}/${idiCalidad}/${idMenuFather}`);
    const apiUrl = `/api/User/dasBoardUser/${idUser}/${idiCalidad}/${idMenuFather}`;
    //const fetcher = (url) => fetch(url).then((r) => r.json());
    const { data: menu, isLoading, error } = useSWR(apiUrl, Suspense);
    
//console.log(menu?menu.recordsets:isLoading, 'data');

if (isLoading) return <div>Loading...</div>
if (error) return <div>Failed to load</div>
else
{
  const menuArray = menu.recordsets[0];
  return (
    <div>
        <h1>Fetch Like a Pro</h1>
        <ul>
         {menuArray?.map((item) => (
            <li key={item.IdMenu}>{item.Menu}</li>
          ))}   
        </ul>
        <h1>final</h1>
       
        
    </div>
    
  )
}
}

export default HomeDashBoardOk