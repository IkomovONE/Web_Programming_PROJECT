import * as React from 'react';
import { useRef } from 'react';
import { useNavigate } from "react-router-dom";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { useTranslation } from 'react-i18next';

function NewComment({data}) {

    const { t, i18n } = useTranslation();
    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang)
    }

    const reference = useRef(null);

    const navigate = useNavigate();

    


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
                    
          return response.json()})
      .then(json => {
    
        if (json.message== "VERIFIED") {
    
         

          var username= json.username;


          var content= String(event.target[0].value);


          var Id= Math.floor(Math.random() *100000);

          console.log(Id)

       
    
          fetch("/api/comment", {
              method: "POST",
  
              body: JSON.stringify({

                  author: username,
                  content: content,
                  postID: data.id,
                  CommentID: Id,
  
              
              }),
                  
           
  
          }).then(response => {
                  
              return response.json()})
          .then(json => {
  
              if (!json.success) {
                  
                  if (json.msg= "ERROR") {
                      alert("Something went wrong.")
                  }
  
                  
                  else {
                      alert("Something is wrong, error")
                  }
              }
  
              else {
  
                  //navigate("/")
  
                  window.location.reload();
              }
          });

          
    
          
    
        }
    
        else {
          
        }
    
    
    
      })
        

    

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
    
      
    


    return (

        <div id="NewComment">

            


            <h6> {t("Write a comment")}</h6>
            


            <form onSubmit={submit}> 
                

          
                
                

                <input ref={reference} onKeyDown={handleEnter} rows="12" cols="12" id= "descr" type="text" name="descr"></input>

                <p></p>

                


                
                


                <input id= "submit" type= "submit" name="submit" value= {t("Post the comment")}></input>
                <p></p>

            
              </form>

              




            



        </div>


  


    )
}






export default NewComment