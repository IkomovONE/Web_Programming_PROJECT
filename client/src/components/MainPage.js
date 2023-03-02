import {useState, useEffect} from 'react'

import List from "./List"


function MainPage() {
    const [dataType, setDataType] = useState("snippets")
    const [data, setData] = useState([])

    useEffect(() => {
        fetch("/api/snippets")
        .then(response => response.json())
        .then(json => setData(json))
    }, [dataType])

    

    

    return (
    <div className="div">
      <div id="darkened">
        <div id="head">

              <h1>Code snippets!</h1>

              <h3>Newest posts</h3>


              <h2>-------------------------------------------------</h2>


              <List posts= {data}/>

            

        </div>       

      </div>

    </div>
    )
}

export default MainPage

     
