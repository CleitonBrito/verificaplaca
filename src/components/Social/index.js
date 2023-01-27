import './social.css'

export function Social({ children, url }){
    return(
        <div>
            <a className="social" href={ url } rel="noopener noreferrer" target="_blank">
                { children }
            </a>
        </div>
    )
}