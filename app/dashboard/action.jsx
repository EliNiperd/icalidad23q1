'use server';
import { usegetPool, typeParameter } from '@/lib/database/connection';
import { revalidatePath } from 'next/cache';


export async function revalidatePathName(pathName) {
  revalidatePath(pathName, "layout", { revalidate: true });
}


export async function getElementsMenu(idEmpleado, idVersion, idMenuFather, idMenu) {

  try {
    const typeParam = await typeParameter();
    const pool = await usegetPool('Default');
    const request = await pool.request();
    await request.input('p_IdEmpleado', typeParam.Int, idEmpleado);
    await request.input('p_Version', typeParam.Int, idVersion);
    await request.input('p_IdMenuFather', typeParam.Int, idMenuFather);
    const result = await request.execute('PF_Gen_TMenu');
    const { rowsAffected, recordset } = result;
    if (rowsAffected[0] > 0) {
      // console.log('recordset', recordset, 'rowsAffected', rowsAffected, 'result', result, 'idEmpleado', idEmpleado, 'idVersion', idVersion, 'idMenuFather', idMenuFather, 'idMenu', idMenu);
      return recordset;
    } else throw new Error('No se encontraron elementos');

  } catch (error) {
    console.log('mensaje de error: ', error);
    // return ({ error: error.message });
    return JSON.stringify({ "status": 500, error: error.message });
  }

}