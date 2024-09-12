import './header.css'

import { auth } from '../../services/firebaseConnection'
import { signOut } from 'firebase/auth'

export function Header(){
    async function handleLogout(){
        await signOut(auth)
    }

    return(
        <header className="admin-header absolute top-10 right-2 md:right-20  flex sm:w-1/4 w-1/2 justify-end">
            <nav className="nav-header flex">
                <div className='flex flex-col justify-center items-center gap-2'>
                    <button className='' onClick={ handleLogout }>
                        <p className='text-gray-900 font-bold text-white rounded-full p-3'>Sair</p>
                    </button>
                </div>
            </nav>
        </header>
    )
}