'use client';
import { Bars3Icon } from '@heroicons/react/20/solid';

import { useFormState } from 'react-dom';
import { toggleMenuAction } from '@/app/dashboard/action';
import { useContext } from 'react';
import { DashboardContext } from '@/app/dashboard/dashboard-provider';


export default function ToggleIcon() {
    const [state, toggleMenu] = useFormState(toggleMenuAction, false);
    const { isMenuOpen = state } = useContext(DashboardContext);

    console.log('ToggleIcon', isMenuOpen);
    return (
        <div>
            <button formAction={toggleMenu} >
                <Bars3Icon
                    className="hover:scale-125 h-7 w-7 hover:cursor-pointer peer"
                />
            </button>
        </div>
    );
}