import * as React from 'react';
import { Button } from '@mui/material'
import {Link} from 'react-router-dom'
import { useTranslation } from 'react-i18next';

//importing necessary libraries

const PostLink = ({post}) => {

    const { t, i18n } = useTranslation();
    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang)
    }

    //setting language translation function

    

    return (


        <div id="postLink">
            
            <div id= "author">
                <div id= "created">

                <a id="created" >{t("Created by:")}</a>
                <Button component={Link} to={"/profile/"+post.author} id="created"> {post.author}</Button>

                |


                <a id="when" >{t("Last edited:")}</a>
                <a id="whenn">{post.date}</a>

                
                </div>
                
                
                
                <p></p>
            </div>

            <div id= "subject">
                
                <Button component={Link} to={"/post/"+post._id} > {post.subject}</Button>
                
            </div>

            

                
                
        </div>


        
    )

    //retuning post link object, which is seen on the main screen
}

export default PostLink
