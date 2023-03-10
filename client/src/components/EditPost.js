import * as React from 'react';
import {useState, useEffect, useRef} from 'react'
import { useTranslation } from 'react-i18next';
import {useParams} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import SyntaxHighlighter from 'react-syntax-highlighter';

//importing necessary libraries

function EditPost() {

  const { t, i18n } = useTranslation();
    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang)
    }

    //setting language translation function

    const reference = useRef(null);

    const navigate = useNavigate();

    //implementing navigate feature




    window.scroll(0,0)

    //scrolling page

   

    const [data, setData] = useState({})

    const {id} = useParams()

    const [dataType, setDataType] = useState("post")
    const [loading, setLoading] = useState(true);

    //setting variables


    function fetchPost () {

      //funtion for fetching the post

        useEffect(() => {

            window.scroll(0,0)

            //scrolling page
    
            
            
            fetch("/api/post/"+id)
            .then(response => response.json())
            .then(json => {
    
                
    
                setData(json)

                setLoading(false);

                //get request to get post info, then setting the info as state. also using loading state so that page is not loaded before and data is fetched
    
    
                
    
            })

        
    
    
           
    
        
            
        }, [dataType])

        

    }


    


    


    const submit = (event) => {

      //function for submitting the new data
        event.preventDefault();

        

        var token= window.localStorage.getItem("token")

        //getting token



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


            


            var username= json.username

            var id= json._id;

            var subject= String(event.target[0].value);
    
            var description= String(event.target[1].value);

            
            var code= String(event.target[2].value);


            //getting some variables from the form, the new data user entered is stored here
    
           

            
            
        
            fetch("/api/editsnippet", {

              //function for editing the snippet
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
                    
                    if (json.msg= "ERROR") {
                        alert("error")
                    }
    
                    
                }
    
                else {
    
                    navigate("/post/"+data.id)

                    //navigates back to post if successfull
    
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

//executing the function
    


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

    


    var Incode= data.code




    

    const [code, setCode] = useState(JSON.stringify(Incode));

    const [subject, setSubject] = useState(data.subject);

    

    const [description, setDescription] = useState(data.description);


    //setting more variables to get new contents of the post from the html form


    const handleChange = (event) => {
        setCode(event.target.value);
      };

      const handleChangeS = (event) => {
        setSubject(event.target.value);
      };

      const handleChangeD = (event) => {
        setDescription(event.target.value);
      };

      //funcitons for handling the change in the input fields
    
      
      if (loading) {
        return <p></p>;
      }

      //return this if the doc is loading 


    return (

        <div className="div">

            <div id="darkened">


            <h1>{t("Edit post")}</h1>
            <h2>-------------------------------------------------</h2>


            <form onSubmit={submit}> 
                

          
                <label id= "label" > {t("Post subject")}</label>

                <textarea id= "editSub" type="text" name="name"  onChange={handleChangeS} value={subject}>{data.subject}</textarea>

                <p></p>

                <label id= "label" >{t("Description")}</label>

                <textarea id= "descr" type="text" name="descr" value={description} onChange={handleChangeD}>{data.description}</textarea>

                <p></p>

                

                <label id= "label" >{t("Code")}</label>

                <textarea ref={reference} id= "codeInp" type="text" name="code" onChange={handleChange} rows="12" cols="12" onKeyDown={handleEnter} value={code} >{data.code}</textarea>

                <p></p>


                
                


                <input id= "submit" type= "submit" name="submit" value= {t("Save the changes")}></input>
                <p></p>

            
              </form>

              




            </div>



        </div>


  


    )

    //returning the main post editing form
    }






export default EditPost