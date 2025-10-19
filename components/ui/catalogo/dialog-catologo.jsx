"use client";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger

} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { validateGerencia, createGerencia, updateGerencia } from "@/app/AdminIcalidad/Catalogos/action";
import { Toaster, toast } from "sonner";



export default function DialogCatalogo({
    triggerButton,
    mode = 'create',
    initialData = null,
    onSuccess,
    type = 'gerencia' // Nuevo prop para especificar el tipo de registro
}) {
    const [claveError, setClaveError] = useState("");
    const [nombreError, setNombreError] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState(initialData || {
        ClaveGerencia: '',
        NombreGerencia: '',
        IdGerencia: '',
        IdEstatusGerencia: true,
    });

    // if (initialData)
    //    console.log('mode: ', mode, 'initialData: ', initialData);

    const handleValidate = async (e, parteValidar) => {
        const value = e.target.value;
        let error = "";

        try {
            if (mode === 'edit')
                formData.IdGerencia = initialData.IdGerencia;

            const response = await validateGerencia(parteValidar, value, formData.IdGerencia);
            const { recordset } = JSON.parse(response);
            const { Resultado } = recordset[0];
            if (Resultado === -1) {
                error = `Este ${parteValidar.toLowerCase()} ya existe.`;
            }
        } catch (err) {
            console.error("Error validando:", err);
            error = "Error al validar. Por favor, intente de nuevo.";
        }

        if (parteValidar === 'CLAVE') {
            setClaveError(error);
        } else {
            setNombreError(error);
        }
    };

    const handleSubmit = async (formData) => {
        if (!claveError && !nombreError) {
            try {
                const claveGerencia = formData.get("ClaveGerencia");
                const nombreGerencia = formData.get("NombreGerencia");
                const IdGerencia = formData.get("IdGerencia");
                const IdEstatusGerencia = formData.get("IdEstatusGerencia") || false;
                console.log('IdEstatusGerencia: ', IdEstatusGerencia);
                let result;
                if (mode === 'create') {
                    result = await createGerencia(claveGerencia, nombreGerencia, 1);
                } else {
                    result = await updateGerencia(IdGerencia, claveGerencia, nombreGerencia, IdEstatusGerencia, 1);
                }

                const { recordset } = JSON.parse(result);
                const { Resultado, Mensaje } = recordset[0];

                if (Resultado !== -1) {
                    setIsOpen(false);
                    toast.success(`Gerencia ${mode === 'create' ? 'creada' : 'actualizada'} con éxito: ${claveGerencia} - ${nombreGerencia} - ${Mensaje}`,
                        { position: "top-right", });
                    if (onSuccess) onSuccess();
                } else {
                    toast.error(`Error al ${mode === 'create' ? 'crear' : 'actualizar'}: ${claveGerencia} - ${nombreGerencia} - ${Mensaje}`,
                        { position: "top-right", });
                }
            } catch (error) {
                toast.error(`Error al ${mode === 'create' ? 'crear' : 'actualizar'}: error general ${error.message}`,
                    { position: "top-right", });
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
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
                    {triggerButton}
                </DialogTrigger>
                <DialogContent className="bg-secondary">
                    <form action={handleSubmit}>
                        <input type="hidden" id="IdGerencia" name="IdGerencia" value={formData.IdGerencia} />
                        <DialogHeader>
                            <DialogTitle>{mode === 'create' ? 'Alta' : 'Edición'} de {type === 'gerencia' ? 'Gerencia' : 'Departamento'}</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-2">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label htmlFor="ClaveGerencia" className="text-right">
                                    Clave Gerencia
                                </label>
                                <TooltipProvider>
                                    <Tooltip open={!!claveError}>
                                        <TooltipTrigger asChild>
                                            <div className="col-span-2" >
                                                <Input
                                                    id="ClaveGerencia"
                                                    name="ClaveGerencia"
                                                    value={formData.ClaveGerencia}
                                                    onChange={handleInputChange}
                                                    onBlur={(e) => handleValidate(e, 'CLAVE')}
                                                    className={claveError ? "border-error/50" : ""}
                                                />
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent side="right" className='bg-error/50 text-error-foreground'>
                                            <p>{claveError}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label htmlFor="NombreGerencia" className="text-right">
                                    Nombre Gerencia
                                </label>
                                <TooltipProvider>
                                    <Tooltip open={!!nombreError}>
                                        <TooltipTrigger asChild>
                                            <div className="col-span-3">
                                                <Input
                                                    id="NombreGerencia"
                                                    name="NombreGerencia"
                                                    value={formData.NombreGerencia}
                                                    onChange={handleInputChange}
                                                    onBlur={(e) => handleValidate(e, 'NOMBRE')}
                                                    className={nombreError ? "border-red/50" : ""}
                                                />
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent side="right" className='bg-error/50 text-error-foreground'>
                                            <p>{nombreError}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            {mode === 'edit' && (
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <label htmlFor="IdEstatusGerencia" className="text-right">
                                        Estatus
                                    </label>
                                    <div className="col-span-3">
                                        <Input className="w-4 h-4"
                                            type="checkbox"
                                            id="IdEstatusGerencia"
                                            name="IdEstatusGerencia"
                                            onChange={handleInputChange}
                                            defaultChecked={formData.IdEstatusGerencia === true}
                                            value={formData.IdEstatusGerencia}
                                        />
                                    </div>
                                </div>
                            )
                            }
                        </div>
                        <DialogFooter className="p-0">
                            <Button variant="outline" type="button" onClick={() => setIsOpen(false)}>
                                Cancelar
                            </Button>
                            <SubmitButton mode={mode} />
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}




function SubmitButton({ mode }) {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" disabled={pending}>
            {pending ? "Guardando..." : (mode === 'create' ? "Crear" : "Actualizar")}
        </Button>
    );
}

