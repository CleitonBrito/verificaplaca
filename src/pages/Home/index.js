import { useState, useEffect } from 'react'
import './home.css'

import { Social } from '../../components/Social'
import { Logo } from '../../components/Logo'
import { FaWhatsapp, FaInstagram, FaGithub } from 'react-icons/fa'

import { db } from '../../services/firebaseConnection'
import { 
    getDocs, 
    collection,
    query,
    orderBy,
    doc,
    getDoc
} from 'firebase/firestore'


export default function Home(){
    const [links, setLinks] = useState([])
    const [socialLinks, setSocialLinks] = useState({})

    useEffect(() => {
        function loadLinks(){
            const linksRef = collection(db, "links")
            const queryRef = query(linksRef, orderBy("created", "asc"))
            getDocs(queryRef)
            .then((snapshot) => {
                let lista = [];
                snapshot.forEach((doc) => {
                    lista.push({
                        id: doc.id,
                        name: doc.data().name,
                        url: doc.data().url,
                        bg: doc.data().bg,
                        color: doc.data().color
                    })
                })
                setLinks(lista)
            })
            .catch(() => {
                console.log("erro")
            })
        }
        loadLinks()
    }, [])

    useEffect(() => {
        function loadSocialLinks(){
            const  docRef = doc(db, "social", "link")
            getDoc(docRef)
            .then((snapshot) => {

                if(snapshot.data() !== undefined){
                    setSocialLinks({
                        whatsapp: snapshot.data().whatsapp,
                        instagram: snapshot.data().instagram,
                        github: snapshot.data().github
                    })
                }
            })
        }   

        loadSocialLinks()
    }, [])

    return (
        <div className="home-container">
            <Logo />
            <h1>Portifólio Cleiton Brito 🧑‍💻</h1>
            <span>Veja meus links 👇</span>

            <main className="links">
                { links.map((item, index) => (
                    <section
                        key={index}
                        className="link-area" style={{ backgroundColor: item.bg }}>
                        <a href={item.url} target="_blank">
                            <p className="link-text" style={{ color: item.color }}>{ item.name }</p>
                        </a>
                    </section>
                )) }

                { links.length !== 0 && Object.keys(socialLinks).length > 0 && (
                    <footer>
                        { socialLinks?.whatsapp !== "" && (
                            <Social url={ socialLinks?.whatsapp }>
                                <FaWhatsapp size={30} color="fff" />
                            </Social>
                        ) }
                        { socialLinks?.instagram !== "" && (
                            <Social url={ socialLinks?.instagram }>
                                <FaInstagram size={30} color="fff" />
                            </Social>
                        )}
                        { socialLinks?.github !== "" && (
                            <Social url={ socialLinks?.github }>
                                <FaGithub size={30} color="fff" />
                            </Social>
                        )}
                    </footer>
                )}
            
            </main>
        </div>
    )
}