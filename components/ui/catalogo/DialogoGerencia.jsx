"use client";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger

} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreateCatalogo } from "@/components/ui/catalogo/button-catalogos";
import { validateGerencia } from "@/app/AdminIcalidad/Catalogos/action";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Toaster, toast } from "sonner";


export default function DialogoGerencia({ mode = 'create', initialData = {} }) {
    const [claveError, setClaveError] = useState("");
    const [nombreError, setNombreError] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState(initialData || {
        ClaveGerencia: '',
        NombreGerencia: '',
        IdGerencia: '',
        IdEstatusGerencia: true
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleValidate = async (e, parteValidar) => {
        const value = e.target.value;
        let error = "";

        try {
            // if (mode === 'edit')
            //    IdGerencia = initialData.IdGerencia;

            const response = await validateGerencia(parteValidar, value /* formData.IdGerencia */);
            // console.log(response);
            const { recordset } = JSON.parse(response);
            const { Resultado } = recordset[0];
            if (Resultado === -1) {
                error = `Este ${parteValidar.toLowerCase()} ya existe.`;
                // console.log(error);
            }
        } catch (err) {
            console.error("Error al validar:", error);
            error = "Error al validar. Porfavor intente de nuevo.";
        }

        if (parteValidar === 'CLAVE')
            setClaveError(error);
        else
            setNombreError(error);

        // console.log('mensaje de error: ', claveError, 'parteValidar: ', parteValidar, 'error: ', error, 'nombreError: ', nombreError);
    };

    const handleSubmit = async (formData) => {
        console.log('handleSubmit: ', formData);
        if (!claveError && !nombreError) {
            try {
                const claveGerencia = formData.ClaveGerencia;
                const nombreGerencia = formData.NombreGerencia;
                const IdGerencia = formData.IdGerencia;
                const IdEstatusGerencia = formData.IdEstatusGerencia || false;
                let result;
                if (mode === 'create')
                    console.log('createGerencia');
                // result = await createGerencia(claveGerencia, nombreGerencia, 1);
                else
                    console.log('updateGerencia');
                // result = await updateGerencia(IdGerencia, claveGerencia, nombreGerencia, IdEstatusGerencia, 1);

                // const { recordset } = JSON.parse(result);
                // const { Resultado, Mensaje } = recordset[0];

                const Resultado = 1;
                const Mensaje = 'Mensaje de prueba';
                if (Resultado !== -1) {
                    // setIsOpen(false);
                    toast.success(`Gerencia ${mode === 'create' ? 'creada' : 'actualizada'} con éxito: ${claveGerencia} - ${nombreGerencia} - ${Mensaje}`,
                        { position: "top-right", });
                    // if (onSuccess) onSuccess();
                } else {
                    toast.error(`Error al ${mode === 'create' ? 'crear' : 'actualizar'}: ${claveGerencia} - ${nombreGerencia} - ${Mensaje}`,
                        { position: "top-right", });
                }

            } catch (error) {
                toast.error(`Error al ${mode === 'create' ? 'crear' : 'actualizar'}: error general ${error.message}`,
                    { position: "top-right", });
            }
        }
        else {
            toast.error(`No se puede ${mode === 'create' ? 'crear' : 'actualizar'}: error general ${claveError} - ${nombreError}`,
                { position: "top-right", });
        }
    };


    const handleOpenChange = (open) => {
        setIsOpen(open);
        if (open && mode === 'edit' && initialData) {
            setFormData(initialData);
        } else if (!open) {
            setFormData({ ClaveGerencia: '', NombreGerencia: '' });
            setClaveError('');
            setNombreError('');
        }
    };



    return (
        <>
            <Toaster richColors />
            <Dialog open={isOpen} onOpenChange={handleOpenChange} className="bg-secondary">
                <DialogTrigger asChild>
                    <CreateCatalogo />
                </DialogTrigger>
                <DialogContent className="bg-secondary">
                    <form action={handleSubmit} >
                        <input type="hidden" id="IdGerencia" name="IdGerencia" value={formData.IdGerencia} />
                        <DialogHeader>
                            <DialogTitle>Alta de Gerencia</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-2">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label htmlFor="ClaveGerencia" className="text-right">
                                    Clave Gerencia
                                </label>
                                <div className="col-span-2" >
                                    <Input
                                        id="ClaveGerencia"
                                        name="ClaveGerencia"
                                        value={formData.ClaveGerencia}
                                        onChange={handleInputChange}
                                        onBlur={(e) => handleValidate(e, 'CLAVE')}
                                        className={claveError ? "border-error/70 border-2" : ""}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label htmlFor="NombreGerencia" className="text-right">
                                    Nombre Gerencia
                                </label>
                                <div className="col-span-3">
                                    <Input
                                        id="NombreGerencia"
                                        name="NombreGerencia"
                                        value={formData.NombreGerencia}
                                        onChange={handleInputChange}
                                        onBlur={(e) => handleValidate(e, 'NOMBRE')}
                                        className={nombreError ? "border-error/70 border-2" : ""}
                                    />
                                </div>
                            </div>
                        </div>
                        <DialogFooter className="p-0">
                            <Button variant="outline" type="button" onClick={() => setIsOpen(false)} >
                                Cancelar
                            </Button>
                            <SubmitButton mode={mode} />
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}
function SubmitButton({ mode }) {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" disabled={pending}>
            {pending ? "Guardando..." : (mode === 'create' ? "Crear" : "Actualizar")}
        </Button>
    );
}