import { signOut } from '@/auth';

const DashboardPage = () => {
    return (
        <main className=''>
            <h1 className='mb-4 text-xl md:text-2xl'>
                Dashboard
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <main className=''>
                    <h2 className='hidden block'>Información Principal</h2>
                    <form
                        action={async () => {
                            'use server';
                            await signOut();
                        }}
                    >
                        <button className='bg-primary p-2 rounded-md hidden'>
                            Salir
                        </button>
                    </form>
                </main>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
            </div>
        </main>
    );
};

export default DashboardPage;
