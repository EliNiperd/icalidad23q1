// import CardGeneral from "@/components/ui/catalogo/card-general";
import { getGerenciasAll } from '@/app/AdminIcalidad/Catalogos/action';
import CatalogoInteractivo from "@/components/ui/catalogo/CatalogoInteractivo";
import { Suspense } from "react";


export default async function CatalogoGeneral() {
    const response = await getGerenciasAll();
    // console.log('response: ', response);
    if (!response) {
        console.error('No se recibió respuesta del servidor');
        throw new Error('No se recibió respuesta del servidor');
    }
    const { recordset } = JSON.parse(response);
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <CatalogoInteractivo initialGerencias={recordset} />
            </Suspense>
        </>
    );
}

