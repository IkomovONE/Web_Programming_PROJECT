import * as React from 'react';
import { Button } from '@mui/material'
import {Link} from 'react-router-dom'
import {useParams} from 'react-router-dom'
import { useTranslation } from 'react-i18next';


const Comment = ({comment}) => {

  const { t, i18n } = useTranslation();
    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang)
    }

    
    const [user, setUser] = React.useState("");

    const [admin, setAdmin] = React.useState(false);

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
      setAdmin(json.admin);

      

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

                {user===comment.author || admin === true ? <Button component={Link} to={"/editComment/"+id+"/"+comment.CommentId+"/"+comment.author+"/"+comment.content} id="created"> {t("Edit this comment")}</Button> : null}

                <a>|</a>

                {user===comment.author || admin === true ? <Button component={Link} to={"/deletecomment/"+id+"/"+comment.CommentId} id="created"> {t("Delete this comment")}</Button> : null}





                <a id= "whenComment">{t("Last edited:")} {comment.date}</a>
                
            </div>

            <div id="contentComment" >
                
                <h6 id="textComment"> {comment.content}</h6>
                
            </div>

            

                
                
        </div>


        
    )
}

export default Comment
