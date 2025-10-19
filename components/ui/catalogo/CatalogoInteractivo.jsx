'use client'

import { useState } from 'react';
import CardGeneral from "@/components/ui/catalogo/card-general";

import {
    getDepartamentosAll,
    getPuestosByDepartamento,
    getEmpleadosByPuesto
} from '@/app/AdminIcalidad/Catalogos/action';

export default function CatalogoInteractivo({ initialGerencias }) {
    const [gerencias, setGerencias] = useState(initialGerencias);
    const [selectedGerencia, setSelectedGerencia] = useState(null);
    const [areas, setAreas] = useState([]);
    const [selectedArea, setSelectedArea] = useState(null);
    const [puestos, setPuestos] = useState([]);
    const [selectedPuesto, setSelectedPuesto] = useState(null);
    const [empleados, setEmpleados] = useState([]);

    const handleGerenciaClick = async (gerencia) => {

        setSelectedGerencia(gerencia);
        setSelectedArea(null);
        setSelectedPuesto(null);
        setAreas([]);
        setPuestos([]);
        setEmpleados([]);
        try {
            const response = await getDepartamentosAll(null, null, gerencia, null);
            const { recordset } = await JSON.parse(response);
            setAreas(recordset);
        } catch (error) {
            console.error("Error al obtener áreas:", error);
        }
    };

    const handleAreaClick = async (area) => {
        setSelectedArea(area);
        setSelectedPuesto(null);
        setPuestos([]);
        setEmpleados([]);

        try {
            const response = await getPuestosByDepartamento(area);
            const { recordset } = JSON.parse(response);
            setPuestos(recordset);
        } catch (error) {
            console.error("Error al obtener puestos:", error);
        }
    };

    const handlePuestoClick = async (puesto) => {
        setSelectedPuesto(puesto);
        setEmpleados([]);
        try {
            const response = await getEmpleadosByPuesto(puesto);
            const { recordset } = JSON.parse(response);
            setEmpleados(recordset);
        } catch (error) {
            console.error("Error al obtener empleados:", error);
        }
    };
    // console.log(areas, selectedGerencia);
    // console.log((selectedGerencia && areas))


    return (
        <>
            {!selectedGerencia && gerencias && CardGeneral && ( // If there is no selected gerencia, show all gerencias
                // console.log(gerencias),
                gerencias.map((gerencia) => (
                    <CardGeneral
                        key={gerencia.IdGerencia}
                        title={gerencia.ClaveGerencia}
                        description={gerencia.NombreGerencia}
                        status={gerencia.IdEstatusGerencia}
                        id={gerencia.IdGerencia}
                        showEditButton={true}
                        onClick={() => handleGerenciaClick(gerencia.ClaveGerencia)}
                    />

                ))
            )}

            {selectedGerencia && areas && CardGeneral && (
                <>
                    <div className='col-span-4'>
                        <h5>Departamento en {selectedGerencia}</h5>
                    </div>
                    {areas.map((area) => (
                        <CardGeneral
                            key={area.IdDepartamento}
                            title={area.ClaveDepartamento}
                            description={area.NombreDepartamento}
                            status={area.IdEstatusDepartamento}
                            id={area.IdDepartamento}


                        />
                    ))}
                </>
            )}

            {selectedArea && puestos && CardGeneral && (
                <>
                    <div className='col-span-4'>
                        <h5>Puestos en {selectedArea}</h5>
                    </div>
                    {puestos.map((puesto) => (
                        <CardGeneral
                            key={puesto.IdPuesto}
                            title={puesto.NombrePuesto}

                            status={puesto.IdEstatus}
                            id={puesto.IdPuesto}

                        />
                    ))}
                </>
            )}

            {selectedPuesto && CardGeneral && (
                <>
                    <div className='col-span-4'>
                        <h5>Empleados en {selectedPuesto}</h5>
                    </div>
                    {empleados.map((empleado) => (
                        <CardGeneral
                            key={empleado.IdEmpleado}
                            title={`${empleado.NombreEmpleado} `}
                            description={empleado.IdEstatusEmpleado}
                            status={empleado.IdEstatusEmpleado}
                            id={empleado.IdEmpleado}

                        />
                    ))}
                </>
            )}
        </>
    );
}