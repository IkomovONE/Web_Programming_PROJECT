import * as React from 'react';
import {useState, useEffect, useRef} from 'react'
import { useTranslation } from 'react-i18next';
import {useParams} from 'react-router-dom'
import { useNavigate } from "react-router-dom";

//importing necessary libraries


function DeletePost() {

    const { t, i18n } = useTranslation();
    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang)
    }

   //setting language translation function


    const navigate = useNavigate();
    
    //implementing navigate feature


    window.scroll(0,0)

    //scroll page to beginning


    const [data, setData] = useState({})

    const {id} = useParams()

    const [dataType, setDataType] = useState("post")

    //setting states and variables
   

   


    function fetchPost () {

        //function for fetching the post comment


        useEffect(() => {

            window.scroll(0,0)

            //scrolling page
    
    
            
            
            fetch("/api/post/"+id)
            .then(response => response.json())
            .then(json => {
    
                
    
                setData(json)

                //get request, setting the post as state


                
    
    
                
    
            })

        
    
    
           
    
        
            
        }, [dataType])

        

    }


    const submitNo = (event) => {

        //function in case "no" button is pressed. Returns to post page



        navigate("/post/"+id)


    }


    


    const submitYes = (event) => {
        event.preventDefault();

        //function for "yes" button. Deletes comment

        

        var token= window.localStorage.getItem("token")

        //get token from local storage




        fetch("/api/token/check", {

            //function that checks login by sending request to the server, with token
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

                    //if user is not author, and not admin, naviagates to login page


                    setData({})
                
                    navigate("/login")
                
                }

                else {

                    fetch("/api/snippet/delete", {

                        //post request to delete post 
                        method: "POST",
        
                        body: JSON.stringify({
                        postID: data.id
                        
                        }),
                        
                 
        
                    }).then(response => {
                        
                        return response.json()})
                    .then(json => {
        
                        if (!json.success) {
                        
                            if (json.msg= "ERROR") {
                                alert("error")
                            }
        
                            
                        }
        
                        else {
        
                            navigate("/")

                            //navigating to main page if successfull
        
                            window.location.reload();
                        }
                    });


                }

           }

           else {

            fetch("/api/snippet/delete", {

                //same post request but for admin
                method: "POST",
    
                body: JSON.stringify({
                    postID: data.id
                    
                }),
                    
             
    
            }).then(response => {
                    
                return response.json()})
            .then(json => {
    
                if (!json.success) {
                    
                    if (json.msg= "ERROR") {
                        alert("error")
                    }
    
                    
                }
    
                else {
    
                    navigate("/")

                    //navigating to post page if successfull
    
    
                    window.location.reload();
                }
            });

           }
        }


    });
}


            


           
            
            
        
            


     
    



fetchPost();

//executing function 
    



   



    

   
      
      
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

    //returning window that asks if the user is sure or not
    }







export default DeletePost