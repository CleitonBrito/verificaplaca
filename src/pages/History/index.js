import './history.css'
import { Header } from '../../components/Header'
import { QueryDB } from './query.js'
import { useEffect } from 'react';

export default function History(){
    useEffect(() => {
        QueryDB.forEach((element, index) => {
            console.log(element);
        });
    }, [])

    return (
        <div className='container'>
            <Header />
            <h1>Histórico</h1>
            <main className='flex flex-col px-3'>
                <div className='flex justify-center gap-3 m-5'>
                    <span className='flex items-center text-white'>Pesquisar Placa: </span>
                    <input className='p-1 px-4 rounded-md w-1/2' type='text' placeholder='Ex.: BRA2E19' />
                </div>
                <div>
                    <table id="table-placas" className='table w-full border-collapse border border-slate-500 text-white'>
                        <thead className='table-header-group'>
                            <tr className='table-row'>
                                <th className='table-cell border border-slate-500'>Nº</th>
                                <th className='table-cell border border-slate-500'>Placa</th>
                                <th className='table-cell border border-slate-500'>Data</th>
                            </tr>
                        </thead>
                        <tbody className='table-row-group text-center border-slate-500'>
                            <tr className='table-row'>
                                <td className='table-cell border border-slate-500'>1</td>
                                <td className='table-cell border border-slate-500'>ASSA85sf</td>
                                <td className='table-cell border border-slate-500'></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    )
}