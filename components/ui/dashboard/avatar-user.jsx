import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { auth } from '@/auth';

export default async function AvatarUser() {
    const session = await auth()
    if (!session?.user) return null
    return (
        <>
            <div className='grid justify-items-center '>
                <Avatar className='ring-2 ring-color-primary ring-offset-1 ring-offset-color-neutral shadow-md shadow-secondary' >
                    <AvatarImage src="https://randomuser.me/api/portraits/men/14.jpg" alt="User" />
                    <AvatarFallback></AvatarFallback>
                </Avatar>
                <p >{session.user.name}</p>

            </div>
        </>
    );
}