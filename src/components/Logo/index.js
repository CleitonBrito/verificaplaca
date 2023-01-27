import './logo.css'

import { Link } from 'react-router-dom'

export function Logo(){
    return(
        <Link to="/">
            <img className="img-logo" src="../logo.png" alt=""/>
        </Link>
    )
}