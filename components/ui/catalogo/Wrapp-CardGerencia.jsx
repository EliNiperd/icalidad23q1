import { getGerenciasAll } from '@/app/AdminIcalidad/Catalogos/action';
import CardGerencia from "@/components/ui/catalogo/card-gerencia";


export default async function WrappCardGerencia() {
    const response = await getGerenciasAll();
    // const handleGerenciaClick = async (gerencia) => {
    //     alert(gerencia);

    // };

    if (!response) {
        console.error('No se recibió respuesta del servidor');
        throw new Error('No se recibió respuesta del servidor');
    }
    const { recordset } = JSON.parse(response);
    return (
        <>
            {
                recordset.map((gerencia) => {
                    return (
                        <CardGerencia
                            key={gerencia.IdGerencia}
                            title={gerencia.ClaveGerencia}
                            description={gerencia.NombreGerencia}
                            status={gerencia.IdEstatusGerencia}
                            id={gerencia.IdGerencia}
                            showEditButton={true}
                        />
                    );
                })
            }

        </>
    );
}