import { useState } from 'react'
import './home.css'

import { Input } from '../../components/Input'
import { Header } from "../../components/Header"
import { Logo } from '../../components/Logo'

import { toast } from "react-toastify"

import { db } from '../../services/firebaseConnection'
import { 
    getDocs, 
    collection,
    query,
    orderBy,
    where,
    addDoc
} from 'firebase/firestore'


export default function Home(){
    const [placaInput, setPlacaInput] = useState("")
    const [disabled, setDisabled] = useState(false)
    let result = '';
    let aux_result = '';
    
    async function verificaPlaca(e){
        e.preventDefault();
        setDisabled(true)
        const placasRef = collection(db, "placas")
        let date = new Date(Date.now()).toLocaleDateString()
        const queryRef = query(placasRef, where('placa', '==', placaInput.toUpperCase()), orderBy('created', 'desc'))
        await getDocs(queryRef)
        .then((snapshot) => {
            if(!snapshot.empty){
                aux_result = snapshot.docs[0].data()
                if(aux_result.created.toDate().toLocaleDateString() === date){
                    result = aux_result
                }
            }
        })
        .catch((e) => {
            console.log(e)
        })

        registrarPlaca();
    }   

    function addZero(i) {
        if (i < 10) {i = "0" + i}
        return i;
    }

    async function registrarPlaca(){
        if(placaInput !== ''){
            if(result === ''){
                await addDoc(collection(db, "placas"), {
                    placa: placaInput.toUpperCase(),
                    created: new Date()
                })
                .then(() => {
                    setPlacaInput("")
                });
                toast.success('Liberado!', {
                    'autoClose': 6000,
                    'closeOnClick': true,
                    'pauseOnHover': true,
                })
                }else{
                    let horas = addZero(result.created.toDate().getHours())
                    let minutos = addZero(result.created.toDate().getMinutes())
                    let timestamp = horas + ':' + minutos;

                    toast.error(result.placa + ' Já abasteceu hoje às '+ timestamp +'!', {
                        'autoClose': 6000,
                        'closeOnClick': true,
                        'pauseOnHover': true,
                    })
                }
        }else{
            toast.info('Informe a placa!', {
                'closeOnClick': true,
                'pauseOnHover': true,
            })
        }
        result = '';

        setTimeout(function() {
            setDisabled(false)
        }, 1000);
    }

    return (
        <div className="home-container animate-opacity">
            <Header />
            <Logo />
            <h1>Verifica Placa</h1>
            <main>
                <form className='flex flex-col justify-center' onSubmit={verificaPlaca}>
                    <div className='flex flex-col justify-center'>
                        <p className='text-red-600 my-1'>Digite a placa tudo junto, sem espaços.</p>
                        <Input
                            style={{ 'textTransform' : 'uppercase' }}
                            placeholder="Ex.: BRA2E19"
                            value={ placaInput }
                            onChange={(e) => setPlacaInput(e.target.value.toUpperCase())}
                            />
                    </div>
                    <button id="consultar" type='submit'
                        className='p-2 uppercase font-bold text-white rounded-m'
                        disabled={ disabled }
                        >
                        {
                        (disabled === false) ? "Consultar" : "Aguarde..."
                        }
                    </button>
                </form>
            </main>
        </div>
    )
}