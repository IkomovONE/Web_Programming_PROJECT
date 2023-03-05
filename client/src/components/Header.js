import { AppBar, Toolbar } from '@mui/material'
import * as React from 'react';
import { Button } from '@mui/material'
import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next';
import { Typography } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Menu from '@mui/material/Menu';




import {Link} from 'react-router-dom'
import {Link as RouterLink} from "react-router-dom"


const Header= () => {

  const { t, i18n } = useTranslation();
    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang)
    }

  const [auth, setAuth] = React.useState(false);

  const [user, setUser] = React.useState("");


  const CheckLogin = () => {

    var token= window.localStorage.getItem("token")

    fetch("/api/token/check", {
      method: "POST",

      headers: {
        "authorization": token
      },

      body: null,
      

    }).then(response => {
                
      return response.json()})
  .then(json => {

    if (json.message== "VERIFIED") {

      setAuth(true);

      setUser(json.username);

      console.log(auth);

    }

    else {
      setAuth(false);
    }



  })
  };





    

    
    

    const [anchorEl, setAnchorEl] = React.useState(null);


    
    
      const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };


      CheckLogin();


      //const username= window.localStorage.getItem("username")



    


    return (

        <Box sx={{ flexGrow: 1 }}>
            <AppBar className="bar" position="static" >
                <Toolbar className='toolbar'>

                

                <Typography  className="typo"  variant="h6"  component="div" >Code snippets!</Typography>

                <div id= "divider">|</div>


                <Button  color="inherit"  component={Link} to="/">{("Home")}</Button>

                

                <Button   color="inherit"  component={Link} to="/about">{("About")}</Button>

                {auth && <Button   color="inherit"  component={Link} to="/newpost">{("New Post")}</Button>}

                <div className= "about"></div>

                <Button id= "fi" color="inherit" onClick={()=> changeLanguage("fi")}>FI</Button> 
                
                <Button id= "en" color="inherit" onClick={()=> changeLanguage("en")}>EN</Button>

                <div id= "divider">|</div>

                


                <div>
                    <IconButton className="avatar"  size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleMenu} color="inherit">
                <AccountCircle />
              </IconButton>
              <Menu

                sx={{ mt: '45px'}}
                
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {!auth &&<MenuItem  onClick={handleClose} component={Link} to="/login">Log in</MenuItem>}
                {!auth &&<MenuItem  onClick={handleClose} component={Link} to="/register">Register</MenuItem>}
                {auth &&<MenuItem  onClick={handleClose} component={Link} to={"/profile/"+user} >My Profile</MenuItem>}
                {auth &&<MenuItem  onClick={handleClose} component={Link} to="/logout">Log Out</MenuItem>}
              </Menu>
            </div>

                
        


                </Toolbar>
                
                
            </AppBar>
        </Box>
         


    
    

      
    


    )



}


export default Header