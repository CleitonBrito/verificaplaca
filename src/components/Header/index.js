import './header.css'

import { auth } from '../../services/firebaseConnection'
import { signOut } from 'firebase/auth'
import { Link, useLocation } from 'react-router-dom'

export function Header(){
    async function handleLogout(){
        await signOut(auth)
    }

    const location = useLocation();

    return(
        <header className="admin-header absolute top-10 flex sm:w-1/2 w-1/2 justify-end">
            <nav className="nav-header flex">
                <div className='flex justify-center items-center gap-2'>
                    {/* {
                        <Link to={ (location.pathname === '/') ? '/metrics' : '..' }>
                            <button className='rounded-full'>
                                <p className='font-bold text-white p-3'>{ (location.pathname === '/') ? "Métricas" : "Voltar" }</p>
                            </button>
                        </Link>
                    } */}
                    <button className='rounded-full' onClick={ handleLogout }>
                        <p className='font-bold text-white p-3'>Sair</p>
                    </button>
                </div>
            </nav>
        </header>
    )
}