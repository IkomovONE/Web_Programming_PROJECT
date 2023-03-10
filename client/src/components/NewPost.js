import * as React from 'react';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";
import SyntaxHighlighter from 'react-syntax-highlighter';



//importing necessary libraries

function NewPost() {

    const reference = useRef(null);

    const navigate = useNavigate();

    const { t, i18n } = useTranslation();
    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang)
    }

     //setting language translation function

    

    


    const submit = (event) => {

        //function for submitting 
        event.preventDefault();

        

        var token= window.localStorage.getItem("token")

        //getting token



        fetch("/api/token/check", {

            //checking the login
            method: "POST",
      
            headers: {
              "authorization": token
            },
      
            body: null,
            
      
          }).then(response => {
                      
            return response.json()}).then(json => {
      
          if (json.message== "VERIFIED") {


            


            var username= json.username

            var subject= String(event.target[0].value);
    
            var description= String(event.target[1].value);
    
            var code_lang= String(event.target[2].value).toLowerCase();

            //getting inputs 
    
            if (SyntaxHighlighter.supportedLanguages.includes(code_lang)) {
                
            }
            else {
    
                alert("Your code language is not supported. It will be posted without highlighting.")
    
            }

            //giving alert message if the code language is not supported by Syntax Highlighter
    
            var code= String(event.target[3].value);
            
        
            fetch("/api/snippet", {

                //post request for posting the snippet
                method: "POST",
    
                body: JSON.stringify({
                    subject: subject,
                    author: username,
                    description: description,
                    codelang: code_lang,
                    code: code,
                
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

                    //navigate to main page if successfull
    
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

    
      
    


    return (

        <div className="div">

            <div id="darkened">


            <h1>{t("Create a new post")}</h1>
            <h2>-------------------------------------------------</h2>


            <form onSubmit={submit}> 
                

          
                <label id= "label" >{t("New post subject")}</label>

                <input id= "name" type="text" name="name"></input>

                <p></p>

                <label id= "label" >{t("Description")}</label>

                <input id= "descr" type="text" name="descr"></input>

                <p></p>

                <label id= "label" >{t("Code language:")}</label>

                <input id= "code-lang" type="text" name="code-lang"></input>
                <p></p>

                

                <label id= "label" >{t("Code")}</label>

                <textarea ref={reference} id= "codeInp" type="text" name="code" rows="12" cols="12" onKeyDown={handleEnter}></textarea>

                <p></p>


                
                


                <input id= "submit" type= "submit" name="submit" value= {t("Post the snippet")}></input>
                <p></p>

            
              </form>

              




            </div>



        </div>


  


    )

    //returning a form for creating a new post
    }






export default NewPost