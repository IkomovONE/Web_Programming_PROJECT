import Comment from "./Comment"
import {useParams} from 'react-router-dom'
import {useState, useEffect} from 'react'

//importing necessary libraries

const CommentList = () => {

    //commentList component

    const [data, setData] = useState([])

    const {id} = useParams()

    const [dataType, setDataType] = useState("CommentList")

    //setting necessary states and variables


    useEffect(() => {
        window.scroll(0,0)
        
        fetch("/api/post/"+id)
        .then(response => response.json())
        .then(json => {

            
            setData(json.comments)

            //using useEffect for fetching the post comments, get request



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

//returning the comments as array of Comment component elemets

export default CommentList
