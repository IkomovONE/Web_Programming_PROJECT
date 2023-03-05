import * as React from 'react';
import { useNavigate } from "react-router-dom";
import {useState, useEffect, useRef} from 'react'
import { useTranslation } from 'react-i18next';


//importing necessary libraries

function Register() {


    const navigate = useNavigate();


    const [target, setTarget] = React.useState(null);

    const [admin, setAdmin] = React.useState(false);

    //setting states


    const { t, i18n } = useTranslation();
    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang)
    }

    //setting language translation function



    



    function checkAdmin (event) {

        //function used to catch checkBox input for admin property


        useEffect(() => {
            if (event.target.checked) {
                setAdmin(event.target.value);
              } else {
                setAdmin("false");
              }
            
          }, []);


    }





    const CheckUser= (event) => {

        //function for checking if user exists and creating it if not

        event.preventDefault();

        var username= String(event.target[0].value);

        var email= String(event.target[1].value);

        var pass= String(event.target[2].value);

        //getting inputs

        


        




        fetch("/api/user/register", {

            //register post request
            method: "POST",

            body: JSON.stringify({
                username: username,
                email: email,
                password: pass,
                admin: admin

            }),
                
         

        }).then(response => {
                
            return response.json()})
        .then(json => {

            if (!json.success) {
                
                if (json.msg= "User already exists!") {
                    alert("User already exists!")
                }

                
                else {
                    alert("Something is wrong, error")
                }
            }

            else {

                

                navigate("/login");

                //navigates to login page after successfull registration

                window.location.reload();

            }

            


        })

        

        


        

        


    
    }


    return (

        <div className="div">

            <div id="darkened">


            <h1>{t("Register in my network, please!")}</h1>
            <h2>-------------------------------------------------</h2>


            <form onSubmit={CheckUser}>

                <label for="username" id="label">{t("New Username")}</label>
                
                <input type="text" id="username" name="username"></input>

                <p></p>
        
                <label for="email" id="label"> {t("New E-mail")}</label>
                
                <input type="text" id="email" name="email"></input>

                <p></p>
                
                <label for="password" id="label">{t("New Password")}</label>
                
                <input type="password" id="password" name="password"></input>

                <p></p>

                <label for="myCheckbox" id="Check">{t("Try admin account")}</label>

                <input type="checkbox" id="Check"  onChange={checkAdmin(event)}></input>

                <p></p>


                <button type="submit" id="sub">{t("Register")}</button>

            </form>




            </div>



        </div>


        



        




    )

    //rerturning registration form
}




export default Register