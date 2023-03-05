import * as React from 'react';
import {useState, useEffect, useRef} from 'react'
import { useTranslation } from 'react-i18next';
import {useParams} from 'react-router-dom'
import { useNavigate } from "react-router-dom";

function EditComment() {
    const { t, i18n } = useTranslation();
    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang)
    }

    const reference = useRef(null);

    const {id, CommentID, author, content} = useParams()

    



   

    const navigate = useNavigate();


    window.scroll(0,0)

   

    

    const [dataType, setDataType] = useState("Comment")
    

   

        useEffect(() => {

            window.scroll(0,0)

            


            
    
            
            
            

           
        }, [dataType])

        

    


    


    


    const submit = (event) => {
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


            


            

            var Newcontent= String(event.target[0].value);

            console.log(CommentID)
    
           
    
        
            fetch("/api/editComment", {
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

    




    
    

    const [description, setDescription] = useState(content);


   

      

      const handleChangeD = (event) => {
        setDescription(event.target.value);
      };
    
      
      

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
    }






export default EditComment