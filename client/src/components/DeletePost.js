import * as React from 'react';
import {useState, useEffect, useRef} from 'react'

import {useParams} from 'react-router-dom'
import { useNavigate } from "react-router-dom";


function DeletePost() {

   

    const navigate = useNavigate();


    window.scroll(0,0)

    const [data, setData] = useState({})

    const {id} = useParams()

    const [dataType, setDataType] = useState("post")
   


    function fetchPost () {

        useEffect(() => {

            window.scroll(0,0)
    
            
            
            fetch("/api/post/"+id)
            .then(response => response.json())
            .then(json => {
    
                
    
                setData(json)

                
    
    
                
    
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

                    fetch("/api/snippet/delete", {
                        method: "POST",
        
                        body: JSON.stringify({
                        postID: data.id
                        
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
        
                            navigate("/")
        
                            window.location.reload();
                        }
                    });


                }

           }

           else {

            fetch("/api/snippet/delete", {
                method: "POST",
    
                body: JSON.stringify({
                    postID: data.id
                    
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
    
                    navigate("/")
    
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


            <h1>Are you sure?</h1>
            <h2>-------------------------------------------------</h2>


            
                

          
            <button onClick={submitNo}>No</button>

                
            <button onClick={submitYes}>Yes</button>

                
                
            <p></p>


                
                


                
            
             

              




            </div>



        </div>


  


    )
    }







export default DeletePost