import Comment from "./Comment"
import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'

const CommentList = () => {

    const [data, setData] = useState([])

    const {id} = useParams()

    const [dataType, setDataType] = useState("CommentList")


    useEffect(() => {
        window.scroll(0,0)
        
        fetch("/api/post/"+id)
        .then(response => response.json())
        .then(json => {

            
            setData(json.comments)



        })

        



        

    
        
    }, [dataType])

    
    
    return (
        <div id="CommentList">
            
            {data.length > 0 && data.slice(0).reverse().map((comment) => (
            <Comment key={comment.id} comment={comment} />
            
            ))}
        </div>
    )
}

export default CommentList
