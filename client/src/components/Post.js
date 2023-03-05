import * as React from 'react';
import { Button } from '@mui/material'
import {useState, useEffect, useRef} from 'react'
import {Link} from 'react-router-dom'
import {useParams} from 'react-router-dom'
import "highlight.js/styles/github.css";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { irBlack } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import CommentList from './CommentList'
import NewComment from './NewComment'
import { useTranslation } from 'react-i18next';


//importing necessary libraries


const Post = () => {


  const { t, i18n } = useTranslation();
    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang)
    }



    const [auth, setAuth] = React.useState(false);
    const [user, setUser] = React.useState("");
    const [admin, setAdmin] = React.useState(false);
    const [height, setHeight] = useState(0);
    const appRef = useRef(null);



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
    
          setAuth(true);

          var username= json.username;

          setUser(username);

          setAdmin(json.admin)
    
          
    
        }
    
        else {
          setAuth(false);
        }
    
    
    
      })
      };

    

    


    const [data, setData] = useState({})

    const {id} = useParams()

    const [dataType, setDataType] = useState("post")


    useEffect(() => {

        window.scroll(0,0)

        
        
        fetch("/api/post/"+id)
        .then(response => response.json())
        .then(json => {

            

            setData(json)


            

        })


        const appHeight = appRef.current.scrollHeight;
        setHeight(appHeight);



        

    
        
    }, [dataType])


    CheckLogin();

    

    return (
    
    <div className="div">
        <div id="darkened" ref={appRef} >
            <div id="head"></div>

            <h1>{data.subject}</h1>


            

              


              <h2>-------------------------------------------------</h2>

              <div id="notelabel" >
              
              <h6>{data.description}</h6>

              </div>

             


                <div id="post">
                    
                    <div id= "author">
                        <a id="created" > {t("Created by:")}</a>
                        <Button component={Link} to={"/profile/"+data.author} id="created"> {data.author}</Button>

                        <a>|</a>

                        {user===data.author || admin === true ? <Button component={Link} to={"/editpost/"+data.id} id="created"> {t("Edit this post")}</Button> : null}

                        <a>|</a>


                        {user===data.author || admin === true ? <Button component={Link} to={"/deletepost/"+data.id} id="created"> {t("Delete this post")}</Button> : null}


                        

                        <a id= "whenPost">{t("Last edited:")} {data.date}</a>
                        <p></p>
                    </div>

                    

                    

                    <div >
                        
                        

                        <SyntaxHighlighter id= "code"  style={irBlack} > 
                            {data.code}

                        </SyntaxHighlighter>
                        
                        
                    </div>

                    <div>

                        <CommentList />


                        
                        

                        


                        

                    </div>


                    
                    
                </div>

                <div id="NewComment">

                {auth &&<NewComment data= {data}/>}

                {!auth &&<div id="NewComment"><h6>{t("Log in or register to write a comment!")}</h6></div>}





                </div>

            </div>       

         </div>

    


        
    )

    

}

export default Post
