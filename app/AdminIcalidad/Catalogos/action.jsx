'use server';
import { usegetPool, typeParameter } from '@/lib/database/connection';
import { revalidatePath } from 'next/cache';

export async function getGerenciasAll(claveGerencia, nombreGerencia, estatusGerencia, res) {

    try {
        // console.log('getManagment: ', req.query);
        const typeParam = await typeParameter();
        const pool = await usegetPool('Default');
        const request = await pool.request();
        // console.log('dashBoardUser', dashBoardUser);
        await request.input('p_ClaveGerencia', typeParam.NVarChar(50), claveGerencia ? null : '%');
        await request.input('p_NombreGerencia', typeParam.NVarChar(100), nombreGerencia ? null : '%');
        await request.input('p_IdEstatus', typeParam.NVarChar(5), estatusGerencia ? null : '%');
        const result = await request.execute('PF_Gen_TGerencia');
        const { rowsAffected, recordset } = result;
        // console.log('recordset', recordset);
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

export async function getGerenciaById(idGerencia) {

    try {
        const typeParam = await typeParameter();
        const pool = await usegetPool('Default');
        const request = await pool.request();
        await request.input('p_IdGerencia', typeParam.Int, idGerencia);
        const result = await request.execute('PF_Gen_TGerenciaById');
        const { rowsAffected, recordset } = result;
        return JSON.stringify({ "status": 200, recordset, rowsAffected });
    } catch (error) {
        console.log('mensaje de error: ', error);
        return JSON.stringify({ "status": 500, error: error.message });
    }
}

export async function validateGerencia(parteValidar, cadenaValidar, idGerencia) {

    try {
        const typeParam = await typeParameter();
        const pool = await usegetPool('Default');
        const request = await pool.request();
        await request.input('p_ParteValidar', typeParam.NVarChar(40), parteValidar);
        await request.input('p_CadenaValidar', typeParam.NVarChar(250), cadenaValidar);
        if (idGerencia) {
            await request.input('p_IdGerencia', typeParam.Int, idGerencia);
        }
        const result = await request.execute('PV_Gen_TGerenciaValida');
        const { rowsAffected, recordset } = result;
        return JSON.stringify({ "status": 200, recordset, rowsAffected });
    } catch (error) {
        console.log('mensaje de error: ', error);
        return JSON.stringify({ "status": 500, error: error.message });
    }
}

export async function createGerencia(ClaveGerencia, NombreGerencia, IdEmpleadoAlta) {
    try {
        const typeParam = await typeParameter();
        const pool = await usegetPool('Default');
        const request = await pool.request();
        await request.input('p_ClaveGerencia', typeParam.NVarChar(50), ClaveGerencia);
        await request.input('p_NombreGerencia', typeParam.NVarChar(100), NombreGerencia);
        await request.input('p_IdEmpleadoAlta', typeParam.Int, IdEmpleadoAlta);
        const result = await request.execute('PI_Gen_TGerencia');
        const { rowsAffected, recordset } = result;
        revalidatePath('/AdminIcalidad/Catalogos');
        return JSON.stringify({ "status": 200, recordset, rowsAffected });
    } catch (error) {
        return JSON.stringify({ "status": 500, error: error.message });

        // console.log('mensaje de error: ', error);
    }
}

export async function updateGerencia(IdGerencia, ClaveGerencia, NombreGerencia, IdEstatusGerencia, IdEmpleadoActualiza) {
    try {
        console.log('updateGerencia: ', IdGerencia, ClaveGerencia, NombreGerencia, IdEstatusGerencia, IdEmpleadoActualiza);
        const typeParam = await typeParameter();
        const pool = await usegetPool('Default');
        const request = await pool.request();
        await request.input('p_IdGerencia', typeParam.Int, IdGerencia);
        await request.input('p_ClaveGerencia', typeParam.NVarChar(50), ClaveGerencia);
        await request.input('p_NombreGerencia', typeParam.NVarChar(100), NombreGerencia);
        await request.input('p_IdEstatusGerencia', typeParam.Bit, IdEstatusGerencia);
        await request.input('p_IdEmpleadoActualiza', typeParam.Int, IdEmpleadoActualiza);
        const result = await request.execute('PU_Gen_TGerencia');
        const { rowsAffected, recordset } = result;
        revalidatePath('/AdminIcalidad/Catalogos');
        return JSON.stringify({ "status": 200, recordset, rowsAffected });
    } catch (error) {
        console.log('mensaje de error: ', error);
        return JSON.stringify({ "status": 500, error: error.message });
        // console.log('mensaje de error: ', error);
    }
}

export async function deleteGerencia(IdGerencia) {
    try {
        const typeParam = await typeParameter();
        const pool = await usegetPool('Default');
        const request = await pool.request();
        await request.input('p_IdGerencia', typeParam.Int, IdGerencia);
        const result = await request.execute('PD_Gen_TGerencia');
        const { rowsAffected, recordset } = result;
        revalidatePath('/AdminIcalidad/Catalogos');
        return JSON.stringify({ "status": 200, recordset, rowsAffected });
    } catch (error) {
        console.log('mensaje de error: ', error);
        return JSON.stringify({ "status": 500, error: error.message });
    }
}

export async function getDepartamentosAll(ClaveDepartamento, NombreDepartamento, IdGerencia, IdEstatus) {
    try {
        console.log('getDepartamentosAll: ', ClaveDepartamento, NombreDepartamento, IdGerencia, IdEstatus);
        const typeParam = await typeParameter();
        const pool = await usegetPool('Default');
        const request = await pool.request();
        await request.input('p_ClaveDepartamento', typeParam.NVarChar(50), typeof ClaveDepartamento === 'string' ? ClaveDepartamento : '%');
        await request.input('p_NombreDepartamento', typeParam.NVarChar(100), typeof NombreDepartamento === 'string' ? NombreDepartamento : '%');
        await request.input('p_IdGerencia', typeParam.Int, Number.isInteger(IdGerencia) ? IdGerencia : '%');
        await request.input('p_IdEstatus', typeParam.NVarChar(5), typeof IdEstatus === 'boolean' ? IdEstatus : '%');
        const result = await request.execute('PF_Gen_TDepartamento');
        const { rowsAffected, recordset } = result;
        // console.log('recordset', recordset, new Date());
        revalidatePath('/AdminIcalidad/Catalogos');
        return JSON.stringify({ "status": 200, recordset, rowsAffected });
    } catch (error) {
        console.log('mensaje de error: ', error);
        return JSON.stringify({ "status": 500, error: error.message });
    }
}

export async function getPuestosByDepartamento(IdDepartamento) {
    try {
        // console.log('getPuestosByDepartamento: ', IdDepartamento);
        const typeParam = await typeParameter();
        const pool = await usegetPool('Default');
        const request = await pool.request();
        await request.input('p_IdDepartamento', typeParam.Int, Number.isInteger(IdDepartamento) ? IdDepartamento : '%');
        const result = await request.execute('PF_Gen_TPuesto');
        const { rowsAffected, recordset } = result;
        // console.log('recordset', recordset);
        revalidatePath('/AdminIcalidad/Catalogos');
        return JSON.stringify({ "status": 200, recordset, rowsAffected });
    } catch (error) {
        console.log('mensaje de error: ', error);
        return JSON.stringify({ "status": 500, error: error.message });
    }
}

export async function getEmpleadosByPuesto(IdPuesto) {
    try {
        // console.log('getEmpleadosByPuesto: ', IdPuesto);
        const typeParam = await typeParameter();
        const pool = await usegetPool('Default');
        const request = await pool.request();
        await request.input('p_IdPuesto', typeParam.Int, Number.isInteger(IdPuesto) ? IdPuesto : 0);
        const result = await request.execute('PF_Gen_REmpleadoPuestoPuesto');
        const { rowsAffected, recordset } = result;
        // console.log('recordset', recordset);
        revalidatePath('/AdminIcalidad/Catalogos');
        return JSON.stringify({ "status": 200, recordset, rowsAffected });
    } catch (error) {
        console.log('mensaje de error: ', error);
        return JSON.stringify({ "status": 500, error: error.message });
    }
}