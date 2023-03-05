import * as React from 'react';
import { Button } from '@mui/material'
import {Link} from 'react-router-dom'
import {useParams} from 'react-router-dom'


const Comment = ({comment}) => {
    
    const [user, setUser] = React.useState("");

    const {id}= useParams()


    

    


  const CheckLogin = () => {

    var token= window.localStorage.getItem("token")

    fetch("/api/token/check", {
      method: "POST",

      headers: {
        "authorization": token
      },

      body: null,
      

    }).then(response => {
                
      return response.json()})
  .then(json => {

    if (json.message== "VERIFIED") {

     

      setUser(json.username);

      

    }

    else {
      
    }



  })
  };

  CheckLogin();
   

    return (


        <div id="Comment">
            
            <div id= "authorComment">
                
                <Button component={Link} to={"/profile/"+comment.author} id="createdComment"> {comment.author}</Button>

                <a>|</a>

                {user===comment.author && <Button component={Link} to={"/editComment/"+id+"/"+comment.CommentId+"/"+comment.author+"/"+comment.content} id="created"> Edit this comment</Button>}

                <a id= "whenComment">Last edited: {comment.date}</a>
                
            </div>

            <div id="contentComment" >
                
                <h6 id="textComment"> {comment.content}</h6>
                
            </div>

            

                
                
        </div>


        
    )
}

export default Comment
