import * as React from 'react';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

//importing necessary libraries

function Login() {

    const { t, i18n } = useTranslation();
    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang)
    }

    //setting language translation function


    const navigate = useNavigate();

    //using navigate to go to pages


    const [target, SetTarget] = React.useState(null);



    const CheckUser= (event) => {

        //function used to log user it

        event.preventDefault();

        var email= String(event.target[0].value);

        var pass= String(event.target[1].value);

        //getting inputs


        fetch("/api/user/login", {

            //sending post request
            method: "POST",

            body: JSON.stringify({
                email: email,
                password: pass
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

                window.localStorage.setItem("token", json.token);

                //setting token to local storage
                
                
                

                navigate("/");

                //navigating to main page

                window.location.reload();

            }

            


        })

        

        


        

        


    
    }





    return (

        <div className="div">

            <div id="darkened">


            <h1>{t("Log in to your account, please!")}</h1>
            <h2>-------------------------------------------------</h2>


            <form onSubmit={CheckUser}>
        
                <label for="email" id="label">{t("E-mail")}</label>
                
                <input type="text" id="email" name="email"></input>

                <p></p>
                
                <label for="password" id="label">{t("Password")}</label>
                
                <input type="password" id="password" name="password"></input>

                <p></p>

                <button type="submit" id="sub" >{t("Log in")}</button>

            </form>




            </div>



        </div>


        



        




    )

    //returning form for logging in
}







export default Login