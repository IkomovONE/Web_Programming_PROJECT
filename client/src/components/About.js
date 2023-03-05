import { useTranslation } from 'react-i18next';

//importing i18n for languages



function About() {

    //function for the about page

    const { t, i18n } = useTranslation();
    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang)
    }

    //setting i18n function, code taken from teacher's rource code


    return (

        <div className="div">

            <div id="darkened">


            <h1>{t("About the project.")}</h1>
            <h2>-------------------------------------------------</h2>




            </div>



        </div>


        



        




    )

    //returns an about page, with some text
}




export default About