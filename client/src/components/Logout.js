
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';

function Logout() {

    const { t, i18n } = useTranslation();
    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang)
    }

    


    window.localStorage.removeItem("token");
   

    


    return (

        <div className="div">

            <div id="darkened">


            <h1>{t("You logged out.")}</h1>
            <h2>-------------------------------------------------</h2>

            <Button  id= "home" color="inherit"  href="/">{t("Return to Home")}</Button>

            




            </div>



        </div>


        



        




    )
}




export default Logout