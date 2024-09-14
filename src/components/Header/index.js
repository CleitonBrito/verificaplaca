import './header.css'

import { auth } from '../../services/firebaseConnection'
import { signOut } from 'firebase/auth'

export function Header(){
    async function handleLogout(){
        await signOut(auth)
    }

    return(
        <header className="admin-header absolute top-10 flex sm:w-1/2 w-1/2 justify-end">
            <nav className="nav-header flex">
                <div className='flex justify-center items-center gap-2'>
                    <button className='rounded-full' onClick={ handleLogout }>
                        <p className='font-bold text-white p-3'>Sair</p>
                    </button>
                </div>
            </nav>
        </header>
    )
}