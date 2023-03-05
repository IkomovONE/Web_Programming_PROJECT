import * as React from 'react';
import {useState, useEffect, useRef} from 'react'

import {useParams} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import SyntaxHighlighter from 'react-syntax-highlighter';

function EditPost() {

    const reference = useRef(null);

    const navigate = useNavigate();


    window.scroll(0,0)

    const [data, setData] = useState({})

    const {id} = useParams()

    const [dataType, setDataType] = useState("post")
    const [loading, setLoading] = useState(true);


    function fetchPost () {

        useEffect(() => {

            window.scroll(0,0)
    
            
            
            fetch("/api/post/"+id)
            .then(response => response.json())
            .then(json => {
    
                
    
                setData(json)

                setLoading(false);
    
    
                
    
            })

        
    
    
           
    
        
            
        }, [dataType])

        

    }


    


    


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


            


            var username= json.username

            var id= json._id;

            var subject= String(event.target[0].value);
    
            var description= String(event.target[1].value);
    
           
    
            
    
            var code= String(event.target[2].value);

            
            
        
            fetch("/api/editsnippet", {
                method: "POST",
    
                body: JSON.stringify({
                    postID: data.id,
                    subject: subject,
                    author: data.author,
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
    
                    navigate("/post/"+data.id)
    
                    window.location.reload();
                }
            });
    


      
            
      
          }
      
          else {
            navigate("/")
          }
        });
        


     
    

}

fetchPost();
    


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

    var Incode= data.code




    

    const [code, setCode] = useState(JSON.stringify(Incode));

    const [subject, setSubject] = useState(data.subject);

    

    const [description, setDescription] = useState(data.description);


    const handleChange = (event) => {
        setCode(event.target.value);
      };

      const handleChangeS = (event) => {
        setSubject(event.target.value);
      };

      const handleChangeD = (event) => {
        setDescription(event.target.value);
      };
    
      
      if (loading) {
        return <p></p>;
      }


    return (

        <div className="div">

            <div id="darkened">


            <h1>Edit post</h1>
            <h2>-------------------------------------------------</h2>


            <form onSubmit={submit}> 
                

          
                <label id= "label" >Post subject</label>

                <textarea id= "editSub" type="text" name="name"  onChange={handleChangeS} value={subject}>{data.subject}</textarea>

                <p></p>

                <label id= "label" >Description</label>

                <textarea id= "descr" type="text" name="descr" value={description} onChange={handleChangeD}>{data.description}</textarea>

                <p></p>

                

                <label id= "label" >Code</label>

                <textarea ref={reference} id= "codeInp" type="text" name="code" onChange={handleChange} rows="12" cols="12" onKeyDown={handleEnter} value={code} >{data.code}</textarea>

                <p></p>


                
                


                <input id= "submit" type= "submit" name="submit" value= "Save the changes"></input>
                <p></p>

            
              </form>

              




            </div>



        </div>


  


    )
    }






export default EditPost