import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import {useState} from 'react'
import Header  from "./components/Header"
import About  from "./components/About"
import NewPost  from "./components/NewPost"


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
    
    <Router>
      <div className="App">
        
        <header className="App-header">

          <Header />

        </header>


        <Routes >
          <Route path="/book/:id" element={<Book />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/newpost" element={<NewPost />}/>
          <Route path="/login" element={<NewPost />}/>
          <Route path="/register" element={<NewPost />}/>
          <Route path="/*" element={
            <div className="div">
              <div id="darkened">
                <h1>404: this is not the webpage you are looking for</h1>
                <h2>-------------------------------------------------</h2>
              </div>

            </div>
          }/>

          <Route path="/" element={

            <div className="div">

              <div id="darkened">

                <h1>Code snippets!</h1>


                <h2>-------------------------------------------------</h2>
            
            
              
                

            </div>

          </div>
          }/>

          </Routes>

          




      </div>




    </Router>
    
      
    
    
  );
}

export default App;
