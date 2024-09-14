import { db } from '../../services/firebaseConnection'
import { 
    getDocs, 
    collection,
    query,
    orderBy,
} from 'firebase/firestore'

const QueryDB = () => {
    const lista = []

    function getAllPlates(){
        const placasRef = collection(db, "placas")
        const queryRef = query(placasRef, orderBy('created', 'desc'))
        getDocs(queryRef)
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    lista.push({
                        placa : doc.data().placa,
                        created : doc.data().created
                    })
                })
            })
            .catch((e) => {
                console.log(e)
            })
        return lista
    }
    getAllPlates()
}

export { QueryDB };