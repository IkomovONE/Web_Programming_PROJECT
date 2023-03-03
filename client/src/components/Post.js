import * as React from 'react';
import { useRef } from 'react';
import { Button } from '@mui/material'
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useParams} from 'react-router-dom'
import "highlight.js/styles/github.css";
import hljs from 'highlight.js';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/hljs';





const Post = ({post}) => {

    

    


    const [data, setData] = useState({})

    const {id} = useParams()

    const [dataType, setDataType] = useState("post")


    useEffect(() => {
        window.scroll(0,0)
        
        fetch("/api/post/"+id)
        .then(response => response.json())
        .then(json => setData(json))

        
        
        
    }, [dataType])

    return (
    
    <div className="div">
        <div id="darkened">
            <div id="head"></div>

            <h1>{data.subject}</h1>


            

              


              <h2>-------------------------------------------------</h2>

              <div id="notelabel" >
              
              <h6>{data.description}</h6>

              </div>

             


                <div id="post">
                    
                    <div id= "author">
                        <a id="created" >Created by:</a>
                        <Button component={Link} to={"/profile/"+data.author} id="created"> {data.author}</Button>

                        
                        

                        <a id= "whenPost">When: {data.date}</a>
                        <p></p>
                    </div>

                    

                    

                    <div >
                        
                        

                        <SyntaxHighlighter id= "code" language={data.codelang} style={dark} > 
                            {data.code}

                        </SyntaxHighlighter>
                        
                        
                    </div>


                    

                    

                    

                        
                        
                </div>

            </div>       

         </div>

    


        
    )

    //className={`language-python`}

}

export default Post
