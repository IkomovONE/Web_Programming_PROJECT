import {useParams} from 'react-router-dom'
import {useEffect, useState} from 'react'


function Data() {
    const {id} = useParams()
    const [book, setBook] = useState("");
    
    useEffect(() => {
        fetch("/book/"+ id, {
            
            mode: 'cors'})
            .then(response => {
                
                return response.json()})
            .then(json => setBook(json))

    }, [id])

    if (book.name !== id) {
        
        
        return (

            <h2>404: This is not the webpage you are looking for</h2>
            
        )
    }

    else {

        console.log("GOOD")

        return (
            <div>
                 {book.name}
                 <p></p>
                 {book.author}
                 <p></p>
                 {book.pages}
            </div>
        )


    }
    
    
}

export default Data

