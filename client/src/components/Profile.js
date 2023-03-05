import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'


//importing necessary libraries

function Profile({username}) {
    
    const [data, setData] = useState({})

    const {id} = useParams()

    const [dataType, setDataType] = useState("profile")

    

    

    useEffect(() => {
      window.scroll(0,0)
        fetch("/api/user/"+id)
        .then(response => response.json())
        .then(json => setData(json))

        if (data.admin) {
            
        }
        
    }, [dataType])




    

    

    

    return (
    <div className="div">
      <div id="darkened">
        <div id="head">

              <h1>{data.username} </h1>

              {data.admin && <h2>(Admin)</h2>}

              <h3>{data.email}</h3>


              <h2>-------------------------------------------------</h2>




              

            

        </div>       

      </div>

    </div>
    )
}

export default Profile

     
