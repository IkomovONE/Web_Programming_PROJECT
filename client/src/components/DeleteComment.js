import * as React from 'react';
import {useState, useEffect, useRef} from 'react'
import { useTranslation } from 'react-i18next';
import {useParams} from 'react-router-dom'
import { useNavigate } from "react-router-dom";


function DeleteComment() {

    const { t, i18n } = useTranslation();
    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang)
    }

   

    const navigate = useNavigate();


    window.scroll(0,0)

    const [data, setData] = useState({})

    const {id, CommentID} = useParams()

    const [dataType, setDataType] = useState("post")
   


    function fetchPost () {

        useEffect(() => {

            window.scroll(0,0)
    
            
            
            fetch("/api/post/"+id)
            .then(response => response.json())
            .then(json => {

                const comments = json.comments

                comments.forEach(comment => {

                    if (comment.CommentId== CommentID) {

                        setData(comment)

                    }
                    
                });
    
                
    
                

                
    
    
                
    
            })

        
    
    
           
    
        
            
        }, [dataType])

        

    }


    const submitNo = (event) => {


        navigate("/post/"+id)


    }


    


    const submitYes = (event) => {
        event.preventDefault();

        

        var token= window.localStorage.getItem("token")



        fetch("/api/token/check", {
            method: "POST",
      
            headers: {
              "authorization": token
            },
      
            body: null,
            
      
          }).then(response => {
                      
            return response.json()}).then(json => {
      
          if (json.message== "VERIFIED") {
            
            if (!json.admin) {

                

                if (json.username != data.author) {

                    setData({})
                
                    navigate("/login")
                
                }

                else {

                    fetch("/api/comment/delete", {
                        method: "POST",
        
                        body: JSON.stringify({
                        postID: id,
                        CommentId: CommentID,

                        
                        }),
                        
                 
        
                    }).then(response => {
                        
                        return response.json()})
                    .then(json => {
        
                        if (!json.success) {
                        
                            if (json.msg= "Password incorrect") {
                                alert("Wrong password")
                            }
        
                            else if (json.msg= "User not found!") {
                                alert("Invalid credentials!")
                            
                            }
                            else {
                                alert("Something else is wrong, error")
                            }
                        }
        
                        else {
        
                            navigate("/post/"+id)
        
                            window.location.reload();
                        }
                    });


                }

           }

           else {

            fetch("/api/comment/delete", {
                method: "POST",
    
                body: JSON.stringify({
                    postID: id,
                    CommentId: CommentID,
                    
                }),
                    
             
    
            }).then(response => {
                    
                return response.json()})
            .then(json => {
    
                if (!json.success) {
                    
                    if (json.msg= "Password incorrect") {
                        alert("Wrong password")
                    }
    
                    else if (json.msg= "User not found!") {
                        alert("Invalid credentials!")
                        
                    }
                    else {
                        alert("Something else is wrong, error")
                    }
                }
    
                else {
    
                    navigate("/post/"+id)
    
                    window.location.reload();
                }
            });

           }
        }


    });
}


            


           
            
            
        
            


     
    



fetchPost();
    


   



    

   
      
      
    return (

        <div className="div">

            <div id="darkened">


            <h1>{t("Are you sure?")}</h1>
            <h2>-------------------------------------------------</h2>


            
                

          
            <button onClick={submitNo}>{t("No")}</button>

                
            <button onClick={submitYes}>{t("Yes")}</button>

                
                
            <p></p>


                
                


                
            
             

              




            </div>



        </div>


  


    )
    }







export default DeleteComment