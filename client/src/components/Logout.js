
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';


//importing necessary libraries

function Logout() {

    const { t, i18n } = useTranslation();
    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang)
    }

     //setting language translation function


    


    window.localStorage.removeItem("token");

    //removing token from local storage
   

    


    return (

        <div className="div">

            <div id="darkened">


            <h1>{t("You logged out.")}</h1>
            <h2>-------------------------------------------------</h2>

            <Button  id= "home" color="inherit"  href="/">{t("Return to Home")}</Button>

            




            </div>



        </div>


        



        




    )

    //returning "logged out"
}




export default Logout