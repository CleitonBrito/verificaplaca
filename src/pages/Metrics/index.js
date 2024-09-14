import './metrics.css'
import { Header } from '../../components/Header'
import { useEffect, useState } from 'react';

import { db } from '../../services/firebaseConnection'
import { 
    getDocs, 
    collection,
    query,
    orderBy,
} from 'firebase/firestore'

export default function Metrics(){
    const [groups, setGroups] = useState([])

    useEffect(() => {
        async function getAllPlates(){
            const placasRef = collection(db, "placas")
            const queryRef = await query(placasRef, orderBy('created', 'desc'))
            await getDocs(queryRef)
            .then((snapshot) => {
                let lista = []
                let created_index = null
                let aux_date = ""
                let aux_count = 0
                let count = 0
                snapshot.forEach((doc) => {
                    if(aux_count > 0){
                        if(aux_date === created_index){
                            count += 1
                        }
                    }

                    if(aux_count === 0){
                        created_index = doc.data().created.toDate().toLocaleDateString()
                        aux_count += 1
                    }
                    aux_date = doc.data().created.toDate().toLocaleDateString()

                    if(aux_date !== created_index){
                        aux_count += 1
                        if(aux_count > 1){
                            count += 1
                            lista.push({
                                qty : count-1,
                                date : created_index
                            })
                        }
                        created_index = aux_date
                        count = 0
                    }
                })
                lista.push({
                    qty : count+1,
                    date : aux_date
                })
                setGroups(lista)
            })
            .catch((e) => {
                console.log(e)
            })
        }
        getAllPlates()
    }, [])

    setTimeout(function() {
        if(!groups.length < 0){
            return (
                <div className='flex flex-row gap-3 justify-center items-center w-full h-screen' role="status">
                    <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="text-white">Carregando...</span>
                </div>
            )
        }
    }, 10000);

    return (
        <div className='container animate-opacity'>
            <Header />
            <h1>Métricas</h1>
            <main className='w-full sm:w-1/2 flex flex-col px-3'>
                <div>
                    <span className='text-red-600 flex justify-center'>Quantidade de placas por dia</span>
                    <table id="table-placas" className='table w-full border-collapse border border-slate-500 text-white'>
                        <thead className='table-header-group'>
                            <tr className='table-row'>
                                <th className='table-cell border border-slate-500'>Nº</th>
                                <th className='table-cell border border-slate-500'>Data</th>
                                <th className='table-cell border border-slate-500'>Quantidade</th>
                            </tr>
                        </thead>
                        <tbody className='table-row-group text-center border-slate-500'>
                            { groups.map((item, index) => (
                                <tr key={index} className='table-row'>
                                    <td className='table-cell border border-slate-500'>{ groups.length-index }</td>
                                    <td className='table-cell border border-slate-500'>{ item.date }</td>
                                    <td className='table-cell border border-slate-500'>{ item.qty }</td>
                                </tr>
                            )) }
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    )
}