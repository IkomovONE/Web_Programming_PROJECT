import * as React from 'react';
import {useState, useEffect, useRef} from 'react'
import { useTranslation } from 'react-i18next';
import {useParams} from 'react-router-dom'
import { useNavigate } from "react-router-dom";

//importing necessary libraries

function EditComment() {
    const { t, i18n } = useTranslation();
    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang)
    }

    //setting language translation function

    const reference = useRef(null);

    const {id, CommentID, author, content} = useParams()

    //setting variables

    



   

    const navigate = useNavigate();

    //implementing navigate feature


    window.scroll(0,0)

    //scrolling page

   

    

    const [dataType, setDataType] = useState("Comment")
    

   

        useEffect(() => {

            window.scroll(0,0)

            //scrolling page

            
    
        }, [dataType])

        

    


    


    


    const submit = (event) => {
        event.preventDefault();

        

        var token= window.localStorage.getItem("token")



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


            


            

            var Newcontent= String(event.target[0].value);

            //getting new content for the comment

            
    
           
    
        
            fetch("/api/editComment", {

                //post request, for setting new comment
                method: "POST",
    
                body: JSON.stringify({
                    postID: id,
                    author: author,
                    CommentId: CommentID,
                    content: Newcontent,
                    
                    
                
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
    
                    navigate("/post/"+id)
                    //navigating to post if successfull
        
    
                    window.location.reload();
                }
            });
    


      
            
      
          }
      
          else {
            navigate("/")
          }
        });
        


     
    

}


    


    function handleEnter(event) {

        if (event.key === 'Enter') {
            event.preventDefault();

            const textarea = reference.current;
            const value = textarea.value;
            const selectionStart = textarea.selectionStart;
            const selectionEnd = textarea.selectionEnd;
            const newValue = value.substring(0, selectionStart) + '\n' + value.substring(selectionEnd);
            textarea.value = newValue;
            textarea.selectionStart = textarea.selectionEnd = selectionStart + 1;
        }

    }


    //function that's used to handle enter key pressed when writing text.

    




    
    

    const [description, setDescription] = useState(content);


   

      

      const handleChangeD = (event) => {
        setDescription(event.target.value);
      };

      //function for handling change in content
    
      
      

    return (

        <div className="div">

            <div id="darkened">


            <h1>{t("Edit Comment")}</h1>
            <h2>-------------------------------------------------</h2>


            <form onSubmit={submit}> 
                

          
               
                <label id= "label" >{t("Description")}</label>

                <textarea id= "descr" type="text" name="descr" value={description} onChange={handleChangeD}>{content}</textarea>

                <p></p>
    
                


                <input id= "submit" type= "submit" name="submit" value= {t("Save the changes")}></input>
                <p></p>

            
              </form>

              




            </div>



        </div>


  


    )

    //returning a form for editing the comment
    }






export default EditComment