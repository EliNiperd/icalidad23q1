'use client';

import { useActionState } from 'react';
import { authenticate } from '@/app/login/action';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { ArrowRightIcon } from '@heroicons/react/20/solid';

export default function LoginForm() {
    const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);

    return (
        <form action={formAction} className="w-[350px]">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle>Iniciar sesión en iCalidad</CardTitle>
                    <CardDescription>Bienvenido de nuevo</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="username" className="text-sm font-medium text-muted-foreground">Usuario</label>
                        <Input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="nombre.usuario"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium text-muted-foreground">Contraseña</label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            required
                        />
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col items-center">
                    <Button type="submit" className="w-full" aria-disabled={isPending}>
                        {isPending ? 'Validando...' : 'Iniciar Sesión'}
                        <ArrowRightIcon className="ml-auto h-5 w-5" />
                    </Button>
                    {errorMessage && (
                        <p className="mt-4 text-sm text-destructive text-center">
                            {errorMessage}
                        </p>
                    )}
                </CardFooter>
            </Card>
        </form>
    );
}
