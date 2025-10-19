'use server';
import { usegetPool, typeParameter } from '@/lib/database/connection';
import { Store } from 'lucide-react';
import { revalidatePath } from 'next/cache';


export async function getDocumentsAdmin(PageNumber, PageSize) {

    try {
        const IdResponsable = null;
        const IdNormativa = null;
        const IdTipoDocumento = null;
        const IdDepartamento = null;
        const IdProceso = null;
        const IdEstatusDocumento = null;
        const CodigoDocumento = null;
        const NombreDocumento = null;
        const IdDocumento = null;
        // const PageSize = null;
        // const PageNumber = null;
        const AplicaExamen = null;
        // console.log('getManagment: ', req.query);
        const typeParam = await typeParameter();
        const pool = await usegetPool('Default');
        const request = await pool.request();
        // console.log('dashBoardUser', dashBoardUser);
        await request.input('p_IdResponsable', typeParam.NVarChar(8), IdResponsable ? null : '%');
        await request.input('p_IdNormativa', typeParam.NVarChar(8), IdNormativa ? null : '%');
        await request.input('p_IdTipoDocumento', typeParam.NVarChar(8), IdTipoDocumento ? null : '%');
        await request.input('p_IdDepartamento', typeParam.NVarChar(8), IdDepartamento ? null : '%');
        await request.input('p_IdProceso', typeParam.NVarChar(8), IdProceso ? null : '%');
        await request.input('p_IdEstatusDocumento', typeParam.NVarChar(8), IdEstatusDocumento ? null : '%');
        await request.input('p_CodigoDocumento', typeParam.NVarChar(50), CodigoDocumento ? null : '%');
        await request.input('p_NombreDocumento', typeParam.NVarChar(1000), NombreDocumento ? null : '%');
        await request.input('p_IdDocumento', typeParam.NVarChar(10), IdDocumento ? null : '%');
        await request.input('p_PageSize', typeParam.Int, PageSize ? 10 : PageSize);
        await request.input('p_PageNumber', typeParam.Int, PageNumber ? 1 : PageNumber);
        await request.input('p_AplicaExamen', typeParam.NVarChar(5), AplicaExamen ? null : '%');
        const result = await request.execute('PF_Doc_TDocumento');
        const { rowsAffected, recordset } = result;
        // console.log('recordset', recordset, 'rowsAffected', rowsAffected);
        // console.log(result.recordset[0]);
        // const recordset = result.recordset;
        return JSON.stringify({ "status": 200, recordset, rowsAffected });
        // return res.status(200).json({ recordset, rowsAffected });
        // res.status(200).json({ data, rowsAffected });
    } catch (error) {
        console.log('mensaje de error: ', error);
        // throw new Error('No se recibió respuesta del servidor');
        return JSON.stringify({ "status": 500, error: error.message });
        // return res.status(500).json({ error: error.message });
    }
}



export async function deleteDocument(IdDocumento) {

    let IdEstatusDocumento = 0;
    let StoreProcedure = 'PV_Doc_TDocumentoActivar';
    let Resultado = -1;
    let Mensaje = 'No se obtuvo respuesta del servidor';
    //  Se recupera el Estatus del documento para validar si se puede eliminar
    const typeParam = await typeParameter();
    const pool = await usegetPool('Default');
    const request = await pool.request();
    await request.input('p_IdDocumento', typeParam.Int, IdDocumento);
    const result = await request.execute(StoreProcedure);
    const { recordset } = result;
    if (recordset.length > 0) {
        IdEstatusDocumento = recordset[0].IdEstatusDocumento;
    }

    // Se finaliza la recuperación del Estatus del documento


    try {
        const typeParam = await typeParameter();
        const pool = await usegetPool('Default');
        const request = await pool.request();
        await request.input('p_IdDocumento', typeParam.Int, IdDocumento);
        if (IdEstatusDocumento !== 7)
            StoreProcedure = 'PD_Doc_TDocumento';

        const result = await request.execute(StoreProcedure);
        const { rowsAffected, recordset } = result;
        revalidatePath('/AdminIcalidad/Catalogos');
        if (recordset.length > 0) {
            Resultado = recordset[0].Resultado;
            Mensaje = recordset[0].Mensaje;
        }
        return JSON.stringify({ "status": 200, Resultado, Mensaje });
    } catch (error) {
        console.log('mensaje de error: ', error);
        return JSON.stringify({ "status": 500, error: error.message });
    }
}