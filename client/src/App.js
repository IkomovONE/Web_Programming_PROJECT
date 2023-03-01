import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import {useState} from 'react'
import Header  from "./components/Header"
import About  from "./components/About"
import NewPost  from "./components/NewPost"
import Login  from "./components/Login"
import Logout  from "./components/Logout"
import MainPage from './components/MainPage';
import Register  from "./components/Register"





function App() {

  

  

  

  

  return (
    
    <Router>
      <div className="App">
        
        <header className="App-header">

          <Header />

        </header>


        <Routes >
          
          <Route path="/about" element={<About />}/>
          <Route path="/newpost" element={<NewPost />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/logout" element={<Logout />}/>

          <Route path="/" element= {<MainPage />}/>
          
          <Route path="/*" element={
            <div className="div">
              <div id="darkened">
                <h1>404: this is not the webpage you are looking for</h1>
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
