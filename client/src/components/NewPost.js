import * as React from 'react';
import { useRef } from 'react';
import { useNavigate } from "react-router-dom";
import SyntaxHighlighter from 'react-syntax-highlighter';

function NewPost() {

    const reference = useRef(null);

    const navigate = useNavigate();

    


    const submit = (event) => {
        event.preventDefault();
        


        

        


        var username= String(window.localStorage.getItem("username"));

        

        var subject= String(event.target[0].value);

        var description= String(event.target[1].value);

        var code_lang= String(event.target[2].value).toLowerCase();

        if (SyntaxHighlighter.supportedLanguages.includes(code_lang)) {
            
        }
        else {

            alert("Your code language is not supported. It will be posted without highlighting.")

        }

        var code= String(event.target[3].value);
        
    
        fetch("/api/snippet", {
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

        <div className="div">

            <div id="darkened">


            <h1>Create a new post</h1>
            <h2>-------------------------------------------------</h2>


            <form onSubmit={submit}> 
                

          
                <label id= "label" >New post subject</label>

                <input id= "name" type="text" name="name"></input>

                <p></p>

                <label id= "label" >Description</label>

                <input id= "descr" type="text" name="descr"></input>

                <p></p>

                <label id= "label" >Code language:</label>

                <input id= "code-lang" type="text" name="code-lang"></input>
                <p></p>

                <label id= "label" >Code</label>

                <textarea ref={reference} id= "codeInp" type="text" name="code" rows="12" cols="12" onKeyDown={handleEnter}></textarea>

                <p></p>


                
                


                <input id= "submit" type= "submit" name="submit" value= "Post the snippet"></input>
                <p></p>

            
              </form>

              




            </div>



        </div>


  


    )
}






export default NewPost