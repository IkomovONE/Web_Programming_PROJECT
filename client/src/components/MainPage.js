import {useState, useEffect} from 'react'
import { useTranslation } from 'react-i18next';

import List from "./List"


//importing necessary libraries


function MainPage() {

  const { t, i18n } = useTranslation();
    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang)
    }

     //setting language translation function



    const [dataType, setDataType] = useState("snippets")
    const [data, setData] = useState([])

    //setting necessary variables

    useEffect(() => {
      //using useEffect to fetch the snippets using get request
        fetch("/api/snippets")
        .then(response => response.json())
        .then(json => setData(json))
    }, [dataType])

    

    

    return (
    <div className="div">
      <div id="darkened">
        <div id="head">

              <h1>Code snippets!</h1>

              <h3>{t("Newest posts")}</h3>


              <h2>-------------------------------------------------</h2>


              <List posts= {data}/>

            

        </div>       

      </div>

    </div>
    )

    //returning main page with a list containing code snippets
}

export default MainPage

     
