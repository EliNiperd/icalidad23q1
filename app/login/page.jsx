import Image from 'next/image';
import LoginForm from '@/components/ui/login/login-form';
import Loginimage from '@/public/login_Secure.png';
import LogoNiperd from '@/public/logoNiperd_image.png';
import ModeToggle from "@/components/theme-toggle";

export default function LoginPage() {
    return (
        <main className="grid grid-cols-1 md:grid-cols-2 h-screen w-full">
            {/* Columna del Formulario */}
            <div className="relative flex flex-col items-center justify-center p-8">
                <div className="absolute top-6 left-6 flex items-center gap-2">
                    <Image src={LogoNiperd} alt="Logo Niperd" width={40} height={40} />
                    <h1 className="text-xl font-semibold text-foreground">NIPERD</h1>
                </div>
                <LoginForm />
            </div>

            {/* Columna de la Imagen */}
            <div className="hidden md:flex items-center justify-center bg-secondary relative">
                 <div className='absolute top-6 right-6'>
                    <ModeToggle />
                </div>
                <Image
                    src={Loginimage}
                    alt="Ilustración de seguridad"
                    width={500}
                    height={500}
                    className="object-contain"
                />
            </div>
        </main>
    );
}
