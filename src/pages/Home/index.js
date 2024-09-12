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
    let result = '';
    
    async function verificaPlaca(e){
        e.preventDefault();
        const placas = placaInput
        const placasRef = collection(db, "placas")
        const queryRef = query(placasRef, where('placa', '==', placaInput.toUpperCase()), where('created', '>=', new Date(Date.now() - 24*60*60*1000)), orderBy('created', 'desc')) // >= e - 24
        await getDocs(queryRef)
        .then((snapshot) => {
            if(!snapshot.empty){
                result = snapshot.docs[0].data()
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
                addDoc(collection(db, "placas"), {
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
                        className='p-2 mt-4 uppercase font-bold text-white rounded-m'
                        >
                        Consultar
                    </button>
                </form>
            </main>
        </div>
    )
}