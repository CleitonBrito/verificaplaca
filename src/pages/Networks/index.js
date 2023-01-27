import { useState, useEffect } from 'react'
import './networks.css'

import { Header } from '../../components/Header'
import { Input } from '../../components/Input'
import { MdAddLink } from 'react-icons/md'

import { db } from '../../services/firebaseConnection'
import { 
    setDoc,
    doc,
    getDoc
 } from 'firebase/firestore'

import { toast } from "react-toastify"

export default function Networks(){
    const [whatsapp, setWhatsapp] = useState("");
    const [instagram, setInstagram] = useState("");
    const [github, setGithub] = useState("");

    useEffect(() => {
        function loadLinks(){
            const docRef = doc(db, "social", "link")
            getDoc(docRef)
            .then((snapshot) => {
                if(snapshot.data() !== undefined){
                    setWhatsapp(snapshot.data().whatsapp)
                    setInstagram(snapshot.data().instagram)
                    setGithub(snapshot.data().github)
                }
            })
        }

        loadLinks()
    }, [])

    function handleSave(e){
        e.preventDefault();

        setDoc(doc(db, "social", "link"), {
            whatsapp: whatsapp,
            instagram: instagram,
            github: github
        })
        .then(() => {
            toast.success("Salvo com sucesso!")
        })
        .catch((error) => {
            toast.error("Error ao salvar!")
        })
    }

    return(
        <div className='admin-container'>
            <Header/>

            <h1 className='title-social'>Suas redes socias</h1>
            <form className='form' onSubmit={ handleSave }>
                <label className='label'>Link do whatsapp</label>
                <Input 
                    value={whatsapp}
                    onChange={ (e) => setWhatsapp(e.target.value) }
                    placeholder="Digite a url do whatsapp"
                />
                <label className='label'>Link do instagram</label>
                <Input 
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    placeholder="Digite a url do instagram"
                />
                <label className='label'>Link do github</label>
                <Input 
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    placeholder="Digite a url do github"
                />
                <button type='submit' className='btn-register'>
                    Salvar links <MdAddLink size={24} color="#fff" />
                </button>
            </form>
        </div>
    )
}