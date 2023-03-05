import * as React from 'react';
import { Button } from '@mui/material'
import {Link} from 'react-router-dom'
import {useParams} from 'react-router-dom'
import { useTranslation } from 'react-i18next';


//importing necessary libraries

const Comment = ({comment}) => {

  //function for comments

  const { t, i18n } = useTranslation();
    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang)
    }

    //setting language function

    
    const [user, setUser] = React.useState("");

    const [admin, setAdmin] = React.useState(false);

    const {id}= useParams()

    //setting necessary variables. Id is taken from params, other variables are states


    

    


  const CheckLogin = () => {

    //function that checks login by sending request to the server, with token

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


      //sending post request, and if token is verified, set the user's username and admin status

      

    }

    else {
      
    }



  })
  };

  CheckLogin();

  //executing checklogin
   

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

    //retuning comment object with buttons that only appear if user is the author or if admin
}

export default Comment
