import { useTranslation } from 'react-i18next';



function About() {

    const { t, i18n } = useTranslation();
    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang)
    }


    return (

        <div className="div">

            <div id="darkened">


            <h1>{t("About the project.")}</h1>
            <h2>-------------------------------------------------</h2>




            </div>



        </div>


        



        




    )
}




export default About