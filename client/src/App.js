import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';

import { useState, useEffect, useRef } from 'react';
import Header  from "./components/Header"
import About  from "./components/About"
import NewPost  from "./components/NewPost"
import Login  from "./components/Login"
import Logout  from "./components/Logout"
import EditPost from "./components/EditPost"
import DeletePost from "./components/DeletePost"
import EditComment from "./components/EditComment"
import DeleteComment from "./components/DeleteComment"
import Profile  from "./components/Profile"
import MainPage from './components/MainPage';
import Register  from "./components/Register"
import Post  from "./components/Post"


//importing necessary elements and React components made by me





function App() {

  //function setting the main app

  

  
  const [height, setHeight] = useState(0);
  const appRef = useRef(null);

  useEffect(() => {
    const appHeight = appRef.current.scrollHeight;
    setHeight(appHeight);
  }, []);

  //Setting the height of the app using useEffect and useState
  

  return (

    
    
    <Router>
      <div className="App" ref={appRef} style={{ minheight: `${height+150}px` }}>
        
        <header className="App-header">

          <Header />

        </header>


        <Routes >
          
          <Route path="/about" element={<About />}/>
          <Route path="/newpost" element={<NewPost />}/>
          <Route path="/editpost/:id" element={<EditPost />}/>
          <Route path="/deletepost/:id" element={<DeletePost />}/>
          <Route path="/deletecomment/:id/:CommentID" element={<DeleteComment />}/>
          <Route path="/editComment/:id/:CommentID/:author/:content" element={<EditComment />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/logout" element={<Logout />}/>
          <Route path="/profile/:id" element={<Profile />}/>
          <Route path="/post/:id" element={<Post />}/>
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

//returning necessary route elements, as well as the app header

export default App;

//exporting the "app"
