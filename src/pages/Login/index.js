import { useState } from 'react'
import './login.css'

import { Logo } from '../../components/Logo'
import { Input } from '../../components/Input'
import { auth } from '../../services/firebaseConnection'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify'

export default function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [disabled, setDisabled] = useState(false)

    const navigate = useNavigate();

    function handleLogin(e){
        e.preventDefault();
        setDisabled(true)

        if (email === '' || password === ''){
            alert("Preencha todos os campos!");
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            toast.success("Bem vindo!")
            navigate("/", { replace: true })
        }).catch(()=> {
            toast.error("Erro ao fazer login!");
        }).finally(() => {
            setTimeout(function() {
                setDisabled(false)
            }, 1000);
        });
    }

    return (
        <div className="login-container">
            <Logo />
            <h1>Verifica Placa</h1>

            <form className="form" onSubmit={ handleLogin }>
                <Input 
                    type="email"
                    placeholder="Digite seu email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="************"
                    autoComplete="on"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit"
                    disabled={ disabled }
                    >
                    {
                    (disabled === false) ? "Acessar" : "Aguarde..."
                    }
                </button>
            </form>
        </div>
    )
}