import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import {useState} from 'react'


import Book from './components/Book'


function App() {

  

  const [userData, setUserData] = useState({})


  const submit = (e) => {
    e.preventDefault()
    

    fetch("/api/book/", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(userData),
        mode: "cors"
    })
  }

  const handleChange = (e) => {
    setUserData({...userData, [e.target.name]: e.target.value})
}


  return (
    <div className="App">
      <header className="App-header">

        

        <Router>
        <h1>books</h1>

          <Routes>
          <Route path="/book/:id" element={<Book />}/>
          <Route path="/*" element={<h2>404: this is not the webpage you are looking for</h2>}/>
          <Route path="/" element={
            
            <form onSubmit={submit} onChange={handleChange}> 
            

      
            <label id= "label" >Name of the book:</label>

            <input id= "name" type="text" name="name"></input>

            <p></p>

            <label id= "label" >Author of the book:</label>

            <input id= "author" type="text" name="author"></input>
            <p></p>


            <label id= "label" type= "number" >Number of pages:</label>


            <input id= "pages" type="text" name="pages"></input>
            <p></p>


            <input id= "submit" type= "submit" name="submit" value= "Save the book to DB"></input>
            <p></p>

        
          </form>
          }/>

          </Routes>



        


          

          
            


        </Router>

        
        
      </header>
    </div>
  );
}

export default App;
