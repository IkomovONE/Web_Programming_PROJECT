import * as React from 'react';
import { Button } from '@mui/material'
import {Link} from 'react-router-dom'


const PostLink = ({post}) => {

    

    return (


        <div id="postLink">
            
            <div id= "author">
                <a id="created" >Created by:</a>
                <Button component={Link} to={"/profile/"+post.author} id="created"> {post.author}</Button>

                <a id= "when">When: {post.date}</a>
                <p></p>
            </div>

            <div id= "subject">
                
                <Button component={Link} to={"/post/"+post._id} > {post.subject}</Button>
                
            </div>

            

                
                
        </div>


        
    )
}

export default PostLink
