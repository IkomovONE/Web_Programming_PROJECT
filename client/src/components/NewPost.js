import * as React from 'react';
import { useNavigate } from "react-router-dom";

function NewPost() {

    const navigate = useNavigate();


    const submit = (event) => {
        event.preventDefault()

        


        var username= String(window.localStorage.getItem("username"));

        

        var subject= String(event.target[0].value);

        var description= String(event.target[1].value);

        var code= String(event.target[2].value);
        
    
        fetch("/api/snippet", {
            method: "POST",

            body: JSON.stringify({
                subject: subject,
                author: username,
                description: description,
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

                <label id= "label" >Code</label>

                <input id= "code" type="text" name="code"></input>

                <p></p>


                
                


                <input id= "submit" type= "submit" name="submit" value= "Post the snippet"></input>
                <p></p>

            
              </form>




            </div>



        </div>


  


    )
}






export default NewPost